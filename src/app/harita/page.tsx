import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Harita | ${siteConfig.name}`,
  description: "Türkiye'nin Ege ve Akdeniz kıyılarındaki satılık ve kiralık ilanları haritada keşfedin.",
}

const MapView = dynamic(
  () => import('@/components/sections/MapView'),
  { ssr: false }
)

export default function HaritaPage() {
  return <MapView />
}
