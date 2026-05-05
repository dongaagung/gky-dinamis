"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type JadwalHariItem = {
  id?: string | null
  hari: string
  waktu: string
}

type JadwalItem = {
  id: string
  nama: string
  jadwalHari?: JadwalHariItem[] | null
  lokasi?: string | null
}

const HARI_ORDER = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

const HARI_ABBR: Record<string, string> = {
  Minggu: 'Min', Senin: 'Sen', Selasa: 'Sel',
  Rabu: 'Rab', Kamis: 'Kam', Jumat: 'Jum', Sabtu: 'Sab',
}

function groupByHari(jadwalHari: JadwalHariItem[]): { hari: string; waktuList: string[] }[] {
  const map = new Map<string, string[]>()
  for (const item of jadwalHari) {
    const existing = map.get(item.hari)
    if (existing) existing.push(item.waktu)
    else map.set(item.hari, [item.waktu])
  }
  return HARI_ORDER.filter((h) => map.has(h)).map((h) => ({ hari: h, waktuList: map.get(h)! }))
}

function JadwalCard({ item, index }: { item: JadwalItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const grouped = item.jadwalHari ? groupByHari(item.jadwalHari) : []

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group relative bg-white/85 backdrop-blur-sm rounded-2xl border border-white shadow-[0_2px_16px_rgba(0,94,155,0.07)] hover:shadow-[0_8px_32px_rgba(0,94,155,0.14)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Gradient top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="p-6 flex flex-col flex-1 gap-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {/* Small index number */}
            <span className="text-[11px] font-bold text-gray-300 tracking-[0.2em] block mb-1.5">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-gray-900 font-bold text-xl leading-tight">{item.nama}</h3>
          </div>
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors duration-300">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Schedule rows */}
        <div className="flex flex-col gap-3">
          {grouped.length > 0 ? grouped.map(({ hari, waktuList }) => (
            <div key={hari} className="flex items-center gap-3">
              {/* Day chip */}
              <span className="w-9 text-center flex-shrink-0 text-[10px] font-extrabold tracking-widest uppercase text-primary/60 bg-primary/6 px-1 py-1.5 rounded-lg">
                {HARI_ABBR[hari] ?? hari.slice(0, 3)}
              </span>
              {/* Connector dot */}
              <div className="w-1 h-1 rounded-full bg-gray-200 flex-shrink-0" />
              {/* Times */}
              <div className="flex flex-wrap gap-1.5">
                {waktuList.map((waktu) => (
                  <span
                    key={waktu}
                    className="text-sm font-bold text-primary bg-primary/8 px-3 py-1 rounded-full tracking-wide"
                  >
                    {waktu}
                  </span>
                ))}
              </div>
            </div>
          )) : (
            <p className="text-gray-400 text-sm italic">Jadwal belum tersedia</p>
          )}
        </div>

        {/* Location footer */}
        {item.lokasi && (
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-gray-500">{item.lokasi}</span>
          </div>
        )}
      </div>

      {/* Decorative glow — bottom right corner */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-primary/4 group-hover:bg-primary/7 transition-colors duration-300 blur-xl" />
    </motion.div>
  )
}

export default function JadwalIbadahSection({ jadwal }: { jadwal: JadwalItem[] }) {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 })

  return (
    <section
      id="jadwal-ibadah"
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(145deg, #f0f6ff 0%, #f8faff 40%, #fff0f0 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
              Bergabunglah Bersama Kami
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
            Jadwal Ibadah
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jadwal.map((item, i) => (
            <JadwalCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
