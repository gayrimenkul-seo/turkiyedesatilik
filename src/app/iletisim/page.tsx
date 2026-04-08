'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/site-config'

type FormState = 'idle' | 'sending' | 'sent'
type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}
type FormErrors = Partial<Record<keyof FormData, string>>

const SUBJECTS = [
  'Mülk Satın Alma',
  'Yatırım Danışmanlığı',
  'Ofis Başvurusu',
  'İlan Bildirimi',
  'Teknik Destek',
  'Diğer',
]

export default function IletisimPage() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormState>('idle')

  function validate(): boolean {
    const e: FormErrors = {}
    if (!form.name.trim())    e.name    = 'Ad soyad zorunlu'
    if (!form.email.trim())   e.email   = 'E-posta zorunlu'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Geçerli bir e-posta girin'
    if (!form.subject)        e.subject = 'Konu seçiniz'
    if (!form.message.trim()) e.message = 'Mesaj zorunlu'
    else if (form.message.trim().length < 10) e.message = 'En az 10 karakter girin'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1600)
  }

  return (
    <>
      <ScrollReveal />
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          background: 'var(--obsidian)',
          padding: '160px 48px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', top: -80, right: -60,
            width: 480, height: 480, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,85,42,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="max-w-[1400px] mx-auto reveal">
          <span
            style={{
              display: 'block', fontSize: 10, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 16,
            }}
          >
            İletişim
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 68px)',
              fontWeight: 300, lineHeight: 1.05,
              color: 'var(--cream)', marginBottom: 20,
            }}
          >
            Size nasıl
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>yardımcı olabiliriz?</em>
          </h1>
          <p
            style={{
              fontSize: 16, fontWeight: 300, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.5)', maxWidth: 500,
            }}
          >
            Mülk arayışı, yatırım danışmanlığı veya ofis başvurusu için ekibimiz hazır.
            En geç 24 saat içinde anadilinizdeki uzmanımız size geri döner.
          </p>
        </div>
      </section>

      {/* ── Ana içerik ── */}
      <section style={{ background: 'var(--sand)', padding: '80px 48px' }}>
        <div
          className="max-w-[1400px] mx-auto"
          style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 64 }}
        >

          {/* ── Sol: İletişim Bilgileri ── */}
          <div>
            {/* Hızlı iletişim kartı */}
            <div
              style={{
                background: 'var(--obsidian)',
                borderRadius: 'var(--radius-md)',
                padding: '32px',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--gold)', marginBottom: 24,
                }}
              >
                İletişim Bilgileri
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <InfoRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13.5a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 2.68h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 10.34a16 16 0 005.72 5.72l1.73-1.73a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  }
                  label="Telefon"
                  value={siteConfig.contact.phone}
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                />
                <InfoRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  }
                  label="E-posta"
                  value={siteConfig.contact.email}
                  href={`mailto:${siteConfig.contact.email}`}
                />
                <InfoRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  }
                  label="Adres"
                  value={siteConfig.contact.address.full}
                />
              </div>

              <div
                style={{
                  marginTop: 24, paddingTop: 24,
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div
                  style={{
                    fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.25)', marginBottom: 12,
                  }}
                >
                  Çalışma Saatleri
                </div>
                {[
                  { day: 'Pazartesi – Cuma', hours: '09:00 – 18:00' },
                  { day: 'Cumartesi',        hours: '10:00 – 14:00' },
                  { day: 'Pazar',            hours: 'Kapalı' },
                ].map((row) => (
                  <div
                    key={row.day}
                    style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: 12, color: 'rgba(255,255,255,0.4)',
                      fontWeight: 300, marginBottom: 6,
                    }}
                  >
                    <span>{row.day}</span>
                    <span style={{ color: row.hours === 'Kapalı' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)' }}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Harita placeholder */}
            <div
              style={{
                height: 200,
                borderRadius: 'var(--radius-md)',
                background: 'var(--sand-dark)',
                border: '1px solid rgba(0,0,0,0.07)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--mist)" strokeWidth="1">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div style={{ fontSize: 12, color: 'var(--mist)', textAlign: 'center', padding: '0 20px' }}>
                {siteConfig.contact.address.city} / {siteConfig.contact.address.province}
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 11, color: 'var(--terracotta)', textDecoration: 'none',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}
              >
                Haritada Göster →
              </a>
            </div>
          </div>

          {/* ── Sağ: Form ── */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)', fontSize: 30,
                fontWeight: 300, color: 'var(--obsidian)', marginBottom: 8,
              }}
            >
              Mesaj Gönderin
            </h2>
            <p style={{ fontSize: 13, color: 'var(--mist)', fontWeight: 300, marginBottom: 36 }}>
              Tüm alanları doldurun, ekibimiz en kısa sürede dönüş yapacak.
            </p>

            {status === 'sent' ? (
              <SuccessState onReset={() => {
                setStatus('idle')
                setForm({ name: '', email: '', phone: '', subject: '', message: '' })
              }} />
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <FormField
                    label="Ad Soyad" name="name" type="text"
                    placeholder="Adınız Soyadınız"
                    value={form.name} onChange={handleChange}
                    error={errors.name} required
                  />
                  <FormField
                    label="E-posta" name="email" type="email"
                    placeholder="ornek@mail.com"
                    value={form.email} onChange={handleChange}
                    error={errors.email} required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <FormField
                    label="Telefon" name="phone" type="tel"
                    placeholder="+90 5XX XXX XX XX"
                    value={form.phone} onChange={handleChange}
                  />
                  <SelectField
                    label="Konu" name="subject"
                    value={form.subject} onChange={handleChange}
                    options={SUBJECTS} error={errors.subject} required
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>
                    Mesajınız <span style={{ color: 'var(--terracotta)' }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Bize iletmek istediğinizi kısaca yazın…"
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      borderColor: errors.message ? 'var(--terracotta)' : 'rgba(0,0,0,0.1)',
                    }}
                  />
                  {errors.message && <ErrorMsg msg={errors.message} />}
                </div>

                <p
                  style={{
                    fontSize: 11, color: 'var(--mist)', fontWeight: 300,
                    lineHeight: 1.6, marginBottom: 24,
                  }}
                >
                  Formu göndererek{' '}
                  <Link href="/gizlilik" style={{ color: 'var(--terracotta)', textDecoration: 'none' }}>
                    Gizlilik Politikamızı
                  </Link>{' '}
                  ve{' '}
                  <Link href="/kvkk" style={{ color: 'var(--terracotta)', textDecoration: 'none' }}>
                    KVKK Aydınlatma Metnini
                  </Link>{' '}
                  kabul etmiş olursunuz.
                </p>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  style={{
                    border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    opacity: status === 'sending' ? 0.75 : 1,
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <SpinIcon />
                      Gönderiliyor…
                    </>
                  ) : (
                    <>
                      Gönder
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <Footer />
    </>
  )
}

/* ─── Stil sabitleri ─────────────────────────────────────────────────── */
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--mist)',
  fontWeight: 400,
  marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  background: 'var(--cream)',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: 'var(--radius)',
  color: 'var(--obsidian)',
  fontSize: 13,
  fontFamily: 'var(--font-body)',
  fontWeight: 300,
  outline: 'none',
  boxSizing: 'border-box',
}

/* ─── Alt bileşenler ─────────────────────────────────────────────────── */
function FormField({
  label, name, type, placeholder, value, onChange, error, required,
}: {
  label: string; name: string; type: string; placeholder: string
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} style={labelStyle}>
        {label} {required && <span style={{ color: 'var(--terracotta)' }}>*</span>}
      </label>
      <input
        id={name} name={name} type={type}
        placeholder={placeholder} value={value}
        onChange={onChange} required={required}
        style={{ ...inputStyle, borderColor: error ? 'var(--terracotta)' : 'rgba(0,0,0,0.1)' }}
      />
      {error && <ErrorMsg msg={error} />}
    </div>
  )
}

function SelectField({
  label, name, value, onChange, options, error, required,
}: {
  label: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]; error?: string; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} style={labelStyle}>
        {label} {required && <span style={{ color: 'var(--terracotta)' }}>*</span>}
      </label>
      <select
        id={name} name={name} value={value}
        onChange={onChange} required={required}
        style={{
          ...inputStyle,
          appearance: 'none',
          borderColor: error ? 'var(--terracotta)' : 'rgba(0,0,0,0.1)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B9098' strokeWidth='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: 32,
        }}
      >
        <option value="">Seçiniz…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <ErrorMsg msg={error} />}
    </div>
  )
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <span style={{ display: 'block', fontSize: 11, color: 'var(--terracotta)', marginTop: 4, fontWeight: 300 }}>
      {msg}
    </span>
  )
}

function InfoRow({
  icon, label, value, href,
}: {
  icon: React.ReactNode; label: string; value: string; href?: string
}) {
  const content = (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ marginTop: 1, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 300, lineHeight: 1.5 }}>
          {value}
        </div>
      </div>
    </div>
  )
  return href ? (
    <a href={href} style={{ textDecoration: 'none' }}>{content}</a>
  ) : (
    <div>{content}</div>
  )
}

function SpinIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div
      style={{
        padding: '52px 40px', background: 'var(--cream)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(0,0,0,0.06)', textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'rgba(56,161,105,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', color: '#38A169',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)', fontSize: 26,
          fontWeight: 300, color: 'var(--obsidian)', marginBottom: 10,
        }}
      >
        Mesajınız alındı
      </h3>
      <p
        style={{
          fontSize: 13, color: 'var(--mist)', fontWeight: 300,
          lineHeight: 1.7, marginBottom: 28, maxWidth: 360, margin: '0 auto 28px',
        }}
      >
        En geç 24 saat içinde size döneceğiz. Acil durumlar için{' '}
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          style={{ color: 'var(--terracotta)', textDecoration: 'none' }}
        >
          {siteConfig.contact.phone}
        </a>{' '}
        numarasını arayabilirsiniz.
      </p>
      <button onClick={onReset} className="btn-outline" style={{ border: '1px solid var(--obsidian)' }}>
        Yeni Mesaj Gönder
      </button>
    </div>
  )
}
