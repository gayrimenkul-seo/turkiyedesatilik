import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import IlanlarView from '@/components/sections/IlanlarView'

export const metadata: Metadata = {
  title: `İlanlar | ${siteConfig.name}`,
  description: `Bodrum, Kuşadası, Çeşme, Fethiye ve daha fazlasında Bakanlık onaylı emlak ofislerinden satılık ve kiralık mülkler.`,
}

export default function IlanlarPage() {
  return (
    <>
      <Navbar />
      <IlanlarView />
      <Footer />
    </>
  )
}
