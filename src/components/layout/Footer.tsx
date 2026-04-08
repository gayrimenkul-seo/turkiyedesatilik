'use client'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const saleLinks = [
  { label: 'Bodrum Satılık Villa', href: '/mugla-bodrum-satilik-villa' },
  { label: 'Çeşme Satılık Daire', href: '/izmir-cesme-satilik-daire' },
  { label: 'Kuşadası Satılık Daire', href: '/aydin-kusadasi-satilik-daire' },
  { label: 'Fethiye Satılık Villa', href: '/mugla-fethiye-satilik-villa' },
  { label: 'Tüm Satılık İlanlar', href: '/satilik' },
]

const rentLinks = [
  { label: 'Bodrum Kiralık Villa', href: '/mugla-bodrum-kiralik-villa' },
  { label: 'Fethiye Kiralık Daire', href: '/mugla-fethiye-kiralik-daire' },
  { label: 'Bodrum Satılık Arsa', href: '/mugla-bodrum-satilik-arsa' },
  { label: 'Tüm Kiralık İlanlar', href: '/kiralik' },
]

const corporateLinks = [
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Emlak Ofisleri', href: '/ofisler' },
  { label: 'Ofis Başvurusu', href: '/basvuru' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
]

const legalLinks = [
  { label: 'Kullanım Koşulları', href: '/kullanim-sartlari' },
  { label: 'Gizlilik Politikası', href: '/gizlilik' },
  { label: 'KVKK', href: '/kvkk' },
  { label: 'Çerez Politikası', href: '/cerez-politikasi' },
  { label: 'Yasal Uyarı', href: '/yasal-uyari' },
]

const badges = ['ETBİS Kayıtlı', 'KVKK Uyumlu', 'GDPR Uyumlu', 'VERBİS Kayıtlı', 'TTBS Onaylı']

export default function Footer() {
  return (
    <footer style={{ background: 'var(--obsidian)' }} className="px-12 pt-[72px] pb-8">
      <div className="max-w-[1400px] mx-auto">

        {/* Top grid */}
        <div
          className="grid gap-[60px] pb-[60px] mb-8"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Brand + contact */}
          <div>
            <Link
              href="/"
              className="block mb-5 text-[22px] font-semibold tracking-[0.02em] no-underline text-cream"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Türkiye&apos;de <span className="text-terracotta">Satılık</span>
            </Link>
            <p className="text-[13px] font-light leading-[1.7] max-w-[280px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Türkiye'nin Ege ve Akdeniz kıyılarında yalnızca Bakanlık onaylı
              emlak ofisleriyle çalışan premium gayrimenkul platformu.
            </p>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-[10px]">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-center gap-2 text-[13px] font-light no-underline transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                <Phone size={14} style={{ stroke: 'var(--gold)', flexShrink: 0 }} strokeWidth={1.5} />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-[13px] font-light no-underline transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                <Mail size={14} style={{ stroke: 'var(--gold)', flexShrink: 0 }} strokeWidth={1.5} />
                {siteConfig.contact.email}
              </a>
              <span
                className="flex items-start gap-2 text-[12px] font-light leading-[1.5]"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <MapPin size={14} style={{ stroke: 'var(--gold)', flexShrink: 0, marginTop: 2 }} strokeWidth={1.5} />
                <span>
                  {siteConfig.contact.address.street},{' '}
                  {siteConfig.contact.address.district}
                  <br />
                  {siteConfig.contact.address.postalCode}{' '}
                  {siteConfig.contact.address.city} /{' '}
                  {siteConfig.contact.address.province}
                </span>
              </span>
            </div>
          </div>

          {/* Satılık */}
          <FooterCol title="Satılık İlanlar" links={saleLinks} />

          {/* Kiralık & Arsa */}
          <FooterCol title="Kiralık & Arsa" links={rentLinks} />

          {/* Kurumsal */}
          <FooterCol title="Kurumsal" links={corporateLinks} />

          {/* Yasal */}
          <FooterCol title="Yasal" links={legalLinks} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
          <span>© 2026 Türkiye&apos;de Satılık. Tüm hakları saklıdır.</span>
          <div className="flex flex-wrap gap-3">
            {badges.map((b) => (
              <span
                key={b}
                className="text-[10px] tracking-[0.08em] uppercase px-[10px] py-[5px]"
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div
        className="text-[10px] font-medium tracking-[0.18em] uppercase mb-5"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        {title}
      </div>
      <ul className="list-none flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[13px] font-light no-underline transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
