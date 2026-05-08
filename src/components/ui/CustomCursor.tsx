'use client'
import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  let rx = 0, ry = 0

  useEffect(() => {
    let mx = 0, my = 0
    let animId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top  = my + 'px'
      }
    }

    const loop = () => {
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top  = ry + 'px'
      }
      animId = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    animId = requestAnimationFrame(loop)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}