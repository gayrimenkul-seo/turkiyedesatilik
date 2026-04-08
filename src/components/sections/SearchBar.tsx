'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const cities = [
  'Aydın — Kuşadası', 'Muğla — Bodrum', 'İzmir — Çeşme',
  'Antalya', 'İstanbul', 'Muğla — Fethiye', 'Aydın — Didim',
]

const propertyTypes = ['Daire', 'Villa', 'Arsa', 'Projeden Satılık']

const priceRanges = {
  SALE: ['₺0 – ₺5M', '₺5M – ₺15M', '₺15M – ₺40M', '₺40M+'],
  RENT: ['₺0 – ₺15K/ay', '₺15K – ₺30K/ay', '₺30K – ₺60K/ay', '₺60K+/ay'],
}

export default function SearchBar() {
  const router = useRouter()
  const [tab, setTab] = useState<'SALE' | 'RENT'>('SALE')
  const [city, setCity] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('type', tab)
    if (city) params.set('city', city)
    if (propertyType) params.set('propertyType', propertyType)
    router.push(`/ilanlar?${params.toString()}`)
  }

  return (
    <div style={{ background: 'var(--obsidian)', padding: '0 48px' }}>
      <div
        className="max-w-[1400px] mx-auto flex items-stretch flex-wrap"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Tabs */}
        <button
          className="px-7 py-[22px] text-[12px] font-medium tracking-[0.1em] uppercase border-none bg-transparent font-body transition-all duration-200 border-b-2 cursor-pointer"
          style={{
            color: tab === 'SALE' ? 'var(--cream)' : 'rgba(255,255,255,0.4)',
            borderBottomColor: tab === 'SALE' ? 'var(--terracotta)' : 'transparent',
            fontFamily: 'var(--font-body)',
          }}
          onClick={() => setTab('SALE')}
        >
          Satılık
        </button>
        <button
          className="px-7 py-[22px] text-[12px] font-medium tracking-[0.1em] uppercase border-none bg-transparent font-body transition-all duration-200 border-b-2 cursor-pointer"
          style={{
            color: tab === 'RENT' ? 'var(--cream)' : 'rgba(255,255,255,0.4)',
            borderBottomColor: tab === 'RENT' ? 'var(--terracotta)' : 'transparent',
            fontFamily: 'var(--font-body)',
          }}
          onClick={() => setTab('RENT')}
        >
          Kiralık
        </button>

        <div className="w-px my-3" style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Fields */}
        <div className="flex flex-1 items-center flex-wrap overflow-x-auto">
          <SearchField label="Şehir">
            <select
              className="bg-transparent border-none outline-none text-[14px] font-light w-full appearance-none cursor-pointer"
              style={{ color: city ? 'var(--cream)' : 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Tüm Şehirler</option>
              {cities.map((c) => (
                <option key={c} value={c} style={{ background: 'var(--slate)' }}>{c}</option>
              ))}
            </select>
          </SearchField>

          <SearchField label="Mülk Tipi">
            <select
              className="bg-transparent border-none outline-none text-[14px] font-light w-full appearance-none cursor-pointer"
              style={{ color: propertyType ? 'var(--cream)' : 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Tüm Tipler</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t} style={{ background: 'var(--slate)' }}>{t}</option>
              ))}
            </select>
          </SearchField>

          <SearchField label="Bütçe" noBorder>
            <select
              className="bg-transparent border-none outline-none text-[14px] font-light w-full appearance-none cursor-pointer"
              style={{ color: priceRange ? 'var(--cream)' : 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Tüm Fiyatlar</option>
              {priceRanges[tab].map((p) => (
                <option key={p} value={p} style={{ background: 'var(--slate)' }}>{p}</option>
              ))}
            </select>
          </SearchField>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="px-9 text-[12px] font-medium tracking-[0.1em] uppercase border-none cursor-pointer whitespace-nowrap transition-colors duration-200"
          style={{
            background: 'var(--terracotta)',
            color: 'var(--cream)',
            fontFamily: 'var(--font-body)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = 'var(--terra-light)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'var(--terracotta)')}
        >
          İlan Ara
        </button>
      </div>
    </div>
  )
}

function SearchField({
  label,
  children,
  noBorder = false,
}: {
  label: string
  children: React.ReactNode
  noBorder?: boolean
}) {
  return (
    <div
      className="px-6 py-[22px] flex-1 min-w-[140px]"
      style={{
        borderRight: noBorder ? 'none' : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        className="block text-[10px] font-medium tracking-[0.12em] uppercase mb-[5px]"
        style={{ color: 'var(--mist)' }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}
