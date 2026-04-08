'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

/* ─── Tip ───────────────────────────────────────────────── */
interface FormState {
  email: string
  password: string
  remember: boolean
}
interface Errors {
  email?: string
  password?: string
}

/* ─── Yardımcı ──────────────────────────────────────────── */
function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (!form.email.trim()) {
    errors.email = 'E-posta adresi zorunludur.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Geçerli bir e-posta adresi girin.'
  }
  if (!form.password) {
    errors.password = 'Şifre zorunludur.'
  } else if (form.password.length < 6) {
    errors.password = 'Şifre en az 6 karakter olmalıdır.'
  }
  return errors
}

/* ─── Sayfa ─────────────────────────────────────────────── */
export default function GirisPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState<Errors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  function touch(field: string) {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate({ ...form }))
  }

  function handleChange(field: keyof FormState, value: string | boolean) {
    const updated = { ...form, [field]: value }
    setForm(updated)
    if (touched[field as string]) setErrors(validate(updated))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    setTouched({ email: true, password: true })
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    setAuthError(null)

    const result = await signIn('credentials', {
      email:    form.email,
      password: form.password,
      redirect: false,
    })

    setSubmitting(false)

    if (result?.error) {
      setAuthError('E-posta adresi veya şifre hatalı.')
    } else {
      setSubmitted(true)
      router.push('/')
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* ── Sol Dekoratif Panel ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: '45%',
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
        {/* Gradient lekeleri */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,85,42,0.18) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '-5%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(27,79,107,0.2) 0%, transparent 70%)',
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
            fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,3.5vw,52px)',
            fontWeight: 300, lineHeight: 1.15, color: 'var(--cream)', marginBottom: 24,
          }}>
            Hayalinizdeki<br />
            mülke <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>hoş geldiniz.</em>
          </div>
          <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', maxWidth: 360 }}>
            Türkiye&apos;nin en seçkin Ege ve Akdeniz bölgelerinde
            Bakanlık onaylı ofislerle güvenle mülk sahibi olun.
          </p>

          {/* İstatistikler */}
          <div style={{ display: 'flex', gap: 40, marginTop: 48 }}>
            {[
              { val: '12+', label: 'Yıl Deneyim' },
              { val: '500+', label: 'Mutlu Müşteri' },
              { val: '48', label: 'Onaylı Ofis' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: 'var(--cream)' }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alt güven çubuğu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative', zIndex: 1 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
            256-bit SSL · KVKK Uyumlu · ETBİS Kayıtlı
          </span>
        </div>
      </div>

      {/* ── Sağ Form Paneli ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--sand)',
        padding: '40px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Mobil logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'block', marginBottom: 36 }} className="lg:hidden">
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--obsidian)' }}>
              Türkiye&apos;de <span style={{ color: 'var(--terracotta)' }}>Satılık</span>
            </span>
          </Link>

          {/* Başlık */}
          <div style={{ marginBottom: 36 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--terracotta)', fontWeight: 500 }}>
              Hoş Geldiniz
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 34, fontWeight: 300, color: 'var(--obsidian)', marginTop: 8, lineHeight: 1.15 }}>
              Hesabınıza<br /><em style={{ fontStyle: 'italic' }}>giriş yapın</em>
            </h1>
          </div>

          {submitted ? (
            /* Başarı durumu */
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
                Giriş başarılı!
              </p>
              <p style={{ fontSize: 13, color: 'var(--mist)', fontWeight: 300 }}>
                Yönlendiriliyorsunuz…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Google ile giriş */}
              <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/' })}
                style={{
                  width: '100%', padding: '11px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: 'var(--cream)', border: '1px solid var(--sand-dark)',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                  fontSize: 13, fontWeight: 400, color: 'var(--obsidian)',
                  transition: 'border-color 0.2s',
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--obsidian)' }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--sand-dark)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google ile Devam Et
              </button>

              {/* Ayraç */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--sand-dark)' }} />
                <span style={{ fontSize: 11, color: 'var(--mist)', letterSpacing: '0.08em' }}>VEYA</span>
                <div style={{ flex: 1, height: 1, background: 'var(--sand-dark)' }} />
              </div>

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

              {/* Şifre */}
              <FieldGroup label="Şifre" error={touched.password ? errors.password : undefined}>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => touch('password')}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    style={{ ...inputStyle(!!touched.password && !!errors.password), paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                      color: 'var(--mist)', display: 'flex', alignItems: 'center',
                    }}
                    aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  >
                    {showPassword ? (
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
                </div>
              </FieldGroup>

              {/* Beni hatırla + şifremi unuttum */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) => handleChange('remember', e.target.checked)}
                    style={{ width: 15, height: 15, accentColor: 'var(--terracotta)', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: 13, color: 'var(--obsidian)', fontWeight: 300 }}>Beni hatırla</span>
                </label>
                <Link
                  href="/sifremi-unuttum"
                  style={{ fontSize: 12, color: 'var(--terracotta)', textDecoration: 'none', fontWeight: 400 }}
                >
                  Şifremi unuttum
                </Link>
              </div>

              {/* Auth hatası */}
              {authError && (
                <p style={{
                  fontSize: 12, color: 'var(--terracotta)', fontWeight: 300,
                  padding: '10px 14px', background: 'rgba(196,85,42,0.07)',
                  borderRadius: 'var(--radius-sm)', border: '1px solid rgba(196,85,42,0.2)',
                }}>
                  {authError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%', padding: '13px',
                  background: submitting ? 'var(--mist)' : 'var(--obsidian)',
                  color: 'var(--cream)', border: 'none',
                  borderRadius: 'var(--radius-sm)', cursor: submitting ? 'not-allowed' : 'pointer',
                  fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'background 0.2s',
                  marginTop: 4,
                }}
                onMouseOver={(e) => {
                  if (!submitting) (e.currentTarget as HTMLElement).style.background = 'var(--terracotta)'
                }}
                onMouseOut={(e) => {
                  if (!submitting) (e.currentTarget as HTMLElement).style.background = 'var(--obsidian)'
                }}
              >
                {submitting ? 'Giriş yapılıyor…' : 'Giriş Yap'}
              </button>

              {/* Kayıt linki */}
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--mist)', fontWeight: 300, marginTop: 8 }}>
                Hesabın yok mu?{' '}
                <Link href="/kayit" style={{ color: 'var(--obsidian)', fontWeight: 500, textDecoration: 'none' }}>
                  Kayıt ol
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
