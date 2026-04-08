'use client'

const testimonials = [
  {
    q: "Bodrum'da hayallerimin ötesinde bir villa buldum. Süreç inanılmaz sorunsuz ilerledi.",
    name: 'Ahmet Yılmaz',
    from: "Almanya'dan Bodrum'a",
    initial: 'A',
    color: 'var(--aegean)',
  },
  {
    q: "Yurtdışından yatırım yapmak zor diye düşünüyordum. Doğrulanmış emlakçılar sayesinde güvenle Çeşme'de bir daire aldım.",
    name: 'Elif Kara',
    from: "İngiltere'den Çeşme'ye",
    initial: 'E',
    color: 'var(--terracotta)',
  },
  {
    q: "Fethiye'de emeklilik için ev ararken Türkiye'de Satılık'ın profesyonel ekibi tam aradığımızı buldu.",
    name: 'Sevgi Özkan',
    from: "Hollanda'dan Kuşadası'na",
    initial: 'S',
    color: 'var(--gold)',
  },
]

export default function TestimonialCards() {
  return (
    <div className="reveal grid gap-8" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="testi-card p-10 transition-all duration-300"
          style={{ border: '1px solid var(--sand-dark)', borderRadius: 'var(--radius)' }}
          onMouseOver={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--terracotta)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(196,85,42,0.08)'
          }}
          onMouseOut={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--sand-dark)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = ''
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 18,
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'var(--slate)',
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontSize: 64,
                lineHeight: 0.6,
                display: 'block',
                color: 'var(--sand-dark)',
                marginBottom: 12,
                fontFamily: 'var(--font-display)',
              }}
            >
              &ldquo;
            </span>
            {t.q}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: t.color,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: 16,
                color: 'var(--cream)',
                fontWeight: 300,
              }}
            >
              {t.initial}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--obsidian)' }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'var(--mist)', marginTop: 2 }}>{t.from}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
