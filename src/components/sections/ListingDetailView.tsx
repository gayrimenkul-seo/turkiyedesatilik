'use client'
import { useState } from 'react'
import Link from 'next/link'
import ListingCard from '@/components/ui/ListingCard'
import type { Listing, ViewType } from '@/types'

/* ─── Helpers ────────────────────────────────────────────────────────── */
function formatPrice(price: number, currency: string) {
  const sym = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '₺'
  return `${sym}${new Intl.NumberFormat('tr-TR').format(price)}`
}

function propertyTypeLabel(t: string) {
  const map: Record<string, string> = {
    APARTMENT: 'Daire', VILLA: 'Villa', LAND: 'Arsa', COMMERCIAL: 'Ticari',
  }
  return map[t] ?? t
}

function viewTypeLabel(v?: ViewType) {
  if (!v) return null
  const map: Record<ViewType, string> = {
    SEA: 'Deniz', CITY: 'Şehir', NATURE: 'Doğa',
    LAKE: 'Göl', MOUNTAIN: 'Dağ', NONE: '—',
  }
  return map[v]
}

/* Gradient paleti: 5 "fotoğraf" için farklı tonlar */
const PHOTO_GRADIENTS = [
  'linear-gradient(155deg, #1B4F6B 0%, #0D2E40 100%)',
  'linear-gradient(155deg, #8B3A1A 0%, #5A2410 100%)',
  'linear-gradient(155deg, #2A4A5C 0%, #142530 100%)',
  'linear-gradient(155deg, #3A2A1A 0%, #201510 100%)',
  'linear-gradient(155deg, #1A3A3A 0%, #0D1F1F 100%)',
]

const VILLA_GRADIENTS = [
  'linear-gradient(155deg, #8B3A1A 0%, #5A2410 100%)',
  'linear-gradient(155deg, #7A2810 0%, #4A180A 100%)',
  'linear-gradient(155deg, #9B4A2A 0%, #6A2A14 100%)',
  'linear-gradient(155deg, #6A2A10 0%, #3A1206 100%)',
  'linear-gradient(155deg, #5A2010 0%, #300E05 100%)',
]

const LAND_GRADIENTS = [
  'linear-gradient(155deg, #2A6F5E 0%, #174033 100%)',
  'linear-gradient(155deg, #1E5A4A 0%, #0F2E26 100%)',
  'linear-gradient(155deg, #346E5A 0%, #1C3A30 100%)',
  'linear-gradient(155deg, #1A4A3C 0%, #0A2420 100%)',
  'linear-gradient(155deg, #285E4E 0%, #142E28 100%)',
]

function getGradients(propertyType: string, listingType: string): string[] {
  if (propertyType === 'VILLA') return VILLA_GRADIENTS
  if (propertyType === 'LAND') return LAND_GRADIENTS
  if (listingType === 'RENT') return LAND_GRADIENTS
  return PHOTO_GRADIENTS
}

/* ─── Props ──────────────────────────────────────────────────────────── */
interface Props {
  listing: Listing
  similar: Listing[]
}

/* ─── Component ──────────────────────────────────────────────────────── */
export default function ListingDetailView({ listing, similar }: Props) {
  const [activePhoto, setActivePhoto] = useState(0)
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const gradients = getGradients(listing.propertyType, listing.listingType)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1200)
  }

  const whatsappText = encodeURIComponent(
    `Merhaba, "${listing.title}" ilanıyla ilgileniyorum. Bilgi alabilir miyim? turkiyedesatilik.com/ilanlar/${listing.slug}`
  )

  return (
    <div style={{ background: 'var(--sand)', minHeight: '100vh' }}>

      {/* ── Üst Başlık Şeridi ── */}
      <div style={{ background: 'var(--obsidian)', padding: '72px 48px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            {[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'İlanlar', href: '/ilanlar' },
              { label: listing.district, href: `/ilanlar?city=${listing.city}` },
            ].map((crumb, i, arr) => (
              <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href={crumb.href}
                      style={{
                        fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                      }}
                    >
                      {crumb.label}
                    </Link>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>/</span>
                  </>
                ) : (
                  <span style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Başlık + badges */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Badge
                  label={listing.listingType === 'SALE' ? 'Satılık' : listing.listingType === 'RENT' ? 'Kiralık' : 'Projeden'}
                  color={listing.listingType === 'RENT' ? 'var(--aegean)' : 'var(--terracotta)'}
                />
                <Badge label={propertyTypeLabel(listing.propertyType)} color="var(--mist)" />
                {listing.office.isVerified && (
                  <Badge label="Doğrulanmış Ofis" color="var(--gold)" icon="check" />
                )}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 300,
                  color: 'var(--cream)',
                  lineHeight: 1.15,
                  marginBottom: 12,
                }}
              >
                {listing.title}
              </h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--terracotta)', display: 'inline-block', flexShrink: 0 }} />
                {listing.neighborhood && `${listing.neighborhood}, `}
                {listing.district} · {listing.city}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3vw, 42px)',
                  fontWeight: 300,
                  color: 'var(--cream)',
                  lineHeight: 1,
                }}
              >
                {formatPrice(listing.price, listing.currency)}
              </div>
              {listing.listingType === 'RENT' && (
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>/ay</span>
              )}
              {listing.pricePerSqm && (
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                  {formatPrice(listing.pricePerSqm, listing.currency)}/m²
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Ana İçerik ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-10">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'flex-start' }}
          className="lg:grid-cols-[1fr_380px] grid-cols-1"
        >

          {/* SOL KOLON */}
          <div style={{ minWidth: 0 }}>

            {/* ── Galeri ── */}
            <div style={{ marginBottom: 40 }}>
              {/* Ana Görsel */}
              <div
                style={{
                  aspectRatio: '16/9',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  background: gradients[activePhoto],
                  position: 'relative',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Fotoğraf {activePhoto + 1} / {gradients.length}
                  </span>
                </div>

                {/* Foto sayacı badge */}
                <div
                  style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    fontSize: 11,
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-sm)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {activePhoto + 1} / {gradients.length}
                </div>

                {/* Ok butonları */}
                {activePhoto > 0 && (
                  <button
                    onClick={() => setActivePhoto((p) => p - 1)}
                    style={arrowBtnStyle('left')}
                    aria-label="Önceki"
                  >
                    ←
                  </button>
                )}
                {activePhoto < gradients.length - 1 && (
                  <button
                    onClick={() => setActivePhoto((p) => p + 1)}
                    style={arrowBtnStyle('right')}
                    aria-label="Sonraki"
                  >
                    →
                  </button>
                )}
              </div>

              {/* Thumbnail Şeridi */}
              <div style={{ display: 'flex', gap: 8 }}>
                {gradients.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    style={{
                      flex: 1,
                      aspectRatio: '4/3',
                      background: g,
                      borderRadius: 'var(--radius-sm)',
                      border: '2px solid',
                      borderColor: activePhoto === i ? 'var(--terracotta)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s, opacity 0.2s',
                      opacity: activePhoto === i ? 1 : 0.55,
                      overflow: 'hidden',
                    }}
                    aria-label={`Fotoğraf ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── Özellikler Izgara ── */}
            <div
              style={{
                background: 'var(--cream)',
                borderRadius: 'var(--radius)',
                padding: '28px 32px',
                marginBottom: 28,
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  fontWeight: 400,
                  color: 'var(--obsidian)',
                  marginBottom: 24,
                }}
              >
                Mülk Detayları
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                  gap: '20px 16px',
                }}
              >
                {listing.rooms && (
                  <DetailItem icon="rooms" label="Oda Sayısı" value={listing.rooms} />
                )}
                <DetailItem icon="area" label="Kullanım Alanı" value={`${listing.sqm} m²`} />
                {listing.bathrooms && (
                  <DetailItem icon="bath" label="Banyo" value={`${listing.bathrooms} adet`} />
                )}
                {listing.buildingFloor !== undefined && listing.floors && (
                  <DetailItem
                    icon="floor"
                    label="Bulunduğu Kat"
                    value={listing.buildingFloor === 0 ? 'Zemin' : `${listing.buildingFloor}. kat / ${listing.floors}`}
                  />
                )}
                {listing.age !== undefined && (
                  <DetailItem
                    icon="age"
                    label="Bina Yaşı"
                    value={listing.age === 0 ? 'Sıfır' : `${listing.age} yıl`}
                  />
                )}
                {listing.viewType && listing.viewType !== 'NONE' && (
                  <DetailItem icon="view" label="Manzara" value={viewTypeLabel(listing.viewType) ?? '—'} />
                )}
                {listing.hasPool && (
                  <DetailItem icon="pool" label="Havuz" value="Mevcut" />
                )}
                {listing.hasGarage && (
                  <DetailItem icon="garage" label="Garaj / Otopark" value="Mevcut" />
                )}
                {listing.hasGarden && (
                  <DetailItem icon="garden" label="Bahçe" value="Mevcut" />
                )}
                {listing.isFurnished !== undefined && (
                  <DetailItem
                    icon="furniture"
                    label="Eşya Durumu"
                    value={listing.isFurnished ? 'Mobilyalı' : 'Boş'}
                  />
                )}
              </div>
            </div>

            {/* ── Açıklama ── */}
            {listing.description && (
              <div
                style={{
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius)',
                  padding: '28px 32px',
                  marginBottom: 28,
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 400,
                    color: 'var(--obsidian)',
                    marginBottom: 18,
                  }}
                >
                  Açıklama
                </h2>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: 'var(--slate)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {listing.description}
                </div>
              </div>
            )}

            {/* ── Benzer İlanlar ── */}
            {similar.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 24 }}>
                  <span className="section-label">Aynı Bölgeden</span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(24px,2.5vw,34px)',
                      fontWeight: 300,
                      color: 'var(--obsidian)',
                      lineHeight: 1.15,
                    }}
                  >
                    Benzer İlanlar
                  </h2>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: 24,
                  }}
                >
                  {similar.map((l) => <ListingCard key={l.id} listing={l} />)}
                </div>
              </div>
            )}
          </div>

          {/* SAĞ KOLON — Sticky Sidebar */}
          <div
            style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 20 }}
            className="hidden lg:flex"
          >
            {/* Fiyat Kartı */}
            <div
              style={{
                background: 'var(--obsidian)',
                borderRadius: 'var(--radius)',
                padding: '28px',
                color: 'var(--cream)',
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                {listing.listingType === 'SALE' ? 'Satış Fiyatı' : 'Aylık Kira'}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 36,
                  fontWeight: 300,
                  lineHeight: 1,
                  color: 'var(--cream)',
                  marginBottom: 4,
                }}
              >
                {formatPrice(listing.price, listing.currency)}
              </div>
              {listing.listingType === 'RENT' && (
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/ay</span>
              )}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  gap: 24,
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                {listing.rooms && <span>{listing.rooms} oda</span>}
                <span>{listing.sqm} m²</span>
                {listing.bathrooms && <span>{listing.bathrooms} banyo</span>}
              </div>
            </div>

            {/* Emlakçı Kartı */}
            <div
              style={{
                background: 'var(--cream)',
                borderRadius: 'var(--radius)',
                padding: '24px 28px',
                border: '1px solid var(--sand-dark)',
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: 16 }}>
                Emlakçı
              </div>

              {/* Agent */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--aegean)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    color: 'var(--cream)',
                    fontWeight: 300,
                    flexShrink: 0,
                  }}
                >
                  {listing.agent.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--obsidian)', marginBottom: 2 }}>
                    {listing.agent.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--mist)' }}>
                    {listing.office.isVerified && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    )}
                    {listing.office.name}
                  </div>
                </div>
              </div>

              {/* Butonlar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={`tel:${listing.agent.phone.replace(/\s/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    padding: '11px 16px',
                    background: 'var(--obsidian)',
                    color: 'var(--cream)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--terracotta)' }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--obsidian)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                  </svg>
                  Hemen Ara
                </a>
                <a
                  href={`https://wa.me/${listing.agent.phone.replace(/[\s+]/g, '')}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    padding: '11px 16px',
                    background: '#25D366',
                    color: 'white',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = '#1ea855' }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = '#25D366' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`mailto:${listing.agent.email}?subject=${encodeURIComponent(`"${listing.title}" hakkında bilgi`)}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 9,
                    padding: '10px 16px',
                    background: 'transparent',
                    color: 'var(--obsidian)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--sand-dark)',
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--obsidian)'
                  }}
                  onMouseOut={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--sand-dark)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  E-posta Gönder
                </a>
              </div>
            </div>

            {/* İletişim Formu */}
            <div
              style={{
                background: 'var(--cream)',
                borderRadius: 'var(--radius)',
                padding: '24px 28px',
                border: '1px solid var(--sand-dark)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 400,
                  color: 'var(--obsidian)',
                  marginBottom: 4,
                }}
              >
                Bilgi Talep Et
              </h3>
              <p style={{ fontSize: 12, color: 'var(--mist)', fontWeight: 300, marginBottom: 20 }}>
                Emlakçı size en kısa sürede dönüş yapacak.
              </p>

              {submitted ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '28px 16px',
                    background: 'var(--sand)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>✓</div>
                  <p style={{ fontSize: 14, fontWeight: 400, color: 'var(--obsidian)', marginBottom: 4 }}>
                    Talebiniz iletildi!
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--mist)', fontWeight: 300 }}>
                    Emlakçı en kısa sürede sizi arayacak.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <FormField
                    label="Adınız"
                    type="text"
                    value={formState.name}
                    onChange={(v) => setFormState((s) => ({ ...s, name: v }))}
                    required
                    placeholder="Ad Soyad"
                  />
                  <FormField
                    label="E-posta"
                    type="email"
                    value={formState.email}
                    onChange={(v) => setFormState((s) => ({ ...s, email: v }))}
                    required
                    placeholder="ornek@email.com"
                  />
                  <FormField
                    label="Telefon"
                    type="tel"
                    value={formState.phone}
                    onChange={(v) => setFormState((s) => ({ ...s, phone: v }))}
                    placeholder="+90 5__ ___ __ __"
                  />
                  <div>
                    <label style={labelStyle}>Mesajınız</label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      rows={3}
                      placeholder={`"${listing.title}" hakkında bilgi almak istiyorum.`}
                      style={{ ...fieldStyle, resize: 'none', height: 80 }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      padding: '12px',
                      background: submitting ? 'var(--mist)' : 'var(--terracotta)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    {submitting ? 'Gönderiliyor…' : 'Talep Gönder'}
                  </button>
                  <p style={{ fontSize: 10, color: 'var(--mist)', textAlign: 'center', lineHeight: 1.5 }}>
                    Bilgileriniz yalnızca emlakçıyla paylaşılır. KVKK kapsamında korunur.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Alt Bileşenler ─────────────────────────────────────────────────── */
function Badge({ label, color, icon }: { label: string; color: string; icon?: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 12px',
        borderRadius: 'var(--radius-sm)',
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        background: 'rgba(255,255,255,0.08)',
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {icon === 'check' && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {label}
    </span>
  )
}

const DETAIL_ICONS: Record<string, React.ReactElement> = {
  rooms: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  area: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  ),
  bath: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <path d="M3 22v-7h18v7M3 15h18M15 15V3H9v12" />
    </svg>
  ),
  floor: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="4" rx="1" />
      <rect x="2" y="10" width="20" height="4" rx="1" />
      <rect x="2" y="17" width="20" height="4" rx="1" />
    </svg>
  ),
  age: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  view: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  pool: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <path d="M2 12h20M2 17c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1" />
      <circle cx="7" cy="8" r="2" />
      <path d="M11 8l2 4" />
    </svg>
  ),
  garage: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="1" />
      <path d="M2 11h20M8 21V11M16 21V11" />
      <path d="M12 3l8 4H4l8-4z" />
    </svg>
  ),
  garden: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <path d="M12 22V12M12 12C12 7 7 3 3 3c0 4 3 8 9 9M12 12c0-5 5-9 9-9 0 4-3 8-9 9" />
    </svg>
  ),
  furniture: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
      <path d="M20 9V7a2 2 0 00-2-2H6a2 2 0 00-2 2v2" />
      <path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v1H6v-1a2 2 0 00-4 0z" />
      <line x1="6" y1="18" x2="6" y2="21" />
      <line x1="18" y1="18" x2="18" y2="21" />
    </svg>
  ),
}

function DetailItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '14px 16px',
        background: 'var(--sand)',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <div style={{ flexShrink: 0, marginTop: 1 }}>
        {DETAIL_ICONS[icon] ?? null}
      </div>
      <div>
        <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: 14, fontWeight: 400, color: 'var(--obsidian)' }}>
          {value}
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--mist)',
  marginBottom: 6,
  fontWeight: 500,
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: 13,
  fontWeight: 300,
  border: '1px solid var(--sand-dark)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--sand)',
  color: 'var(--obsidian)',
  outline: 'none',
  fontFamily: 'var(--font-body)',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
}

function FormField({
  label, type, value, onChange, required, placeholder,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label style={labelStyle}>{label}{required && <span style={{ color: 'var(--terracotta)' }}>*</span>}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        style={fieldStyle}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--obsidian)' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--sand-dark)' }}
      />
    </div>
  )
}

function arrowBtnStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 16,
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  }
}
