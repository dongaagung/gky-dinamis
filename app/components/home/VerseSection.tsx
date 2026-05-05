"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function VerseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section className="py-24 md:py-32 bg-[#d4c677]">
      <div ref={ref} className="max-w-3xl mx-auto px-6 text-center">
        {/* Large decorative quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[6rem] leading-[0.7] text-white select-none font-serif mb-2"
          aria-hidden="true"
        >
          &ldquo;
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-xl md:text-2xl lg:text-3xl font-light text-gray-700 leading-loose tracking-tight -mt-2 
             transform transition-all duration-500 ease-out
             hover:scale-110 hover:text-gray-900 
             hover:shadow-2xl hover:shadow-black/20
             hover:-translate-y-1
             hover:bg-white/10 backdrop-blur-sm
             p-4 rounded-xl"
        >
          Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah
          mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya
          kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <div className="w-14 h-px bg-white" />
          <cite className="text-white text-xs font-bold tracking-[0.3em] not-italic">
            YOHANES 3:16
          </cite>
          <div className="w-14 h-px bg-white" />
        </motion.div>
      </div>
    </section>
  );
}
