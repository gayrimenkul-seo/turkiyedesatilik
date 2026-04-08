import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ListingType, PropertyType } from '@prisma/client'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

/* ─── GET /api/listings ──────────────────────────────────────────────── */
// Query: type, city, propertyType, sort, page, limit
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    const type         = searchParams.get('type') as ListingType | null
    const city         = searchParams.get('city')
    const propertyType = searchParams.get('propertyType') as PropertyType | null
    const sort         = searchParams.get('sort') ?? 'newest'
    const page         = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit        = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '9', 10)))

    const where = {
      status: 'ACTIVE' as const,
      ...(type         && { listingType: type }),
      ...(city         && { OR: [
        { city:     { equals: city, mode: 'insensitive' as const } },
        { district: { equals: city, mode: 'insensitive' as const } },
      ]}),
      ...(propertyType && { propertyType }),
    }

    const orderBy = (() => {
      switch (sort) {
        case 'price_asc':  return { price: 'asc' as const }
        case 'price_desc': return { price: 'desc' as const }
        case 'oldest':     return { createdAt: 'asc' as const }
        default:           return { createdAt: 'desc' as const }
      }
    })()

    const [total, data] = await Promise.all([
      prisma.listing.count({ where }),
      prisma.listing.findMany({
        where,
        orderBy,
        skip:    (page - 1) * limit,
        take:    limit,
        include: {
          images:  { orderBy: { order: 'asc' }, take: 1 },
          office:  { select: { id: true, name: true, slug: true, isVerified: true } },
          agent:   { select: { id: true, name: true } },
        },
      }),
    ])

    return NextResponse.json(
      {
        data,
        meta: { total, page, totalPages: Math.max(1, Math.ceil(total / limit)), limit },
      },
      { status: 200, headers: CORS },
    )
  } catch (error) {
    console.error('[GET /api/listings]', error)
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500, headers: CORS },
    )
  }
}
