'use client'
import { useState } from 'react'
import Link from 'next/link'

/* ─── Şifre güç hesaplama ───────────────────────────────── */
interface StrengthResult {
  score: number       // 0–4
  label: string
  color: string
}

function getPasswordStrength(password: string): StrengthResult {
  if (!password) return { score: 0, label: '', color: 'var(--sand-dark)' }
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  const capped = Math.min(score, 4)
  const levels = [
    { label: 'Çok Zayıf', color: '#e53e3e' },
    { label: 'Zayıf',     color: '#ed8936' },
    { label: 'Orta',      color: '#ecc94b' },
    { label: 'Güçlü',     color: '#68d391' },
    { label: 'Çok Güçlü', color: '#38a169' },
  ]
  return { score: capped, ...levels[capped] }
}

/* ─── Form tipi ─────────────────────────────────────────── */
interface FormState {
  fullName: string
  email: string
  phone: string
  password: string
  passwordConfirm: string
  kvkk: boolean
}
type ErrorMap = Partial<Record<keyof FormState, string>>

function validate(form: FormState): ErrorMap {
  const e: ErrorMap = {}
  if (!form.fullName.trim()) e.fullName = 'Ad soyad zorunludur.'
  else if (form.fullName.trim().split(' ').length < 2) e.fullName = 'Lütfen ad ve soyadınızı girin.'

  if (!form.email.trim()) e.email = 'E-posta zorunludur.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Geçerli bir e-posta girin.'

  if (form.phone && !/^[+\d\s()-]{7,15}$/.test(form.phone))
    e.phone = 'Geçerli bir telefon numarası girin.'

  if (!form.password) e.password = 'Şifre zorunludur.'
  else if (form.password.length < 8) e.password = 'Şifre en az 8 karakter olmalıdır.'

  if (!form.passwordConfirm) e.passwordConfirm = 'Şifre tekrarı zorunludur.'
  else if (form.password !== form.passwordConfirm) e.passwordConfirm = 'Şifreler eşleşmiyor.'

  if (!form.kvkk) e.kvkk = 'Devam etmek için KVKK metnini onaylamanız gerekiyor.'

  return e
}

/* ─── Sayfa ─────────────────────────────────────────────── */
export default function KayitPage() {
  const [form, setForm] = useState<FormState>({
    fullName: '', email: '', phone: '',
    password: '', passwordConfirm: '', kvkk: false,
  })
  const [errors, setErrors] = useState<ErrorMap>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [showPw, setShowPw] = useState(false)
  const [showPwConfirm, setShowPwConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const strength = getPasswordStrength(form.password)

  function touch(field: keyof FormState) {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate({ ...form }))
  }

  function handleChange(field: keyof FormState, value: string | boolean) {
    const updated = { ...form, [field]: value }
    setForm(updated)
    if (touched[field]) setErrors(validate(updated))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    const allTouched = Object.fromEntries(
      (Object.keys(form) as (keyof FormState)[]).map((k) => [k, true])
    )
    setTouched(allTouched)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1400)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* ── Sol Dekoratif Panel ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: '42%',
          flexShrink: 0,
          background: 'var(--obsidian)',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Arka plan deseni */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: 450, height: 450, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,146,58,0.15) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '-8%',
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,85,42,0.12) 0%, transparent 70%)',
        }} />

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--cream)', letterSpacing: '0.02em' }}>
            Türkiye&apos;de <span style={{ color: 'var(--terracotta)' }}>Satılık</span>
          </span>
        </Link>

        {/* Orta metin */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,48px)',
            fontWeight: 300, lineHeight: 1.15, color: 'var(--cream)', marginBottom: 24,
          }}>
            Hemen üye olun,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>fırsatları kaçırmayın.</em>
          </div>
          <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', maxWidth: 340 }}>
            Kayıt olarak favori ilanlarınızı kaydedin,
            yeni ilanlardan anında haberdar olun ve
            güvenilir emlakçılarla doğrudan iletişime geçin.
          </p>

          {/* Avantajlar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 44 }}>
            {[
              'Favori ilanları kaydetme',
              'Yeni ilan bildirimleri',
              'Doğrulanmış ofislerle iletişim',
              'Hızlı başvuru formu',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: '1px solid rgba(184,146,58,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 1 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
            Üyelik ücretsizdir · Verileriniz güvende
          </span>
        </div>
      </div>

      {/* ── Sağ Form Paneli ── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--sand)', padding: '40px 24px', overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 440 }}>

          {/* Mobil logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }} className="lg:hidden">
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--obsidian)' }}>
              Türkiye&apos;de <span style={{ color: 'var(--terracotta)' }}>Satılık</span>
            </span>
          </Link>

          {/* Başlık */}
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 500 }}>
              Ücretsiz Üyelik
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, color: 'var(--obsidian)', marginTop: 8, lineHeight: 1.2 }}>
              Hesap oluşturun
            </h1>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--obsidian)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 300, color: 'var(--obsidian)', marginBottom: 8 }}>
                Hoş geldiniz, {form.fullName.split(' ')[0]}!
              </p>
              <p style={{ fontSize: 13, color: 'var(--mist)', fontWeight: 300, marginBottom: 24 }}>
                Hesabınız oluşturuldu. E-postanızı doğrulayın.
              </p>
              <Link href="/giris" style={{
                display: 'inline-block', padding: '11px 28px',
                background: 'var(--obsidian)', color: 'var(--cream)',
                borderRadius: 'var(--radius-sm)', fontSize: 12, fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Giriş Yap
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Ad Soyad */}
              <FieldGroup label="Ad Soyad" error={touched.fullName ? errors.fullName : undefined}>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => touch('fullName')}
                  placeholder="Adınız Soyadınız"
                  autoComplete="name"
                  style={inputStyle(!!touched.fullName && !!errors.fullName)}
                />
              </FieldGroup>

              {/* E-posta */}
              <FieldGroup label="E-posta" error={touched.email ? errors.email : undefined}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => touch('email')}
                  placeholder="ornek@email.com"
                  autoComplete="email"
                  style={inputStyle(!!touched.email && !!errors.email)}
                />
              </FieldGroup>

              {/* Telefon */}
              <FieldGroup label="Telefon (isteğe bağlı)" error={touched.phone ? errors.phone : undefined}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => touch('phone')}
                  placeholder="+90 5__ ___ __ __"
                  autoComplete="tel"
                  style={inputStyle(!!touched.phone && !!errors.phone)}
                />
              </FieldGroup>

              {/* Şifre */}
              <FieldGroup label="Şifre" error={touched.password ? errors.password : undefined}>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => touch('password')}
                    placeholder="En az 8 karakter"
                    autoComplete="new-password"
                    style={{ ...inputStyle(!!touched.password && !!errors.password), paddingRight: 44 }}
                  />
                  <EyeToggle show={showPw} onToggle={() => setShowPw((v) => !v)} />
                </div>

                {/* Şifre güç göstergesi */}
                {form.password && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 5 }}>
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1, height: 3, borderRadius: 2,
                            background: i < strength.score ? strength.color : 'var(--sand-dark)',
                            transition: 'background 0.3s',
                          }}
                        />
                      ))}
                    </div>
                    <p style={{ fontSize: 11, color: strength.score < 2 ? 'var(--terracotta)' : 'var(--mist)', fontWeight: 300 }}>
                      Şifre gücü: <strong style={{ color: strength.color }}>{strength.label}</strong>
                    </p>
                  </div>
                )}
              </FieldGroup>

              {/* Şifre tekrar */}
              <FieldGroup label="Şifre Tekrar" error={touched.passwordConfirm ? errors.passwordConfirm : undefined}>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPwConfirm ? 'text' : 'password'}
                    value={form.passwordConfirm}
                    onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                    onBlur={() => touch('passwordConfirm')}
                    placeholder="Şifrenizi tekrar girin"
                    autoComplete="new-password"
                    style={{ ...inputStyle(!!touched.passwordConfirm && !!errors.passwordConfirm), paddingRight: 44 }}
                  />
                  <EyeToggle show={showPwConfirm} onToggle={() => setShowPwConfirm((v) => !v)} />
                  {/* Eşleşme göstergesi */}
                  {form.passwordConfirm && form.password && (
                    <span style={{
                      position: 'absolute', right: 44, top: '50%', transform: 'translateY(-50%)',
                      fontSize: 14,
                    }}>
                      {form.password === form.passwordConfirm ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </FieldGroup>

              {/* KVKK */}
              <div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.kvkk}
                    onChange={(e) => { handleChange('kvkk', e.target.checked); touch('kvkk') }}
                    style={{ width: 15, height: 15, marginTop: 2, accentColor: 'var(--terracotta)', cursor: 'pointer', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: 12, color: 'var(--mist)', fontWeight: 300, lineHeight: 1.6 }}>
                    <Link href="/kvkk" style={{ color: 'var(--obsidian)', fontWeight: 500, textDecoration: 'none' }}>
                      Kişisel Verilerin Korunması Kanunu
                    </Link>{' '}
                    kapsamında kişisel verilerimin işlenmesini ve{' '}
                    <Link href="/gizlilik" style={{ color: 'var(--obsidian)', fontWeight: 500, textDecoration: 'none' }}>
                      Gizlilik Politikası
                    </Link>
                    &apos;nı okuduğumu ve onayladığımı beyan ederim.
                  </span>
                </label>
                {touched.kvkk && errors.kvkk && (
                  <p style={{ fontSize: 11, color: 'var(--terracotta)', marginTop: 6, fontWeight: 300 }}>
                    {errors.kvkk}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%', padding: '13px',
                  background: submitting ? 'var(--mist)' : 'var(--terracotta)',
                  color: 'white', border: 'none',
                  borderRadius: 'var(--radius-sm)', cursor: submitting ? 'not-allowed' : 'pointer',
                  fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'background 0.2s', marginTop: 4,
                }}
                onMouseOver={(e) => {
                  if (!submitting) (e.currentTarget as HTMLElement).style.background = '#a83d1e'
                }}
                onMouseOut={(e) => {
                  if (!submitting) (e.currentTarget as HTMLElement).style.background = 'var(--terracotta)'
                }}
              >
                {submitting ? 'Hesap oluşturuluyor…' : 'Kayıt Ol'}
              </button>

              {/* Giriş linki */}
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--mist)', fontWeight: 300, marginTop: 4 }}>
                Zaten hesabın var mı?{' '}
                <Link href="/giris" style={{ color: 'var(--obsidian)', fontWeight: 500, textDecoration: 'none' }}>
                  Giriş yap
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Alt bileşenler ────────────────────────────────────── */
function FieldGroup({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: 10, fontWeight: 500,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: error ? 'var(--terracotta)' : 'var(--mist)', marginBottom: 7,
      }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: 11, color: 'var(--terracotta)', marginTop: 5, fontWeight: 300 }}>
          {error}
        </p>
      )}
    </div>
  )
}

function EyeToggle({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
        color: 'var(--mist)', display: 'flex', alignItems: 'center',
      }}
      aria-label={show ? 'Şifreyi gizle' : 'Şifreyi göster'}
    >
      {show ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  )
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%', padding: '11px 14px',
    fontSize: 14, fontWeight: 300,
    border: `1px solid ${hasError ? 'var(--terracotta)' : 'var(--sand-dark)'}`,
    borderRadius: 'var(--radius-sm)',
    background: 'var(--cream)', color: 'var(--obsidian)',
    outline: 'none', fontFamily: 'var(--font-body)',
    boxSizing: 'border-box', transition: 'border-color 0.15s',
  }
}
