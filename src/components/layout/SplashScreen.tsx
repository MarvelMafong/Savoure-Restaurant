'use client'
import { useEffect, useState } from 'react'
import styles from './SplashScreen.module.css'

interface Props {
  onExit: () => void
  exiting: boolean
}

export default function SplashScreen({ onExit, exiting }: Props) {
  const [dotsFilled, setDotsFilled] = useState(0)
  const TOTAL_DOTS = 8

  useEffect(() => {
    const interval = setInterval(() => {
      setDotsFilled(prev => {
        if (prev >= TOTAL_DOTS) { clearInterval(interval); return prev }
        return prev + 1
      })
    }, (4200 * 0.7) / TOTAL_DOTS)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`${styles.splash} ${exiting ? styles.exit : ''}`}
      onClick={onExit}
    >
      {/* Ambient glow */}
      <div className={styles.glow} />

      {/* Vertical stage lines */}
      {[20, 40, 60, 80].map(p => (
        <div key={p} className={styles.stageLine} style={{ left: `${p}%` }} />
      ))}

      {/* Split halves */}
      <div className={styles.halfTop} />
      <div className={styles.halfBot} />

      {/* Botanicals */}
      <div className={`${styles.botanical} ${styles.leafTL}`}>
        <svg width="96" height="136" viewBox="0 0 96 136" fill="none">
          <path d="M48 7C74 23 90 64 84 98C78 132 60 140 48 138C36 136 18 124 12 98C6 72 18 28 42 13C48 7 46 2 48 7Z" fill="#2E7D32"/>
          <path d="M48 7L48 138" stroke="#1B5E20" strokeWidth="1.3" fill="none" opacity=".5"/>
          <path d="M48 44C32 56 14 68 8 84" stroke="#1B5E20" strokeWidth=".9" fill="none" opacity=".38"/>
          <path d="M48 76C62 88 76 98 84 110" stroke="#1B5E20" strokeWidth=".9" fill="none" opacity=".35"/>
        </svg>
      </div>
      <div className={`${styles.botanical} ${styles.leafBR}`}>
        <svg width="72" height="104" viewBox="0 0 72 104" fill="none">
          <path d="M36 6C56 18 68 52 63 80C58 108 44 112 36 110C28 108 14 98 9 80C4 62 14 24 32 10C38 6 36 1 36 6Z" fill="#2E7D32"/>
          <path d="M36 6L36 110" stroke="#1B5E20" strokeWidth="1.1" fill="none" opacity=".45"/>
        </svg>
      </div>
      <div className={`${styles.botanical} ${styles.chilliTR}`}>
        <svg width="14" height="46" viewBox="0 0 14 46" fill="none">
          <path d="M7 3C5 1 5 0 7 0C9 0 9 1 7 3Z" fill="#4a7a40"/>
          <path d="M7 3C11 10 13 23 10 35C8.5 41 6 45 7 46C8.5 45 6.5 41 6.5 35C3.5 23 3 10 7 3Z" fill="#C8390A" fillOpacity=".85"/>
        </svg>
      </div>
      <div className={`${styles.botanical} ${styles.chilliTBL}`}>
        <svg width="11" height="38" viewBox="0 0 11 38" fill="none">
          <path d="M5.5 2.5C3.5 .5 3.5 0 5.5 0C7.5 0 7.5 .5 5.5 2.5Z" fill="#4a7a40"/>
          <path d="M5.5 2.5C8.5 8 10 17 7.5 28C6 33.5 4 37 5.5 38C7 37 5 33.5 5 28C2.5 17 2.5 8 5.5 2.5Z" fill="#E8650A" fillOpacity=".8"/>
        </svg>
      </div>
      <div className={`${styles.botanical} ${styles.citrusBR}`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="#E8650A" strokeWidth="1" strokeOpacity=".4" fill="#E8650A" fillOpacity=".04"/>
          <circle cx="24" cy="24" r="14" stroke="#E8650A" strokeWidth=".8" strokeOpacity=".28" fill="none"/>
          <line x1="24" y1="7" x2="24" y2="41" stroke="#C8390A" strokeWidth=".7" strokeOpacity=".28"/>
          <line x1="7" y1="24" x2="41" y2="24" stroke="#C8390A" strokeWidth=".7" strokeOpacity=".28"/>
        </svg>
      </div>

      {/* CENTER STAGE */}
      <div className={styles.stage}>

        {/* Plate SVG */}
        <div className={styles.plateWrap}>
          <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" width="140" height="140">
            <circle className={styles.plateOrbit}  cx="70" cy="70" r="66"/>
            <circle className={styles.plateOuter}  cx="70" cy="70" r="62"/>
            <circle className={styles.plateInner}  cx="70" cy="70" r="52"/>
            <circle className={styles.plateCenter} cx="70" cy="70" r="51"/>
            <circle className={styles.plateDish}   cx="70" cy="70" r="28"/>
            <g className={styles.plateFork}>
              <line x1="48" y1="52" x2="48" y2="88"/>
              <line x1="44" y1="52" x2="44" y2="62"/>
              <line x1="52" y1="52" x2="52" y2="62"/>
              <path d="M44 62 Q44 68 48 70 Q52 68 52 62" fill="none"/>
            </g>
            <g className={styles.plateKnife}>
              <line x1="92" y1="52" x2="92" y2="88"/>
              <path d="M92 52 C96 52 98 56 98 62 C98 66 95 68 92 69"/>
            </g>
            <circle className={styles.plateDot} cx="70" cy="70" r="4"/>
          </svg>
        </div>

        {/* Logo */}
        <div className={styles.logo}>Savoure</div>

        {/* Tagline */}
        <p className={styles.tagline}>Where the world sits at one table</p>

        {/* Progress dots */}
        <div className={styles.progress}>
          {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${i < dotsFilled ? styles.dotFilled : ''}`}
            />
          ))}
        </div>

        {/* Hint */}
        <p className={styles.hint}>
          Preparing your experience
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(250,250,247,0.3)" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </p>
      </div>
    </div>
  )
}