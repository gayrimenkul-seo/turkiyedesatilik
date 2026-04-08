'use client'

import Link from 'next/link'

type Category = 'Yatırım Rehberi' | 'Bölge Tanıtımı' | 'Hukuki Bilgi' | 'Piyasa Analizi'

export interface BlogPost {
  slug: string
  category: Category
  title: string
  excerpt: string
  date: string
  readTime: number
  coverColor: string
  coverIcon: string
}

const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  'Yatırım Rehberi': { bg: 'rgba(196,85,42,0.1)',   text: 'var(--terracotta)' },
  'Bölge Tanıtımı':  { bg: 'rgba(27,79,107,0.1)',   text: 'var(--aegean)' },
  'Hukuki Bilgi':    { bg: 'rgba(184,146,58,0.1)',   text: 'var(--gold)' },
  'Piyasa Analizi':  { bg: 'rgba(139,144,152,0.15)', text: 'var(--mist)' },
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const cat = CATEGORY_COLORS[post.category]

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article
        style={{
          background: 'var(--cream)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.06)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          height: '100%',
        }}
        onMouseOver={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(-3px)'
          el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'
        }}
        onMouseOut={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
        }}
      >
        {/* Cover placeholder */}
        <div
          style={{
            height: 200,
            background: `linear-gradient(135deg, ${post.coverColor}18 0%, ${post.coverColor}08 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: `2px solid ${post.coverColor}20`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute', bottom: -30, right: -30,
              width: 120, height: 120, borderRadius: '50%',
              background: `${post.coverColor}10`,
            }}
          />
          <div
            style={{
              width: 56, height: 56, borderRadius: '50%',
              background: `${post.coverColor}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: post.coverColor,
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d={post.coverIcon} />
            </svg>
          </div>
        </div>

        {/* İçerik */}
        <div style={{ padding: '22px 24px 26px' }}>
          <div
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 10, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontWeight: 500,
                padding: '3px 9px', borderRadius: 'var(--radius-sm)',
                background: cat.bg, color: cat.text,
              }}
            >
              {post.category}
            </span>
            <span style={{ fontSize: 11, color: 'var(--mist)', fontWeight: 300 }}>
              {post.readTime} dk okuma
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18, fontWeight: 400,
              lineHeight: 1.3, color: 'var(--obsidian)',
              marginBottom: 10,
            }}
          >
            {post.title}
          </h2>

          <p
            style={{
              fontSize: 13, lineHeight: 1.72,
              color: 'var(--mist)', fontWeight: 300,
              marginBottom: 18,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </p>

          <div
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 16,
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <span style={{ fontSize: 11, color: 'var(--mist)', fontWeight: 300 }}>
              {formatDate(post.date)}
            </span>
            <span
              style={{
                fontSize: 11, color: 'var(--terracotta)',
                letterSpacing: '0.04em', fontWeight: 400,
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              Oku
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
