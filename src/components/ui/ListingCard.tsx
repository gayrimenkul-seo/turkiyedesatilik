'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { Listing } from '@/types'

const gradients: Record<string, string> = {
  APARTMENT: 'linear-gradient(135deg,#1B4F6B 0%,#0D2E40 100%)',
  VILLA: 'linear-gradient(135deg,#8B3A1A 0%,#5A2410 100%)',
  LAND: 'linear-gradient(135deg,#2A6F5E 0%,#174033 100%)',
  COMMERCIAL: 'linear-gradient(135deg,#4A3A1A 0%,#2A200E 100%)',
}

function formatPrice(price: number, currency: string, listingType: string): string {
  const formatted = new Intl.NumberFormat('tr-TR').format(price)
  const sym = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '₺'
  const suffix = listingType === 'RENT' ? '/ay' : ''
  return `${sym}${formatted}${suffix}`
}

interface Props {
  listing: Listing
}

export default function ListingCard({ listing }: Props) {
  const thumbGradient = gradients[listing.propertyType] ?? gradients.APARTMENT
  const hasImage = listing.images.length > 0

  return (
    <Link
      href={`/ilanlar/${listing.slug}`}
      className="listing-card block no-underline"
      style={{
        background: 'var(--cream)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)'
      }}
      onMouseOut={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = ''
        el.style.boxShadow = ''
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {hasImage ? (
          <Image
            src={listing.images[0].thumbUrl}
            alt={listing.images[0].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full" style={{ background: thumbGradient }} />
        )}

        {/* Badge */}
        <span
          className="absolute top-4 left-4 text-[10px] font-medium tracking-[0.1em] uppercase px-3 py-[5px] bg-cream"
          style={{
            borderRadius: 'var(--radius-sm)',
            color: listing.listingType === 'RENT' ? 'var(--aegean)' : 'var(--terracotta)',
          }}
        >
          {listing.listingType === 'SALE' ? 'Satılık'
            : listing.listingType === 'RENT' ? 'Kiralık'
            : 'Projeden'}
        </span>

        {/* Image count */}
        {listing.images.length > 1 && (
          <span
            className="absolute top-4 right-4 text-[11px] bg-black/50 text-white px-2 py-[3px]"
            style={{ borderRadius: 'var(--radius-sm)', backdropFilter: 'blur(4px)' }}
          >
            {listing.images.length} foto
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <div
          className="font-light leading-none mb-2"
          style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--obsidian)' }}
        >
          {formatPrice(listing.price, listing.currency, listing.listingType)}
        </div>

        <div className="text-[14px] font-light leading-[1.5] mb-4" style={{ color: 'var(--slate)' }}>
          {listing.title}
        </div>

        <div
          className="flex items-center gap-1.5 text-[11px] font-normal tracking-[0.06em] uppercase mb-5"
          style={{ color: 'var(--mist)' }}
        >
          <span
            className="inline-block w-1 h-1 rounded-full flex-shrink-0"
            style={{ background: 'var(--terracotta)' }}
          />
          {listing.city} · {listing.district}
          {listing.neighborhood && ` · ${listing.neighborhood}`}
        </div>

        {/* Meta */}
        <div
          className="flex gap-5 pt-[18px]"
          style={{ borderTop: '1px solid var(--sand-dark)' }}
        >
          {listing.rooms && (
            <MetaItem icon="home" label={listing.rooms} />
          )}
          <MetaItem icon="square" label={`${listing.sqm} m²`} />
          {listing.bathrooms && (
            <MetaItem icon="bath" label={`${listing.bathrooms} Banyo`} />
          )}
        </div>
      </div>
    </Link>
  )
}

function MetaItem({ icon, label }: { icon: 'home' | 'square' | 'bath'; label: string }) {
  const icons = {
    home: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    square: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
    bath: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 22v-7h18v7M3 15h18M15 15V3H9v12" />
      </svg>
    ),
  }

  return (
    <span className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--mist)' }}>
      {icons[icon]}
      {label}
    </span>
  )
}
