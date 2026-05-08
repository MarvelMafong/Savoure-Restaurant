'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.ab-reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('ab-visible'), i * 90)
          })
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="ab-section" ref={sectionRef}>
      {/* paper texture */}
      <div className="ab-texture" />

      {/* soft cream blob behind images */}
      <div className="ab-blob" />

      {/* spice floats */}
      <div className="ab-spice ab-spice-chilli">
        <svg width="13" height="42" viewBox="0 0 13 42" fill="none">
          <path d="M6.5 3C4.5 1 4.5 0 6.5 0C8.5 0 8.5 1 6.5 3Z" fill="#4a7a40"/>
          <path d="M6.5 3C10 9 11.5 19 9 30C7.5 36 5 40 6.5 42C8 40 6 36 6 30C3 19 3 9 6.5 3Z" fill="#C8390A" fillOpacity=".88"/>
        </svg>
      </div>
      <div className="ab-spice ab-spice-citrus">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="20" stroke="#E8650A" strokeWidth="1.1" strokeOpacity=".4" fill="#E8650A" fillOpacity=".05"/>
          <circle cx="22" cy="22" r="13" stroke="#E8650A" strokeWidth=".9" strokeOpacity=".28" fill="none"/>
          <line x1="22" y1="6" x2="22" y2="38" stroke="#C8390A" strokeWidth=".7" strokeOpacity=".3"/>
          <line x1="6" y1="22" x2="38" y2="22" stroke="#C8390A" strokeWidth=".7" strokeOpacity=".3"/>
          <line x1="11" y1="11" x2="33" y2="33" stroke="#C8390A" strokeWidth=".6" strokeOpacity=".22"/>
          <line x1="33" y1="11" x2="11" y2="33" stroke="#C8390A" strokeWidth=".6" strokeOpacity=".22"/>
        </svg>
      </div>
      <div className="ab-spice ab-spice-star">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l2.4 7.2H22l-6 4.4 2.4 7.2L12 16.4l-6.4 4.4L8 13.6 2 9.2h7.6L12 2z"
            stroke="#C9A96E" strokeWidth="1.2" fill="#C9A96E" fillOpacity=".2"/>
        </svg>
      </div>

      <div className="ab-inner">

        {/* LEFT — image cluster */}
        <div className="ab-images">
          {/* animated dashed rings behind images */}
          <div className="ab-ring ab-ring-1" />
          <div className="ab-ring ab-ring-2" />

          {/* green leaf */}
          <div className="ab-leaf">
            <svg width="88" height="124" viewBox="0 0 88 124" fill="none">
              <path d="M44 7C70 23 86 62 80 96C74 130 56 134 44 132C32 130 14 118 8 96C2 74 14 30 38 13C44 7 42 2 44 7Z" fill="#2E7D32"/>
              <path d="M44 7L44 132" stroke="#1B5E20" strokeWidth="1.3" fill="none" opacity=".5"/>
              <path d="M44 36C30 47 14 57 8 72" stroke="#1B5E20" strokeWidth=".85" fill="none" opacity=".38"/>
              <path d="M44 60C56 70 70 79 80 90" stroke="#1B5E20" strokeWidth=".85" fill="none" opacity=".35"/>
            </svg>
          </div>

          {/* floating badge */}
          <div className="ab-badge">
            <span className="ab-badge-num">14</span>
            <small className="ab-badge-label">Countries of Origin</small>
          </div>

          {/* IMAGE A — main large */}
          <div className="ab-img ab-img-a">
            <Image src="/images/chef.png" alt="Chef at Savoure" fill style={{objectFit:'cover'}}/>
            <div className="ab-img-tag">Est. 2019 · New York</div>
          </div>

          {/* IMAGE B — top right, tilted */}
          <div className="ab-img ab-img-b">
            <Image src="/images/starter.png" alt="Starter" fill style={{objectFit:'cover'}}/>
          </div>

          {/* IMAGE C — bottom right */}
          <div className="ab-img ab-img-c">
            <Image src="/images/hero-dish.png" alt="Signature dish" fill style={{objectFit:'cover'}}/>
          </div>
        </div>

        {/* RIGHT — text */}
        <div className="ab-text">
          <p className="section-label ab-reveal">Who We Are</p>

          <h2 className="ab-headline ab-reveal">
            Born from wanderlust,<br/>plated with{' '}
            <span className="text-grad">precision.</span>
          </h2>

          <p className="ab-body ab-reveal">
            Savoure opened in 2019 in the heart of Tribeca with one conviction:
            the most interesting cuisine exists in the spaces <em>between</em> cultures.
            Not fusion for novelty — fusion for truth.
          </p>

          <blockquote className="ab-quote ab-reveal">
            &ldquo;We don&rsquo;t draw from the world. We draw from its people — the cooks,
            the grandmothers, the street vendors, the Michelin chefs.&rdquo;
          </blockquote>

          <p className="ab-body ab-reveal" style={{marginBottom:0}}>
            Our kitchen team has cooked across four continents. Every person at
            Savoure brings a world with them to this table.
          </p>

          <div className="ab-pillars ab-reveal">
            <div className="ab-pillar">
              <div className="ab-pillar-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h4 className="ab-pillar-title">Farm to Table</h4>
              <p className="ab-pillar-body">Fresh daily from local and global farms.</p>
              <div className="ab-pillar-bar" />
            </div>
            <div className="ab-pillar">
              <div className="ab-pillar-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h4 className="ab-pillar-title">Global Fusion</h4>
              <p className="ab-pillar-body">14 countries in every season&rsquo;s menu.</p>
              <div className="ab-pillar-bar" />
            </div>
            <div className="ab-pillar">
              <div className="ab-pillar-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h4 className="ab-pillar-title">With Intention</h4>
              <p className="ab-pillar-body">Every element on the plate has a reason.</p>
              <div className="ab-pillar-bar" />
            </div>
          </div>
        </div>

      </div>

      {/* STATS BAR */}
      <div className="ab-stats">
        <div className="ab-stat-card ab-reveal">
          <span className="ab-stat-num">6+</span>
          <span className="ab-stat-label">Years of Service</span>
          <p className="ab-stat-desc">Serving New York since 2019 with unwavering passion.</p>
          <div className="ab-stat-bar" />
        </div>
        <div className="ab-stat-card ab-reveal">
          <span className="ab-stat-num">32</span>
          <span className="ab-stat-label">Seasonal Dishes</span>
          <p className="ab-stat-desc">Always fresh, never repeated twice.</p>
          <div className="ab-stat-bar" />
        </div>
        <div className="ab-stat-card ab-reveal">
          <span className="ab-stat-num">14</span>
          <span className="ab-stat-label">Countries of Origin</span>
          <p className="ab-stat-desc">Every flavour tradition at our table.</p>
          <div className="ab-stat-bar" />
        </div>
        <div className="ab-stat-card ab-reveal">
          <span className="ab-stat-num">★4.9</span>
          <span className="ab-stat-label">Guest Rating</span>
          <p className="ab-stat-desc">3,200+ verified dining experiences.</p>
          <div className="ab-stat-bar" />
        </div>
      </div>
    </section>
  )
}