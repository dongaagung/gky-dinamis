"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/app/components/ui/SectionTitle";
import FaqItem from "@/app/components/faq/FaqItem";
import FaqFilter, { type KategoriFaq } from "@/app/components/faq/FaqFilter";
import { faq } from "@/data/faq";

export default function FaqPage() {
  const [filter, setFilter] = useState<KategoriFaq>("semua");

  const tampilkan =
    filter === "semua" ? faq : faq.filter((item) => item.kategori === filter);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-14 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Pertanyaan Umum
        </h1>
        <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
          Temukan jawaban atas pertanyaan yang sering diajukan seputar gereja kami.
        </p>
      </section>

      {/* FAQ Content */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="mb-8">
          <SectionTitle title="FAQ" subtitle="Klik pertanyaan untuk melihat jawaban." />
        </div>

        <div className="mb-8">
          <FaqFilter aktif={filter} onChange={setFilter} />
        </div>

        {tampilkan.length > 0 ? (
          <div className="flex flex-col gap-3">
            {tampilkan.map((item) => (
              <FaqItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">
            Tidak ada FAQ untuk kategori ini.
          </p>
        )}

        {/* CTA */}
        <div className="mt-12 text-center bg-gray-50 rounded-xl py-8 px-6">
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Masih ada pertanyaan? Kami siap membantu.
          </p>
          <Link
            href="/kontak"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors duration-200"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </main>
  );
}
