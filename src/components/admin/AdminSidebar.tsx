'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ─── Renk sabitleri ─────────────────────────────────────────────────── */
const C = {
  bg:       '#0F1010',
  border:   'rgba(255,255,255,0.06)',
  text:     '#FDFCFA',
  muted:    'rgba(255,255,255,0.35)',
  active:   '#C4552A',
  activeBg: 'rgba(196,85,42,0.12)',
  hover:    'rgba(255,255,255,0.05)',
}

/* ─── Nav öğeleri ────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'İlanlar',
    href: '/admin/ilanlar',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Ofisler',
    href: '/admin/ofisler',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <rect x="9" y="14" width="6" height="8" />
        <path d="M8 3h8" />
      </svg>
    ),
  },
  {
    label: 'Leads',
    href: '/admin/leads',
    soon: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: 'Kullanıcılar',
    href: '/admin/kullanicilar',
    soon: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

const BOTTOM_ITEMS = [
  {
    label: 'Ayarlar',
    href: '/admin/ayarlar',
    soon: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: C.bg,
        borderRight: `1px solid ${C.border}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: `1px solid ${C.border}` }}>
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: C.text, letterSpacing: '0.02em', marginBottom: 2 }}>
            TDS <span style={{ color: C.active }}>Admin</span>
          </div>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>
            Yönetim Paneli
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, padding: '8px 10px 6px', marginBottom: 2 }}>
          Genel
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.soon ? '#' : item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 10px',
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: active ? 500 : 300,
                    color: active ? C.active : item.soon ? 'rgba(255,255,255,0.2)' : C.muted,
                    background: active ? C.activeBg : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                    cursor: item.soon ? 'default' : 'pointer',
                    pointerEvents: item.soon ? 'none' : 'auto',
                  }}
                  onMouseOver={(e) => {
                    if (!active && !item.soon) {
                      (e.currentTarget as HTMLElement).style.background = C.hover
                      ;(e.currentTarget as HTMLElement).style.color = C.text
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!active && !item.soon) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent'
                      ;(e.currentTarget as HTMLElement).style.color = C.muted
                    }
                  }}
                >
                  {item.icon}
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.soon && (
                    <span style={{ fontSize: 9, letterSpacing: '0.08em', padding: '2px 6px', borderRadius: 3, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)' }}>
                      YAKINDA
                    </span>
                  )}
                  {active && (
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.active, flexShrink: 0 }} />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, padding: '16px 10px 6px', marginBottom: 2 }}>
          Sistem
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {BOTTOM_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 10px',
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.2)',
                  textDecoration: 'none',
                  cursor: 'default',
                  pointerEvents: 'none',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
                <span style={{ fontSize: 9, letterSpacing: '0.08em', padding: '2px 6px', borderRadius: 3, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }}>
                  YAKINDA
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Alt: kullanıcı + çıkış */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: C.active,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: 13, color: C.text, flexShrink: 0,
          }}>
            A
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.text }}>Admin</div>
            <div style={{ fontSize: 10, color: C.muted }}>admin@turkiyedesatilik.com</div>
          </div>
        </div>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 8px',
            borderRadius: 4,
            fontSize: 12,
            color: C.muted,
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = C.text }}
          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = C.muted }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Siteye Dön
        </Link>
      </div>
    </aside>
  )
}
