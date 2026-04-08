import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import OfislerView from '@/components/sections/OfislerView'

export const metadata: Metadata = {
  title: `Doğrulanmış Emlak Ofisleri | ${siteConfig.name}`,
  description:
    'Türkiye\'nin Ege ve Akdeniz kıyılarında Ticaret Bakanlığı onaylı, güvenilir emlak ofislerini keşfedin.',
}

export default function OfislerPage() {
  return (
    <>
      <Navbar />
      <OfislerView />
      <Footer />
    </>
  )
}
