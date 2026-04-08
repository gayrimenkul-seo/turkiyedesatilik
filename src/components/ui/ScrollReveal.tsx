'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('visible')

          // Stagger children if they exist
          const children = entry.target.querySelectorAll<HTMLElement>(
            '.feature-card, .listing-card, .testi-card, .region-card'
          )
          children.forEach((child, i) => {
            child.style.opacity = '0'
            child.style.transform = 'translateY(20px)'
            child.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`
            requestAnimationFrame(() => {
              setTimeout(() => {
                child.style.opacity = '1'
                child.style.transform = 'translateY(0)'
              }, 50)
            })
          })

          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
