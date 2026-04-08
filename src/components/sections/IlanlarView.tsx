'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import ListingCard from '@/components/ui/ListingCard'
import { MOCK_LISTINGS } from '@/lib/mock-listings'
import type { ListingType, PropertyType } from '@/types'

/* ─── Constants ──────────────────────────────────────────────────────── */
const CITIES = ['Tümü', 'Muğla', 'Aydın', 'İzmir', 'Antalya']
const PROPERTY_TYPES: { value: PropertyType | ''; label: string }[] = [
  { value: '', label: 'Tümü' },
  { value: 'APARTMENT', label: 'Daire' },
  { value: 'VILLA', label: 'Villa' },
  { value: 'LAND', label: 'Arsa' },
  { value: 'COMMERCIAL', label: 'Ticari' },
]
const LISTING_TYPES: { value: ListingType | ''; label: string }[] = [
  { value: '', label: 'Tümü' },
  { value: 'SALE', label: 'Satılık' },
  { value: 'RENT', label: 'Kiralık' },
]
const ROOM_OPTIONS = ['1+1', '2+1', '3+1', '4+1', '5+']
const SORT_OPTIONS = [
  { value: 'newest', label: 'En Yeni' },
  { value: 'oldest', label: 'En Eski' },
  { value: 'price_asc', label: 'Fiyat (Artan)' },
  { value: 'price_desc', label: 'Fiyat (Azalan)' },
]
const PER_PAGE = 9

/* ─── Component ──────────────────────────────────────────────────────── */
export default function IlanlarView() {
  const [listingType, setListingType] = useState<ListingType | ''>('')
  const [propertyType, setPropertyType] = useState<PropertyType | ''>('')
  const [city, setCity] = useState('Tümü')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minSqm, setMinSqm] = useState('')
  const [maxSqm, setMaxSqm] = useState('')
  const [rooms, setRooms] = useState<string[]>([])
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = MOCK_LISTINGS.filter((l) => {
      if (listingType && l.listingType !== listingType) return false
      if (propertyType && l.propertyType !== propertyType) return false
      if (city !== 'Tümü' && l.city !== city) return false
      if (minPrice && l.price < Number(minPrice.replace(/\D/g, ''))) return false
      if (maxPrice && l.price > Number(maxPrice.replace(/\D/g, ''))) return false
      if (minSqm && l.sqm < Number(minSqm)) return false
      if (maxSqm && l.sqm > Number(maxSqm)) return false
      if (rooms.length > 0 && !rooms.some((r) => {
        if (r === '5+') return l.rooms ? parseInt(l.rooms) >= 5 : false
        return l.rooms === r
      })) return false
      return true
    })

    result.sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price
      if (sort === 'price_desc') return b.price - a.price
      if (sort === 'oldest') return a.createdAt.getTime() - b.createdAt.getTime()
      return b.createdAt.getTime() - a.createdAt.getTime()
    })

    return result
  }, [listingType, propertyType, city, minPrice, maxPrice, minSqm, maxSqm, rooms, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleRoomToggle(r: string) {
    setPage(1)
    setRooms((prev) => prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r])
  }

  function resetFilters() {
    setListingType('')
    setPropertyType('')
    setCity('Tümü')
    setMinPrice('')
    setMaxPrice('')
    setMinSqm('')
    setMaxSqm('')
    setRooms([])
    setPage(1)
  }

  const hasActiveFilters = listingType || propertyType || city !== 'Tümü' ||
    minPrice || maxPrice || minSqm || maxSqm || rooms.length > 0

  return (
    <div style={{ background: 'var(--sand)', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ background: 'var(--obsidian)', padding: '80px 48px 60px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Link
              href="/"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              Ana Sayfa
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>/</span>
            <span style={{ fontSize: 12, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              İlanlar
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px,4vw,52px)',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1.1,
            }}
          >
            Tüm İlanlar
          </h1>
          <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>
            Bakanlık onaylı ofislerden {MOCK_LISTINGS.length} ilan
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-10">
        {/* Mobile filter toggle */}
        <button
          className="lg:hidden mb-6 flex items-center gap-2 px-5 py-3 text-sm font-medium"
          style={{
            background: 'var(--obsidian)',
            color: 'var(--cream)',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="12" y1="18" x2="20" y2="18" />
          </svg>
          Filtreler {hasActiveFilters && <span style={{ background: 'var(--terracotta)', borderRadius: '50%', width: 8, height: 8, display: 'inline-block' }} />}
        </button>

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          {/* SIDEBAR */}
          <aside
            style={{
              width: 280,
              flexShrink: 0,
              display: sidebarOpen ? 'block' : undefined,
            }}
            className={`hidden lg:block`}
          >
            <div
              style={{
                background: 'var(--cream)',
                borderRadius: 'var(--radius)',
                padding: '28px 24px',
                position: 'sticky',
                top: 100,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--obsidian)' }}>
                  Filtreler
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    style={{
                      fontSize: 11,
                      color: 'var(--terracotta)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Temizle
                  </button>
                )}
              </div>

              {/* İlan Tipi */}
              <FilterSection title="İlan Tipi">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {LISTING_TYPES.map((opt) => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="listingType"
                        checked={listingType === opt.value}
                        onChange={() => { setListingType(opt.value); setPage(1) }}
                        style={{ accentColor: 'var(--terracotta)', width: 15, height: 15 }}
                      />
                      <span style={{ fontSize: 13, color: 'var(--obsidian)', fontWeight: 300 }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Mülk Tipi */}
              <FilterSection title="Mülk Tipi">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {PROPERTY_TYPES.map((opt) => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="propertyType"
                        checked={propertyType === opt.value}
                        onChange={() => { setPropertyType(opt.value); setPage(1) }}
                        style={{ accentColor: 'var(--terracotta)', width: 15, height: 15 }}
                      />
                      <span style={{ fontSize: 13, color: 'var(--obsidian)', fontWeight: 300 }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Şehir */}
              <FilterSection title="Şehir">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {CITIES.map((c) => (
                    <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="city"
                        checked={city === c}
                        onChange={() => { setCity(c); setPage(1) }}
                        style={{ accentColor: 'var(--terracotta)', width: 15, height: 15 }}
                      />
                      <span style={{ fontSize: 13, color: 'var(--obsidian)', fontWeight: 300 }}>{c}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Fiyat */}
              <FilterSection title="Fiyat (TL)">
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => { setMinPrice(e.target.value); setPage(1) }}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => { setMaxPrice(e.target.value); setPage(1) }}
                    style={inputStyle}
                  />
                </div>
              </FilterSection>

              {/* Alan */}
              <FilterSection title="Alan (m²)">
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={minSqm}
                    onChange={(e) => { setMinSqm(e.target.value); setPage(1) }}
                    style={inputStyle}
                    min={0}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxSqm}
                    onChange={(e) => { setMaxSqm(e.target.value); setPage(1) }}
                    style={inputStyle}
                    min={0}
                  />
                </div>
              </FilterSection>

              {/* Oda Sayısı */}
              <FilterSection title="Oda Sayısı" last>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ROOM_OPTIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoomToggle(r)}
                      style={{
                        padding: '5px 12px',
                        fontSize: 12,
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        borderColor: rooms.includes(r) ? 'var(--terracotta)' : 'var(--sand-dark)',
                        background: rooms.includes(r) ? 'var(--terracotta)' : 'transparent',
                        color: rooms.includes(r) ? 'var(--cream)' : 'var(--obsidian)',
                        fontWeight: 300,
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Sort + Result Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24,
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <p style={{ fontSize: 13, color: 'var(--mist)', fontWeight: 300 }}>
                <span style={{ color: 'var(--obsidian)', fontWeight: 500 }}>{filtered.length}</span> ilan bulundu
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12, color: 'var(--mist)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Sırala:
                </span>
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1) }}
                  style={{
                    ...inputStyle,
                    width: 'auto',
                    paddingRight: 32,
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B9098' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Listing Grid */}
            {paginated.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 24,
                }}
              >
                {paginated.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px 24px',
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius)',
                }}
              >
                <svg
                  width="48" height="48" viewBox="0 0 24 24" fill="none"
                  stroke="var(--sand-dark)" strokeWidth="1.5"
                  style={{ margin: '0 auto 20px' }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: 'var(--obsidian)', marginBottom: 8 }}>
                  İlan bulunamadı
                </p>
                <p style={{ fontSize: 14, color: 'var(--mist)', fontWeight: 300, marginBottom: 24 }}>
                  Filtre kriterlerinizi değiştirerek tekrar deneyin.
                </p>
                <button
                  onClick={resetFilters}
                  style={{
                    padding: '10px 24px',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'var(--obsidian)',
                    color: 'var(--cream)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 48,
                }}
              >
                <PageBtn
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  label="←"
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PageBtn
                    key={p}
                    onClick={() => setPage(p)}
                    active={page === p}
                    label={String(p)}
                  />
                ))}
                <PageBtn
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  label="→"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Sub-components ─────────────────────────────────────────────────── */
function FilterSection({
  title,
  children,
  last,
}: {
  title: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <div
      style={{
        paddingBottom: last ? 0 : 20,
        marginBottom: last ? 0 : 20,
        borderBottom: last ? 'none' : '1px solid var(--sand-dark)',
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--mist)',
          marginBottom: 12,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  )
}

function PageBtn({
  onClick,
  active,
  disabled,
  label,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  label: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 38,
        height: 38,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: active ? 500 : 300,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid',
        borderColor: active ? 'var(--terracotta)' : 'var(--sand-dark)',
        background: active ? 'var(--terracotta)' : 'var(--cream)',
        color: active ? 'var(--cream)' : disabled ? 'var(--sand-dark)' : 'var(--obsidian)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  fontSize: 13,
  fontWeight: 300,
  border: '1px solid var(--sand-dark)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--sand)',
  color: 'var(--obsidian)',
  outline: 'none',
  fontFamily: 'var(--font-body)',
}
