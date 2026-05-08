'use client'
import { useState } from 'react'
import { SITE, NAV_LINKS } from '@/lib/constants'
import styles from './Footer.module.css'

const EXPERIENCE_LINKS = [
  { label: 'Tasting Menu',    href: '#menu' },
  { label: "Chef's Table",    href: '#menu' },
  { label: 'Wine Pairing',    href: '#menu' },
  { label: 'Private Events',  href: '#reservation' },
  { label: 'Gift Cards',      href: '#reservation' },
  { label: 'Careers',         href: '#contact' },
  { label: 'Contact Us',      href: '#contact' },
]

export default function Footer() {
  const [email, setEmail]       = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return
    setSubscribed(true)
  }

  return (
    <>
      {/* ── PRE-FOOTER CTA ── */}
      <div className={styles.preCta} id="contact">
        <div className={styles.preCtaBg} />
        <div className={styles.preCtaGlow} />

        {/* botanicals */}
        <div className={styles.preLeaf} aria-hidden>
          <svg width="88" height="126" viewBox="0 0 88 126" fill="none">
            <path d="M44 6C68 22 82 62 76 96C70 130 52 136 44 134C36 132 18 120 12 96C6 72 16 28 38 13C44 7 42 2 44 6Z" fill="#2E7D32"/>
            <path d="M44 6L44 134" stroke="#1B5E20" strokeWidth="1.3" fill="none" opacity=".5"/>
            <path d="M44 38C30 50 12 60 8 76" stroke="#1B5E20" strokeWidth=".9" fill="none" opacity=".38"/>
            <path d="M44 68C56 78 70 88 76 100" stroke="#1B5E20" strokeWidth=".9" fill="none" opacity=".35"/>
          </svg>
        </div>
        <div className={styles.preChilli} aria-hidden>
          <svg width="14" height="46" viewBox="0 0 14 46" fill="none">
            <path d="M7 3C5 1 5 0 7 0C9 0 9 1 7 3Z" fill="#4a7a40"/>
            <path d="M7 3C11 10 13 23 10 35C8.5 41 6 45 7 46C8.5 45 6.5 41 6.5 35C3.5 23 3 10 7 3Z" fill="#C8390A" fillOpacity=".85"/>
          </svg>
        </div>
        <div className={styles.preCitrus} aria-hidden>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="24" stroke="#E8650A" strokeWidth="1.1" strokeOpacity=".4" fill="#E8650A" fillOpacity=".05"/>
            <circle cx="26" cy="26" r="15" stroke="#E8650A" strokeWidth=".9" strokeOpacity=".28" fill="none"/>
            <line x1="26" y1="7" x2="26" y2="45" stroke="#C8390A" strokeWidth=".7" strokeOpacity=".28"/>
            <line x1="7" y1="26" x2="45" y2="26" stroke="#C8390A" strokeWidth=".7" strokeOpacity=".28"/>
            <line x1="12" y1="12" x2="40" y2="40" stroke="#C8390A" strokeWidth=".55" strokeOpacity=".2"/>
            <line x1="40" y1="12" x2="12" y2="40" stroke="#C8390A" strokeWidth=".55" strokeOpacity=".2"/>
          </svg>
        </div>

        <div className={styles.preCtaContent}>
          <p className={styles.preCtaLabel}>Last Call</p>
          <h2 className={styles.preCtaScript}>
            Your table is<br />
            <span className={styles.preCtaEmber}>waiting.</span>
          </h2>
          <p className={styles.preCtaSub}>
            142 West Ember Lane, Tribeca. Dinner service Tuesday through Sunday,
            5PM to 11PM. Reservations only.
          </p>
          <div className={styles.preCtaActions}>
            <a href="#reservation" className="btn-ember">
              <span>Reserve a Table</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href={`tel:${SITE.phone}`} className="btn-ghost">
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerTexture} />

        {/* accent line */}
        <div className={styles.accentLine} />

        {/* image strip */}
        <div className={styles.imgStrip}>
          <div className={styles.stripImg} style={{ backgroundImage: "url('/images/hero-dish.png')" }} />
          <div className={styles.stripImg} style={{ backgroundImage: "url('/images/ambiance.png')" }} />
          <div className={styles.stripImg} style={{ backgroundImage: "url('/images/main-scallops.png')" }} />
        </div>

        {/* top grid */}
        <div className={styles.topGrid}>

          {/* BRAND COL */}
          <div className={styles.col}>
            <a href="#hero" className={styles.footerLogo}>Savoure</a>
            <span className={styles.footerTagline}>Where the world sits at one table.</span>
            <p className={styles.footerBrandBody}>
              A global fusion fine dining experience in the heart of Tribeca,
              New York. Every plate a story. Every evening, unforgettable.
            </p>

            {/* socials */}
            <div className={styles.socials}>
              {SITE.socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.social}>
                  {s.label}
                </a>
              ))}
            </div>

            {/* newsletter */}
            <div className={styles.newsletter}>
              <span className={styles.newsletterLabel}>Get the seasonal menu first</span>
              {subscribed ? (
                <div className={styles.newsletterSuccess}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  You&rsquo;re on the list!
                </div>
              ) : (
                <div className={styles.newsletterForm}>
                  <input
                    className={styles.newsletterInput}
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  />
                  <button className={styles.newsletterBtn} onClick={handleSubscribe}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* NAVIGATE COL */}
          <div className={styles.col}>
            <span className={styles.colLabel}>Navigate</span>
            <ul className={styles.navList}>
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink}>{link.label}</a>
                </li>
              ))}
              <li><a href="#story" className={styles.navLink}>Our Story</a></li>
              <li><a href="#testimonials" className={styles.navLink}>Reviews</a></li>
            </ul>
          </div>

          {/* EXPERIENCE COL */}
          <div className={styles.col}>
            <span className={styles.colLabel}>Experience</span>
            <ul className={styles.navList}>
              {EXPERIENCE_LINKS.map(link => (
                <li key={link.label}>
                  <a href={link.href} className={styles.navLink}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* FIND US COL */}
          <div className={styles.col}>
            <span className={styles.colLabel}>Find Us</span>
            <address className={styles.address}>
              <p>
                <strong>142 West Ember Lane</strong><br />
                Tribeca, New York<br />
                NY 10013
              </p>
              <p>
                <a href={`tel:${SITE.phone}`} className={styles.addressLink}>
                  {SITE.phone}
                </a><br />
                <a href={`mailto:${SITE.email}`} className={styles.addressLink}>
                  {SITE.email}
                </a>
              </p>
            </address>

            <span className={styles.colLabel} style={{ marginTop: 20 }}>Hours</span>
            <div className={styles.hours}>
              {SITE.hours.map(h => (
                <div key={h.day} className={styles.hourRow}>
                  <span className={styles.hourDay}>{h.day}</span>
                  <span className={`${styles.hourTime} ${h.closed ? styles.hourClosed : ''}`}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span className={styles.copyright}>
              © 2025 Savoure NYC · Designed &amp; built by{' '}
              <a href="https://linkedin.com/in/marvel-mafong" target="_blank" rel="noopener noreferrer">
                Marvel Mafong
              </a>
            </span>
            <div className={styles.legalLinks}>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
          <span className={styles.bottomScript}>Every plate tells a story.</span>
        </div>

        {/* built-by credit */}
        <p className={styles.builtBy}>
          Built with precision by{' '}
          <a href="https://linkedin.com/in/marvel-mafong" target="_blank" rel="noopener noreferrer">
            Marvel Mafong
          </a>
          {' '}· Creative Frontend Engineer · Cameroon 🇨🇲
        </p>
      </footer>
    </>
  )
}