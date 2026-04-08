# Türkiye'de Satılık — Claude Code Rehberi

## Proje Özeti
Premium Türkiye gayrimenkul platformu. Bodrum merkezli, Bakanlık onaylı ofislere özel.

## Firma Bilgileri
- **İsim:** Türkiye'de Satılık
- **Domain:** turkiyedesatilik.com
- **E-posta:** info@turkiyedesatilik.com
- **Telefon:** +90 545 169 29 28
- **Adres:** Ağa Kuyusu Sk. No:2, Müskebi, 48420 Bodrum / Muğla

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Dil:** TypeScript (strict)
- **Stil:** Tailwind CSS + CSS değişkenleri (tasarım token'ları `globals.css`'de)
- **Veritabanı:** PostgreSQL 15+ + Prisma ORM
- **Cache:** Redis
- **Depolama:** Cloudflare R2 (S3 uyumlu)
- **i18n:** next-intl (12 dil)
- **Mobil:** React Native / Expo (ayrı repo)

## Tasarım Sistemi
CSS değişkenleri `src/app/globals.css` dosyasında tanımlı:
```
--sand, --sand-dark     → arka plan tonları
--obsidian              → ana koyu renk
--aegean                → mavi vurgu
--terracotta            → ana vurgu (CTA, badge)
--gold                  → ikincil vurgu
--mist                  → yardımcı metin
--cream                 → kart arka planı
--font-display          → Cormorant Garamond (serif)
--font-body             → DM Sans
```

## Klasör Yapısı
```
src/
├── app/
│   ├── layout.tsx          ← root layout, font yükleme
│   ├── page.tsx            ← ana sayfa
│   ├── globals.css         ← token'lar, global stiller
│   ├── ilanlar/            ← ilan listesi
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx ← ilan detay
│   ├── harita/             ← harita görünümü
│   ├── ofisler/            ← ofis rehberi
│   ├── giris/              ← auth sayfaları
│   ├── kayit/
│   ├── hakkimizda/
│   ├── iletisim/
│   └── api/                ← API route'ları
│       ├── listings/
│       ├── offices/
│       ├── leads/
│       └── auth/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/           ← sayfa bölümleri
│   │   ├── HeroSection.tsx
│   │   └── SearchBar.tsx
│   └── ui/                 ← tekrar kullanılabilir bileşenler
│       ├── ListingCard.tsx
│       ├── CustomCursor.tsx
│       └── ScrollReveal.tsx
├── lib/
│   └── site-config.ts      ← tüm firma sabit bilgileri burada
├── types/
│   └── index.ts            ← TypeScript tipleri
└── prisma/
    └── schema.prisma       ← veritabanı şeması
```

## Önemli Kurallar
1. **Firma bilgilerini** asla hardcode etme — `src/lib/site-config.ts` dosyasından al
2. **Renkleri** `var(--terracotta)` gibi CSS değişkenleriyle kullan
3. **Yazı tiplerini** `var(--font-display)` ve `var(--font-body)` ile kullan
4. **'use client'** yalnızca gerçekten interaktif bileşenlere ekle
5. **Görseller** Next.js `<Image>` ile, format: webp
6. **API rotaları** `src/app/api/` altında Route Handler olarak
7. **Veritabanı** her zaman Prisma Client üzerinden eriş

## Hızlı Başlangıç
```bash
npm install
cp .env.example .env.local    # .env.local'i düzenle
npx prisma migrate dev
npm run dev
```

## Sonraki Sayfalar (öncelik sırasına göre)
- [ ] `/ilanlar` — filtreleme, sayfalama, sıralama
- [ ] `/ilanlar/[slug]` — ilan detay, galeri, iletişim formu
- [ ] `/harita` — Leaflet/Google Maps entegrasyonu
- [ ] `/ofisler` — ofis listesi ve profilleri
- [ ] `/giris` ve `/kayit` — auth akışı
- [ ] `/api/listings` — CRUD endpoint'leri
- [ ] Admin paneli
- [ ] React Native mobil uygulama
