import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BlogCard, { type BlogPost } from '@/components/ui/BlogCard'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Türkiye'de gayrimenkul yatırımı, bölge rehberleri, hukuki bilgiler ve piyasa analizleri.",
}

type Category = 'Yatırım Rehberi' | 'Bölge Tanıtımı' | 'Hukuki Bilgi' | 'Piyasa Analizi'

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; dot: string }> = {
  'Yatırım Rehberi': { bg: 'rgba(196,85,42,0.1)',   text: 'var(--terracotta)', dot: 'var(--terracotta)' },
  'Bölge Tanıtımı':  { bg: 'rgba(27,79,107,0.1)',   text: 'var(--aegean)',     dot: 'var(--aegean)' },
  'Hukuki Bilgi':    { bg: 'rgba(184,146,58,0.1)',   text: 'var(--gold)',       dot: 'var(--gold)' },
  'Piyasa Analizi':  { bg: 'rgba(139,144,152,0.15)', text: 'var(--mist)',       dot: 'var(--mist)' },
}

const POSTS: BlogPost[] = [
  {
    slug: 'yabanci-uyruklu-turkiyede-mulk-satin-alma-rehberi',
    category: 'Hukuki Bilgi',
    title: 'Yabancı Uyruklu Olarak Türkiye\'de Mülk Satın Alma: Eksiksiz Rehber',
    excerpt:
      'Tapu devri sürecinden vergi yükümlülüklerine kadar her adımı anlatan kapsamlı bir kılavuz. Hangi belgeler gerekli, hangi masrafları göze almalısınız?',
    date: '2026-03-28',
    readTime: 9,
    coverColor: '#B8923A',
    coverIcon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    slug: 'bodrum-yarim-adasi-gayrimenkul-rehberi-2026',
    category: 'Bölge Tanıtımı',
    title: 'Bodrum Yarımadası Emlak Rehberi 2026: Bölgeler, Fiyatlar, Fırsatlar',
    excerpt:
      'Yalıkavak\'tan Türkbükü\'ne, Gündoğan\'dan Gümüşlük\'e Bodrum\'un tüm mahallelerini karşılaştırıyoruz. Hangi bölge hangi alıcı profiline uygun?',
    date: '2026-03-21',
    readTime: 12,
    coverColor: '#1B4F6B',
    coverIcon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    slug: 'turkiye-gayrimenkul-piyasasi-q1-2026',
    category: 'Piyasa Analizi',
    title: 'Q1 2026 Türkiye Konut Piyasası: Ege ve Akdeniz Satış Verileri',
    excerpt:
      'İlk çeyrekte yabancı alıcı işlemleri %18 arttı. Hangi şehirler öne çıktı, fiyatlar nereye gidiyor? Ham veriler ve uzman yorumu.',
    date: '2026-03-15',
    readTime: 7,
    coverColor: '#8B9098',
    coverIcon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    slug: 'fethiye-oluden-deniz-satilik-villa-rehberi',
    category: 'Bölge Tanıtımı',
    title: 'Fethiye ve Ölüdeniz\'de Satılık Villa: Nerede, Ne Kadar?',
    excerpt:
      'Hisarönü\'nden Ovacık\'a, Kıdrak\'tan Çalış Plajı\'na Fethiye bölgesindeki villa segmentini inceliyoruz. Doğaya yakın yaşam arayanlar için.',
    date: '2026-03-08',
    readTime: 8,
    coverColor: '#2A6F94',
    coverIcon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    slug: 'turkiyede-yatirim-amacli-emlak-almak-2026',
    category: 'Yatırım Rehberi',
    title: 'Türkiye\'de Yatırım Amaçlı Mülk Almak: Kira Getirisi ve ROI Hesabı',
    excerpt:
      'Tatil kiralığı mı, uzun dönem kira mı? Airbnb yasaları, kira geliri vergisi ve net getiri hesaplamalarını gerçek veri üzerinden açıklıyoruz.',
    date: '2026-02-28',
    readTime: 11,
    coverColor: '#C4552A',
    coverIcon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    slug: 'turkiye-vatandasligi-gayrimenkul-yatirimi',
    category: 'Hukuki Bilgi',
    title: 'Gayrimenkul Yatırımıyla Türk Vatandaşlığı: Koşullar ve Süreç',
    excerpt:
      '400.000 USD üzeri mülk alımında Türk vatandaşlığı başvurusu mümkün. Hangi mülkler uygun, süreç kaç ay sürer, avukat ücretleri nedir?',
    date: '2026-02-18',
    readTime: 10,
    coverColor: '#B8923A',
    coverIcon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2',
  },
]

const CATEGORIES: Category[] = ['Yatırım Rehberi', 'Bölge Tanıtımı', 'Hukuki Bilgi', 'Piyasa Analizi']


export default function BlogPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--obsidian)',
          padding: '160px 48px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', top: -60, right: -40,
            width: 480, height: 480, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,146,58,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-[1400px] mx-auto reveal">
          <span
            style={{
              display: 'block', fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16,
            }}
          >
            Blog & Rehberler
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 68px)',
              fontWeight: 300, lineHeight: 1.05,
              color: 'var(--cream)', marginBottom: 20,
            }}
          >
            Türkiye emlağında
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>bilgi rehberiniz</em>
          </h1>
          <p
            style={{
              fontSize: 16, fontWeight: 300, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.48)', maxWidth: 520,
              marginBottom: 36,
            }}
          >
            Yatırım rehberlerinden bölge tanıtımlarına, hukuki bilgilerden piyasa
            analizlerine — Türkiye gayrimenkul dünyasının pusulası.
          </p>

          {/* Kategori hızlı erişim */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => {
              const c = CATEGORY_COLORS[cat]
              return (
                <span
                  key={cat}
                  style={{
                    padding: '6px 14px',
                    background: c.bg,
                    color: c.text,
                    borderRadius: 'var(--radius)',
                    fontSize: 11,
                    letterSpacing: '0.06em',
                    fontWeight: 400,
                    border: `1px solid ${c.dot}30`,
                  }}
                >
                  {cat}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section style={{ background: 'var(--sand)', padding: '80px 48px 100px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 28,
            }}
          >
            {POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section style={{ background: 'var(--obsidian)', padding: '80px 48px' }}>
        <div
          className="max-w-[700px] mx-auto reveal"
          style={{ textAlign: 'center' }}
        >
          <span
            style={{
              display: 'block', fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16,
            }}
          >
            Bülten
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 300, lineHeight: 1.1,
              color: 'var(--cream)', marginBottom: 14,
            }}
          >
            Piyasa haberlerini kaçırmayın
          </h2>
          <p
            style={{
              fontSize: 14, fontWeight: 300, lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)', marginBottom: 32,
            }}
          >
            Her ay en iyi makaleler, piyasa verileri ve bölge analizleri doğrudan
            gelen kutunuza gelsin.
          </p>
          <div
            style={{
              display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto',
              borderRadius: 'var(--radius-sm)', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <input
              type="email"
              placeholder="E-posta adresiniz"
              style={{
                flex: 1, padding: '13px 18px',
                background: 'rgba(255,255,255,0.05)',
                border: 'none', outline: 'none',
                color: 'var(--cream)', fontSize: 13,
                fontFamily: 'var(--font-body)', fontWeight: 300,
              }}
            />
            <button
              style={{
                padding: '13px 22px',
                background: 'var(--terracotta)',
                border: 'none', cursor: 'pointer',
                color: 'var(--cream)',
                fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontWeight: 500,
                fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap',
              }}
            >
              Abone Ol
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

