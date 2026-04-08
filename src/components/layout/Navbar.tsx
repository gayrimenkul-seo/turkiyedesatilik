'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const navLinks = [
  { label: 'Satılık', href: '/satilik' },
  { label: 'Kiralık', href: '/kiralik' },
  { label: 'Bölgeler', href: '/bolgeler' },
  { label: 'Ofisler', href: '/ofisler' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(245,240,232,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
          padding: scrolled ? '14px 48px' : '20px 48px',
          mixBlendMode: scrolled ? 'normal' : 'multiply',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[22px] font-semibold tracking-[0.02em] text-obsidian no-underline"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Türkiye&apos;de{' '}
          <span className="text-terracotta">Satılık</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-normal tracking-[0.06em] uppercase text-obsidian no-underline opacity-70 hover:opacity-100 transition-opacity duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/giris"
            className="text-[12px] font-medium tracking-[0.08em] uppercase bg-obsidian text-cream no-underline px-[22px] py-[10px] hover:bg-terracotta transition-colors duration-200"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            Giriş Yap
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1 bg-transparent border-none text-obsidian"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(15,16,16,0.5)' }}
          onClick={() => setMenuOpen(false)}
        />
        {/* drawer */}
        <div
          className="absolute top-0 right-0 h-full w-[280px] flex flex-col pt-20 pb-10 px-8 transition-transform duration-300"
          style={{
            background: 'var(--sand)',
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <nav className="flex flex-col gap-6 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-light tracking-[0.04em] text-obsidian no-underline border-b pb-4 opacity-80 hover:opacity-100"
                style={{ borderColor: 'var(--sand-dark)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/giris"
              className="text-center text-[13px] font-medium tracking-[0.07em] uppercase bg-obsidian text-cream no-underline py-4 hover:bg-terracotta transition-colors"
              style={{ borderRadius: 'var(--radius-sm)' }}
              onClick={() => setMenuOpen(false)}
            >
              Giriş Yap
            </Link>
            <Link
              href="/kayit"
              className="text-center text-[13px] font-medium tracking-[0.07em] uppercase border text-obsidian no-underline py-4 hover:border-terracotta hover:text-terracotta transition-colors"
              style={{ borderRadius: 'var(--radius-sm)', borderColor: 'var(--obsidian)' }}
              onClick={() => setMenuOpen(false)}
            >
              Kayıt Ol
            </Link>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="text-[13px] text-mist no-underline hover:text-obsidian transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[12px] text-mist no-underline hover:text-obsidian transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
