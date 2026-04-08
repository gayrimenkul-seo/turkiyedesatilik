'use client'
import Link from 'next/link'
import { MOCK_LISTINGS } from '@/lib/mock-listings'
import { MOCK_OFFICES } from '@/lib/mock-offices'

/* ─── Renk sabitleri ─────────────────────────────────────────────────── */
const C = {
  card:    '#1C1E1F',
  border:  'rgba(255,255,255,0.06)',
  text:    '#FDFCFA',
  muted:   'rgba(255,255,255,0.4)',
  dim:     'rgba(255,255,255,0.15)',
  active:  '#C4552A',
  gold:    '#B8923A',
  green:   '#38A169',
  blue:    '#2B6CB0',
}

/* ─── Mock lead verisi ───────────────────────────────────────────────── */
const MOCK_LEADS = [
  { id: 'l1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com', listing: 'Deniz Manzaralı Lüks Villa', city: 'Bodrum', date: '2026-04-06', status: 'NEW' },
  { id: 'l2', name: 'Maria Schmidt', email: 'maria@example.de', listing: 'Havuzlu Deniz Manzaralı Villa', city: 'Fethiye', date: '2026-04-05', status: 'CONTACTED' },
  { id: 'l3', name: 'Jean Dupont', email: 'jean@example.fr', listing: 'Şehir Manzaralı 3+1 Daire', city: 'Kuşadası', date: '2026-04-04', status: 'NEW' },
  { id: 'l4', name: 'Erik Johansson', email: 'erik@example.se', listing: 'Marine Manzaralı Özel Villa', city: 'Marmaris', date: '2026-04-03', status: 'CLOSED' },
  { id: 'l5', name: 'Fatma Öztürk', email: 'fatma@example.com', listing: 'Lüks Penthouse Daire', city: 'Bodrum', date: '2026-04-02', status: 'CONTACTED' },
]

const STAT_CARDS = [
  {
    label: 'Toplam İlan',
    value: MOCK_LISTINGS.length,
    change: '+3 bu ay',
    positive: true,
    color: C.blue,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Aktif Ofis',
    value: MOCK_OFFICES.length,
    change: '+1 bu ay',
    positive: true,
    color: C.green,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
  {
    label: 'Toplam Lead',
    value: 47,
    change: '+12 bu ay',
    positive: true,
    color: C.active,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: 'Kayıtlı Kullanıcı',
    value: 124,
    change: '+8 bu ay',
    positive: true,
    color: C.gold,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

const LEAD_STATUS: Record<string, { label: string; color: string; bg: string }> = {
  NEW:       { label: 'Yeni',     color: '#63B3ED', bg: 'rgba(99,179,237,0.1)' },
  CONTACTED: { label: 'İletişim', color: '#F6E05E', bg: 'rgba(246,224,94,0.1)' },
  CLOSED:    { label: 'Kapandı',  color: '#68D391', bg: 'rgba(104,211,145,0.1)' },
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
}
function formatPrice(p: number) {
  return '₺' + new Intl.NumberFormat('tr-TR').format(p)
}

export default function AdminDashboard() {
  const recentListings = [...MOCK_LISTINGS]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)

  return (
    <div style={{ padding: '32px 36px', color: C.text }}>

      {/* Üst bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: C.text, marginBottom: 4 }}>
            Dashboard
          </h1>
          <p style={{ fontSize: 13, color: C.muted, fontWeight: 300 }}>
            Son güncelleme: {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <Link
          href="/admin/ilanlar"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '9px 20px', background: C.active, color: C.text,
            borderRadius: 4, fontSize: 12, fontWeight: 500,
            letterSpacing: '0.07em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Yeni İlan
        </Link>
      </div>

      {/* ── İstatistik Kartları ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        {STAT_CARDS.map((s) => (
          <div
            key={s.label}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              padding: '20px 22px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, fontWeight: 400 }}>
                {s.label}
              </span>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: `${s.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.color,
              }}>
                {s.icon}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 300, color: C.text, lineHeight: 1, marginBottom: 8 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: s.positive ? C.green : '#FC8181', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {s.positive
                  ? <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>
                  : <><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>
                }
              </svg>
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* ── Alt bölüm: son ilanlar + son leadler ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Son İlanlar */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Son Eklenen İlanlar</h2>
            <Link href="/admin/ilanlar" style={{ fontSize: 11, color: C.active, textDecoration: 'none', letterSpacing: '0.05em' }}>
              Tümünü Gör →
            </Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {['Başlık', 'Şehir', 'Fiyat', 'Durum'].map((h) => (
                  <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentListings.map((l, i) => (
                <tr
                  key={l.id}
                  style={{
                    borderBottom: i < recentListings.length - 1 ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <td style={{ padding: '12px 20px', fontSize: 12, color: C.text, fontWeight: 300, maxWidth: 160 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {l.title}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                      {formatDate(l.createdAt.toISOString())}
                    </div>
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: 12, color: C.muted }}>
                    {l.district}
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: 12, color: C.text, whiteSpace: 'nowrap' }}>
                    {formatPrice(l.price)}
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <StatusBadge status={l.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Son Leadler */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Son Gelen Leadler</h2>
            <span style={{ fontSize: 11, color: C.muted, letterSpacing: '0.05em' }}>
              Son 7 gün
            </span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {['Kişi', 'İlan', 'Tarih', 'Durum'].map((h) => (
                  <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADS.map((lead, i) => {
                const st = LEAD_STATUS[lead.status]
                return (
                  <tr key={lead.id} style={{ borderBottom: i < MOCK_LEADS.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                    <td style={{ padding: '12px 20px' }}>
                      <div style={{ fontSize: 12, color: C.text, fontWeight: 400 }}>{lead.name}</div>
                      <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{lead.email}</div>
                    </td>
                    <td style={{ padding: '12px 20px', fontSize: 11, color: C.muted, maxWidth: 120 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.listing}</div>
                    </td>
                    <td style={{ padding: '12px 20px', fontSize: 11, color: C.muted, whiteSpace: 'nowrap' }}>
                      {formatDate(lead.date)}
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{ fontSize: 10, letterSpacing: '0.07em', padding: '3px 8px', borderRadius: 3, background: st.bg, color: st.color, fontWeight: 500 }}>
                        {st.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    ACTIVE:  { label: 'Aktif',  color: '#68D391', bg: 'rgba(104,211,145,0.1)' },
    PASSIVE: { label: 'Pasif',  color: '#FC8181', bg: 'rgba(252,129,129,0.1)' },
    SOLD:    { label: 'Satıldı',color: '#F6E05E', bg: 'rgba(246,224,94,0.1)' },
    DRAFT:   { label: 'Taslak', color: '#90CDF4', bg: 'rgba(144,205,244,0.1)' },
  }
  const s = map[status] ?? map.ACTIVE
  return (
    <span style={{ fontSize: 10, letterSpacing: '0.07em', padding: '3px 8px', borderRadius: 3, background: s.bg, color: s.color, fontWeight: 500 }}>
      {s.label}
    </span>
  )
}
