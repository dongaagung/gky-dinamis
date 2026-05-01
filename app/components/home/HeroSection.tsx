"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { siteInfo } from "@/data/siteInfo"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"

const slides = [
  {
    src: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80",
    alt: "Interior gereja",
  },
  {
    src: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80",
    alt: "Alkitab dan doa",
  },
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80",
    alt: "Komunitas jemaat",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
    alt: "Ibadah bersama",
  },
]

const SLIDE_INTERVAL = 5000

export default function HeroSection() {
  const screenSize = useScreenSize()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    stopTimer()
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, SLIDE_INTERVAL)
  }, [stopTimer])

  useEffect(() => {
    if (!paused) startTimer()
    else stopTimer()
    return stopTimer
  }, [paused, startTimer, stopTimer])

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index)
      if (!paused) startTimer()
    },
    [paused, startTimer]
  )

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#002F5F]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slideshow images — cross-fade + parallax Y */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ y: parallaxY, scale: 1.2 }}
          animate={{ opacity: i === current ? 0.4 : 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </motion.div>
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#002F5F]/60 via-transparent to-[#002F5F]/80 z-10" />

      {/* Gooey pixel trail layer */}
      <GooeyFilter id="gooey-filter-hero" strength={5} />
      <div
        className="absolute inset-0 z-20"
        style={{ filter: "url(#gooey-filter-hero)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white/60"
        />
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Slide sebelumnya"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Slide berikutnya"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 py-24 text-center w-full">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight tracking-tight">
          {siteInfo.namaGereja}
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          {siteInfo.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#jadwal-ibadah"
            className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-accent/20"
          >
            Jadwal Ibadah
          </Link>
          <Link
            href="/tentang"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full border border-white/30 transition-colors"
          >
            Tentang Kami
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === current ? "2rem" : "0.75rem" }}
          >
            <span className="absolute inset-0 bg-white/30 rounded-full" />
            {i === current && (
              <motion.span
                key={current}
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
