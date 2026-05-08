'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { STORY_CHAPTERS } from '@/lib/constants'
import styles from './Story.module.css'

export default function Story() {
  const [visible, setVisible]       = useState(false)
  const [activeIdx, setActiveIdx]   = useState(0)
  const [displayYear, setDisplayYear] = useState(STORY_CHAPTERS[0].year)
  const sectionRef  = useRef<HTMLElement>(null)
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([])

  // section reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // watch which chapter is in view — update spine
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    chapterRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setActiveIdx(i)
            animateYear(STORY_CHAPTERS[i].year)
          }
        },
        { threshold: 0.45 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [visible])

  // count-up year animation
  const animateYear = (targetYear: string) => {
    const target = parseInt(targetYear)
    const start  = parseInt(displayYear)
    if (start === target) return
    const steps = 16
    const diff  = target - start
    let count = 0
    const interval = setInterval(() => {
      count++
      const current = Math.round(start + (diff * count) / steps)
      setDisplayYear(String(current))
      if (count >= steps) {
        setDisplayYear(targetYear)
        clearInterval(interval)
      }
    }, 28)
  }

  return (
    <section
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      ref={sectionRef}
      id="story"
    >
      {/* texture */}
      <div className={styles.texture} />

      {/* ── INTRO BAND ── */}
      <div className={styles.introBand}>
        <div className={styles.introLeft}>
          <p className={styles.label}>Our Story</p>
          <h2 className={styles.introHeading}>
            We didn&rsquo;t open<br />a restaurant.
          </h2>
          <span className={styles.introScript}>We opened a world.</span>
          <p className={styles.introBody}>
            Savoure was born from one obsession — that the most extraordinary
            cuisine lives in the space between cultures. Every chapter below
            is how we got here.
          </p>
        </div>
        <div className={styles.introVisual}>
          <div className={styles.introImgWrap}>
            <Image
              src="/images/chef.png"
              alt="Chef at Savoure"
              fill
              style={{ objectFit: 'cover', filter: 'brightness(0.75) saturate(0.85)' }}
              sizes="(max-width:900px) 100vw, 480px"
            />
            <div className={styles.introImgOverlay} />
            <div className={styles.introImgCaption}>
              <p className={styles.captionScript}>&ldquo;Cook like you mean it.&rdquo;</p>
              <span className={styles.captionSub}>— Chef de Cuisine, Savoure</span>
            </div>
          </div>
          {/* award cards */}
          <div className={`${styles.awardCard} ${styles.awardCard1}`}>
            <span className={styles.awardStar}>★</span>
            <div>
              <strong className={styles.awardTitle}>Michelin Recommended</strong>
              <span className={styles.awardSub}>New York Guide · 2024</span>
            </div>
          </div>
          <div className={`${styles.awardCard} ${styles.awardCard2}`}>
            <span className={styles.awardStar} style={{ color: '#C9A96E' }}>★</span>
            <div>
              <strong className={styles.awardTitle}>Best New Restaurant</strong>
              <span className={styles.awardSub}>NY Times · 2020</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div className={styles.timeline}>

        {/* sticky spine */}
        <div className={styles.spine}>
          <div className={styles.spineLine} />

          {/* progress dots */}
          <div className={styles.spineDots}>
            {STORY_CHAPTERS.map((ch, i) => (
              <button
                key={ch.year}
                className={`${styles.spineDot} ${i < activeIdx ? styles.spineDotDone : ''} ${i === activeIdx ? styles.spineDotActive : ''}`}
                onClick={() => chapterRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                aria-label={`Go to ${ch.year}`}
              />
            ))}
          </div>

          <span className={styles.spineChapter}>
            Chapter {STORY_CHAPTERS[activeIdx].num}
          </span>
          <span className={styles.spineYear}>{displayYear}</span>
          <span className={styles.spineTitle}>
            {STORY_CHAPTERS[activeIdx].title}
          </span>
        </div>

        {/* chapters */}
        <div className={styles.chapters}>
          {STORY_CHAPTERS.map((ch, i) => (
            <div
              key={ch.year}
              className={`${styles.chapter} ${i === activeIdx ? styles.chapterActive : ''}`}
              ref={el => { chapterRefs.current[i] = el }}
            >
              {/* image */}
              <div className={styles.chapterImg}>
                <Image
                  src={ch.image}
                  alt={ch.heading}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width:900px) 100vw, 440px"
                />
                <div className={styles.chapterImgOverlay} />
                <div className={styles.chapterYearBadge}>{ch.year}</div>
              </div>

              {/* text */}
              <div className={styles.chapterText}>
                <span className={styles.chapterNum}>
                  Chapter {ch.num} · {ch.title}
                </span>
                <h3 className={styles.chapterHeading}>
                  {ch.heading.split(' ').map((word, wi) =>
                    wi === ch.heading.split(' ').length - 1
                      ? <span key={wi} className={styles.chapterGrad}>{word}</span>
                      : <span key={wi}>{word} </span>
                  )}
                </h3>
                <p className={styles.chapterBody}>{ch.body}</p>
                <blockquote className={styles.chapterQuote}>{ch.quote}</blockquote>
                <div className={styles.chapterTags}>
                  {ch.tags.map(tag => (
                    <span key={tag} className={styles.chapterTag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CLOSING BAND ── */}
      <div className={styles.closingBand}>
        <div className={styles.closingLeft}>
          <span className={styles.closingScript}>The story continues.</span>
          <p className={styles.closingSub}>
            Every evening is a new chapter. Come write one with us.
            Your table is waiting at 142 West Ember Lane.
          </p>
        </div>
        <div className={styles.closingActions}>
          <a href="#reservation" className="btn-ember">
            <span>Reserve Tonight</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="#menu" className="btn-ink">
            Explore Menu
          </a>
        </div>
      </div>
    </section>
  )
}