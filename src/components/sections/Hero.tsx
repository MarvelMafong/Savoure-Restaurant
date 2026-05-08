'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { ORBIT_DISHES } from '@/lib/constants'

export default function Hero() {
  const [angle, setAngle]         = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const [featSrc, setFeatSrc]     = useState(ORBIT_DISHES[0].src)
  const [featName, setFeatName]   = useState(ORBIT_DISHES[0].name)
  const [featCat, setFeatCat]     = useState(ORBIT_DISHES[0].cat)
  const [fading, setFading]       = useState(false)
  const [isMobile, setIsMobile]   = useState(false)
  const lastT  = useRef<number | null>(null)
  const animId = useRef<number>(0)
  const PERIOD = 48000
  const N      = ORBIT_DISHES.length

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const tick = useCallback((ts: number) => {
    if (!lastT.current) lastT.current = ts
    const dt = ts - lastT.current
    lastT.current = ts
    setAngle(prev => {
      const next = prev + (360 / PERIOD) * dt
      return next >= 360 ? next - 360 : next
    })
    animId.current = requestAnimationFrame(tick)
  }, [PERIOD])

  useEffect(() => {
    animId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId.current)
  }, [tick])

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(p => (p + 1) % N), 5000)
    return () => clearInterval(id)
  }, [N])

  useEffect(() => {
    setFading(true)
    const t = setTimeout(() => {
      setFeatSrc(ORBIT_DISHES[activeIdx].src)
      setFeatName(ORBIT_DISHES[activeIdx].name)
      setFeatCat(ORBIT_DISHES[activeIdx].cat)
      setFading(false)
    }, 300)
    return () => clearTimeout(t)
  }, [activeIdx])

  // Orbit sizing — matches CSS stage sizes
  // Desktop: stage = min(480px, 46vw) → use 480 as ref
  // Mobile:  stage = min(380px, 88vw) → use 380 as ref
  const STAGE_REF  = isMobile ? 340 : 480
  const PLATE_SIZE = isMobile ? 72  : 82
  const ORBIT_RATIO = 0.36  // same ratio both — CSS handles stage size

  function getPos(i: number) {
    const R = STAGE_REF * ORBIT_RATIO
    const deg = -90 + (360 / N) * i + angle
    const rad = (deg * Math.PI) / 180
    return { x: Math.cos(rad) * R, y: Math.sin(rad) * R }
  }

  return (
    <section className="hero">
      <div className="hero-texture" />
      <div className="hero-overlay" />
      <div className="hero-blob" />
      <div className="hero-grain" />

      {/* GREEN LEAVES */}
      <div className="hero-leaf-tr">
        <svg width="130" height="185" viewBox="0 0 130 185" fill="none">
          <path d="M65 9C98 28 118 84 110 130C102 176 80 184 65 182C50 180 28 166 20 130C12 94 26 36 58 16C65 9 62 2 65 9Z" fill="#2E7D32"/>
          <path d="M65 9L65 182" stroke="#1B5E20" strokeWidth="1.8" fill="none" opacity=".5"/>
          <path d="M65 55C44 72 18 88 9 110" stroke="#1B5E20" strokeWidth="1.2" fill="none" opacity=".38"/>
          <path d="M65 98C84 114 102 128 110 148" stroke="#1B5E20" strokeWidth="1.2" fill="none" opacity=".35"/>
          <path d="M65 140C48 155 28 166 14 178" stroke="#1B5E20" strokeWidth="1" fill="none" opacity=".25"/>
          <path d="M65 68C50 80 32 90 20 104" stroke="#4CAF50" strokeWidth=".8" fill="none" opacity=".2"/>
        </svg>
      </div>
      <div className="hero-leaf-bl">
        <svg width="96" height="136" viewBox="0 0 96 136" fill="none">
          <path d="M48 7C74 23 90 64 84 98C78 132 60 140 48 138C36 136 18 124 12 98C6 72 18 28 42 13C48 7 46 2 48 7Z" fill="#2E7D32"/>
          <path d="M48 7L48 138" stroke="#1B5E20" strokeWidth="1.4" fill="none" opacity=".5"/>
          <path d="M48 44C32 56 14 68 8 84" stroke="#1B5E20" strokeWidth="1" fill="none" opacity=".38"/>
          <path d="M48 80C60 92 76 102 84 116" stroke="#1B5E20" strokeWidth="1" fill="none" opacity=".35"/>
        </svg>
      </div>

      {/* SPICE FLOATS */}
      <div className="hero-spice hero-spice-chilli-l">
        <svg width="13" height="44" viewBox="0 0 13 44" fill="none">
          <path d="M6.5 3C4.5 1 4.5 0 6.5 0C8.5 0 8.5 1 6.5 3Z" fill="#4a7a40"/>
          <path d="M6.5 3C10 9 11.5 20 9 31C7.5 37 5 41 6.5 44C8 41 6 37 6 31C3 20 3 9 6.5 3Z" fill="#C8390A" fillOpacity=".88"/>
        </svg>
      </div>
      <div className="hero-spice hero-spice-citrus">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="23" stroke="#E8650A" strokeWidth="1.2" strokeOpacity=".45" fill="#E8650A" fillOpacity=".06"/>
          <circle cx="25" cy="25" r="15" stroke="#E8650A" strokeWidth="1" strokeOpacity=".3" fill="none"/>
          <line x1="25" y1="7" x2="25" y2="43" stroke="#C8390A" strokeWidth=".8" strokeOpacity=".3"/>
          <line x1="7" y1="25" x2="43" y2="25" stroke="#C8390A" strokeWidth=".8" strokeOpacity=".3"/>
          <line x1="12" y1="12" x2="38" y2="38" stroke="#C8390A" strokeWidth=".6" strokeOpacity=".22"/>
          <line x1="38" y1="12" x2="12" y2="38" stroke="#C8390A" strokeWidth=".6" strokeOpacity=".22"/>
        </svg>
      </div>
      <div className="hero-spice hero-spice-star">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l2.4 7.2H22l-6 4.4 2.4 7.2L12 16.4l-6.4 4.4L8 13.6 2 9.2h7.6L12 2z" stroke="#C9A96E" strokeWidth="1.2" fill="#C9A96E" fillOpacity=".22"/>
        </svg>
      </div>
      <div className="hero-spice hero-spice-flame">
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
          <path d="M10 2C10 2 17 10 17 17C17 24 14 29 10 31C6 29 3 24 3 17C3 10 10 2 10 2Z" stroke="#C8390A" strokeWidth="1.4" fill="rgba(200,57,10,.08)"/>
          <path d="M10 16C10 16 13 20 13 23C13 26 11.5 28 10 29C8.5 28 7 26 7 23C7 20 10 16 10 16Z" stroke="#C8390A" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* LEFT CONTENT */}
      <div className="hero-left">
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          <span>Now accepting reservations</span>
        </div>
        <h1 className="hero-headline">
          <span className="hero-line"><span>A World of</span></span>
          <span className="hero-line"><span className="hero-grad">Flavour</span></span>
          <span className="hero-line"><span>on One Table.</span></span>
        </h1>
        <p className="hero-sub">
          Global fusion fine dining where unexpected pairings become unforgettable memories.
          New York City&apos;s most intentional kitchen.
        </p>
        <div className="hero-actions">
          <a href="#menu" className="btn-ember"><span>Explore Menu</span></a>
          <a href="#reservation" className="btn-ink">Book a Table</a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">6+</span>
            <span className="hero-stat-label">Years open</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="hero-stat-num">32</span>
            <span className="hero-stat-label">Dishes</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="hero-stat-num">14</span>
            <span className="hero-stat-label">Countries</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="hero-stat-num">⁄4.9</span>
            <span className="hero-stat-label">Rating</span>
          </div>
        </div>
        <div className="hero-scroll-cue">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-txt">Scroll to discover</span>
        </div>
      </div>

      {/* RIGHT: ORBIT */}
      <div className="hero-right">
        <div className="hero-orbit-icon hero-oi-1">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <path d="M14 3L16.5 10.5H24.5L18 15.5L20.5 23L14 18L7.5 23L10 15.5L3.5 10.5H11.5Z" stroke="#C9A96E" strokeWidth="1.2" fill="none"/>
          </svg>
        </div>
        <div className="hero-orbit-icon hero-oi-2">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="9" stroke="#C8390A" strokeWidth="1" strokeDasharray="3 3"/>
            <circle cx="11" cy="11" r="4" stroke="#C8390A" strokeWidth="1"/>
          </svg>
        </div>
        <div className="hero-orbit-icon hero-oi-3">
          <svg width="16" height="34" viewBox="0 0 18 38" fill="none">
            <line x1="9" y1="0" x2="9" y2="38" stroke="#3D5C3A" strokeWidth="1.5"/>
            <line x1="3" y1="0" x2="3" y2="14" stroke="#3D5C3A" strokeWidth="1.5"/>
            <line x1="15" y1="0" x2="15" y2="14" stroke="#3D5C3A" strokeWidth="1.5"/>
            <path d="M3 14 Q3 21 9 23 Q15 21 15 14" stroke="#3D5C3A" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        <div className="hero-orbit-stage">
          <svg className="hero-ring-svg hero-ring-outer" viewBox="0 0 380 380" style={{overflow:'visible'}}>
            <circle cx="190" cy="190" r="180" stroke="#C8390A" strokeWidth="1" strokeDasharray="8 10" strokeLinecap="round" fill="none" opacity=".3"/>
          </svg>
          <svg className="hero-ring-svg hero-ring-inner" viewBox="0 0 310 310" style={{overflow:'visible'}}>
            <circle cx="155" cy="155" r="148" stroke="#3D5C3A" strokeWidth=".8" strokeDasharray="3 12" strokeLinecap="round" fill="none" opacity=".22"/>
          </svg>

          <div className="hero-orbit-group">
            {ORBIT_DISHES.map((dish, i) => {
              const pos = getPos(i)
              const isActive = i === activeIdx
              return (
                <div
                  key={dish.name}
                  className={`hero-orbit-plate${isActive ? ' hero-orbit-plate-active' : ''}`}
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                    width: `${PLATE_SIZE}px`,
                    height: `${PLATE_SIZE}px`,
                    marginTop: `${-PLATE_SIZE/2}px`,
                    marginLeft: `${-PLATE_SIZE/2}px`,
                  }}
                  onClick={() => setActiveIdx(i)}
                >
                  <div
                    className="hero-orbit-plate-inner"
                    style={{
                      transform: `rotate(${-angle}deg)`,
                      width: `${PLATE_SIZE}px`,
                      height: `${PLATE_SIZE}px`,
                    }}
                  >
                    <Image
                      src={dish.src}
                      alt={dish.name}
                      width={PLATE_SIZE}
                      height={PLATE_SIZE}
                      style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="hero-featured">
            <div className={`hero-featured-img${fading ? ' hero-featured-fading' : ''}`}>
              <Image src={featSrc} alt={featName} fill style={{ objectFit:'cover' }} priority />
            </div>
            <div className="hero-featured-label">
              <span className="hero-featured-name">{featName}</span>
              <span className="hero-featured-cat">{featCat}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom pills */}
      <div className="hero-location">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>142 West Ember Lane, New York, NY</span>
      </div>
      <div className="hero-hours-pill">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(250,250,247,.5)" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
        <span>Dinner &nbsp;&middot;&nbsp;</span>
        <strong>Tue &ndash; Sun, 5PM &ndash; 11PM</strong>
      </div>
    </section>
  )
}