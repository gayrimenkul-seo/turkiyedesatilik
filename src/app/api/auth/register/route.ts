import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Ad, e-posta ve şifre zorunludur.' },
        { status: 400 },
      )
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kayıtlı.' },
        { status: 409 },
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        name,
        email,
        phone:        phone || null,
        passwordHash,
      },
    })

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500 },
    )
  }
}
