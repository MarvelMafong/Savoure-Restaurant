'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { DISHES, MENU_CATEGORIES, type MenuCategory, type Dish } from '@/lib/constants'
import styles from './Menu.module.css'

export default function Menu() {
  const [active, setActive]         = useState<MenuCategory>('Starters')
  const [visible, setVisible]       = useState(false)
  const [switching, setSwitching]   = useState(false)
  const [cart, setCart]             = useState<Record<string, number>>({})
  const [addedId, setAddedId]       = useState<string | null>(null)
  const [modalOpen, setModalOpen]   = useState(false)
  const [modalCat, setModalCat]     = useState<MenuCategory>('Starters')
  const [toast, setToast]           = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const dishes = DISHES.filter(d => d.category === active)
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const switchCategory = (cat: MenuCategory) => {
    if (cat === active || switching) return
    setSwitching(true)
    setTimeout(() => { setActive(cat); setSwitching(false) }, 320)
  }

  const addToCart = (dish: Dish) => {
    setCart(prev => ({ ...prev, [dish.id]: (prev[dish.id] ?? 0) + 1 }))
    setAddedId(dish.id)
    setToast(`${dish.name} added`)
    setTimeout(() => setAddedId(null), 600)
    setTimeout(() => setToast(null), 2200)
  }

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const next = { ...prev }
      if (next[id] > 1) next[id]--
      else delete next[id]
      return next
    })
  }

  const openModal = (cat?: MenuCategory) => {
    setModalCat(cat ?? 'Starters')
    setModalOpen(true)
  }

  return (
    <>
      <section
        className={`${styles.section} ${visible ? styles.sectionVisible : ''}`}
        ref={sectionRef}
      >
        {/* botanicals */}
        <div className={styles.leafTL} aria-hidden>
          <svg width="68" height="98" viewBox="0 0 68 98" fill="none">
            <path d="M34 5C52 17 64 48 59 74C54 100 40 104 34 102C28 100 14 90 9 74C4 58 12 22 30 9C36 5 34 1 34 5Z" fill="#2E7D32"/>
            <path d="M34 5L34 102" stroke="#1B5E20" strokeWidth="1" fill="none" opacity=".45"/>
            <path d="M34 32C22 42 8 52 5 64" stroke="#1B5E20" strokeWidth=".75" fill="none" opacity=".35"/>
          </svg>
        </div>
        <div className={styles.chilliBR} aria-hidden>
          <svg width="12" height="40" viewBox="0 0 12 40" fill="none">
            <path d="M6 3C4 1 4 0 6 0C8 0 8 1 6 3Z" fill="#4a7a40"/>
            <path d="M6 3C9.5 9 11 19 8.5 29C7 35 5 39 6 40C7.5 39 5.5 35 5.5 29C2.5 19 2.5 9 6 3Z" fill="#C8390A" fillOpacity=".85"/>
          </svg>
        </div>
        <div className={styles.watermark} aria-hidden>
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <line x1="72" y1="20" x2="72" y2="180" stroke="rgba(201,169,110,.05)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="54" y1="20" x2="54" y2="76"  stroke="rgba(201,169,110,.05)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="90" y1="20" x2="90" y2="76"  stroke="rgba(201,169,110,.05)" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M54 76 Q54 104 72 112 Q90 104 90 76" stroke="rgba(201,169,110,.05)" strokeWidth="2.5" fill="none"/>
            <line x1="138" y1="20" x2="138" y2="180" stroke="rgba(201,169,110,.05)" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M138 20 C152 20 158 32 158 52 C158 68 148 77 138 80" stroke="rgba(201,169,110,.05)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <div className={styles.inner}>

          {/* ── LEFT RAIL ── */}
          <aside className={styles.rail}>
            <div className={styles.railTop}>
              <p className={styles.label}>The Menu</p>
              <div className={styles.tonight}>
                <span className={styles.tonightLabel}>Tonight&rsquo;s Special</span>
                <span className={styles.tonightDish}>The Cartographer</span>
              </div>
            </div>

            <nav className={styles.cats}>
              {MENU_CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  className={`${styles.cat} ${active === cat ? styles.catActive : ''}`}
                  onClick={() => switchCategory(cat)}
                >
                  <span className={styles.catNum}>0{i + 1}</span>
                  <span className={styles.catLabel}>{cat}</span>
                  <span className={styles.catBar} />
                  <span className={styles.catDot} />
                  <span className={styles.catCount}>
                    {DISHES.filter(d => d.category === cat).length}
                  </span>
                </button>
              ))}
            </nav>

            {/* cart summary */}
            {totalItems > 0 && (
              <div className={styles.cartSummary}>
                <span className={styles.cartIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </span>
                <span className={styles.cartText}>{totalItems} item{totalItems > 1 ? 's' : ''} selected</span>
                <span className={styles.cartBadge}>{totalItems}</span>
              </div>
            )}

            <button className={styles.fullLink} onClick={() => openModal(active)}>
              <span>View Full Menu</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </aside>

          {/* ── DISH CARDS ── */}
          <div className={`${styles.dishes} ${switching ? styles.dishesLeaving : ''}`}>
            {dishes.map((dish, i) => (
              <article
                key={dish.id}
                className={`${styles.card} ${dish.spotlight ? styles.cardSpotlight : ''} ${addedId === dish.id ? styles.cardAdded : ''}`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className={styles.cardImg}>
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width:768px) 100vw, 220px"
                  />
                  <div className={styles.cardImgOverlay} />
                  <div className={styles.originStrip}>
                    <span>{dish.origin}</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardInfo}>
                      <span className={styles.cardTag}>{dish.tag}</span>
                      <h3 className={styles.cardName}>{dish.name}</h3>
                      <p className={styles.cardDesc}>{dish.description}</p>
                    </div>
                    <div className={styles.cardPriceCol}>
                      <span className={styles.cardPrice}>{dish.price}</span>

                      {/* qty controls if in cart, else + button */}
                      {cart[dish.id] ? (
                        <div className={styles.qtyRow}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => removeFromCart(dish.id)}
                            aria-label="Remove one"
                          >−</button>
                          <span className={styles.qtyNum}>{cart[dish.id]}</span>
                          <button
                            className={`${styles.qtyBtn} ${styles.qtyBtnAdd}`}
                            onClick={() => addToCart(dish)}
                            aria-label="Add one more"
                          >+</button>
                        </div>
                      ) : (
                        <button
                          className={styles.cardAdd}
                          onClick={() => addToCart(dish)}
                          aria-label={`Add ${dish.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5"  y1="12" x2="19" y2="12"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── CTA BAR ── */}
        <div className={styles.ctaBar}>
          <p className={styles.ctaText}>
            Can&rsquo;t decide?{' '}
            <span>Let the chef choose — tasting menu available for the full table.</span>
          </p>
          <div className={styles.ctaActions}>
            <button className={styles.ctaMenuBtn} onClick={() => openModal()}>
              View Full Menu
            </button>
            <a href="#reservation" className="btn-ember">
              <span>Reserve Your Evening</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── TOAST ── */}
      {toast && (
        <div className={styles.toast}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {toast}
        </div>
      )}

      {/* ── FULL MENU MODAL ── */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>

            {/* modal header */}
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalScript}>Savoure</span>
                <p className={styles.modalSub}>Full Seasonal Menu · Spring 2025</p>
              </div>
              <button className={styles.modalClose} onClick={() => setModalOpen(false)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* modal category tabs */}
            <div className={styles.modalTabs}>
              {MENU_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`${styles.modalTab} ${modalCat === cat ? styles.modalTabActive : ''}`}
                  onClick={() => setModalCat(cat)}
                >{cat}</button>
              ))}
            </div>

            {/* modal dish list */}
            <div className={styles.modalList}>
              {DISHES.filter(d => d.category === modalCat).map(dish => (
                <div key={dish.id} className={styles.modalRow}>
                  <div className={styles.modalRowImg}>
                    <Image src={dish.image} alt={dish.name} fill style={{ objectFit: 'cover' }} sizes="80px"/>
                  </div>
                  <div className={styles.modalRowInfo}>
                    <div className={styles.modalRowTop}>
                      <span className={styles.modalRowTag}>{dish.tag}</span>
                      <span className={styles.modalRowOrigin}>{dish.origin}</span>
                    </div>
                    <h4 className={styles.modalRowName}>{dish.name}</h4>
                    <p className={styles.modalRowDesc}>{dish.description}</p>
                  </div>
                  <div className={styles.modalRowRight}>
                    <span className={styles.modalRowPrice}>{dish.price}</span>
                    {cart[dish.id] ? (
                      <div className={styles.qtyRow}>
                        <button className={styles.qtyBtn} onClick={() => removeFromCart(dish.id)}>−</button>
                        <span className={styles.qtyNum}>{cart[dish.id]}</span>
                        <button className={`${styles.qtyBtn} ${styles.qtyBtnAdd}`} onClick={() => addToCart(dish)}>+</button>
                      </div>
                    ) : (
                      <button className={styles.modalRowAdd} onClick={() => addToCart(dish)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* modal footer */}
            <div className={styles.modalFooter}>
              {totalItems > 0 ? (
                <>
                  <span className={styles.modalFooterCount}>{totalItems} item{totalItems > 1 ? 's' : ''} selected for your reservation</span>
                  <a href="#reservation" className="btn-ember" onClick={() => setModalOpen(false)}>
                    <span>Proceed to Reserve</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                </>
              ) : (
                <span className={styles.modalFooterHint}>Select dishes to add them to your reservation preference.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}