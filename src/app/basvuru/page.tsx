'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/lib/site-config'

/* ─── Tipler ─────────────────────────────────────────────────────────── */
type FormState = 'idle' | 'sending' | 'sent'

interface FormData {
  officeName: string
  contactName: string
  phone: string
  email: string
  city: string
  licenseNo: string
  description: string
  agreeKvkk: boolean
}

type FormErrors = Partial<Record<keyof FormData, string>>

/* ─── Sabit veriler ──────────────────────────────────────────────────── */
const CITIES = ['Bodrum', 'Kuşadası', 'Çeşme', 'Fethiye', 'Didim', 'Antalya', 'Diğer']

const ADVANTAGES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    text: '500+ aktif alıcı havuzu',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1010 10" />
        <path d="M12 6v6l4 2" />
        <path d="M18 2l4 4-4 4M22 6h-6" />
      </svg>
    ),
    text: 'AI destekli ilan yönetimi',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    text: 'Meta reklam entegrasyonu',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    text: '12 dil desteği',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    text: 'Bakanlık onaylı platform',
  },
]

const STATS = [
  { value: '40+',  label: 'Onaylı Ofis' },
  { value: '342+', label: 'Aktif İlan' },
  { value: '12',   label: 'Dil Desteği' },
]

/* ─── Sayfa ──────────────────────────────────────────────────────────── */
export default function BasvuruPage() {
  const [form, setForm] = useState<FormData>({
    officeName: '',
    contactName: '',
    phone: '',
    email: '',
    city: '',
    licenseNo: '',
    description: '',
    agreeKvkk: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormState>('idle')

  function validate(): boolean {
    const e: FormErrors = {}
    if (!form.officeName.trim())  e.officeName  = 'Firma adı zorunlu'
    if (!form.contactName.trim()) e.contactName = 'Yetkili kişi adı zorunlu'
    if (!form.phone.trim())       e.phone       = 'Telefon numarası zorunlu'
    else if (!/^\+?[0-9\s\-]{7,}$/.test(form.phone)) e.phone = 'Geçerli bir telefon girin'
    if (!form.email.trim())       e.email       = 'E-posta adresi zorunlu'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Geçerli bir e-posta girin'
    if (!form.city)               e.city        = 'Şehir seçiniz'
    if (!form.licenseNo.trim())   e.licenseNo   = 'Lisans numarası zorunlu'
    if (!form.description.trim()) e.description = 'Açıklama zorunlu'
    else if (form.description.trim().length < 20) e.description = 'En az 20 karakter girin'
    if (!form.agreeKvkk)          e.agreeKvkk  = 'KVKK onayı zorunlu'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setForm((prev) => ({ ...prev, [name]: val }))
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

      {/* ── İki sütunlu ana bölüm ── */}
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '420px 1fr',
          paddingTop: 80, /* navbar yüksekliği */
        }}
      >
        {/* ── Sol panel (obsidian) ── */}
        <div
          style={{
            background: 'var(--obsidian)',
            padding: '72px 48px',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 80,
            height: 'calc(100vh - 80px)',
            overflowY: 'auto',
          }}
        >
          {/* Dekor */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(184,146,58,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: -40,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(196,85,42,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', flex: 1 }}>
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--cream)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                marginBottom: 56,
              }}
            >
              Türkiye&apos;de{' '}
              <span style={{ color: 'var(--terracotta)' }}>Satılık</span>
            </Link>

            {/* Başlık */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3vw, 38px)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: 'var(--cream)',
                marginBottom: 16,
              }}
            >
              Ofisinizi
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                Platforma Taşıyın
              </em>
            </h1>
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.45)',
                marginBottom: 44,
                maxWidth: 300,
              }}
            >
              Bakanlık onaylı ofislerin tercih ettiği gayrimenkul platformunda
              binlerce uluslararası alıcıya ulaşın.
            </p>

            {/* Avantajlar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
              {ADVANTAGES.map((item) => (
                <div
                  key={item.text}
                  style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(184,146,58,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold)',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* İstatistikler */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: '18px 14px',
                    background: 'rgba(255,255,255,0.03)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 26,
                      fontWeight: 300,
                      color: 'var(--terracotta)',
                      lineHeight: 1,
                      marginBottom: 5,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.3)',
                      fontWeight: 400,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alt — iletişim */}
          <div
            style={{
              paddingTop: 28,
              borderTop: '1px solid rgba(255,255,255,0.07)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              fontWeight: 300,
            }}
          >
            Sorularınız için{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              style={{ color: 'rgba(184,146,58,0.7)', textDecoration: 'none' }}
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        {/* ── Sağ panel (form) ── */}
        <div
          style={{
            background: 'var(--sand)',
            padding: '72px 64px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 560 }}>
            {status === 'sent' ? (
              <SuccessState />
            ) : (
              <>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 28,
                    fontWeight: 300,
                    color: 'var(--obsidian)',
                    marginBottom: 6,
                  }}
                >
                  Başvuru Formu
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--mist)',
                    fontWeight: 300,
                    marginBottom: 36,
                    lineHeight: 1.6,
                  }}
                >
                  Başvurunuz 3–5 iş günü içinde değerlendirilir, e-posta ile bildirim yapılır.
                </p>

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

                  {/* Firma adı + Lisans no */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <Field
                      label="Firma Adı" name="officeName" type="text"
                      placeholder="Ofis veya şirket adı"
                      value={form.officeName} onChange={handleChange}
                      error={errors.officeName} required
                    />
                    <Field
                      label="Bakanlık Lisans No" name="licenseNo" type="text"
                      placeholder="Örn: 2024-MU-1234"
                      value={form.licenseNo} onChange={handleChange}
                      error={errors.licenseNo} required
                    />
                  </div>

                  {/* Yetkili + Telefon */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <Field
                      label="Yetkili Kişi" name="contactName" type="text"
                      placeholder="Ad Soyad"
                      value={form.contactName} onChange={handleChange}
                      error={errors.contactName} required
                    />
                    <Field
                      label="Telefon" name="phone" type="tel"
                      placeholder="+90 5XX XXX XX XX"
                      value={form.phone} onChange={handleChange}
                      error={errors.phone} required
                    />
                  </div>

                  {/* E-posta + Şehir */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <Field
                      label="E-posta" name="email" type="email"
                      placeholder="ofis@domain.com"
                      value={form.email} onChange={handleChange}
                      error={errors.email} required
                    />
                    <SelectField
                      label="Şehir" name="city"
                      value={form.city} onChange={handleChange}
                      options={CITIES} error={errors.city} required
                    />
                  </div>

                  {/* Açıklama */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>
                      Ofis Hakkında{' '}
                      <span style={{ color: 'var(--terracotta)' }}>*</span>
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Ofisiniz, uzmanlık alanlarınız ve platforma katılmak isteme nedeniniz hakkında kısaca bilgi verin…"
                      style={{
                        ...inputBase,
                        resize: 'vertical',
                        borderColor: errors.description ? 'var(--terracotta)' : 'rgba(0,0,0,0.1)',
                      }}
                    />
                    {errors.description && <Err msg={errors.description} />}
                  </div>

                  {/* KVKK */}
                  <div style={{ marginBottom: 28 }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        name="agreeKvkk"
                        checked={form.agreeKvkk}
                        onChange={handleChange}
                        style={{
                          marginTop: 2,
                          accentColor: 'var(--terracotta)',
                          flexShrink: 0,
                          width: 15,
                          height: 15,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          color: 'var(--mist)',
                          fontWeight: 300,
                          lineHeight: 1.65,
                        }}
                      >
                        <Link
                          href="/kvkk"
                          style={{ color: 'var(--terracotta)', textDecoration: 'none' }}
                        >
                          KVKK Aydınlatma Metni
                        </Link>
                        {' '}ve{' '}
                        <Link
                          href="/gizlilik"
                          style={{ color: 'var(--terracotta)', textDecoration: 'none' }}
                        >
                          Gizlilik Politikası
                        </Link>
                        &apos;nı okudum, kişisel verilerimin işlenmesine onay veriyorum.
                      </span>
                    </label>
                    {errors.agreeKvkk && <Err msg={errors.agreeKvkk} />}
                  </div>

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '13px 32px',
                        background: 'var(--terracotta)',
                        color: 'var(--cream)',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-body)',
                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                        opacity: status === 'sending' ? 0.72 : 1,
                        transition: 'background 0.2s, opacity 0.2s',
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <SpinIcon />
                          Gönderiliyor…
                        </>
                      ) : (
                        'Başvuruyu Gönder'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

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

const inputBase: React.CSSProperties = {
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
function Field({
  label, name, type, placeholder, value, onChange, error, required,
}: {
  label: string; name: string; type: string; placeholder: string
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--terracotta)' }}> *</span>}
      </label>
      <input
        id={name} name={name} type={type}
        placeholder={placeholder} value={value}
        onChange={onChange} required={required}
        style={{ ...inputBase, borderColor: error ? 'var(--terracotta)' : 'rgba(0,0,0,0.1)' }}
      />
      {error && <Err msg={error} />}
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
        {label}{required && <span style={{ color: 'var(--terracotta)' }}> *</span>}
      </label>
      <select
        id={name} name={name} value={value}
        onChange={onChange} required={required}
        style={{
          ...inputBase,
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
      {error && <Err msg={error} />}
    </div>
  )
}

function Err({ msg }: { msg: string }) {
  return (
    <span
      style={{
        display: 'block',
        fontSize: 11,
        color: 'var(--terracotta)',
        marginTop: 4,
        fontWeight: 300,
      }}
    >
      {msg}
    </span>
  )
}

function SpinIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  )
}

function SuccessState() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 40 }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(184,146,58,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          color: 'var(--gold)',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 32,
          fontWeight: 300,
          color: 'var(--obsidian)',
          marginBottom: 12,
        }}
      >
        Başvurunuz alındı
      </h2>
      <p
        style={{
          fontSize: 14,
          color: 'var(--mist)',
          fontWeight: 300,
          lineHeight: 1.75,
          maxWidth: 400,
          margin: '0 auto 36px',
        }}
      >
        Ekibimiz başvurunuzu 3–5 iş günü içinde inceleyecek ve{' '}
        <strong style={{ fontWeight: 400, color: 'var(--obsidian)' }}>e-posta</strong>{' '}
        ile size geri dönecektir.
      </p>
      <Link href="/" className="btn-primary">
        Ana Sayfaya Dön
      </Link>
    </div>
  )
}
