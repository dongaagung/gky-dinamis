"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/app/components/ui/SectionTitle";
import FaqItem from "@/app/components/faq/FaqItem";
import FaqFilter from "@/app/components/faq/FaqFilter";
import type { KategoriFaq } from "@/app/components/faq/FaqFilter";

export type FAQItem = {
  id: string;
  pertanyaan: string;
  jawaban: string;
  kategori: "umum" | "ibadah" | "pelayanan";
};

interface FAQClientProps {
  items: FAQItem[];
}

export default function FAQClient({ items }: FAQClientProps) {
  const [filter, setFilter] = useState<KategoriFaq>("semua");

  const tampilkan =
    filter === "semua" ? items : items.filter((item) => item.kategori === filter);

  return (
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
  );
}
