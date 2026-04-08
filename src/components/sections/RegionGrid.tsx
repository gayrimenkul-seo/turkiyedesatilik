'use client'
import Link from 'next/link'

const regions = [
  { name: 'Bodrum', count: 0, gradient: 'linear-gradient(160deg,#1B5E7A 0%,#0D3347 100%)', large: true },
  { name: 'Kuşadası', count: 23, gradient: 'linear-gradient(160deg,#8B3A1A 0%,#5A2410 100%)' },
  { name: 'Çeşme', count: 0, gradient: 'linear-gradient(160deg,#2A6F5E 0%,#174033 100%)' },
  { name: 'Fethiye', count: 0, gradient: 'linear-gradient(160deg,#4A3A1A 0%,#2A200E 100%)' },
  { name: 'Didim', count: 0, gradient: 'linear-gradient(160deg,#1A3A5C 0%,#0D1F33 100%)' },
]

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ğ/g, 'g')
}

export default function RegionGrid() {
  return (
    <div
      className="reveal"
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gridTemplateRows: '300px 300px',
        gap: 3,
      }}
    >
      {regions.map((r, i) => (
        <Link
          key={r.name}
          href={`/${toSlug(r.name)}-satilik`}
          className="region-card no-underline flex items-end relative overflow-hidden"
          style={i === 0 ? { gridRow: '1 / 3' } : {}}
          onMouseOver={(e) => {
            const bg = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('.region-bg')
            if (bg) bg.style.transform = 'scale(1.05)'
          }}
          onMouseOut={(e) => {
            const bg = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('.region-bg')
            if (bg) bg.style.transform = 'scale(1)'
          }}
        >
          <div
            className="region-bg absolute inset-0 transition-transform duration-500"
            style={{ background: r.gradient }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)' }}
          />
          <div className="relative z-10 p-8 w-full">
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: i === 0 ? 42 : 28,
                fontWeight: 300,
                color: 'var(--cream)',
                marginBottom: 4,
              }}
            >
              {r.name}
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {r.count} ilan
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
