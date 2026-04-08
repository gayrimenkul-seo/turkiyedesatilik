import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    "Türkiye'nin Ege ve Akdeniz kıyılarında yalnızca Bakanlık onaylı emlak ofisleriyle çalışan premium gayrimenkul platformu.",
}

const STATS = [
  { value: '500+', label: 'Aktif İlan' },
  { value: '40+',  label: 'Onaylı Ofis' },
  { value: '12',   label: 'Desteklenen Dil' },
  { value: '8+',   label: 'Yıllık Deneyim' },
]

const TEAM = [
  {
    initials: 'KA',
    name: 'Kerem Arslan',
    title: 'Kurucu & CEO',
    bio: 'Türkiye gayrimenkul sektöründe 14 yıllık deneyim. Yabancı yatırımcılara rehberlik konusunda uzman.',
    color: 'var(--terracotta)',
  },
  {
    initials: 'SY',
    name: 'Selin Yıldız',
    title: 'Operasyon Direktörü',
    bio: 'Ofis onay süreçleri ve kalite kontrolünü yönetiyor. 200\'den fazla ofis denetimi deneyimi.',
    color: 'var(--aegean)',
  },
  {
    initials: 'MÇ',
    name: 'Mehmet Çelik',
    title: 'Hukuk Danışmanı',
    bio: 'Tapu devri, KVKK uyumluluğu ve yabancı uyruklu alıcı süreçlerinde uzman avukat.',
    color: 'var(--gold)',
  },
  {
    initials: 'AK',
    name: 'Ayşe Korkmaz',
    title: 'Müşteri İlişkileri',
    bio: '8 dil konuşuyor. Alman, İsveçli ve Rus müşterilerle iletişim süreçleri yürütüyor.',
    color: '#2A6F94',
  },
]

const BADGES = [
  { label: 'ETBİS Kayıtlı',  desc: 'Elektronik Ticaret Bilgi Sistemi' },
  { label: 'KVKK Uyumlu',    desc: 'Kişisel Verilerin Korunması' },
  { label: 'TTBS Onaylı',    desc: 'Turizm Tanıtma Bilgi Sistemi' },
  { label: 'VERBİS Kayıtlı', desc: 'Veri Sorumluları Sicil Bilgi Sistemi' },
  { label: 'GDPR Uyumlu',    desc: 'AB Genel Veri Koruma Tüzüğü' },
]

const WHY_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'Yalnızca Bakanlık Onaylı Ofisler',
    desc: 'Platformda yer alan her ofis, Türk Ticaret Bakanlığı yetkili emlakçılık belgesine sahiptir. Başvuru sırasında belgeler incelenir, periyodik denetimler yapılır.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: '12 Dilde Destek',
    desc: 'Almanca, Rusça, Arapça, İsveççe dahil 12 dilde iletişim desteği. Anadilinde hizmet, güveni artırır.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: 'Alıcı Odaklı Yaklaşım',
    desc: 'Satıcıdan değil, alıcıdan yanayız. Bağımsız danışmanlık, şeffaf fiyatlar, sürpriz komisyon yok.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
    title: 'Satın Alma Sonrası Destek',
    desc: 'Tapu devri, vergi danışmanlığı, kira yönetimi. İşlem tamamlandıktan sonra da yanınızdayız.',
  },
]

export default function HakkimizdaPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--obsidian)',
          paddingTop: 160,
          paddingBottom: 100,
          padding: '160px 48px 100px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -80,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,146,58,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -40,
            left: '25%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(27,79,107,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal" style={{ maxWidth: 680 }}>
            <span
              style={{
                display: 'block',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 20,
              }}
            >
              Hakkımızda
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 5.5vw, 72px)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: 'var(--cream)',
                marginBottom: 28,
              }}
            >
              Türkiye&apos;ye
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>güvenle yatırım</em>
              <br />
              yapmanın adresi
            </h1>
            <p
              style={{
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: 520,
              }}
            >
              {siteConfig.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── İstatistikler ── */}
      <section style={{ background: 'var(--sand-dark)', padding: '0' }}>
        <div className="max-w-[1400px] mx-auto">
          <div
            className="reveal"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '52px 40px',
                  textAlign: 'center',
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(40px, 4vw, 56px)',
                    fontWeight: 300,
                    color: 'var(--terracotta)',
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--mist)',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Şirket Hikayesi & Misyon ── */}
      <section style={{ background: 'var(--cream)', padding: '100px 48px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div
            className="reveal"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
          >
            <div>
              <span className="section-label">Hikayemiz</span>
              <h2 className="section-title">
                2018&apos;den bu yana <em>güven</em> inşa ediyoruz
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: 'var(--mist)',
                  fontWeight: 300,
                  marginBottom: 20,
                }}
              >
                Türkiye&apos;de mülk satın almak isteyen yabancı uyruklu alıcıların en
                büyük sorunu güvensizlikti. Sahte ilanlar, lisanssız aracılar, opak
                fiyatlandırma. Biz bu tabloyu değiştirmek için yola çıktık.
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: 'var(--mist)',
                  fontWeight: 300,
                  marginBottom: 40,
                }}
              >
                Bodrum&apos;da küçük bir ekiple başladık. Bugün 40&apos;tan fazla Bakanlık
                onaylı ofis, 500&apos;den fazla aktif ilan ve 12 dil desteğiyle
                Türkiye&apos;nin en güvenilir gayrimenkul platformuyuz.
              </p>

              {/* Misyon kutusu */}
              <div
                style={{
                  padding: '24px 28px',
                  background: 'var(--sand)',
                  borderLeft: '3px solid var(--gold)',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: 10,
                  }}
                >
                  Misyonumuz
                </div>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.75,
                    color: 'var(--obsidian)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  "Türkiye&apos;de mülk sahibi olmayı herkes için şeffaf, güvenli ve
                  erişilebilir kılmak."
                </p>
              </div>
            </div>

            {/* Görsel placeholder */}
            <div
              style={{
                height: 480,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--sand-dark) 0%, var(--sand) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                border: '1px solid rgba(0,0,0,0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: -40,
                  right: -40,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'rgba(196,85,42,0.06)',
                }}
              />
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(196,85,42,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--terracotta)',
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--mist)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Bodrum Ofisi
              </p>
              <p style={{ fontSize: 11, color: 'var(--mist)', opacity: 0.5 }}>
                {siteConfig.contact.address.full}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Neden Türkiye'de Satılık ── */}
      <section style={{ background: 'var(--sand)', padding: '100px 48px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-label">Fark Yaratan Şey</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Neden Türkiye&apos;de <em>Satılık?</em>
            </h2>
          </div>

          <div
            className="reveal"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}
          >
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                style={{
                  display: 'flex',
                  gap: 22,
                  padding: '28px 28px',
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(196,85,42,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--terracotta)',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'var(--obsidian)',
                      marginBottom: 8,
                    }}
                  >
                    {item.title}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.75,
                      color: 'var(--mist)',
                      fontWeight: 300,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ekip ── */}
      <section style={{ background: 'var(--cream)', padding: '100px 48px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal" style={{ marginBottom: 56 }}>
            <span className="section-label">Ekibimiz</span>
            <h2 className="section-title">
              Arkamızdaki <em>insanlar</em>
            </h2>
          </div>

          <div
            className="reveal"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
          >
            {TEAM.map((member) => (
              <div
                key={member.name}
                style={{
                  background: 'var(--sand)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    height: 128,
                    background: `color-mix(in srgb, ${member.color} 8%, var(--sand-dark))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: `2px solid ${member.color}`,
                  }}
                >
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: '50%',
                      background: member.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: 24,
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.92)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {member.initials}
                  </div>
                </div>

                <div style={{ padding: '20px 22px 24px' }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'var(--obsidian)',
                      marginBottom: 3,
                    }}
                  >
                    {member.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: member.color,
                      marginBottom: 12,
                    }}
                  >
                    {member.title}
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.72,
                      color: 'var(--mist)',
                      fontWeight: 300,
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Yasal Uyumluluk Rozetleri ── */}
      <section style={{ background: 'var(--obsidian)', padding: '72px 48px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <span
              style={{
                display: 'block',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 14,
              }}
            >
              Yasal Uyumluluk
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300,
                color: 'var(--cream)',
                lineHeight: 1.15,
              }}
            >
              Denetlenen, belgeli, <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>güvenilir</em>
            </h2>
          </div>

          <div
            className="reveal"
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {BADGES.map((badge) => (
              <div
                key={badge.label}
                style={{
                  padding: '18px 28px',
                  border: '1px solid rgba(184,146,58,0.25)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  minWidth: 180,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(184,146,58,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    color: 'var(--gold)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--cream)',
                    marginBottom: 4,
                    letterSpacing: '0.04em',
                  }}
                >
                  {badge.label}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.3)',
                    fontWeight: 300,
                    lineHeight: 1.4,
                  }}
                >
                  {badge.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: 'var(--terracotta)',
          padding: '80px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div className="relative z-10 max-w-[600px] mx-auto reveal">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: 'var(--cream)',
              marginBottom: 18,
            }}
          >
            Sorularınız için buradayız
          </h2>
          <p
            style={{
              fontSize: 15,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.72)',
              marginBottom: 36,
              lineHeight: 1.6,
            }}
          >
            Uzman ekibimiz size özel danışmanlık için hazır.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/iletisim" className="btn-white">
              İletişime Geç
            </Link>
            <Link href="/ofisler" className="btn-ghost-white">
              Ofisleri Keşfet
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
