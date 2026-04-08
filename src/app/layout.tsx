import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/lib/site-config'
import CustomCursor from '@/components/ui/CustomCursor'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Türkiye emlak', 'satılık villa', 'satılık daire', 'Bodrum', 'Kuşadası',
    'Çeşme', 'Fethiye', 'Antalya', 'yurt dışından emlak', 'Türkiye yatırım',
    'Immobilien Türkei', 'property Turkey', 'real estate Turkey',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: ['de_DE', 'en_US'],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <div id="cursor" aria-hidden="true" />
        <div id="cursor-ring" aria-hidden="true" />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
