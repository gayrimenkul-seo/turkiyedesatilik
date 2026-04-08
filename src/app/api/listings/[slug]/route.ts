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

/* ─── GET /api/listings/[slug] ───────────────────────────────────────── */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Geçersiz slug parametresi.' },
        { status: 400, headers: CORS },
      )
    }

    const listing = await prisma.listing.findUnique({
      where:   { slug },
      include: {
        images: { orderBy: { order: 'asc' } },
        office: true,
        agent:  true,
      },
    })

    if (!listing) {
      return NextResponse.json(
        { error: 'İlan bulunamadı.' },
        { status: 404, headers: CORS },
      )
    }

    // Görüntülenme sayacı (fire-and-forget)
    prisma.listing
      .update({ where: { slug }, data: { viewCount: { increment: 1 } } })
      .catch(() => {})

    // Benzer ilanlar — aynı şehir ve mülk tipi, maks 3
    const similar = await prisma.listing.findMany({
      where: {
        city:        listing.city,
        propertyType: listing.propertyType,
        status:      'ACTIVE',
        id:          { not: listing.id },
      },
      take:    3,
      orderBy: { createdAt: 'desc' },
      include: {
        images: { orderBy: { order: 'asc' }, take: 1 },
        office: { select: { id: true, name: true, slug: true } },
      },
    })

    return NextResponse.json(
      { data: listing, similar },
      { status: 200, headers: CORS },
    )
  } catch (error) {
    console.error('[GET /api/listings/[slug]]', error)
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500, headers: CORS },
    )
  }
}
