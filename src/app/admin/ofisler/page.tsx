'use client'
import { useState } from 'react'
import { MOCK_OFFICES } from '@/lib/mock-offices'

/* ─── Renkler ────────────────────────────────────────────────────────── */
const C = {
  card:    '#1C1E1F',
  border:  'rgba(255,255,255,0.06)',
  text:    '#FDFCFA',
  muted:   'rgba(255,255,255,0.4)',
  dim:     'rgba(255,255,255,0.12)',
  active:  '#C4552A',
  green:   '#38A169',
  red:     '#E53E3E',
  yellow:  '#D69E2E',
}

/* ─── Mock bekleyen başvurular ───────────────────────────────────────── */
const PENDING_OFFICES = [
  {
    id: 'p1',
    name: 'Dalyan Emlak & Gayrimenkul',
    city: 'Muğla', district: 'Ortaca',
    address: 'Cumhuriyet Cad. No:14, Dalyan',
    phone: '+90 252 284 55 61',
    email: 'info@dalyanemlak.com',
    licenseNo: '2024-MU-1298',
    contactName: 'Kemal Aydın',
    appliedAt: '2026-04-05',
    agentCount: 3,
    description: 'Dalyan ve çevresinde deniz manzaralı yazlık ve kiralık mülk alanında hizmet vermek istiyoruz.',
    documents: ['Ticaret Sicil', 'Vergi Levhası', 'Yetki Belgesi'],
  },
  {
    id: 'p2',
    name: 'Göcek Marine Realty',
    city: 'Muğla', district: 'Fethiye',
    address: 'Göcek Marina Karşısı No:3, Göcek',
    phone: '+90 252 645 18 90',
    email: 'info@gocekmarinealty.com',
    licenseNo: '2024-MU-1312',
    contactName: 'Selin Kaya',
    appliedAt: '2026-04-03',
    agentCount: 5,
    description: 'Göcek Koyu\'nda yat marina önü villa ve lüks konut satışı için platforma dahil olmak istiyoruz.',
    documents: ['Ticaret Sicil', 'Yetki Belgesi'],
  },
  {
    id: 'p3',
    name: 'Datça Yarımada Emlak',
    city: 'Muğla', district: 'Datça',
    address: 'Atatürk Bulv. No:88, Datça',
    phone: '+90 252 712 33 40',
    email: 'info@datcaemilek.com',
    licenseNo: '2024-MU-1341',
    contactName: 'Burak Öztürk',
    appliedAt: '2026-04-01',
    agentCount: 2,
    description: 'Datça Yarımadası\'nın eşsiz doğasında arsa ve bağ evi satışlarında uzmanız.',
    documents: ['Ticaret Sicil', 'Vergi Levhası', 'Yetki Belgesi', 'İmza Sirküleri'],
  },
]

type Decision = 'approved' | 'rejected'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function AdminOfisler() {
  const [pendingDecisions, setPendingDecisions] = useState<Record<string, Decision>>({})
  const [activeOffices, setActiveOffices] = useState(MOCK_OFFICES)
  const [suspendConfirm, setSuspendConfirm] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending')

  function decide(id: string, decision: Decision) {
    setPendingDecisions((prev) => ({ ...prev, [id]: decision }))
  }

  function suspendOffice(id: string) {
    setActiveOffices((prev) =>
      prev.map((o) => o.id === id ? { ...o, status: 'SUSPENDED' as const } : o)
    )
    setSuspendConfirm(null)
  }

  const pendingCount   = PENDING_OFFICES.filter((p) => !pendingDecisions[p.id]).length
  const approvedCount  = Object.values(pendingDecisions).filter((d) => d === 'approved').length
  const activeCount    = activeOffices.filter((o) => o.status === 'ACTIVE').length

  return (
    <div style={{ padding: '32px 36px', color: C.text }}>

      {/* Üst bar */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: C.text, marginBottom: 4 }}>
          Ofis Yönetimi
        </h1>
        <p style={{ fontSize: 13, color: C.muted, fontWeight: 300 }}>
          Başvuruları incele, aktif ofisleri yönet
        </p>
      </div>

      {/* Özet kartlar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Bekleyen Başvuru', value: pendingCount, color: C.yellow },
          { label: 'Bu Ay Onaylanan', value: approvedCount, color: C.green },
          { label: 'Aktif Ofis', value: activeCount, color: '#63B3ED' },
          { label: 'Toplam Emlakçı', value: activeOffices.reduce((s, o) => s + o.agentCount, 0), color: C.active },
        ].map((s) => (
          <div key={s.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '18px 20px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 10 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300, color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Sekmeler */}
      <div style={{ display: 'flex', gap: 2, background: '#141516', borderRadius: 5, padding: 3, width: 'fit-content', border: `1px solid ${C.border}`, marginBottom: 20 }}>
        {([
          { value: 'pending', label: `Başvurular ${pendingCount > 0 ? `(${pendingCount})` : ''}` },
          { value: 'active',  label: `Aktif Ofisler (${activeCount})` },
        ] as const).map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            style={{
              padding: '7px 18px', fontSize: 12,
              fontWeight: activeTab === tab.value ? 500 : 300,
              border: 'none', borderRadius: 3, cursor: 'pointer', transition: 'all 0.15s',
              background: activeTab === tab.value ? C.card : 'transparent',
              color: activeTab === tab.value ? C.text : C.muted,
            }}
          >
            {tab.label}
            {tab.value === 'pending' && pendingCount > 0 && (
              <span style={{
                display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                background: C.yellow, marginLeft: 6, verticalAlign: 'middle',
              }} />
            )}
          </button>
        ))}
      </div>

      {/* ── Bekleyen Başvurular ── */}
      {activeTab === 'pending' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {PENDING_OFFICES.map((office) => {
            const decision = pendingDecisions[office.id]
            return (
              <div
                key={office.id}
                style={{
                  background: C.card,
                  border: `1px solid ${decision ? (decision === 'approved' ? 'rgba(56,161,105,0.3)' : 'rgba(229,62,62,0.3)') : C.border}`,
                  borderRadius: 6,
                  overflow: 'hidden',
                  opacity: decision ? 0.65 : 1,
                  transition: 'opacity 0.3s, border-color 0.3s',
                }}
              >
                <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
                  {/* Avatar */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 8,
                    background: decision === 'approved' ? 'rgba(56,161,105,0.15)' : decision === 'rejected' ? 'rgba(229,62,62,0.15)' : 'rgba(196,85,42,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontSize: 18,
                    color: decision === 'approved' ? C.green : decision === 'rejected' ? C.red : C.active,
                    flexShrink: 0,
                  }}>
                    {office.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                  </div>

                  {/* Bilgiler */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 3 }}>
                          {office.name}
                        </h3>
                        <div style={{ fontSize: 12, color: C.muted, display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span>{office.district}, {office.city}</span>
                          <span style={{ color: C.dim }}>·</span>
                          <span style={{ fontFamily: 'monospace', fontSize: 11 }}>{office.licenseNo}</span>
                        </div>
                      </div>

                      {/* Karar sonucu ya da butonlar */}
                      {decision ? (
                        <span style={{
                          padding: '5px 14px', borderRadius: 4, fontSize: 11, fontWeight: 500, letterSpacing: '0.07em',
                          background: decision === 'approved' ? 'rgba(56,161,105,0.12)' : 'rgba(229,62,62,0.12)',
                          color: decision === 'approved' ? C.green : C.red,
                          border: `1px solid ${decision === 'approved' ? 'rgba(56,161,105,0.25)' : 'rgba(229,62,62,0.25)'}`,
                          flexShrink: 0,
                        }}>
                          {decision === 'approved' ? '✓ Onaylandı' : '✗ Reddedildi'}
                        </span>
                      ) : (
                        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                          <button
                            onClick={() => decide(office.id, 'rejected')}
                            style={{
                              padding: '7px 16px', background: 'rgba(229,62,62,0.1)',
                              border: '1px solid rgba(229,62,62,0.25)', borderRadius: 4,
                              color: C.red, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                              transition: 'background 0.15s',
                            }}
                            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(229,62,62,0.2)' }}
                            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(229,62,62,0.1)' }}
                          >
                            Reddet
                          </button>
                          <button
                            onClick={() => decide(office.id, 'approved')}
                            style={{
                              padding: '7px 16px', background: C.green,
                              border: 'none', borderRadius: 4,
                              color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                              transition: 'background 0.15s',
                            }}
                            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = '#2F855A' }}
                            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = C.green }}
                          >
                            Onayla
                          </button>
                        </div>
                      )}
                    </div>

                    <p style={{ fontSize: 12, color: C.muted, fontWeight: 300, lineHeight: 1.6, margin: '10px 0' }}>
                      {office.description}
                    </p>

                    {/* Detay satırı */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, fontSize: 11, color: C.muted }}>
                      <span>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}>
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                        {office.contactName}
                      </span>
                      <span>{office.phone}</span>
                      <span>{office.email}</span>
                      <span>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}>
                          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Başvuru: {formatDate(office.appliedAt)}
                      </span>
                    </div>

                    {/* Belgeler */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                      {office.documents.map((doc) => (
                        <span key={doc} style={{
                          padding: '3px 9px', background: 'rgba(255,255,255,0.05)',
                          border: `1px solid ${C.border}`, borderRadius: 3,
                          fontSize: 10, color: C.muted, letterSpacing: '0.04em',
                        }}>
                          📄 {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {PENDING_OFFICES.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: C.muted, fontSize: 13 }}>
              Bekleyen başvuru yok.
            </div>
          )}
        </div>
      )}

      {/* ── Aktif Ofisler ── */}
      {activeTab === 'active' && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {['Ofis', 'Şehir', 'Lisans No', 'İlan', 'Emlakçı', 'Durum', 'İşlem'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeOffices.map((office, i) => (
                <tr
                  key={office.id}
                  style={{
                    borderBottom: i < activeOffices.length - 1 ? `1px solid ${C.border}` : 'none',
                    opacity: office.status !== 'ACTIVE' ? 0.45 : 1,
                  }}
                >
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 6, background: office.avatarColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: 600, flexShrink: 0,
                      }}>
                        {office.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: C.text, fontWeight: 400 }}>{office.name}</div>
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{office.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: C.muted }}>
                    {office.district}, {office.city}
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>
                    {office.licenseNo}
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: C.text, textAlign: 'center' }}>
                    {office.listingCount}
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: C.text, textAlign: 'center' }}>
                    {office.agentCount}
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{
                      fontSize: 10, letterSpacing: '0.07em', padding: '3px 9px', borderRadius: 3, fontWeight: 500,
                      background: office.status === 'ACTIVE' ? 'rgba(104,211,145,0.1)' : 'rgba(252,129,129,0.1)',
                      color: office.status === 'ACTIVE' ? '#68D391' : '#FC8181',
                    }}>
                      {office.status === 'ACTIVE' ? 'Aktif' : 'Askıya Alındı'}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    {office.status === 'ACTIVE' ? (
                      suspendConfirm === office.id ? (
                        <div style={{ display: 'flex', gap: 5 }}>
                          <button
                            onClick={() => suspendOffice(office.id)}
                            style={{ padding: '4px 10px', background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.25)', borderRadius: 3, color: C.red, fontSize: 11, cursor: 'pointer' }}
                          >
                            Evet
                          </button>
                          <button
                            onClick={() => setSuspendConfirm(null)}
                            style={{ padding: '4px 10px', background: C.dim, border: `1px solid ${C.border}`, borderRadius: 3, color: C.muted, fontSize: 11, cursor: 'pointer' }}
                          >
                            İptal
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSuspendConfirm(office.id)}
                          style={{ padding: '5px 12px', background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.2)', borderRadius: 3, color: C.red, fontSize: 11, cursor: 'pointer', transition: 'background 0.15s' }}
                          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(229,62,62,0.18)' }}
                          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(229,62,62,0.08)' }}
                        >
                          Askıya Al
                        </button>
                      )
                    ) : (
                      <span style={{ fontSize: 11, color: C.dim }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p style={{ fontSize: 11, color: C.dim, marginTop: 16, textAlign: 'center' }}>
        Değişiklikler yalnızca bu oturumda geçerlidir · Gerçek veritabanı bağlantısı yapılmamıştır
      </p>
    </div>
  )
}
