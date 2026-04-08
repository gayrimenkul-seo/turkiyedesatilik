import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { auth } from '@/auth'
import { uploadImage, generateKey } from '@/lib/r2'

const MAX_SIZE     = 10 * 1024 * 1024  // 10 MB
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
])

export async function POST(req: NextRequest) {
  // ── Auth kontrolü ──────────────────────────────────────────────────
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Oturum açmanız gerekiyor.' },
      { status: 401 },
    )
  }

  // ── Form verisini al ───────────────────────────────────────────────
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Geçersiz form verisi.' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 })
  }

  // ── Boyut kontrolü ─────────────────────────────────────────────────
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: 'Dosya boyutu 10MB\'ı geçemez.' },
      { status: 400 },
    )
  }

  // ── Tür kontrolü ───────────────────────────────────────────────────
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'Sadece JPG, PNG, WebP ve HEIC dosyaları kabul edilir.' },
      { status: 400 },
    )
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const inputBuffer = Buffer.from(arrayBuffer)

    const folder = `listings/${session.user.id}`

    // ── Ana görsel: max 1920px, WebP ───────────────────────────────
    const mainBuffer = await sharp(inputBuffer)
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer()

    // ── Thumbnail: 400px, WebP ─────────────────────────────────────
    const thumbBuffer = await sharp(inputBuffer)
      .resize(400, 400, { fit: 'cover', position: 'centre' })
      .webp({ quality: 80 })
      .toBuffer()

    // ── R2'ye yükle ────────────────────────────────────────────────
    const mainKey  = generateKey(folder, 'image.webp')
    const thumbKey = generateKey(`${folder}/thumbs`, 'thumb.webp')

    const [url, thumbUrl] = await Promise.all([
      uploadImage(mainKey,  mainBuffer,  'image/webp'),
      uploadImage(thumbKey, thumbBuffer, 'image/webp'),
    ])

    return NextResponse.json({ url, thumbUrl }, { status: 201 })
  } catch (err) {
    console.error('[upload] Hata:', err)
    return NextResponse.json(
      { error: 'Görsel yüklenirken bir hata oluştu.' },
      { status: 500 },
    )
  }
}
