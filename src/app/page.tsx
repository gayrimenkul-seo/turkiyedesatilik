import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import SearchBar from '@/components/sections/SearchBar'
import ScrollReveal from '@/components/ui/ScrollReveal'
import FeatureCards from '@/components/sections/FeatureCards'
import RegionGrid from '@/components/sections/RegionGrid'
import TestimonialCards from '@/components/sections/TestimonialCards'
import ListingCard from '@/components/ui/ListingCard'
import type { Listing } from '@/types'

/* ─────────────────────────────────────────────────────────── */
/* Mock data — gerçek veriler Prisma / API'den gelecek        */
/* ─────────────────────────────────────────────────────────── */
const mockListings: Listing[] = [
  {
    id: '1',
    slug: 'kusadasi-satilik-deniz-manzarali-31-daire',
    title: 'Deniz Manzaralı 3+1 Daire',
    description: '',
    price: 40000000,
    currency: 'TRY',
    listingType: 'SALE',
    propertyType: 'APARTMENT',
    status: 'ACTIVE',
    city: 'Aydın',
    district: 'Kuşadası',
    neighborhood: 'Kadınlar Denizi',
    sqm: 165,
    rooms: '3+1',
    bathrooms: 3,
    images: [],
    agent: { id: 'a1', name: 'HIGH5 EMLAK', phone: '', email: '', officeId: 'o1' },
    office: {
      id: 'o1', slug: 'high5-emlak', name: 'HIGH5 EMLAK',
      phone: '', email: '', address: '', city: 'Kuşadası',
      licenseNo: '', isVerified: true, status: 'ACTIVE', agents: [], createdAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    slug: 'kusadasi-satilik-doga-manzarali-72-villa',
    title: 'Doğa Manzaralı 7+2 Villa',
    description: '',
    price: 35000000,
    currency: 'TRY',
    listingType: 'SALE',
    propertyType: 'VILLA',
    status: 'ACTIVE',
    city: 'Aydın',
    district: 'Kuşadası',
    neighborhood: 'Yeniköy',
    sqm: 2220,
    rooms: '7+2',
    bathrooms: 2,
    images: [],
    agent: { id: 'a1', name: 'HIGH5 EMLAK', phone: '', email: '', officeId: 'o1' },
    office: {
      id: 'o1', slug: 'high5-emlak', name: 'HIGH5 EMLAK',
      phone: '', email: '', address: '', city: 'Kuşadası',
      licenseNo: '', isVerified: true, status: 'ACTIVE', agents: [], createdAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    slug: 'kusadasi-kiralik-denize-sifir-21-daire',
    title: 'Denize Sıfır 2+1 Daire',
    description: '',
    price: 50000,
    currency: 'TRY',
    listingType: 'RENT',
    propertyType: 'APARTMENT',
    status: 'ACTIVE',
    city: 'Aydın',
    district: 'Kuşadası',
    neighborhood: 'Kadınlar Denizi',
    sqm: 110,
    rooms: '2+1',
    bathrooms: 2,
    images: [],
    agent: { id: 'a1', name: 'HIGH5 EMLAK', phone: '', email: '', officeId: 'o1' },
    office: {
      id: 'o1', slug: 'high5-emlak', name: 'HIGH5 EMLAK',
      phone: '', email: '', address: '', city: 'Kuşadası',
      licenseNo: '', isVerified: true, status: 'ACTIVE', agents: [], createdAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const trustItems = [
  { icon: 'shield', label: 'ETBİS Kayıtlı' },
  { icon: 'lock', label: '256-bit SSL' },
  { icon: 'check', label: 'KVKK & GDPR' },
  { icon: 'users', label: 'TTBS Onaylı Platform' },
  { icon: 'globe', label: 'VERBİS Kayıtlı' },
]

/* ─────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />

      {/* HERO */}
      <HeroSection />

      {/* SEARCH */}
      <SearchBar />

      {/* FEATURES */}
      <div style={{ background: 'var(--cream)', padding: '100px 0' }}>
        <div className="max-w-[1400px] mx-auto px-12">
          <div className="grid gap-20 mb-20 items-end" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <span className="section-label">Neden Türkiye&apos;de Satılık</span>
              <h2 className="section-title">
                Güvenin
                <br />
                <em>temeli</em>
              </h2>
            </div>
            <p
              className="text-[15px] font-light leading-[1.7] max-w-[400px] pb-2"
              style={{ color: 'var(--mist)' }}
            >
              Yurt dışından Türkiye&apos;de mülk satın almak artık korkutucu değil. Her ilan, her
              ofis, her işlem denetleniyor.
            </p>
          </div>

          <FeatureCards />
        </div>
      </div>

      {/* LISTINGS */}
      <section style={{ background: 'var(--sand)', padding: '100px 48px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <span className="section-label">Radar İlanlar</span>
              <h2 className="section-title">
                En Çok İlgi
                <br />
                <em>Görenler</em>
              </h2>
            </div>
            <Link href="/ilanlar" className="btn-outline" style={{ marginBottom: 8 }}>
              Tüm İlanlar
            </Link>
          </div>

          <div className="reveal grid gap-6" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {mockListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="text-center mt-14 reveal">
            <Link href="/ilanlar" className="btn-outline">
              Tüm İlanları Gör →
            </Link>
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <div style={{ background: 'var(--obsidian)', padding: '100px 0' }}>
        <div className="max-w-[1400px] mx-auto px-12">
          <div className="reveal mb-16">
            <span
              className="block text-[10px] font-medium tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--gold)' }}
            >
              Popüler Bölgeler
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px,4vw,52px)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: 'var(--cream)',
              }}
            >
              Ege&apos;nin{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Kıyı İncileri</em>
            </h2>
          </div>

          <RegionGrid />
        </div>
      </div>

      {/* TRUST STRIP */}
      <div
        style={{
          background: 'var(--sand-dark)',
          padding: '40px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          flexWrap: 'wrap',
        }}
      >
        {trustItems.map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {i > 0 && (
              <div
                style={{
                  width: 1,
                  height: 32,
                  background: 'rgba(0,0,0,0.12)',
                  marginRight: 60,
                }}
              />
            )}
            <TrustIcon type={item.icon} />
            <span
              style={{
                fontSize: 12,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--mist)',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--cream)', padding: '100px 48px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal mb-16">
            <span className="section-label">Müşteri Deneyimleri</span>
            <h2 className="section-title">
              Hayalleri <em>Gerçeğe</em> Döndürdük
            </h2>
          </div>
          <TestimonialCards />
        </div>
      </section>

      {/* CTA */}
      <div
        style={{
          background: 'var(--terracotta)',
          padding: '100px 48px',
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
              'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(0,0,0,0.1) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[700px] mx-auto reveal">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px,5vw,64px)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: 'var(--cream)',
              marginBottom: 20,
            }}
          >
            Hayalinizdeki
            <br />
            Mülkü Bugün Bulun
          </h2>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.75)',
              marginBottom: 44,
              lineHeight: 1.6,
            }}
          >
            Doğrulanmış emlakçılarımızla Ege&apos;nin en prestijli lokasyonlarında güvenle yatırım
            yapın.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/ilanlar" className="btn-white">
              İlanları Keşfet
            </Link>
            <Link href="/basvuru" className="btn-ghost-white">
              Ofis Başvurusu
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

function TrustIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactElement> = {
    shield: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    lock: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    check: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    users: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    globe: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  }
  return icons[type] ?? null
}
