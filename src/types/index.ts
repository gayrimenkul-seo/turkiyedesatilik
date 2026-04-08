// ─── Listing (İlan) ───────────────────────────────────────────────────
export type ListingType = 'SALE' | 'RENT' | 'PROJECT'
export type PropertyType = 'APARTMENT' | 'VILLA' | 'LAND' | 'COMMERCIAL'
export type ViewType = 'SEA' | 'CITY' | 'NATURE' | 'LAKE' | 'MOUNTAIN' | 'NONE'
export type ListingStatus = 'ACTIVE' | 'PASSIVE' | 'SOLD' | 'RENTED' | 'DRAFT'
export type Currency = 'TRY' | 'EUR' | 'USD'

export interface Listing {
  id: string
  slug: string
  title: string
  description: string

  listingType: ListingType
  propertyType: PropertyType
  status: ListingStatus

  price: number
  currency: Currency
  pricePerSqm?: number

  city: string
  district: string
  neighborhood?: string
  address?: string
  lat?: number
  lng?: number

  sqm: number
  rooms?: string        // "3+1", "2+1" vb.
  bathrooms?: number
  floors?: number
  buildingFloor?: number
  age?: number          // yıl

  viewType?: ViewType
  hasPool?: boolean
  hasGarage?: boolean
  hasGarden?: boolean
  isFurnished?: boolean

  images: ListingImage[]
  agent: Agent
  office: Office

  isRadar?: boolean     // öne çıkan ilan
  createdAt: Date
  updatedAt: Date
}

export interface ListingImage {
  id: string
  url: string
  thumbUrl: string
  alt: string
  order: number
}

// ─── Office (Emlak Ofisi) ─────────────────────────────────────────────
export type OfficeStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED'

export interface Office {
  id: string
  slug: string
  name: string
  logo?: string
  phone: string
  email: string
  address: string
  city: string
  district?: string
  lat?: number
  lng?: number

  licenseNo: string       // Bakanlık yetki no
  isVerified: boolean
  status: OfficeStatus

  agents: Agent[]
  listings?: Listing[]

  createdAt: Date
}

// ─── Agent (Emlakçı) ──────────────────────────────────────────────────
export interface Agent {
  id: string
  name: string
  avatar?: string
  phone: string
  email: string
  officeId: string
  office?: Office
  listings?: Listing[]
}

// ─── User ─────────────────────────────────────────────────────────────
export type UserRole = 'BUYER' | 'AGENT' | 'OFFICE_OWNER' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: UserRole
  preferredLocale: string
  savedListings?: string[]
  createdAt: Date
}

// ─── Search / Filter ──────────────────────────────────────────────────
export interface SearchFilters {
  listingType?: ListingType
  propertyType?: PropertyType
  city?: string
  district?: string
  neighborhood?: string
  minPrice?: number
  maxPrice?: number
  currency?: Currency
  minSqm?: number
  maxSqm?: number
  rooms?: string
  viewType?: ViewType
  hasPool?: boolean
  sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc'
  page?: number
  limit?: number
}

export interface SearchResult {
  listings: Listing[]
  total: number
  page: number
  totalPages: number
}

// ─── Region ───────────────────────────────────────────────────────────
export interface Region {
  slug: string
  name: string
  city: string
  district?: string
  description?: string
  image?: string
  listingCount: number
  lat: number
  lng: number
}

// ─── Lead (Müşteri Talebi) ────────────────────────────────────────────
export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  preferredLocale: string
  listingId?: string
  officeId?: string
  status: 'NEW' | 'CONTACTED' | 'CLOSED'
  createdAt: Date
}
