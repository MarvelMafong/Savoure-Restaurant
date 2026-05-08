'use client'
import { useState, useEffect, useRef } from 'react'
import { SITE } from '@/lib/constants'
import styles from './Reservation.module.css'

const TIMES = ['5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM']
const PARTY = [1,2,3,4,5,6,7,8]
const OCCASIONS = ['None','Birthday','Anniversary','Date Night','Business Dinner','Proposal','Celebration']

type Step = 1 | 2 | 3 | 4

interface FormData {
  date: string
  time: string
  party: number
  occasion: string
  firstName: string
  lastName: string
  email: string
  phone: string
  notes: string
}

const EMPTY: FormData = {
  date: '', time: '', party: 2, occasion: 'None',
  firstName: '', lastName: '', email: '', phone: '', notes: '',
}

// get next 60 days as selectable dates
function getDates() {
  const dates: { label: string; value: string; day: string }[] = []
  const now = new Date()
  for (let i = 1; i <= 60; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    const day = d.getDay()
    if (day === 1) continue // closed Monday
    dates.push({
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      day:   d.toLocaleDateString('en-US', { weekday: 'short' }),
    })
  }
  return dates
}

export default function Reservation() {
  const [step, setStep]       = useState<Step>(1)
  const [form, setForm]       = useState<FormData>(EMPTY)
  const [errors, setErrors]   = useState<Partial<FormData>>({})
  const [visible, setVisible] = useState(false)
  const [confNum] = useState(() => `SVR-${Math.random().toString(36).slice(2,7).toUpperCase()}`)
  const sectionRef = useRef<HTMLElement>(null)
  const dates = getDates()

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const set = (k: keyof FormData, v: string | number) =>
    setForm(f => ({ ...f, [k]: v }))

  const validateStep2 = () => {
    const e: Partial<FormData> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim())     e.phone     = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (step === 1 && (!form.date || !form.time)) return
    if (step === 2 && !validateStep2()) return
    setStep(s => (s + 1) as Step)
    setErrors({})
  }

  const back = () => setStep(s => (s - 1) as Step)

  const submit = () => setStep(4)

  const reset = () => { setForm(EMPTY); setStep(1); setErrors({}) }

  const selectedDate = dates.find(d => d.value === form.date)

  const STEPS = ['Date & Time', 'Your Details', 'Review', 'Confirmed']

  return (
    <section
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      ref={sectionRef}
      id="reservation"
    >
      {/* left image panel */}
      <div className={styles.imgPanel}>
        <div className={styles.imgPanelInner}>
          {/* candle glow */}
          <div className={styles.candleGlow} />
          {/* overlaid info */}
          <div className={styles.panelInfo}>
            <span className={styles.panelScript}>Reserve</span>
            <p className={styles.panelAddress}>{SITE.address}</p>
            <div className={styles.panelHours}>
              {SITE.hours.map(h => (
                <div key={h.day} className={styles.panelHourRow}>
                  <span className={styles.panelHourDay}>{h.day}</span>
                  <span className={`${styles.panelHourTime} ${h.closed ? styles.panelHourClosed : ''}`}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.panelContact}>
              <a href={`tel:${SITE.phone}`} className={styles.panelPhone}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className={styles.panelEmail}>{SITE.email}</a>
            </div>
          </div>
        </div>
        {/* botanical */}
        <div className={styles.panelLeaf} aria-hidden>
          <svg width="72" height="104" viewBox="0 0 72 104" fill="none">
            <path d="M36 6C56 18 68 52 63 80C58 108 44 112 36 110C28 108 14 98 9 80C4 62 14 24 32 10C38 6 36 1 36 6Z" fill="#2E7D32"/>
            <path d="M36 6L36 110" stroke="#1B5E20" strokeWidth="1.1" fill="none" opacity=".45"/>
            <path d="M36 32C24 42 10 52 7 64" stroke="#1B5E20" strokeWidth=".8" fill="none" opacity=".35"/>
            <path d="M36 60C48 70 60 78 63 90" stroke="#1B5E20" strokeWidth=".8" fill="none" opacity=".32"/>
          </svg>
        </div>
      </div>

      {/* right form panel */}
      <div className={styles.formPanel}>

        {/* step progress */}
        <div className={styles.progress}>
          {STEPS.map((label, i) => (
            <div key={label} className={`${styles.progressStep} ${step > i ? styles.progressDone : ''} ${step === i + 1 ? styles.progressActive : ''}`}>
              <div className={styles.progressDot}>
                {step > i + 1
                  ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <span>{i + 1}</span>
                }
              </div>
              <span className={styles.progressLabel}>{label}</span>
              {i < STEPS.length - 1 && <div className={styles.progressLine} />}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Date & Time ── */}
        {step === 1 && (
          <div className={styles.stepWrap}>
            <h2 className={styles.stepTitle}>Choose your evening</h2>
            <p className={styles.stepSub}>We&rsquo;re open Tuesday through Sunday, 5PM – 11PM.</p>

            {/* date picker */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Select Date</label>
              <div className={styles.dateGrid}>
                {dates.slice(0, 18).map(d => (
                  <button
                    key={d.value}
                    className={`${styles.dateBtn} ${form.date === d.value ? styles.dateBtnActive : ''}`}
                    onClick={() => set('date', d.value)}
                  >
                    <span className={styles.dateBtnDay}>{d.day}</span>
                    <span className={styles.dateBtnDate}>{d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* party size */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Party Size</label>
              <div className={styles.partyGrid}>
                {PARTY.map(n => (
                  <button
                    key={n}
                    className={`${styles.partyBtn} ${form.party === n ? styles.partyBtnActive : ''}`}
                    onClick={() => set('party', n)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    {n}{n === 8 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* time slots */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Preferred Time</label>
              <div className={styles.timeGrid}>
                {TIMES.map(t => (
                  <button
                    key={t}
                    className={`${styles.timeBtn} ${form.time === t ? styles.timeBtnActive : ''}`}
                    onClick={() => set('time', t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* occasion */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Occasion <span className={styles.optional}>(optional)</span></label>
              <div className={styles.occasionGrid}>
                {OCCASIONS.map(o => (
                  <button
                    key={o}
                    className={`${styles.occasionBtn} ${form.occasion === o ? styles.occasionBtnActive : ''}`}
                    onClick={() => set('occasion', o)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={`${styles.nextBtn} ${(!form.date || !form.time) ? styles.nextBtnDisabled : ''}`}
              onClick={next}
              disabled={!form.date || !form.time}
            >
              Continue
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── STEP 2: Details ── */}
        {step === 2 && (
          <div className={styles.stepWrap}>
            <h2 className={styles.stepTitle}>Your details</h2>
            <p className={styles.stepSub}>We&rsquo;ll send your confirmation to the email below.</p>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>First Name</label>
                <input
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                  placeholder="Jean"
                  value={form.firstName}
                  onChange={e => set('firstName', e.target.value)}
                />
                {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Last Name</label>
                <input
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                  placeholder="Laurent"
                  value={form.lastName}
                  onChange={e => set('lastName', e.target.value)}
                />
                {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                type="email" placeholder="jean@example.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Phone Number</label>
              <input
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                type="tel" placeholder="+1 (212) 000-0000"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Special Requests <span className={styles.optional}>(optional)</span></label>
              <textarea
                className={styles.textarea}
                placeholder="Allergies, dietary requirements, special arrangements..."
                rows={3}
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
              />
            </div>

            <div className={styles.btnRow}>
              <button className={styles.backBtn} onClick={back}>← Back</button>
              <button className={styles.nextBtn} onClick={next}>
                Review Reservation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Review ── */}
        {step === 3 && (
          <div className={styles.stepWrap}>
            <h2 className={styles.stepTitle}>Review your reservation</h2>
            <p className={styles.stepSub}>Everything look right? Confirm to lock in your table.</p>

            <div className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewScript}>Savoure</span>
                <span className={styles.reviewHeaderSub}>142 West Ember Lane, Tribeca</span>
              </div>
              <div className={styles.reviewGrid}>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewItemLabel}>Date</span>
                  <span className={styles.reviewItemVal}>{selectedDate ? `${selectedDate.day}, ${selectedDate.label}` : form.date}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewItemLabel}>Time</span>
                  <span className={styles.reviewItemVal}>{form.time}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewItemLabel}>Party</span>
                  <span className={styles.reviewItemVal}>{form.party} guest{form.party > 1 ? 's' : ''}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewItemLabel}>Occasion</span>
                  <span className={styles.reviewItemVal}>{form.occasion}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewItemLabel}>Name</span>
                  <span className={styles.reviewItemVal}>{form.firstName} {form.lastName}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewItemLabel}>Email</span>
                  <span className={styles.reviewItemVal}>{form.email}</span>
                </div>
                <div className={styles.reviewItem}>
                  <span className={styles.reviewItemLabel}>Phone</span>
                  <span className={styles.reviewItemVal}>{form.phone}</span>
                </div>
                {form.notes && (
                  <div className={`${styles.reviewItem} ${styles.reviewItemFull}`}>
                    <span className={styles.reviewItemLabel}>Requests</span>
                    <span className={styles.reviewItemVal}>{form.notes}</span>
                  </div>
                )}
              </div>
              <p className={styles.reviewNote}>
                A confirmation will be sent to <strong>{form.email}</strong>. Cancellations must be made 24 hours in advance.
              </p>
            </div>

            <div className={styles.btnRow}>
              <button className={styles.backBtn} onClick={back}>← Back</button>
              <button className={styles.confirmBtn} onClick={submit}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Confirm Reservation
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Confirmed ── */}
        {step === 4 && (
          <div className={styles.confirmed}>
            <div className={styles.confirmedCheck}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span className={styles.confirmedScript}>You&rsquo;re on the table.</span>
            <p className={styles.confirmedSub}>
              Reservation confirmed for <strong>{form.firstName} {form.lastName}</strong><br/>
              {selectedDate?.day}, {selectedDate?.label} · {form.time} · {form.party} guest{form.party > 1 ? 's' : ''}
            </p>
            <div className={styles.confirmedNum}>
              <span className={styles.confirmedNumLabel}>Confirmation</span>
              <span className={styles.confirmedNumVal}>{confNum}</span>
            </div>
            <p className={styles.confirmedEmail}>
              A confirmation has been sent to <strong>{form.email}</strong>
            </p>
            <button className={styles.resetBtn} onClick={reset}>
              Make another reservation
            </button>
          </div>
        )}
      </div>
    </section>
  )
}