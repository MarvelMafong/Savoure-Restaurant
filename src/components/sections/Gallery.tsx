'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { GALLERY_FRAMES } from '@/lib/constants'
import styles from './Gallery.module.css'

export default function Gallery() {
  const [visible, setVisible]       = useState(false)
  const [lightbox, setLightbox]     = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX]         = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [dragMoved, setDragMoved]   = useState(false)
  const [filter, setFilter]         = useState<'all' | 'landscape' | 'portrait' | 'square'>('all')
  const sectionRef  = useRef<HTMLElement>(null)
  const stripRef    = useRef<HTMLDivElement>(null)

  const filtered = filter === 'all'
    ? GALLERY_FRAMES
    : GALLERY_FRAMES.filter(f => f.orient === filter)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // close lightbox on Escape, navigate with arrows
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => i !== null ? Math.min(i + 1, filtered.length - 1) : null)
      if (e.key === 'ArrowLeft')  setLightbox(i => i !== null ? Math.max(i - 1, 0) : null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, filtered.length])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  // drag-to-scroll
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragMoved(false)
    setStartX(e.pageX - (stripRef.current?.offsetLeft ?? 0))
    setScrollLeft(stripRef.current?.scrollLeft ?? 0)
  }
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !stripRef.current) return
    const x = e.pageX - (stripRef.current.offsetLeft)
    const walk = (x - startX) * 1.4
    if (Math.abs(walk) > 4) setDragMoved(true)
    stripRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, startX, scrollLeft])
  const onMouseUp = () => setIsDragging(false)

  const openLightbox = (i: number) => {
    if (dragMoved) return
    setLightbox(i)
  }

  const scrollStrip = (dir: 'left' | 'right') => {
    if (!stripRef.current) return
    stripRef.current.scrollBy({ left: dir === 'right' ? 360 : -360, behavior: 'smooth' })
  }

  return (
    <>
      <section
        className={`${styles.section} ${visible ? styles.visible : ''}`}
        ref={sectionRef}
        id="gallery"
      >
        {/* texture */}
        <div className={styles.texture} />

        {/* header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.label}>Gallery</p>
            <h2 className={styles.heading}>
              Through the <span className={styles.grad}>lens.</span>
            </h2>
            <p className={styles.sub}>
              Every frame from our kitchen, dining room, and table.
              Drag to explore — click to open.
            </p>
          </div>

          {/* filter tabs */}
          <div className={styles.filters}>
            {(['all','landscape','portrait','square'] as const).map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* film strip container */}
        <div className={styles.filmWrap}>
          {/* film perforations top */}
          <div className={styles.filmPerf}>
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={styles.perfHole} />
            ))}
          </div>

          {/* draggable strip */}
          <div
            className={`${styles.strip} ${isDragging ? styles.stripDragging : ''}`}
            ref={stripRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {filtered.map((frame, i) => (
              <div
                key={frame.num}
                className={`${styles.frame} ${styles[`frame${frame.orient.charAt(0).toUpperCase() + frame.orient.slice(1)}`]}`}
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => openLightbox(i)}
              >
                {/* frame number */}
                <div className={styles.frameNum}>{frame.num}</div>

                {/* image */}
                <div className={styles.frameImg}>
                  <Image
                    src={frame.src}
                    alt={frame.caption}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width:768px) 200px, 280px"
                    draggable={false}
                  />
                  {/* sepia → color overlay — fades on hover */}
                  <div className={styles.frameSepia} />
                  {/* caption overlay */}
                  <div className={styles.frameCap}>
                    <span className={styles.frameCapTitle}>{frame.caption}</span>
                    <span className={styles.frameCapSub}>{frame.location}</span>
                  </div>
                  {/* expand icon */}
                  <div className={styles.frameExpand}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="15 3 21 3 21 9"/>
                      <polyline points="9 21 3 21 3 15"/>
                      <line x1="21" y1="3" x2="14" y2="10"/>
                      <line x1="3" y1="21" x2="10" y2="14"/>
                    </svg>
                  </div>
                </div>

                {/* film date strip */}
                <div className={styles.frameDateStrip}>
                  <span>{frame.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* film perforations bottom */}
          <div className={styles.filmPerf}>
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={styles.perfHole} />
            ))}
          </div>
        </div>

        {/* scroll arrows */}
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={() => scrollStrip('left')} aria-label="Scroll left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <span className={styles.arrowHint}>drag to explore</span>
          <button className={styles.arrow} onClick={() => scrollStrip('right')} aria-label="Scroll right">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        {/* frame count */}
        <div className={styles.count}>
          <span>{filtered.length} frames</span>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className={styles.lbOverlay} onClick={() => setLightbox(null)}>
          <div className={styles.lbBox} onClick={e => e.stopPropagation()}>

            {/* close */}
            <button className={styles.lbClose} onClick={() => setLightbox(null)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* image */}
            <div className={styles.lbImg}>
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].caption}
                fill
                style={{ objectFit: 'contain' }}
                sizes="90vw"
                priority
              />
            </div>

            {/* meta */}
            <div className={styles.lbMeta}>
              <div className={styles.lbMetaLeft}>
                <span className={styles.lbNum}>{filtered[lightbox].num}</span>
                <div>
                  <span className={styles.lbCaption}>{filtered[lightbox].caption}</span>
                  <span className={styles.lbLocation}>{filtered[lightbox].location} · {filtered[lightbox].date}</span>
                </div>
              </div>
              <div className={styles.lbNav}>
                <button
                  className={styles.lbNavBtn}
                  onClick={() => setLightbox(i => i !== null ? Math.max(i - 1, 0) : null)}
                  disabled={lightbox === 0}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                  </svg>
                </button>
                <span className={styles.lbCounter}>{lightbox + 1} / {filtered.length}</span>
                <button
                  className={styles.lbNavBtn}
                  onClick={() => setLightbox(i => i !== null ? Math.min(i + 1, filtered.length - 1) : null)}
                  disabled={lightbox === filtered.length - 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}