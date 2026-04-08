import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

/* ─── GET /api/offices ───────────────────────────────────────────────── */
// Query: city, verified, sort, page, limit
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    const city     = searchParams.get('city')
    const verified = searchParams.get('verified')
    const sort     = searchParams.get('sort') ?? 'listings_desc'
    const page     = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit    = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))

    const where = {
      status: 'ACTIVE' as const,
      ...(verified !== 'false' && { isVerified: true }),
      ...(city && {
        OR: [
          { city:     { equals: city, mode: 'insensitive' as const } },
          { district: { equals: city, mode: 'insensitive' as const } },
        ],
      }),
    }

    const orderBy = (() => {
      switch (sort) {
        case 'name_asc': return { name: 'asc' as const }
        case 'newest':   return { createdAt: 'desc' as const }
        default:         return { listings: { _count: 'desc' as const } }
      }
    })()

    const [total, data, stats] = await Promise.all([
      prisma.office.count({ where }),
      prisma.office.findMany({
        where,
        orderBy,
        skip:    (page - 1) * limit,
        take:    limit,
        include: {
          _count: { select: { listings: true, agents: true } },
        },
      }),
      prisma.office.aggregate({
        where:  { status: 'ACTIVE' },
        _count: { id: true },
      }),
    ])

    return NextResponse.json(
      {
        data,
        meta:  { total, page, totalPages: Math.max(1, Math.ceil(total / limit)), limit },
        stats: { totalOffices: stats._count.id },
      },
      { status: 200, headers: CORS },
    )
  } catch (error) {
    console.error('[GET /api/offices]', error)
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500, headers: CORS },
    )
  }
}
