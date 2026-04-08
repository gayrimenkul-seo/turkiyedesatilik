import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

interface LeadBody {
  name:       string
  email:      string
  phone?:     string
  message:    string
  listingId?: string
  officeId?:  string
  locale?:    string
}

interface ValidationError { field: string; message: string }

function validateLead(body: Partial<LeadBody>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!body.name?.trim())
    errors.push({ field: 'name', message: 'Ad soyad zorunludur.' })
  else if (body.name.trim().length < 2)
    errors.push({ field: 'name', message: 'Ad soyad en az 2 karakter olmalıdır.' })

  if (!body.email?.trim())
    errors.push({ field: 'email', message: 'E-posta zorunludur.' })
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    errors.push({ field: 'email', message: 'Geçerli bir e-posta adresi girin.' })

  if (body.phone && !/^[+\d\s()\-]{7,20}$/.test(body.phone))
    errors.push({ field: 'phone', message: 'Geçerli bir telefon numarası girin.' })

  if (!body.message?.trim())
    errors.push({ field: 'message', message: 'Mesaj zorunludur.' })
  else if (body.message.trim().length < 10)
    errors.push({ field: 'message', message: 'Mesaj en az 10 karakter olmalıdır.' })

  return errors
}

/* ─── POST /api/leads ────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    let body: Partial<LeadBody>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Geçersiz JSON formatı.' },
        { status: 400, headers: CORS },
      )
    }

    const validationErrors = validateLead(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Gönderilen veriler hatalı.', errors: validationErrors },
        { status: 422, headers: CORS },
      )
    }

    const message = body.message!.trim()
    const SPAM = [/https?:\/\//i, /\bviagra\b/i, /\bcasino\b/i]
    if (SPAM.some((p) => p.test(message))) {
      return NextResponse.json(
        { error: 'Mesaj içeriği kabul edilemez.' },
        { status: 422, headers: CORS },
      )
    }

    const lead = await prisma.lead.create({
      data: {
        name:            body.name!.trim(),
        email:           body.email!.trim().toLowerCase(),
        phone:           body.phone?.trim() ?? null,
        message,
        preferredLocale: body.locale ?? 'tr',
        status:          'NEW',
        ...(body.listingId && { listingId: body.listingId }),
        ...(body.officeId  && { officeId:  body.officeId }),
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.',
        data:    { id: lead.id, createdAt: lead.createdAt },
      },
      { status: 201, headers: CORS },
    )
  } catch (error) {
    console.error('[POST /api/leads]', error)
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500, headers: CORS },
    )
  }
}
