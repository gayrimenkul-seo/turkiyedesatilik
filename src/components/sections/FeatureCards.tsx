'use client'

const features = [
  {
    num: '01',
    title: 'Bakanlık Onaylı Ofisler',
    desc: 'Her ofis Ticaret Bakanlığı yetki belgesi ile doğrulanır. Lisanssız ilan yoktur.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Yapay Zeka Eşleştirme',
    desc: 'Kriterlerinizi girin, AI motoru size en uygun mülkleri sıralasın.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '12 Dil Desteği',
    desc: "Almanca, Rusça, Arapça ve daha fazlası. Avrupa'dan güvenle ulaşın.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
]

export default function FeatureCards() {
  return (
    <div className="reveal grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
      {features.map((f) => (
        <div
          key={f.num}
          className="feature-card relative overflow-hidden p-12 transition-colors duration-300"
          style={{ background: 'var(--sand)' }}
          onMouseOver={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--sand-dark)'
            const num = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('.f-num')
            if (num) num.style.color = 'var(--terracotta)'
          }}
          onMouseOut={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--sand)'
            const num = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('.f-num')
            if (num) num.style.color = 'rgba(0,0,0,0.06)'
          }}
        >
          <span
            className="f-num absolute top-6 right-6 font-light leading-none transition-colors duration-300"
            style={{ fontFamily: 'var(--font-display)', fontSize: 64, color: 'rgba(0,0,0,0.06)' }}
          >
            {f.num}
          </span>
          <div
            className="w-10 h-10 flex items-center justify-center mb-7 rounded-sm"
            style={{ background: 'var(--obsidian)' }}
          >
            {f.icon}
          </div>
          <h3
            className="font-normal leading-[1.2] mb-3.5"
            style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--obsidian)' }}
          >
            {f.title}
          </h3>
          <p className="text-[14px] font-light leading-[1.7]" style={{ color: 'var(--mist)' }}>
            {f.desc}
          </p>
        </div>
      ))}
    </div>
  )
}
