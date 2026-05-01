"use client";

import { useState } from "react";
import { galeri, kategoriGaleri } from "@/data/galeri";
import GaleriFilter from "@/app/components/galeri/GaleriFilter";
import GaleriGrid from "@/app/components/galeri/GaleriGrid";

export default function GaleriSection() {
  const [aktif, setAktif] = useState<string>("Semua");

  const hitungPerKategori = Object.fromEntries(
    kategoriGaleri.map((k) => [k, galeri.filter((g) => g.kategori === k).length])
  );

  const filtered = aktif === "Semua" ? galeri : galeri.filter((g) => g.kategori === aktif);

  return (
    <section className="py-20 bg-[#f7f7f8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
       
        <div className="mb-8">
          <GaleriFilter
            kategori={kategoriGaleri}
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
