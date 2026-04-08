import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Harita | ${siteConfig.name}`,
  description: 'Türkiye\'nin Ege ve Akdeniz kıyılarındaki satılık ve kiralık ilanları haritada keşfedin.',
}

/* SSR kapalı — Leaflet tarayıcı API'si kullanıyor */
const MapView = dynamic(
  () => import('@/components/sections/MapView'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: '100vh',
          background: 'var(--sand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid var(--sand-dark)',
            borderTopColor: 'var(--terracotta)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p
          style={{
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--mist)',
          }}
        >
          Harita yükleniyor…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    ),
  }
)

export default function HaritaPage() {
  return <MapView />
}
