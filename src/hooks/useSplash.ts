'use client'
import { useState, useEffect } from 'react'

export function useSplash() {
  const [showSplash, setShowSplash] = useState(true)
  const [exiting, setExiting] = useState(false)

  const exitSplash = () => {
    setExiting(true)
    setTimeout(() => {
      setShowSplash(false)
      document.body.style.overflow = ''
    }, 1100)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(exitSplash, 4800)
    return () => clearTimeout(timer)
  }, [])

  return { showSplash, exiting, exitSplash }
}