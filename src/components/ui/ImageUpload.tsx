'use client'
import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'

/* ─── Tipler ─────────────────────────────────────────────────────────── */
export interface UploadedImage {
  url:      string
  thumbUrl: string
  alt:      string
  order:    number
}

interface Props {
  value:     UploadedImage[]
  onChange:  (images: UploadedImage[]) => void
  maxImages?: number
  disabled?: boolean
}

interface UploadItem {
  id:       string
  file:     File
  preview:  string
  progress: number        // 0–100
  status:   'pending' | 'uploading' | 'done' | 'error'
  result?:  UploadedImage
  error?:   string
}

/* ─── Bileşen ────────────────────────────────────────────────────────── */
export default function ImageUpload({
  value,
  onChange,
  maxImages = 20,
  disabled = false,
}: Props) {
  const [queue, setQueue]     = useState<UploadItem[]>([])
  const [dragging, setDragging] = useState(false)
  const [dragOver, setDragOver] = useState<string | null>(null)  // sıralama için
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragItem     = useRef<number | null>(null)

  /* ── Dosya ekleme ──────────────────────────────────────────────────── */
  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const remaining = maxImages - value.length - queue.filter((q) => q.status !== 'error').length
      if (remaining <= 0) return

      const accepted = Array.from(files)
        .filter((f) => /^image\/(jpeg|png|webp|heic|heif)$/i.test(f.type))
        .slice(0, remaining)

      const newItems: UploadItem[] = accepted.map((file) => ({
        id:       `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        preview:  URL.createObjectURL(file),
        progress: 0,
        status:   'pending',
      }))

      setQueue((prev) => [...prev, ...newItems])
      newItems.forEach(uploadFile)
    },
    [value.length, queue, maxImages],
  )

  /* ── Yükleme ───────────────────────────────────────────────────────── */
  async function uploadFile(item: UploadItem) {
    setQueue((prev) =>
      prev.map((q) => (q.id === item.id ? { ...q, status: 'uploading', progress: 10 } : q)),
    )

    try {
      const formData = new FormData()
      formData.append('file', item.file)

      // XMLHttpRequest ile progress takibi
      const result = await new Promise<{ url: string; thumbUrl: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 80) + 10
            setQueue((prev) =>
              prev.map((q) => (q.id === item.id ? { ...q, progress: pct } : q)),
            )
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            const body = JSON.parse(xhr.responseText)
            reject(new Error(body.error ?? 'Yükleme başarısız.'))
          }
        })

        xhr.addEventListener('error', () => reject(new Error('Ağ hatası.')))
        xhr.open('POST', '/api/upload')
        xhr.send(formData)
      })

      const uploaded: UploadedImage = {
        url:      result.url,
        thumbUrl: result.thumbUrl,
        alt:      item.file.name.replace(/\.[^.]+$/, ''),
        order:    value.length + queue.filter((q) => q.status === 'done').length,
      }

      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id ? { ...q, status: 'done', progress: 100, result: uploaded } : q,
        ),
      )

      onChange([...value, uploaded])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Yükleme başarısız.'
      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id ? { ...q, status: 'error', error: msg } : q,
        ),
      )
    }
  }

  /* ── Sıralama (drag & drop) ────────────────────────────────────────── */
  function handleDragStart(index: number) {
    dragItem.current = index
  }

  function handleDragEnter(index: number) {
    setDragOver(String(index))
    if (dragItem.current === null || dragItem.current === index) return
    const reordered = [...value]
    const [moved]   = reordered.splice(dragItem.current, 1)
    reordered.splice(index, 0, moved)
    dragItem.current = index
    onChange(reordered.map((img, i) => ({ ...img, order: i })))
  }

  function handleDragEnd() {
    dragItem.current = null
    setDragOver(null)
  }

  /* ── Silme ─────────────────────────────────────────────────────────── */
  function removeImage(index: number) {
    const updated = value.filter((_, i) => i !== index).map((img, i) => ({ ...img, order: i }))
    onChange(updated)
  }

  function removeQueued(id: string) {
    setQueue((prev) => {
      const item = prev.find((q) => q.id === id)
      if (item) URL.revokeObjectURL(item.preview)
      return prev.filter((q) => q.id !== id)
    })
  }

  /* ── Drop zone ─────────────────────────────────────────────────────── */
  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (!disabled) addFiles(e.dataTransfer.files)
  }

  const total = value.length + queue.filter((q) => q.status !== 'error').length
  const canAdd = total < maxImages && !disabled

  /* ── Render ────────────────────────────────────────────────────────── */
  return (
    <div>
      {/* Drop zone */}
      {canAdd && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border:        `2px dashed ${dragging ? 'var(--terracotta)' : 'var(--sand-dark)'}`,
            borderRadius:  'var(--radius-sm)',
            padding:       '32px 24px',
            textAlign:     'center',
            cursor:        'pointer',
            background:    dragging ? 'rgba(196,85,42,0.04)' : 'var(--cream)',
            transition:    'all 0.2s',
            marginBottom:  value.length || queue.length ? 16 : 0,
          }}
        >
          <svg
            width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke={dragging ? 'var(--terracotta)' : 'var(--mist)'}
            strokeWidth="1.5"
            style={{ margin: '0 auto 10px', display: 'block', transition: 'stroke 0.2s' }}
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p style={{ fontSize: 13, fontWeight: 400, color: 'var(--obsidian)', marginBottom: 4 }}>
            Fotoğrafları sürükleyin veya tıklayın
          </p>
          <p style={{ fontSize: 11, color: 'var(--mist)', fontWeight: 300 }}>
            JPG, PNG, WebP, HEIC · Maks. 10MB · {maxImages - total} fotoğraf kaldı
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => { if (e.target.files) addFiles(e.target.files) }}
          />
        </div>
      )}

      {/* Yüklenmiş görseller — sıralanabilir */}
      {value.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10, marginBottom: queue.length ? 12 : 0 }}>
          {value.map((img, index) => (
            <div
              key={img.url}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              style={{
                position:     'relative',
                aspectRatio:  '1',
                borderRadius: 'var(--radius-sm)',
                overflow:     'hidden',
                cursor:       'grab',
                border:       dragOver === String(index)
                  ? '2px solid var(--terracotta)'
                  : '2px solid transparent',
                transition:   'border-color 0.15s',
              }}
            >
              <Image
                src={img.thumbUrl || img.url}
                alt={img.alt}
                fill
                sizes="120px"
                style={{ objectFit: 'cover' }}
              />
              {/* Kapak rozeti */}
              {index === 0 && (
                <span style={{
                  position:      'absolute', top: 6, left: 6,
                  fontSize:       9, fontWeight: 500, letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background:    'var(--terracotta)', color: 'white',
                  padding:       '2px 7px', borderRadius: 'var(--radius-sm)',
                }}>
                  Kapak
                </span>
              )}
              {/* Sil */}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(index) }}
                  style={{
                    position:   'absolute', top: 6, right: 6,
                    width:      24, height: 24, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                    border:     'none', cursor: 'pointer',
                    color:      'white', fontSize: 12,
                    display:    'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s',
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(196,85,42,0.85)' }}
                  onMouseOut={(e)  => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.55)' }}
                  aria-label="Görseli kaldır"
                >
                  ✕
                </button>
              )}
              {/* Sıra numarası */}
              <span style={{
                position:   'absolute', bottom: 5, right: 7,
                fontSize:   10, color: 'rgba(255,255,255,0.7)',
              }}>
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Yükleme kuyruğu */}
      {queue.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {queue.map((item) => (
            <div
              key={item.id}
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          12,
                padding:      '10px 12px',
                background:   'var(--cream)',
                borderRadius: 'var(--radius-sm)',
                border:       `1px solid ${item.status === 'error' ? 'rgba(196,85,42,0.3)' : 'var(--sand-dark)'}`,
              }}
            >
              {/* Önizleme */}
              <div style={{
                width: 40, height: 40, borderRadius: 4, overflow: 'hidden', flexShrink: 0,
                position: 'relative',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Bilgi */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 12, fontWeight: 400, color: 'var(--obsidian)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  marginBottom: 5,
                }}>
                  {item.file.name}
                </p>

                {item.status === 'error' ? (
                  <p style={{ fontSize: 11, color: 'var(--terracotta)', fontWeight: 300 }}>
                    {item.error}
                  </p>
                ) : item.status === 'done' ? (
                  <p style={{ fontSize: 11, color: '#38a169', fontWeight: 300 }}>Yüklendi ✓</p>
                ) : (
                  <div style={{
                    height: 3, background: 'var(--sand-dark)',
                    borderRadius: 2, overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      background:  'var(--terracotta)',
                      width:       `${item.progress}%`,
                      transition:  'width 0.3s ease',
                    }} />
                  </div>
                )}
              </div>

              {/* Kaldır (hata veya tamamlanan) */}
              {(item.status === 'error' || item.status === 'done') && (
                <button
                  type="button"
                  onClick={() => removeQueued(item.id)}
                  style={{
                    background: 'none', border: 'none',
                    cursor: 'pointer', padding: 4,
                    color: 'var(--mist)', fontSize: 14, flexShrink: 0,
                  }}
                  aria-label="Listeden kaldır"
                >
                  ✕
                </button>
              )}

              {/* Progress yüzdesi */}
              {item.status === 'uploading' && (
                <span style={{ fontSize: 11, color: 'var(--mist)', flexShrink: 0 }}>
                  {item.progress}%
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
