import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: "Harita | " + siteConfig.name,
  description: "Türkiye Ege ve Akdeniz kıyılarındaki ilanları haritada keşfedin.",
}

export default function HaritaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
