"use client";

import { useState } from "react";
import GaleriFilter from "@/app/components/galeri/GaleriFilter";
import GaleriGrid from "@/app/components/galeri/GaleriGrid";
import type { GaleriItem } from "@/app/components/galeri/GaleriGrid";

const KATEGORI_ORDER = ["Ibadah", "Kegiatan", "Persekutuan", "Bangunan"];

interface GaleriClientProps {
  items: GaleriItem[];
}

export default function GaleriClient({ items }: GaleriClientProps) {
  const [aktif, setAktif] = useState<string>("Semua");

  const kategoriList = KATEGORI_ORDER.filter((k) =>
    items.some((item) => item.kategori === k)
  );

  const hitungPerKategori = Object.fromEntries(
    kategoriList.map((k) => [k, items.filter((g) => g.kategori === k).length])
  );

  const filtered = aktif === "Semua" ? items : items.filter((g) => g.kategori === aktif);

  return (
    <section className="py-20 bg-[#f7f7f8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <GaleriFilter
            kategori={kategoriList}
            aktif={aktif}
            onChange={setAktif}
            hitungPerKategori={hitungPerKategori}
          />
        </div>

        <p className="text-xs text-gray-400 text-center mb-8">
          Menampilkan {filtered.length} foto
          {aktif !== "Semua" ? ` dalam kategori "${aktif}"` : ""}
        </p>

        <GaleriGrid items={filtered} />
      </div>
    </section>
  );
}
