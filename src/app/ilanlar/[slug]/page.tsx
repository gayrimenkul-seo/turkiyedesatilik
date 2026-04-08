import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/site-config'
import { MOCK_LISTINGS } from '@/lib/mock-listings'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ListingDetailView from '@/components/sections/ListingDetailView'

/* ─── Static Params (build-time pre-render) ─── */
export function generateStaticParams() {
  return MOCK_LISTINGS.map((l) => ({ slug: l.slug }))
}

/* ─── Metadata ──────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const listing = MOCK_LISTINGS.find((l) => l.slug === slug)
  if (!listing) return {}

  const title = `${listing.title} — ${listing.district}, ${listing.city}`
  const description = listing.description.slice(0, 160) || siteConfig.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/ilanlar/${listing.slug}`,
      type: 'article',
    },
  }
}

/* ─── Page ──────────────────────────────────── */
export default async function IlanDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const listing = MOCK_LISTINGS.find((l) => l.slug === slug)
  if (!listing) notFound()

  const similar = MOCK_LISTINGS.filter(
    (l) => l.city === listing.city && l.id !== listing.id
  ).slice(0, 3)

  return (
    <>
      <Navbar />
      <ListingDetailView listing={listing} similar={similar} />
      <Footer />
    </>
  )
}
