"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"

type Slide = { src: string; alt: string }

const SLIDE_INTERVAL = 5000

export default function HeroSection({
  namaGereja,
  tagline,
  slides,
}: {
  namaGereja: string
  tagline: string
  slides: Slide[]
}) {
  const screenSize = useScreenSize()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  // Passive scroll listener + RAF — most performant parallax method.
  // Bypasses Framer Motion entirely; direct DOM style update per frame.
  useEffect(() => {
    const section = sectionRef.current
    const wrapper = parallaxRef.current
    if (!section || !wrapper) return

    let rafId = 0

    const update = () => {
      const { top, height } = section.getBoundingClientRect()
      // 0 when section top hits viewport top → 1 when section fully exits
      const progress = Math.max(0, Math.min(1, -top / height))
      // scale(1.3) = 15% extra each side; translateY(0→12%) stays within that budget
      wrapper.style.transform = `translateY(${progress * 12}%) scale(1.3)`
      rafId = 0
    }

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    if (slides.length <= 1 || paused) return
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [paused, slides.length, resetKey])

  useEffect(() => {
    const onVisible = () => {
      if (!document.hidden) setResetKey((k) => k + 1)
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrent(index)
    setResetKey((k) => k + 1)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
    setResetKey((k) => k + 1)
  }, [slides.length])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
    setResetKey((k) => k + 1)
  }, [slides.length])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[620px] flex items-end overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Parallax wrapper — plain div, transform driven by scroll RAF */}
      <div
        ref={parallaxRef}
        className="absolute inset-0"
        style={{ willChange: "transform", transform: "translateY(0%) scale(1.3)" }}
      >
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: i === 0 ? 0.6 : 0 }}
            animate={{ opacity: i === current ? 0.6 : 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              quality={90}
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/15 to-transparent z-10" />

      {/* Pixel trail */}
      <GooeyFilter id="gooey-filter-hero" strength={5} />
      <div className="absolute inset-0 z-20" style={{ filter: "url(#gooey-filter-hero)" }}>
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white/30"
        />
      </div>

      {/* Nav arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Slide sebelumnya"
            className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/22 border border-white/15 flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Slide berikutnya"
            className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/22 border border-white/15 flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide number — top right */}
      {slides.length > 1 && (
        <div className="absolute top-8 right-8 md:right-12 z-30 hidden md:flex items-center gap-2">
          <span className="text-white font-bold text-sm tabular-nums">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-white/30 text-xs">/</span>
          <span className="text-white/40 text-xs tabular-nums">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-accent flex-shrink-0" />
            <span className="text-accent text-xs tracking-[0.25em] font-semibold uppercase">
              Selamat Datang
            </span>
          </div>

          <h1
            className="font-extrabold text-white leading-[0.92] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 7.5vw, 5.5rem)" }}
          >
            {namaGereja}
          </h1>

          <div className="w-10 h-px bg-white/25 mb-5" />

          <p className="text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            {tagline}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#jadwal-ibadah"
              className="bg-accent hover:bg-accent-hover text-white text-xs font-bold tracking-[0.12em] px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-accent/20 hover:shadow-accent/35"
            >
              JADWAL IBADAH
            </Link>
            <Link
              href="/tentang"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-[0.12em] px-7 py-3.5 rounded-full border border-white/25 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              TENTANG KAMI
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === current ? "2rem" : "0.45rem" }}
            >
              <span className="absolute inset-0 bg-white/25 rounded-full" />
              {i === current && (
                <motion.span
                  key={`${current}-${resetKey}`}
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
