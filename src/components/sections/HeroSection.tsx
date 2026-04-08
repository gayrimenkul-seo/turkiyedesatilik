import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative min-h-screen grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
      {/* LEFT */}
      <div
        className="flex flex-col justify-end relative z-[2] max-md:col-span-2"
        style={{ padding: 'clamp(100px,10vh,140px) 64px 80px 48px' }}
      >
        <span
          className="text-[11px] font-medium tracking-[0.18em] uppercase mb-6 block"
          style={{
            color: 'var(--terracotta)',
            opacity: 0,
            animation: 'fadeUp 0.8s 0.2s forwards',
          }}
        >
          Türkiye · Ege &amp; Akdeniz Kıyıları
        </span>

        <h1
          className="font-light leading-[1.05] tracking-[-0.01em] mb-8"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 6vw, 88px)',
            color: 'var(--obsidian)',
            opacity: 0,
            animation: 'fadeUp 0.9s 0.35s forwards',
          }}
        >
          Yalnızca<br />
          <em style={{ fontStyle: 'italic', color: 'var(--terracotta)', fontWeight: 300 }}>
            Doğrulanmış
          </em>
          <br />
          Mülkler
        </h1>

        <p
          className="text-[15px] font-light leading-[1.7] max-w-[400px] mb-12"
          style={{
            color: 'var(--slate)',
            opacity: 0,
            animation: 'fadeUp 0.9s 0.5s forwards',
          }}
        >
          Bakanlık onaylı emlak ofislerinin özenle seçilmiş ilanları. Avrupalı
          yatırımcılar için güvenli, şeffaf, çok dilli platform.
        </p>

        <div
          className="flex gap-4 items-center flex-wrap"
          style={{ opacity: 0, animation: 'fadeUp 0.9s 0.65s forwards' }}
        >
          <Link href="/ilanlar" className="btn-primary">İlanları Keşfet</Link>
          <Link href="/harita" className="btn-ghost">Haritada Gör →</Link>
        </div>

        {/* Stats */}
        <div
          className="flex gap-10 flex-wrap mt-16 pt-10"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.12)',
            opacity: 0,
            animation: 'fadeUp 0.9s 0.8s forwards',
          }}
        >
          {[
            { num: '500+', label: 'Aktif İlan' },
            { num: '40+', label: 'Doğrulanmış Ofis' },
            { num: '12', label: 'Dil Desteği' },
          ].map((s) => (
            <div key={s.label}>
              <span
                className="block leading-none font-light"
                style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--obsidian)' }}
              >
                {s.num}
              </span>
              <span
                className="text-[11px] font-normal tracking-[0.1em] uppercase mt-1.5 block"
                style={{ color: 'var(--mist)' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — image mosaic (desktop only) */}
      <div
        className="relative overflow-hidden max-md:hidden"
        style={{ opacity: 0, animation: 'fadeIn 1.2s 0.1s forwards' }}
      >
        <div className="absolute inset-0 grid" style={{ gridTemplateRows: '1fr 1fr', gap: 3 }}>
          {/* Top cell */}
          <div
            className="relative overflow-hidden flex items-end p-5"
            style={{ background: 'linear-gradient(160deg,#2A4E6B 0%,#1B3A52 60%,#0F2233 100%)' }}
          >
            <span
              className="font-light italic text-[15px]"
              style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.7)' }}
            >
              Kuşadası · Deniz Manzaralı Villa
            </span>
          </div>
          {/* Bottom row */}
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            <div
              className="relative flex items-end p-3.5"
              style={{ background: 'linear-gradient(140deg,#D4724A 0%,#A84D28 100%)' }}
            >
              <span className="text-[11px] tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Bodrum
              </span>
            </div>
            <div
              className="relative flex items-end p-3.5"
              style={{ background: 'linear-gradient(140deg,#1C4F6A 0%,#0E3047 100%)' }}
            >
              <span className="text-[11px] tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Çeşme
              </span>
            </div>
          </div>
        </div>

        {/* Live badge */}
        <div
          className="absolute bottom-10 -right-3 z-10 bg-cream flex items-center gap-3 p-4 shadow-xl"
          style={{
            borderRadius: 'var(--radius)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            opacity: 0,
            animation: 'slideInRight 0.9s 1s forwards',
          }}
        >
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: '#3DBE7C', animation: 'pulseDot 2s infinite' }}
          />
          <div className="text-[12px] leading-[1.4]">
            <strong className="block text-[13px] font-medium" style={{ color: 'var(--obsidian)' }}>
              Canlı Yayında
            </strong>
            <span style={{ color: 'var(--mist)' }}>18 yeni ilan bugün eklendi</span>
          </div>
        </div>
      </div>
    </div>
  )
}
