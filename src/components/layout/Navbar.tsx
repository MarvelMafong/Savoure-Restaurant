'use client'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/lib/constants'
import { getNYCTime, isDinnerHours } from '@/lib/utils'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [nycTime,  setNycTime]  = useState('')
  const [dinner,   setDinner]   = useState(false)
  const [atTop,    setAtTop]    = useState(true)

  useEffect(() => {
    const update = () => { setNycTime(getNYCTime()); setDinner(isDinnerHours()) }
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handler = () => setAtTop(window.scrollY < 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const close = () => setMenuOpen(false)
  const navClass = atTop ? 'nav nav-transparent' : 'nav nav-solid'
  const forkColor = atTop ? 'white' : 'var(--ink)'

  return (
    <>
      <div className="nav-ribbon" />

      <nav className={navClass}>
        <div className="nav-inner">

          <a href="#" className="nav-brand" onClick={close}>
            <span className="nav-flame">
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                <path d="M7 1C7 1 12 6 12 11C12 15.5 10 18.5 7 20C4 18.5 2 15.5 2 11C2 6 7 1 7 1Z"
                  stroke="#C8390A" strokeWidth="1.3" fill="rgba(200,57,10,.15)" strokeLinejoin="round"/>
                <path d="M7 11C7 11 9 13.5 9 15.5C9 17 8 18.2 7 19C6 18.2 5 17 5 15.5C5 13.5 7 11 7 11Z"
                  fill="rgba(232,101,10,.4)"/>
              </svg>
            </span>
            <span className="nav-logo">Savoure</span>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map(link => (
              <li key={link.href} className="nav-link-item">
                <span className="nav-plate">
                  <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
                    <ellipse cx="14" cy="5" rx="13" ry="4" stroke="#C8390A" strokeWidth="1" fill="rgba(200,57,10,.06)"/>
                    <ellipse cx="14" cy="4" rx="7" ry="2" stroke="#C8390A" strokeWidth=".7" fill="none" strokeOpacity=".5"/>
                  </svg>
                </span>
                <a href={link.href} className="nav-link">{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <div className="nav-clock">
              <span className={`nav-clock-dot ${dinner ? 'nav-clock-dot-dinner' : 'nav-clock-dot-ember'}`} />
              <span>{nycTime}</span>
              <span className={`nav-clock-label ${dinner ? 'nav-clock-label-dinner' : 'nav-clock-label-ember'}`}>
                {dinner ? 'OPEN NOW' : 'NYC'}
              </span>
            </div>
            <a href="#reservation" className="nav-reserve">
              <span>Book a Table</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <button
              className={`nav-mobile-btn${menuOpen ? ' nav-mobile-btn-open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span className="nav-fork-knife">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line x1="7"  y1="2"  x2="7"  y2="22" stroke={forkColor} strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="4"  y1="2"  x2="4"  y2="8"  stroke={forkColor} strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="10" y1="2"  x2="10" y2="8"  stroke={forkColor} strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M4 8 Q4 12 7 13 Q10 12 10 8" stroke={forkColor} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <line x1="17" y1="2"  x2="17" y2="22" stroke={forkColor} strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M17 2 C20 2 21 5 21 9 C21 12 19 13.5 17 14" stroke={forkColor} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="nav-close-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={forkColor} strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6"  x2="6"  y2="18"/>
                  <line x1="6"  y1="6"  x2="18" y2="18"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-backdrop${menuOpen ? ' nav-backdrop-open' : ''}`} onClick={close} />

      <div className={`nav-panel${menuOpen ? ' nav-panel-open' : ''}`}>
        <div className="nav-panel-leaf">
          <svg width="100" height="142" viewBox="0 0 100 142" fill="none">
            <path d="M50 8C76 24 92 64 86 98C80 132 62 140 50 138C38 136 20 124 14 98C8 72 20 28 44 13C50 8 48 3 50 8Z" fill="#2E7D32"/>
            <path d="M50 8L50 138" stroke="#1B5E20" strokeWidth="1.3" fill="none" opacity=".5"/>
            <path d="M50 46C34 58 14 70 8 86" stroke="#1B5E20" strokeWidth=".9" fill="none" opacity=".38"/>
          </svg>
        </div>
        <span className="nav-panel-logo">Savoure</span>
        <span className="nav-panel-tagline">Where the world sits at one table.</span>
        <ul className="nav-panel-links">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a href={link.href} className="nav-panel-link" onClick={close}>
                <span className="nav-panel-num">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-panel-bottom">
          <a href="#reservation" className="nav-panel-reserve" onClick={close}>
            Book a Table
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <p className="nav-panel-contact">
            142 West Ember Lane, Tribeca<br/>
            <a href="tel:+12125550194">+1 (212) 555-0194</a><br/>
            Tue\u2013Sun \u00b7 5PM \u2013 11PM
          </p>
        </div>
      </div>
    </>
  )
}