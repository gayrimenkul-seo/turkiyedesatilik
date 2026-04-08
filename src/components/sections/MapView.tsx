'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { MapContainer, TileLayer, Marker, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'
import { MOCK_LISTINGS } from '@/lib/mock-listings'
import type { Listing, ListingType } from '@/types'

/* ─── Koordinatlar (slug → [lat, lng]) ──────────────────────────────── */
const COORDS: Record<string, [number, number]> = {
  'bodrum-satilik-deniz-manzarali-villa':       [37.1367, 27.2758],
  'kusadasi-satilik-sehir-manzarali-31-daire':  [37.8740, 27.2595],
  'cesme-kiralik-denize-sifir-21-daire':        [38.2811, 26.3748],
  'fethiye-satilik-havuzlu-villa':              [36.5497, 29.1219],
  'bodrum-satilik-merkezi-21-daire':            [37.0340, 27.4304],
  'antalya-satilik-ticari-alan':                [36.8654, 30.7561],
  'izmir-kiralik-modern-11-daire':              [38.4341, 27.1394],
  'marmaris-satilik-marine-manzarali-villa':    [36.8018, 28.2741],
  'alanya-satilik-deniz-manzarali-daire':       [36.5581, 31.9844],
  'didim-satilik-tarla':                        [37.3710, 27.2587],
  'kusadasi-kiralik-villa':                     [37.7561, 27.1892],
  'bodrum-satilik-luks-penthouse':              [37.0916, 27.3916],
}

/* ─── Gradient yardımcıları ──────────────────────────────────────────── */
const GRADIENTS: Record<string, string> = {
  VILLA:      'linear-gradient(135deg,#8B3A1A 0%,#5A2410 100%)',
  LAND:       'linear-gradient(135deg,#2A6F5E 0%,#174033 100%)',
  COMMERCIAL: 'linear-gradient(135deg,#4A3A1A 0%,#2A200E 100%)',
  APARTMENT:  'linear-gradient(135deg,#1B4F6B 0%,#0D2E40 100%)',
}
function getGradient(l: Listing) {
  if (l.listingType === 'RENT') return 'linear-gradient(135deg,#2A6F5E 0%,#174033 100%)'
  return GRADIENTS[l.propertyType] ?? GRADIENTS.APARTMENT
}

function formatPrice(price: number, currency: string) {
  const sym = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '₺'
  return `${sym}${new Intl.NumberFormat('tr-TR').format(price)}`
}

/* ─── Custom SVG pin icon ────────────────────────────────────────────── */
function createPinIcon(active: boolean) {
  const fill = active ? '#C4552A' : '#0F1010'
  const shadow = active
    ? '0 4px 16px rgba(196,85,42,0.45)'
    : '0 3px 10px rgba(0,0,0,0.35)'
  const svg = `<svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(${shadow})">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 10.627 16 28 16 28S32 26.627 32 16C32 7.163 24.837 0 16 0z" fill="${fill}"/>
    <circle cx="16" cy="16" r="7" fill="white" opacity="0.95"/>
    ${active ? `<circle cx="16" cy="16" r="3.5" fill="${fill}"/>` : ''}
  </svg>`
  return L.divIcon({
    html: svg,
    className: '',
    iconSize:   [32, 44],
    iconAnchor: [16, 44],
  })
}

/* ─── Harita olayları (dış tıklama → panel kapat) ───────────────────── */
function MapEvents({ onMapClick }: { onMapClick: () => void }) {
  useMapEvents({ click: onMapClick })
  return null
}

/* ─── Harita merkezi güncelleyici ────────────────────────────────────── */
function FlyTo({ coords }: { coords: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (coords) map.flyTo(coords, Math.max(map.getZoom(), 12), { duration: 0.8 })
  }, [coords, map])
  return null
}

/* ─── Ana Bileşen ────────────────────────────────────────────────────── */
export default function MapView() {
  const [filter, setFilter] = useState<ListingType | 'ALL'>('ALL')
  const [activeId, setActiveId]  = useState<string | null>(null)
  const [flyCoords, setFlyCoords] = useState<[number, number] | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const filtered = MOCK_LISTINGS.filter((l) => {
    if (!COORDS[l.slug]) return false
    if (filter === 'ALL') return true
    return l.listingType === filter
  })

  const activeListing = filtered.find((l) => l.id === activeId) ?? null

  const handlePinClick = useCallback((listing: Listing) => {
    setActiveId(listing.id)
    setFlyCoords(COORDS[listing.slug])
  }, [])

  const handleClose = useCallback(() => {
    setActiveId(null)
    setFlyCoords(null)
  }, [])

  // ESC tuşuyla kapat
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClose])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* ── Üst Yüzen Çubuk ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: 60,
          background: 'rgba(253,252,250,0.92)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          gap: 16,
        }}
      >
        {/* Sol: geri + logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <Link
            href="/ilanlar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--mist)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--obsidian)' }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--mist)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            İlanlar
          </Link>
          <div style={{ width: 1, height: 20, background: 'var(--sand-dark)' }} />
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--obsidian)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            TDS <span style={{ color: 'var(--terracotta)' }}>Harita</span>
          </Link>
        </div>

        {/* Orta: filtre toggle */}
        <div
          style={{
            display: 'flex',
            background: 'var(--sand)',
            borderRadius: 'var(--radius-sm)',
            padding: 3,
            gap: 2,
          }}
        >
          {([
            { value: 'ALL',  label: 'Tümü' },
            { value: 'SALE', label: 'Satılık' },
            { value: 'RENT', label: 'Kiralık' },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setFilter(opt.value); handleClose() }}
              style={{
                padding: '6px 18px',
                fontSize: 11,
                fontWeight: filter === opt.value ? 500 : 300,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all 0.18s',
                background: filter === opt.value ? 'var(--obsidian)' : 'transparent',
                color: filter === opt.value ? 'var(--cream)' : 'var(--mist)',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sağ: sayac */}
        <div
          style={{
            flexShrink: 0,
            fontSize: 12,
            color: 'var(--mist)',
            fontWeight: 300,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: 'var(--obsidian)', fontWeight: 500 }}>{filtered.length}</span> ilan
        </div>
      </div>

      {/* ── Leaflet Harita ── */}
      <MapContainer
        center={[37.5, 27.5]}
        zoom={8}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />

        <ZoomControl position="bottomright" />
        <FlyTo coords={flyCoords} />
        <MapEvents onMapClick={handleClose} />

        {filtered.map((listing) => {
          const coords = COORDS[listing.slug]
          if (!coords) return null
          const isActive = listing.id === activeId
          return (
            <Marker
              key={listing.id}
              position={coords}
              icon={createPinIcon(isActive)}
              zIndexOffset={isActive ? 1000 : 0}
              eventHandlers={{
                click: (e) => {
                  e.originalEvent.stopPropagation()
                  handlePinClick(listing)
                },
              }}
            />
          )
        })}
      </MapContainer>

      {/* ── Sağ Ilan Paneli ── */}
      <div
        ref={panelRef}
        style={{
          position: 'absolute',
          top: 60,
          right: 0,
          bottom: 0,
          width: 360,
          zIndex: 999,
          background: 'var(--cream)',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.1)',
          transform: activeListing ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {activeListing && <ListingPanel listing={activeListing} onClose={handleClose} />}
      </div>

      {/* Overlay kapat alanı (mobil) */}
      {activeListing && (
        <div
          onClick={handleClose}
          style={{
            display: 'none',
            position: 'absolute',
            inset: 0,
            zIndex: 998,
          }}
          className="md:hidden"
        />
      )}
    </div>
  )
}

/* ─── Ilan Paneli ────────────────────────────────────────────────────── */
function ListingPanel({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const gradient = getGradient(listing)
  const typeLabel = listing.listingType === 'SALE' ? 'Satılık' : 'Kiralık'
  const typeColor = listing.listingType === 'RENT' ? 'var(--aegean)' : 'var(--terracotta)'

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Görsel */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          background: gradient,
          flexShrink: 0,
        }}
      >
        {/* Kapat */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(196,85,42,0.75)' }}
          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.45)' }}
        >
          ✕
        </button>

        {/* Badge */}
        <span
          style={{
            position: 'absolute',
            bottom: 14,
            left: 14,
            padding: '4px 11px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'var(--cream)',
            color: typeColor,
          }}
        >
          {typeLabel}
        </span>

        {/* Fotoğraf yok göstergesi */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      </div>

      {/* İçerik */}
      <div style={{ padding: '24px 24px 0', flex: 1 }}>
        {/* Fiyat */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 30,
            fontWeight: 300,
            color: 'var(--obsidian)',
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {formatPrice(listing.price, listing.currency)}
          {listing.listingType === 'RENT' && (
            <span style={{ fontSize: 14, color: 'var(--mist)', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              {' '}/ay
            </span>
          )}
        </div>

        {/* Başlık */}
        <div
          style={{
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--slate)',
            lineHeight: 1.45,
            marginBottom: 10,
            marginTop: 8,
          }}
        >
          {listing.title}
        </div>

        {/* Konum */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: 'var(--mist)',
            marginBottom: 20,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: 'var(--terracotta)',
              flexShrink: 0,
              display: 'inline-block',
            }}
          />
          {listing.neighborhood && `${listing.neighborhood}, `}
          {listing.district} · {listing.city}
        </div>

        {/* Meta */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            paddingTop: 16,
            paddingBottom: 16,
            borderTop: '1px solid var(--sand-dark)',
            borderBottom: '1px solid var(--sand-dark)',
            marginBottom: 20,
          }}
        >
          {listing.rooms && (
            <MetaChip icon="rooms" label={listing.rooms} />
          )}
          <MetaChip icon="area" label={`${listing.sqm} m²`} />
          {listing.bathrooms && (
            <MetaChip icon="bath" label={`${listing.bathrooms} banyo`} />
          )}
        </div>

        {/* Özellik etiketleri */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {listing.viewType && listing.viewType !== 'NONE' && (
            <Tag label={
              listing.viewType === 'SEA' ? 'Deniz Manzarası' :
              listing.viewType === 'CITY' ? 'Şehir Manzarası' :
              listing.viewType === 'NATURE' ? 'Doğa Manzarası' : listing.viewType
            } />
          )}
          {listing.hasPool && <Tag label="Havuz" />}
          {listing.hasGarage && <Tag label="Garaj" />}
          {listing.hasGarden && <Tag label="Bahçe" />}
          {listing.isFurnished && <Tag label="Mobilyalı" />}
        </div>

        {/* Ofis */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 14px',
            background: 'var(--sand)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--aegean)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              color: 'var(--cream)',
              flexShrink: 0,
            }}
          >
            {listing.agent.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 400, color: 'var(--obsidian)' }}>
              {listing.agent.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--mist)', fontWeight: 300 }}>
              {listing.office.name}
              {listing.office.isVerified && (
                <span style={{ color: 'var(--gold)', marginLeft: 4 }}>✓ Doğrulanmış</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link
          href={`/ilanlar/${listing.slug}`}
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '13px',
            background: 'var(--terracotta)',
            color: 'white',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = '#a83d1e' }}
          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--terracotta)' }}
        >
          İlanı İncele →
        </Link>
        <a
          href={`https://wa.me/${listing.agent.phone.replace(/[\s+]/g, '')}?text=${encodeURIComponent(`"${listing.title}" hakkında bilgi almak istiyorum.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '11px',
            background: '#25D366',
            color: 'white',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = '#1ea855' }}
          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = '#25D366' }}
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}

/* ─── Küçük yardımcı bileşenler ──────────────────────────────────────── */
function MetaChip({ icon, label }: { icon: string; label: string }) {
  const icons: Record<string, React.ReactElement> = {
    rooms: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    area: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
    bath: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="1.5">
        <path d="M3 22v-7h18v7M3 15h18M15 15V3H9v12" />
      </svg>
    ),
  }
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        padding: '10px 4px',
      }}
    >
      {icons[icon]}
      <span style={{ fontSize: 12, color: 'var(--obsidian)', fontWeight: 400 }}>{label}</span>
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        padding: '4px 10px',
        background: 'var(--sand)',
        border: '1px solid var(--sand-dark)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 11,
        color: 'var(--mist)',
        fontWeight: 300,
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </span>
  )
}
