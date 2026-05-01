"use client";

import { useState } from "react";
import { galeri, kategoriGaleri } from "@/data/galeri";
import GaleriFilter from "@/app/components/galeri/GaleriFilter";
import InteractiveBentoGallery, { type GalleryMediaItem } from "@/components/ui/interactive-bento-gallery";

export default function GaleriSection() {
  const [aktif, setAktif] = useState<string>("Semua");

  const hitungPerKategori = Object.fromEntries(
    kategoriGaleri.map((k) => [k, galeri.filter((g) => g.kategori === k).length])
  );

  const filtered = aktif === "Semua" ? galeri : galeri.filter((g) => g.kategori === aktif);

  const mediaItems: GalleryMediaItem[] = filtered.map((item) => ({
    id: item.id,
    type: "image",
    title: item.keterangan,
    desc: item.kategori,
    url: item.foto,
    span: item.span,
  }));

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Galeri Foto</h2>
          <p className="text-gray-500 text-base md:text-lg">
            Kumpulan momen berharga kegiatan dan ibadah GKY Balikpapan
          </p>
          <div className="mt-4 h-1 w-16 bg-accent rounded-full mx-auto" />
        </div>

        <div className="mb-8">
          <GaleriFilter
            kategori={kategoriGaleri}
            aktif={aktif}
            onChange={setAktif}
            hitungPerKategori={hitungPerKategori}
          />
        </div>

        <p className="text-sm text-gray-400 text-center mb-6">
          Menampilkan {filtered.length} foto
          {aktif !== "Semua" ? ` dalam kategori "${aktif}"` : ""}
        </p>
      </div>

      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title=""
        description=""
      />
    </section>
  );
}
