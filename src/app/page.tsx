'use client'
import { useSplash }   from '@/hooks/useSplash'
import SplashScreen    from '@/components/layout/SplashScreen'
import Navbar          from '@/components/layout/Navbar'
import CustomCursor    from '@/components/ui/CustomCursor'
import Hero            from '@/components/sections/Hero'
import Marquee         from '@/components/sections/Marquee'
import About           from '@/components/sections/About'
import Menu            from '@/components/sections/Menu'
import SignatureDish   from '@/components/sections/SignatureDish'
import Reservation     from '@/components/sections/Reservation'
import Gallery         from '@/components/sections/Gallery'
import Testimonials    from '@/components/sections/Testimonials'
import Story           from '@/components/sections/Story'
import Footer          from '@/components/layout/Footer'

export default function Home() {
  const { showSplash, exiting, exitSplash } = useSplash()

  return (
    <>
      <CustomCursor />
      {showSplash && <SplashScreen onExit={exitSplash} exiting={exiting} />}
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <Marquee />
        <section id="about"><About /></section>
        <section id="menu"><Menu /></section>
        <section id="signature"><SignatureDish /></section>
        <Reservation />
        <Gallery />
        <Testimonials />
        <Story />
      </main>
      <Footer />
    </>
  )
}