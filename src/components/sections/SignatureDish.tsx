'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { SIGNATURE_HOTSPOTS, SIGNATURE_INGREDIENTS } from '@/lib/constants'
import styles from './SignatureDish.module.css'

export default function SignatureDish() {
  const [activeHot, setActiveHot] = useState<string | null>(null)
  const [visible, setVisible]     = useState(false)
  const [tickIdx, setTickIdx]     = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // ingredient ticker
  useEffect(() => {
    const t = setInterval(() =>
      setTickIdx(i => (i + 1) % SIGNATURE_INGREDIENTS.length), 2200)
    return () => clearInterval(t)
  }, [])

  const active = SIGNATURE_HOTSPOTS.find(h => h.id === activeHot)

  return (
    <section
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      ref={sectionRef}
    >
      {/* paper texture */}
      <div className={styles.texture} />

      {/* ember glow */}
      <div className={styles.glow} />

      {/* botanical */}
      <div className={styles.leafBR} aria-hidden>
        <svg width="80" height="114" viewBox="0 0 80 114" fill="none">
          <path d="M40 6C62 20 76 56 70 86C64 116 48 120 40 118C32 116 16 106 10 86C4 66 14 26 34 12C40 7 38 2 40 6Z" fill="#2E7D32"/>
          <path d="M40 6L40 118" stroke="#1B5E20" strokeWidth="1.2" fill="none" opacity=".5"/>
          <path d="M40 34C28 44 12 54 8 66" stroke="#1B5E20" strokeWidth=".85" fill="none" opacity=".38"/>
          <path d="M40 60C52 70 64 78 70 88" stroke="#1B5E20" strokeWidth=".85" fill="none" opacity=".35"/>
        </svg>
      </div>

      <div className={styles.inner}>

        {/* ── LEFT: dish image + hotspots ── */}
        <div className={styles.imageCol}>

          {/* ingredient ticker ribbon */}
          <div className={styles.ticker}>
            <span className={styles.tickerLabel}>Ingredient</span>
            <span className={styles.tickerDot} />
            <span className={styles.tickerVal} key={tickIdx}>
              {SIGNATURE_INGREDIENTS[tickIdx]}
            </span>
          </div>

          {/* image frame */}
          <div className={styles.frame}>
            {/* dashed rings */}
            <div className={`${styles.ring} ${styles.ringOuter}`} />
            <div className={`${styles.ring} ${styles.ringInner}`} />

            <div className={styles.imgWrap}>
              <Image
                src="/images/main-scallops.png"
                alt="The Cartographer — Savoure signature dish"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:900px) 100vw, 520px"
                priority
              />
              {/* warm vignette */}
              <div className={styles.imgVignette} />
            </div>

            {/* HOTSPOT DOTS */}
            {SIGNATURE_HOTSPOTS.map(h => (
              <button
                key={h.id}
                className={`${styles.hotspot} ${activeHot === h.id ? styles.hotspotActive : ''}`}
                style={{ top: h.top, left: h.left }}
                onClick={() => setActiveHot(activeHot === h.id ? null : h.id)}
                aria-label={h.name}
              >
                <span className={styles.hotspotRing} />
                <span className={styles.hotspotDot} />
                <span className={styles.hotspotNum}>{h.num}</span>
              </button>
            ))}

            {/* HOTSPOT TOOLTIP */}
            {active && (
              <div
                className={styles.tooltip}
                style={{ top: active.top, left: active.left }}
              >
                <span className={styles.tooltipCat}>{active.category}</span>
                <strong className={styles.tooltipName}>{active.name}</strong>
                <span className={styles.tooltipOrigin}>{active.origin}</span>
              </div>
            )}
          </div>

          {/* dish label beneath image */}
          <div className={styles.dishLabel}>
            <span className={styles.dishLabelScript}>The Cartographer</span>
            <span className={styles.dishLabelSub}>Signature Main · France × Brittany</span>
          </div>
        </div>

        {/* ── RIGHT: text ── */}
        <div className={styles.textCol}>

          <p className={styles.label}>Signature Dish</p>

          <h2 className={styles.heading}>
            Every element<br />has a{' '}
            <span className={styles.grad}>reason.</span>
          </h2>

          <p className={styles.body}>
            The Cartographer has been on every iteration of our menu since opening night.
            Seared duck breast and hand-dived Brittany scallops meet a beet reduction
            painted directly onto white ceramic. Hover the numbered points to explore
            each ingredient&rsquo;s origin.
          </p>

          {/* hotspot legend */}
          <div className={styles.legend}>
            {SIGNATURE_HOTSPOTS.map(h => (
              <button
                key={h.id}
                className={`${styles.legendItem} ${activeHot === h.id ? styles.legendItemActive : ''}`}
                onClick={() => setActiveHot(activeHot === h.id ? null : h.id)}
              >
                <span className={styles.legendNum}>{h.num}</span>
                <div className={styles.legendText}>
                  <span className={styles.legendName}>{h.name}</span>
                  <span className={styles.legendOrigin}>{h.origin}</span>
                </div>
                <span className={styles.legendArrow}>→</span>
              </button>
            ))}
          </div>

          {/* price + cta */}
          <div className={styles.priceRow}>
            <div>
              <span className={styles.priceLabel}>Price per plate</span>
              <span className={styles.price}>$58</span>
            </div>
            <a href="#reservation" className="btn-ember">
              <span>Reserve a Table</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}