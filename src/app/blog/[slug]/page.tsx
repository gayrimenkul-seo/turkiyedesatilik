import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import RelatedPostCard from '@/components/ui/RelatedPostCard'

/* ─── Mock Veri ──────────────────────────────────────────────────────── */
interface BlogPost {
  slug: string
  category: string
  categoryColor: string
  title: string
  excerpt: string
  date: string
  readTime: number
  coverColor: string
  author: { name: string; title: string; initials: string; color: string }
  content: ContentBlock[]
}

type ContentBlock =
  | { type: 'p';   text: string }
  | { type: 'h2';  text: string }
  | { type: 'h3';  text: string }
  | { type: 'ul';  items: string[] }
  | { type: 'tip'; text: string }

const POSTS: Record<string, BlogPost> = {
  'yabanci-uyruklu-turkiyede-mulk-satin-alma-rehberi': {
    slug: 'yabanci-uyruklu-turkiyede-mulk-satin-alma-rehberi',
    category: 'Hukuki Bilgi',
    categoryColor: 'var(--gold)',
    title: "Yabancı Uyruklu Olarak Türkiye'de Mülk Satın Alma: Eksiksiz Rehber",
    excerpt:
      'Tapu devri sürecinden vergi yükümlülüklerine kadar her adımı anlatan kapsamlı bir kılavuz.',
    date: '2026-03-28',
    readTime: 9,
    coverColor: '#B8923A',
    author: {
      name: 'Mehmet Çelik',
      title: 'Hukuk Danışmanı',
      initials: 'MÇ',
      color: 'var(--gold)',
    },
    content: [
      {
        type: 'p',
        text: "Türkiye, yabancı uyruklu alıcılara 1934'ten bu yana mülk edinme hakkı tanımaktadır. Ancak süreç, birçok Avrupa ülkesinden farklıdır. Bu rehberde adım adım nelere dikkat etmeniz gerektiğini açıklıyoruz.",
      },
      { type: 'h2', text: 'Kimler Türkiye\'de Mülk Satın Alabilir?' },
      {
        type: 'p',
        text: "183 ülkenin vatandaşı Türkiye'de mülk edinebilir. Ancak Suriye, Küba, Kuzey Kore, Ermenistan ve Kuzey Kıbrıs Türk Cumhuriyeti'ni tanımayan bazı ülkeler kapsam dışındadır. Güncel listeyi Tapu ve Kadastro Genel Müdürlüğü'nden teyit etmenizi öneririz.",
      },
      { type: 'h2', text: 'Gerekli Belgeler' },
      {
        type: 'ul',
        items: [
          'Geçerli pasaport (noter onaylı çeviri ile birlikte)',
          'Türkiye vergi numarası (herhangi bir vergi dairesinden ücretsiz alınır)',
          'Satın alma bedelini gösteren döviz alım belgesi (DASK zorunlu)',
          'Zorunlu Deprem Sigortası (DASK)',
          'Vekaletname (satışı avukat aracılığıyla yapıyorsanız)',
        ],
      },
      {
        type: 'tip',
        text: "Vergi numarası almak 30 dakika sürer. Yalnızca pasaportunuzla herhangi bir vergi dairesine gidip anında alabilirsiniz.",
      },
      { type: 'h2', text: 'Alım Sürecinde Masraflar' },
      {
        type: 'p',
        text: "Satın alma fiyatının %4'ü tapu harcı (alıcı ve satıcı eşit pay), noter ücretleri, DASK poliçesi ve tercümanlık giderleri beklenebilecek başlıca masraflardır. Toplam masrafların satış fiyatının %5–6'sı olduğunu hesaplamanızı öneririz.",
      },
      { type: 'h3', text: 'Tapu Devri' },
      {
        type: 'p',
        text: "Tapu devri, Tapu Müdürlüğü'nde gerçekleştirilir. Randevu sistemiyle çalışır; randevuyu online veya ALO 181 hattından alabilirsiniz. Devir günü hem alıcı hem satıcı (ya da vekilleri) hazır bulunmalıdır.",
      },
      { type: 'h2', text: 'Sonuç' },
      {
        type: 'p',
        text: "Doğru belgelerle ve lisanslı bir emlakçı eşliğinde gerçekleştirilen işlemler güvenli ve hızlıdır. Türkiye'de Satılık platformu aracılığıyla çalıştığınız ofis, tapu sürecinde sizi adım adım yönlendirir.",
      },
    ],
  },
  'bodrum-yarim-adasi-gayrimenkul-rehberi-2026': {
    slug: 'bodrum-yarim-adasi-gayrimenkul-rehberi-2026',
    category: 'Bölge Tanıtımı',
    categoryColor: 'var(--aegean)',
    title: "Bodrum Yarımadası Emlak Rehberi 2026: Bölgeler, Fiyatlar, Fırsatlar",
    excerpt:
      "Yalıkavak'tan Türkbükü'ne, Gündoğan'dan Gümüşlük'e Bodrum'un tüm mahallelerini karşılaştırıyoruz.",
    date: '2026-03-21',
    readTime: 12,
    coverColor: '#1B4F6B',
    author: {
      name: 'Selin Yıldız',
      title: 'Operasyon Direktörü',
      initials: 'SY',
      color: 'var(--aegean)',
    },
    content: [
      {
        type: 'p',
        text: "Bodrum Yarımadası, Türkiye'nin en prestijli gayrimenkul pazarlarından biridir. 2025 yılında bölgedeki yabancı alıcı işlemleri önceki yıla kıyasla %22 artış gösterdi. Peki hangi semt hangi alıcıya hitap ediyor?",
      },
      { type: 'h2', text: 'Yalıkavak — Marina ve Lüks Segment' },
      {
        type: 'p',
        text: "Palmarina çevresindeki bölge, uluslararası alıcıların en çok tercih ettiği noktadır. Deniz manzaralı villalar 2–8 milyon Euro aralığında işlem görüyor. Kısa dönem kira getirisi yüksek.",
      },
      { type: 'h2', text: 'Gümüşlük — Sakin Yaşam ve Arsa Fırsatları' },
      {
        type: 'p',
        text: "Kalabalıktan uzak, özgün dokuyu koruyan Gümüşlük, butik otel ve müstakil villa projeleri için değer kazanıyor. Fiyatlar diğer bölgelere kıyasla hâlâ erişilebilir.",
      },
      { type: 'h2', text: 'Türkbükü — Üst Gelir Segmenti' },
      {
        type: 'p',
        text: "Bodrum'un 'Saint-Tropez'i olarak anılan Türkbükü, Türkiye'deki en pahalı kıyı şeridine ev sahipliği yapıyor. Konutlar genellikle ikincil piyasada el değiştiriyor.",
      },
      {
        type: 'tip',
        text: "Bodrum'da mülk alırken imar planını mutlaka inceleyin. Bazı bölgelerde inşaat kısıtlamaları ve kat yükseklik sınırlamaları bulunmaktadır.",
      },
      { type: 'h2', text: 'Fiyat Karşılaştırması (Ortalama, €/m²)' },
      {
        type: 'ul',
        items: [
          'Yalıkavak Marina çevresi: 4.500 – 8.000 €/m²',
          'Türkbükü – Gündoğan: 3.500 – 6.500 €/m²',
          'Bodrum Merkez: 2.500 – 4.000 €/m²',
          'Gümüşlük – Yokuşbaşı: 1.800 – 3.200 €/m²',
          'Güvercinlik – Mumcular: 900 – 1.800 €/m²',
        ],
      },
    ],
  },
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// Diğer postlar için generic fallback
function getPost(slug: string): BlogPost | null {
  return POSTS[slug] ?? null
}

function getRelated(current: string): BlogPost[] {
  return Object.values(POSTS)
    .filter((p) => p.slug !== current)
    .slice(0, 3)
}


/* ─── generateStaticParams (build-time) ─────────────────────────────── */
export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }))
}

/* ─── Metadata ───────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Yazı Bulunamadı' }
  return { title: post.title, description: post.excerpt }
}

/* ─── Sayfa ──────────────────────────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelated(slug)

  return (
    <>
      <ScrollReveal />
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--obsidian)',
          padding: '140px 48px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', top: -60, right: -40,
            width: 400, height: 400, borderRadius: '50%',
            background: `radial-gradient(circle, ${post.coverColor}10 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-[860px] mx-auto reveal">
          <Link
            href="/blog"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 11, color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none', letterSpacing: '0.06em',
              textTransform: 'uppercase', marginBottom: 24,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Blog
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span
              style={{
                fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: 'var(--radius-sm)',
                background: `${post.coverColor}18`,
                color: post.categoryColor,
                fontWeight: 500,
              }}
            >
              {post.category}
            </span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              {post.readTime} dk okuma
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 300, lineHeight: 1.1,
              color: 'var(--cream)', marginBottom: 20,
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontSize: 16, fontWeight: 300, lineHeight: 1.7,
              color: 'rgba(255,255,255,0.5)', marginBottom: 32,
            }}
          >
            {post.excerpt}
          </p>

          {/* Yazar + tarih */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: post.author.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 14,
                color: 'rgba(255,255,255,0.9)', flexShrink: 0,
              }}
            >
              {post.author.initials}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--cream)' }}>
                {post.author.name}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                {post.author.title} · {formatDate(post.date)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Makale İçeriği ── */}
      <section style={{ background: 'var(--cream)', padding: '64px 48px 80px' }}>
        <div
          className="max-w-[860px] mx-auto"
          style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 60, alignItems: 'start' }}
        >
          {/* İçerik */}
          <article>
            {post.content.map((block, i) => {
              switch (block.type) {
                case 'h2':
                  return (
                    <h2
                      key={i}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 26, fontWeight: 400,
                        color: 'var(--obsidian)', lineHeight: 1.2,
                        marginTop: 44, marginBottom: 14,
                        paddingBottom: 10,
                        borderBottom: '1px solid rgba(0,0,0,0.07)',
                      }}
                    >
                      {block.text}
                    </h2>
                  )
                case 'h3':
                  return (
                    <h3
                      key={i}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 20, fontWeight: 400,
                        color: 'var(--obsidian)', marginTop: 32, marginBottom: 10,
                      }}
                    >
                      {block.text}
                    </h3>
                  )
                case 'p':
                  return (
                    <p
                      key={i}
                      style={{
                        fontSize: 15, lineHeight: 1.85,
                        color: 'var(--mist)', fontWeight: 300,
                        marginBottom: 18,
                      }}
                    >
                      {block.text}
                    </p>
                  )
                case 'ul':
                  return (
                    <ul
                      key={i}
                      style={{
                        marginBottom: 18, paddingLeft: 0,
                        listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8,
                      }}
                    >
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            fontSize: 14, lineHeight: 1.7,
                            color: 'var(--mist)', fontWeight: 300,
                          }}
                        >
                          <span
                            style={{
                              width: 6, height: 6, borderRadius: '50%',
                              background: 'var(--terracotta)',
                              flexShrink: 0, marginTop: 8,
                            }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )
                case 'tip':
                  return (
                    <div
                      key={i}
                      style={{
                        margin: '28px 0',
                        padding: '18px 22px',
                        background: 'rgba(184,146,58,0.06)',
                        borderLeft: '3px solid var(--gold)',
                        borderRadius: '0 var(--radius) var(--radius) 0',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10, letterSpacing: '0.12em',
                          textTransform: 'uppercase', color: 'var(--gold)',
                          marginBottom: 7, fontWeight: 500,
                        }}
                      >
                        İpucu
                      </div>
                      <p
                        style={{
                          fontSize: 13, lineHeight: 1.72,
                          color: 'var(--obsidian)', fontWeight: 300,
                        }}
                      >
                        {block.text}
                      </p>
                    </div>
                  )
                default:
                  return null
              }
            })}

            {/* Yazar kutusu */}
            <div
              style={{
                marginTop: 56, padding: '24px 26px',
                background: 'var(--sand)', borderRadius: 'var(--radius-md)',
                display: 'flex', gap: 18, alignItems: 'flex-start',
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <div
                style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: post.author.color, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 18,
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                {post.author.initials}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--obsidian)', marginBottom: 3 }}>
                  {post.author.name}
                </div>
                <div style={{ fontSize: 11, color: post.author.color, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {post.author.title}
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--mist)', fontWeight: 300 }}>
                  Türkiye'de Satılık ekibinin deneyimli uzmanı. Okuyuculara doğru ve güncel
                  bilgi sunmak için düzenli olarak rehber makaleler yazıyor.
                </p>
              </div>
            </div>
          </article>

          {/* Kenar çubuğu */}
          <aside style={{ position: 'sticky', top: 32 }}>
            {/* Hızlı bilgi */}
            <div
              style={{
                padding: '20px',
                background: 'var(--sand)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(0,0,0,0.06)',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--mist)',
                  marginBottom: 14,
                }}
              >
                Bu Yazıda
              </div>
              {post.content
                .filter((b) => b.type === 'h2')
                .map((b, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 12, color: 'var(--mist)',
                      fontWeight: 300, lineHeight: 1.5,
                      paddingBottom: 10, marginBottom: 10,
                      borderBottom: i < post.content.filter((x) => x.type === 'h2').length - 1
                        ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    }}
                  >
                    {'text' in b ? b.text : ''}
                  </div>
                ))}
            </div>

            {/* CTA */}
            <div
              style={{
                padding: '22px',
                background: 'var(--obsidian)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 13, fontWeight: 300,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6, marginBottom: 16,
                }}
              >
                Uzman danışmanlarımızdan kişisel yönlendirme alın.
              </div>
              <Link href="/iletisim" className="btn-primary" style={{ fontSize: 11, padding: '9px 20px' }}>
                Danışman İste
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── İlgili Yazılar ── */}
      {related.length > 0 && (
        <section style={{ background: 'var(--sand)', padding: '72px 48px' }}>
          <div className="max-w-[1200px] mx-auto">
            <h2
              className="reveal"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28, fontWeight: 300,
                color: 'var(--obsidian)', marginBottom: 32,
              }}
            >
              İlgili <em style={{ color: 'var(--aegean)' }}>Yazılar</em>
            </h2>
            <div
              className="reveal"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
            >
              {related.map((rp) => (
                <RelatedPostCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
