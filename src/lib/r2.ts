import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'

// ─── R2 istemcisi ──────────────────────────────────────────────────────
export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.R2_BUCKET_NAME!
const PUBLIC_URL = process.env.R2_PUBLIC_URL!  // ör. https://media.turkiyedesatilik.com

// ─── Yükleme ───────────────────────────────────────────────────────────
export async function uploadImage(
  key: string,
  buffer: Buffer,
  contentType = 'image/webp',
): Promise<string> {
  await r2.send(
    new PutObjectCommand({
      Bucket:      BUCKET,
      Key:         key,
      Body:        buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  )
  return getPublicUrl(key)
}

// ─── Silme ─────────────────────────────────────────────────────────────
export async function deleteImage(key: string): Promise<void> {
  await r2.send(
    new DeleteObjectCommand({ Bucket: BUCKET, Key: key }),
  )
}

// ─── Public URL ────────────────────────────────────────────────────────
export function getPublicUrl(key: string): string {
  return `${PUBLIC_URL}/${key}`
}

// ─── Key üretici ───────────────────────────────────────────────────────
export function generateKey(folder: string, filename: string): string {
  const timestamp = Date.now()
  const random    = Math.random().toString(36).slice(2, 8)
  const safe      = filename.replace(/[^a-z0-9.]/gi, '-').toLowerCase()
  return `${folder}/${timestamp}-${random}-${safe}`
}
