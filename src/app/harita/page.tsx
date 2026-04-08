'use client'
import dynamic from 'next/dynamic'
const MapView = dynamic(() => import('@/components/sections/MapView'), { ssr: false })
export default function HaritaPage() { return <MapView /> }
