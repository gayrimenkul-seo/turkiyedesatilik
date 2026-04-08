'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MOCK_OFFICES, type MockOffice } from '@/lib/mock-offices'

const OFFICES = MOCK_OFFICES

const ALL_CITIES = ['Tümü', ...Array.from(new Set(OFFICES.map((o) => o.city)))]

/* ─── Bileşen ────────────────────────────────────────────────────────── */
export default function OfislerView() {
  const [activeCity, setActiveCity] = useState('Tümü')

  const filtered = activeCity === 'Tümü'
    ? OFFICES
    : OFFICES.filter((o) => o.city === activeCity)

  return (
    <div style={{ background: 'var(--sand)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div
        style={{
          background: 'var(--obsidian)',
          padding: '80px 48px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Arka plan deseni */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.035,
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{
          position: 'absolute', top: '-20%', right: '5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,146,58,0.12) 0%, transparent 65%)',
        }} />

        <div className="max-w-[1400px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Link href="/" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
              Ana Sayfa
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11 }}>/</span>
            <span style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Ofisler
            </span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: 12 }}>
                Bakanlık Onaylı
              </span>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px,4vw,52px)',
                fontWeight: 300,
                color: 'var(--cream)',
                lineHeight: 1.1,
                marginBottom: 16,
              }}>
                Doğrulanmış<br />
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Emlak Ofisleri</em>
              </h1>
              <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.45)', maxWidth: 480, lineHeight: 1.7 }}>
                Platformumuzda yalnızca Ticaret Bakanlığı yetki belgesi sahibi,
                kimliği doğrulanmış ofisler yer alır.
              </p>
            </div>

            {/* Sayaçlar */}
            <div style={{ display: 'flex', gap: 32, flexShrink: 0 }}>
              {[
                { val: OFFICES.length, label: 'Onaylı Ofis' },
                { val: OFFICES.reduce((s, o) => s + o.agentCount, 0), label: 'Emlakçı' },
                { val: OFFICES.reduce((s, o) => s + o.listingCount, 0), label: 'Aktif İlan' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 38,
                    fontWeight: 300,
                    color: 'var(--cream)',
                    lineHeight: 1,
                  }}>
                    {s.val}+
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filtre + Grid ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-12">

        {/* Şehir filtresi */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mist)', marginRight: 4 }}>
            Şehir:
          </span>
          {ALL_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              style={{
                padding: '7px 18px',
                fontSize: 12,
                fontWeight: activeCity === city ? 500 : 300,
                letterSpacing: '0.04em',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: activeCity === city ? 'var(--obsidian)' : 'var(--sand-dark)',
                background: activeCity === city ? 'var(--obsidian)' : 'transparent',
                color: activeCity === city ? 'var(--cream)' : 'var(--obsidian)',
                cursor: 'pointer',
                transition: 'all 0.18s',
              }}
            >
              {city}
              {city !== 'Tümü' && (
                <span style={{ marginLeft: 6, opacity: 0.5, fontSize: 11 }}>
                  ({OFFICES.filter((o) => o.city === city).length})
                </span>
              )}
            </button>
          ))}
          {activeCity !== 'Tümü' && (
            <span style={{ fontSize: 12, color: 'var(--mist)', fontWeight: 300, marginLeft: 8 }}>
              <strong style={{ color: 'var(--obsidian)' }}>{filtered.length}</strong> ofis bulundu
            </span>
          )}
        </div>

        {/* Ofis Kartları Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
            gap: 24,
          }}
        >
          {filtered.map((office) => (
            <OfficeCard key={office.id} office={office} />
          ))}
        </div>
      </div>

      {/* ── Ofis Başvurusu CTA ── */}
      <div
        style={{
          background: 'var(--terracotta)',
          padding: '80px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.08) 0%, transparent 55%)',
        }} />

        <div className="max-w-[1400px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 48,
            flexWrap: 'wrap',
          }}>
            <div>
              <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 12 }}>
                Platformumuza Katılın
              </span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px,3vw,42px)',
                fontWeight: 300,
                color: 'var(--cream)',
                lineHeight: 1.15,
                marginBottom: 14,
              }}>
                Ofisinizi platforma ekleyin,<br />
                <em style={{ fontStyle: 'italic' }}>daha fazla müşteriye ulaşın.</em>
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 20 }}>
                {[
                  'Bakanlık lisansı zorunlu',
                  'Ücretsiz profil sayfası',
                  'Doğrulanmış rozeti',
                  'Avrupa\'dan müşteri kitlesi',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <Link
                href="/basvuru"
                style={{
                  display: 'block',
                  padding: '14px 36px',
                  background: 'var(--cream)',
                  color: 'var(--terracotta)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--sand)' }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--cream)' }}
              >
                Başvuru Yap →
              </Link>
              <Link
                href="/iletisim"
                style={{
                  display: 'block',
                  padding: '13px 36px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.7)'
                  el.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.3)'
                  el.style.color = 'rgba(255,255,255,0.8)'
                }}
              >
                Bilgi Al
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Ofis Kartı ─────────────────────────────────────────────────────── */
function OfficeCard({ office }: { office: MockOffice }) {
  return (
    <div
      style={{
        background: 'var(--cream)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--sand-dark)',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s, transform 0.25s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.08)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = ''
        el.style.transform = ''
      }}
    >
      {/* Kart Üst Başlık */}
      <div style={{ padding: '28px 28px 20px', display: 'flex', alignItems: 'flex-start', gap: 18 }}>

        {/* Logo Avatar */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 'var(--radius-sm)',
            background: office.avatarColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.02em',
          }}
        >
          {office.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
        </div>

        {/* Başlık alanı */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 400,
              color: 'var(--obsidian)',
              lineHeight: 1.2,
              margin: 0,
            }}>
              {office.name}
            </h2>

            {/* Doğrulanmış rozeti */}
            {office.isVerified && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 10px',
                background: 'rgba(56,161,105,0.1)',
                border: '1px solid rgba(56,161,105,0.25)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#276749',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Doğrulanmış
              </span>
            )}
          </div>

          {/* Şehir / ilçe */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--mist)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{office.district}, {office.city}</span>
            <span style={{ color: 'var(--sand-dark)' }}>·</span>
            <span style={{ color: 'var(--mist)', fontWeight: 300 }}>{office.foundedYear}&apos;dan beri</span>
          </div>
        </div>
      </div>

      {/* Açıklama */}
      <div style={{ padding: '0 28px 18px' }}>
        <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: 'var(--slate)' }}>
          {office.description}
        </p>
      </div>

      {/* Uzmanlık etiketleri */}
      <div style={{ padding: '0 28px 18px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {office.specialties.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '4px 10px',
              background: 'var(--sand)',
              border: '1px solid var(--sand-dark)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 11,
              color: 'var(--mist)',
              fontWeight: 300,
              letterSpacing: '0.03em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* İstatistikler + Lisans */}
      <div style={{
        padding: '16px 28px',
        borderTop: '1px solid var(--sand-dark)',
        borderBottom: '1px solid var(--sand-dark)',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}>
        <StatItem
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          }
          value={`${office.listingCount} İlan`}
        />
        <StatItem
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          }
          value={`${office.agentCount} Emlakçı`}
        />
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ fontSize: 10, letterSpacing: '0.06em', color: 'var(--mist)', fontFamily: 'monospace' }}>
            {office.licenseNo}
          </span>
        </div>
      </div>

      {/* İletişim + CTA */}
      <div style={{ padding: '18px 28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a
            href={`tel:${office.phone.replace(/\s/g, '')}`}
            style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--obsidian)', textDecoration: 'none', fontWeight: 300 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
            </svg>
            {office.phone}
          </a>
          <a
            href={`mailto:${office.email}`}
            style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--mist)', textDecoration: 'none', fontWeight: 300 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {office.email}
          </a>
        </div>

        <Link
          href={`/ofisler/${office.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '10px 22px',
            background: 'var(--obsidian)',
            color: 'var(--cream)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
            flexShrink: 0,
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--terracotta)' }}
          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--obsidian)' }}
        >
          Ofisi Gör
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

function StatItem({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {icon}
      <span style={{ fontSize: 12, color: 'var(--obsidian)', fontWeight: 400 }}>{value}</span>
    </div>
  )
}
