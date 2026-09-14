"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

type MenuItem = {
  href: string
  label: string
  deskripsi: string
  external?: boolean
}

const menus: MenuItem[] = [
  {
    href: "/tentang",
    label: "Tentang Kami",
    deskripsi: "Kenali profil, visi misi, dan perjalanan sejarah GKY Balikpapan sejak berdiri hingga kini.",
  },
  {
    href: "/pengurus",
    label: "Pengurus",
    deskripsi: "Kenali para pendeta, majelis, dan tim pelayanan yang memimpin jemaat GKY Balikpapan.",
  },
  {
    href: "/kegiatan",
    label: "Kegiatan",
    deskripsi: "Ikuti berbagai agenda dan kegiatan gereja — dari ibadah khusus hingga aksi sosial.",
  },
  {
    href: "/komunitas",
    label: "Komunitas",
    deskripsi: "Bergabunglah dalam komunitas ibadah kami — dari anak-anak, remaja, pemuda, hingga keluarga.",
  },
  {
    href: "/media",
    label: "Media",
    deskripsi: "Tonton khotbah, lihat galeri foto, dan ikuti dokumentasi kehidupan jemaat GKY Balikpapan.",
  },
  {
    href: "https://gky.or.id/gema.jsp?title=Gerakan+Membaca+Alkitab",
    label: "GEMA",
    deskripsi: "Gerakan Membaca Alkitab — panduan baca Alkitab harian untuk membangun kedekatan dengan Firman Tuhan.",
    external: true,
  },
  {
    href: "/faq",
    label: "FAQ",
    deskripsi: "Temukan jawaban atas pertanyaan umum seputar ibadah, pelayanan, dan jemaat.",
  },
  {
    href: "/kontak",
    label: "Kontak",
    deskripsi: "Hubungi kami melalui telepon, email, atau kunjungi langsung lokasi gereja.",
  },
]

// Bento layout classes (lg breakpoint):
// Tentang: col 1-2, row 1-2 (featured)
// Pengurus: col 3, row 1
// Kegiatan: col 4, row 1
// Komunitas: col 3, row 2
// Media: col 4, row 2
// GEMA: col 1, row 3
// FAQ: col 2, row 3
// Kontak: col 3-4, row 3
const bentoClass = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-start-3",
  "lg:col-start-4",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-4 lg:row-start-2",
  "lg:col-start-1 lg:row-start-3",
  "lg:col-start-2 lg:row-start-3",
  "lg:col-start-3 lg:col-span-2 lg:row-start-3",
]

export default function MenuRingkasanSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 })
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-6 h-px bg-accent flex-shrink-0" />
            <span className="text-accent text-xs tracking-[0.25em] font-semibold uppercase">
              Semua yang Anda Butuhkan
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
            Jelajahi Gereja Kami
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:grid-rows-[220px_220px_180px]"
        >
          {menus.map((menu, i) => (
            <motion.div
              key={menu.href}
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className={cn(bentoClass[i], i === 0 && "sm:col-span-2")}
            >
              {(() => {
                const cardClassName =
                  "group flex flex-col justify-between h-full min-h-[160px] p-6 md:p-7 rounded-2xl bg-gray-50 hover:bg-primary border border-gray-100 hover:border-primary transition-all duration-400 overflow-hidden relative"

                const content = (
                  <>
                    {/* Number label */}
                    <span className="text-xs font-bold text-gray-200 group-hover:text-white/20 tracking-[0.2em] transition-colors duration-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div className="mt-auto">
                      <h3 className={cn(
                        "font-bold text-primary group-hover:text-white transition-colors duration-400 mb-2 leading-tight",
                        i === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                      )}>
                        {menu.label}
                      </h3>
                      <p className={cn(
                        "text-gray-500 group-hover:text-white/65 transition-colors duration-400 leading-relaxed",
                        i === 0 ? "text-sm md:text-base max-w-xs" : "text-sm line-clamp-2"
                      )}>
                        {menu.deskripsi}
                      </p>

                      {/* Arrow */}
                      <div className="flex items-center gap-1.5 mt-4 text-accent group-hover:text-white/80 transition-all duration-400">
                        <span className="text-xs font-bold tracking-[0.18em]">LIHAT</span>
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Subtle hover background accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-8 translate-x-8 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-50" />
                  </>
                )

                return menu.external ? (
                  <a
                    href={menu.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={menu.href} className={cardClassName}>
                    {content}
                  </Link>
                )
              })()}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
