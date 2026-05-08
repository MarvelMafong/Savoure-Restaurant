'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { TESTIMONIALS } from '@/lib/constants'
import styles from './Testimonials.module.css'

const PIN_COLORS = ['#C8390A', '#C9A96E', '#3D5C3A', '#C8390A', '#C9A96E', '#3D5C3A']

export default function Testimonials() {
  const [visible, setVisible]   = useState(false)
  const [mouse, setMouse]       = useState({ x: -999, y: -999 })
  const [active, setActive]     = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // cursor spotlight — track mouse relative to section
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const handler = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    section.addEventListener('mousemove', handler)
    return () => section.removeEventListener('mousemove', handler)
  }, [visible])

  return (
    <section
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      ref={sectionRef}
      id="testimonials"
    >
      {/* paper texture */}
      <div className={styles.texture} />

      {/* cursor spotlight */}
      <div
        className={styles.spotlight}
        style={{ left: mouse.x, top: mouse.y }}
      />

      {/* header */}
      <div className={styles.header}>
        <p className={styles.label}>Guest Reviews</p>
        <h2 className={styles.heading}>
          What they said<br />
          when they <span className={styles.grad}>left.</span>
        </h2>
        <p className={styles.sub}>
          Unedited. Unfiltered. From the people who sat at our table.
        </p>
      </div>

      {/* corkboard */}
      <div className={styles.board}>

        {/* cork texture grain */}
        <div className={styles.boardGrain} />

        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.id}
            className={`${styles.card} ${active === t.id ? styles.cardActive : ''}`}
            style={{
              transform: `rotate(${t.tilt}deg)`,
              marginTop: t.marginTop,
              animationDelay: `${i * 100}ms`,
            }}
            onMouseEnter={() => setActive(t.id)}
            onMouseLeave={() => setActive(null)}
          >
            {/* push pin */}
            <div className={styles.pin} style={{ background: PIN_COLORS[i] }}>
              <div className={styles.pinHead} style={{ background: PIN_COLORS[i] }} />
              <div className={styles.pinStem} />
            </div>

            {/* card content */}
            <div className={styles.cardTop}>
              {/* stars */}
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} width="11" height="11" viewBox="0 0 24 24" fill="#C9A96E">
                    <path d="M12 2l2.4 7.2H22l-6 4.4 2.4 7.2L12 16.4l-6.4 4.4L8 13.6 2 9.2h7.6L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className={styles.date}>{t.date}</span>
            </div>

            {/* dashed rule */}
            <div className={styles.rule} />

            {/* quote */}
            <blockquote className={styles.quote}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className={styles.rule} />

            {/* guest row */}
            <div className={styles.guest}>
              <div className={styles.guestAvatar}>
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="36px"
                />
              </div>
              <div className={styles.guestInfo}>
                <span className={styles.guestName}>{t.name}</span>
                <span className={styles.guestMeta}>{t.meta}</span>
              </div>
            </div>

            {/* ordered dish tag */}
            <div className={styles.dishTag}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Ordered: {t.dish}
            </div>

            {/* verified badge */}
            <div className={styles.verified}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Verified
            </div>
          </div>
        ))}
      </div>

      {/* bottom stats row */}
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statNum}>★ 4.9</span>
          <span className={styles.statLabel}>Google Rating</span>
        </div>
        <div className={styles.statDiv} />
        <div className={styles.stat}>
          <span className={styles.statNum}>3,200+</span>
          <span className={styles.statLabel}>Verified Reviews</span>
        </div>
        <div className={styles.statDiv} />
        <div className={styles.stat}>
          <span className={styles.statNum}>98%</span>
          <span className={styles.statLabel}>Would Return</span>
        </div>
        <div className={styles.statDiv} />
        <div className={styles.stat}>
          <span className={styles.statNum}>4.8</span>
          <span className={styles.statLabel}>OpenTable Score</span>
        </div>
        <a href="#reservation" className={`${styles.statCta} btn-ember`}>
          <span>Book Your Table</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </section>
  )
}