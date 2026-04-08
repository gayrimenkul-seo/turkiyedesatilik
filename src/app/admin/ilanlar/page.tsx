'use client'
import { useState } from 'react'
import { MOCK_LISTINGS } from '@/lib/mock-listings'
import type { Listing } from '@/types'

/* ─── Renkler ────────────────────────────────────────────────────────── */
const C = {
  card:   '#1C1E1F',
  border: 'rgba(255,255,255,0.06)',
  text:   '#FDFCFA',
  muted:  'rgba(255,255,255,0.4)',
  dim:    'rgba(255,255,255,0.12)',
  active: '#C4552A',
  green:  '#38A169',
  red:    '#E53E3E',
}

type ListingStatus = 'ACTIVE' | 'PASSIVE' | 'SOLD' | 'RENTED' | 'DRAFT'

function formatPrice(p: number) {
  return '₺' + new Intl.NumberFormat('tr-TR').format(p)
}
function formatDate(d: Date) {
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const PROP_LABEL: Record<string, string> = {
  APARTMENT: 'Daire', VILLA: 'Villa', LAND: 'Arsa', COMMERCIAL: 'Ticari',
}

export default function AdminIlanlar() {
  const [listings, setListings] = useState<Listing[]>(
    [...MOCK_LISTINGS].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  )
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<ListingStatus | 'ALL'>('ALL')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  function toggleStatus(id: string) {
    setListings((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l
        const next: ListingStatus = l.status === 'ACTIVE' ? 'PASSIVE' : 'ACTIVE'
        return { ...l, status: next }
      })
    )
  }

  function deleteListing(id: string) {
    setListings((prev) => prev.filter((l) => l.id !== id))
    setDeleteConfirm(null)
  }

  const filtered = listings.filter((l) => {
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.district.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'ALL' || l.status === filterStatus
    return matchSearch && matchStatus
  })

  const statusCounts = {
    ALL:     listings.length,
    ACTIVE:  listings.filter((l) => l.status === 'ACTIVE').length,
    PASSIVE: listings.filter((l) => l.status === 'PASSIVE').length,
  }

  return (
    <div style={{ padding: '32px 36px', color: C.text }}>

      {/* Üst bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: C.text, marginBottom: 4 }}>
            İlan Yönetimi
          </h1>
          <p style={{ fontSize: 13, color: C.muted, fontWeight: 300 }}>
            Toplam <strong style={{ color: C.text }}>{listings.length}</strong> ilan
          </p>
        </div>
        <button
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '9px 20px', background: C.active, color: C.text,
            border: 'none', borderRadius: 4, fontSize: 12, fontWeight: 500,
            letterSpacing: '0.07em', textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni İlan Ekle
        </button>
      </div>

      {/* Filtre + Arama */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {/* Durum tabs */}
        <div style={{ display: 'flex', background: '#141516', borderRadius: 5, padding: 3, gap: 2, border: `1px solid ${C.border}` }}>
          {([
            { value: 'ALL',     label: `Tümü (${statusCounts.ALL})` },
            { value: 'ACTIVE',  label: `Aktif (${statusCounts.ACTIVE})` },
            { value: 'PASSIVE', label: `Pasif (${statusCounts.PASSIVE})` },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              style={{
                padding: '6px 14px', fontSize: 11, fontWeight: filterStatus === opt.value ? 500 : 300,
                border: 'none', borderRadius: 3, cursor: 'pointer', transition: 'all 0.15s',
                background: filterStatus === opt.value ? C.card : 'transparent',
                color: filterStatus === opt.value ? C.text : C.muted,
                letterSpacing: '0.04em',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Arama */}
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5"
            style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="İlan ara…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px 8px 34px',
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 4, color: C.text, fontSize: 13, fontWeight: 300,
              outline: 'none', fontFamily: 'var(--font-body)', boxSizing: 'border-box',
            }}
          />
        </div>

        <span style={{ fontSize: 12, color: C.muted, marginLeft: 'auto' }}>
          {filtered.length} sonuç
        </span>
      </div>

      {/* Tablo */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {['Başlık', 'Şehir / İlçe', 'Tür', 'Fiyat', 'Durum', 'Ofis', 'Tarih', 'İşlemler'].map((h) => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '48px 20px', textAlign: 'center', color: C.muted, fontSize: 13 }}>
                  Eşleşen ilan bulunamadı.
                </td>
              </tr>
            ) : (
              filtered.map((l, i) => (
                <tr
                  key={l.id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none',
                    opacity: l.status === 'PASSIVE' ? 0.55 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {/* Başlık */}
                  <td style={{ padding: '13px 16px', maxWidth: 200 }}>
                    <div style={{ fontSize: 13, color: C.text, fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {l.title}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2, fontFamily: 'monospace' }}>
                      #{l.id} · {l.listingType === 'SALE' ? 'Satılık' : 'Kiralık'}
                    </div>
                  </td>
                  {/* Şehir */}
                  <td style={{ padding: '13px 16px', fontSize: 12, color: C.muted, whiteSpace: 'nowrap' }}>
                    {l.city}<br />
                    <span style={{ fontSize: 11, color: C.dim }}>{l.district}</span>
                  </td>
                  {/* Tür */}
                  <td style={{ padding: '13px 16px', fontSize: 12, color: C.muted, whiteSpace: 'nowrap' }}>
                    {PROP_LABEL[l.propertyType] ?? l.propertyType}
                  </td>
                  {/* Fiyat */}
                  <td style={{ padding: '13px 16px', fontSize: 12, color: C.text, whiteSpace: 'nowrap' }}>
                    {formatPrice(l.price)}
                  </td>
                  {/* Durum */}
                  <td style={{ padding: '13px 16px' }}>
                    <ListingStatusBadge status={l.status} />
                  </td>
                  {/* Ofis */}
                  <td style={{ padding: '13px 16px', fontSize: 11, color: C.muted, maxWidth: 120 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {l.office.name}
                    </div>
                  </td>
                  {/* Tarih */}
                  <td style={{ padding: '13px 16px', fontSize: 11, color: C.muted, whiteSpace: 'nowrap' }}>
                    {formatDate(l.createdAt)}
                  </td>
                  {/* İşlemler */}
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {/* Durum toggle */}
                      <ActionBtn
                        title={l.status === 'ACTIVE' ? 'Pasife Al' : 'Aktife Al'}
                        color={l.status === 'ACTIVE' ? '#F6AD55' : C.green}
                        onClick={() => toggleStatus(l.id)}
                        icon={
                          l.status === 'ACTIVE'
                            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                            : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                        }
                      />
                      {/* Sil */}
                      {deleteConfirm === l.id ? (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <ActionBtn title="Evet, sil" color={C.red} onClick={() => deleteListing(l.id)}
                            icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                          />
                          <ActionBtn title="İptal" color={C.muted} onClick={() => setDeleteConfirm(null)}
                            icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
                          />
                        </div>
                      ) : (
                        <ActionBtn title="Sil" color={C.red} onClick={() => setDeleteConfirm(l.id)}
                          icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Alt not */}
      <p style={{ fontSize: 11, color: C.dim, marginTop: 16, textAlign: 'center' }}>
        Silme işlemi yalnızca bu oturumda geçerlidir · Gerçek veritabanı bağlantısı yapılmamıştır
      </p>
    </div>
  )
}

/* ─── Alt bileşenler ─────────────────────────────────────────────────── */
function ListingStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    ACTIVE:  { label: 'Aktif',   color: '#68D391', bg: 'rgba(104,211,145,0.1)' },
    PASSIVE: { label: 'Pasif',   color: '#FC8181', bg: 'rgba(252,129,129,0.1)' },
    SOLD:    { label: 'Satıldı', color: '#F6E05E', bg: 'rgba(246,224,94,0.1)' },
    RENTED:  { label: 'Kiralandı',color: '#90CDF4', bg: 'rgba(144,205,244,0.1)' },
    DRAFT:   { label: 'Taslak',  color: '#CBD5E0', bg: 'rgba(203,213,224,0.08)' },
  }
  const s = map[status] ?? map.DRAFT
  return (
    <span style={{ fontSize: 10, letterSpacing: '0.07em', padding: '3px 9px', borderRadius: 3, background: s.bg, color: s.color, fontWeight: 500, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  )
}

function ActionBtn({
  title, color, onClick, icon,
}: {
  title: string
  color: string
  onClick: () => void
  icon: React.ReactNode
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: 28, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${color}14`, border: `1px solid ${color}30`,
        borderRadius: 4, color, cursor: 'pointer', transition: 'background 0.15s',
        flexShrink: 0,
      }}
      onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = `${color}28` }}
      onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = `${color}14` }}
    >
      {icon}
    </button>
  )
}
