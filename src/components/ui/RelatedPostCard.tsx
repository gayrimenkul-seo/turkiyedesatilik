'use client'

import Link from 'next/link'

interface RelatedPost {
  slug: string
  category: string
  categoryColor: string
  coverColor: string
  title: string
  date: string
  readTime: number
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function RelatedPostCard({ post }: { post: RelatedPost }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'var(--cream)',
          borderRadius: 'var(--radius-md)',
          padding: '22px',
          border: '1px solid rgba(0,0,0,0.06)',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: 9, letterSpacing: '0.1em',
            textTransform: 'uppercase', fontWeight: 500,
            padding: '3px 8px', borderRadius: 'var(--radius-sm)',
            background: `${post.coverColor}15`,
            color: post.categoryColor,
            marginBottom: 12,
          }}
        >
          {post.category}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16, fontWeight: 400,
            lineHeight: 1.3, color: 'var(--obsidian)',
            marginBottom: 10,
          }}
        >
          {post.title}
        </h3>
        <div
          style={{
            fontSize: 11, color: 'var(--mist)',
            display: 'flex', justifyContent: 'space-between',
          }}
        >
          <span>{formatDate(post.date)}</span>
          <span>{post.readTime} dk</span>
        </div>
      </div>
    </Link>
  )
}
