"use client";

import { useRouter, usePathname } from "next/navigation";
import GaleriFilter from "@/app/components/galeri/GaleriFilter";
import GaleriGrid from "@/app/components/galeri/GaleriGrid";
import Pagination from "@/app/components/ui/Pagination";
import type { GaleriItem } from "@/app/components/galeri/GaleriGrid";

interface GaleriClientProps {
  items: GaleriItem[];
  kategoriList: string[];
  hitungPerKategori: Record<string, number>;
  currentKategori: string;
  currentPage: number;
  totalPages: number;
}

export default function GaleriClient({
  items,
  kategoriList,
  hitungPerKategori,
  currentKategori,
  currentPage,
  totalPages,
}: GaleriClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const aktif = currentKategori || "Semua";
  const totalFoto = Object.values(hitungPerKategori).reduce((a, b) => a + b, 0);
  const fotoCount = currentKategori ? (hitungPerKategori[currentKategori] ?? 0) : totalFoto;
  const extraParams = currentKategori ? { kategori: currentKategori } : undefined;

  function handleFilterChange(k: string) {
    const params = new URLSearchParams();
    if (k !== "Semua") params.set("kategori", k);
    // Reset to page 1 when filter changes
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <section className="py-20 bg-[#f7f7f8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <GaleriFilter
            kategori={kategoriList}
            aktif={aktif}
            onChange={handleFilterChange}
            hitungPerKategori={hitungPerKategori}
          />
        </div>

        <p className="text-xs text-gray-400 text-center mb-8">
          {fotoCount} foto{aktif !== "Semua" ? ` dalam kategori "${aktif}"` : ""}
          {totalPages > 1 ? ` · halaman ${currentPage} dari ${totalPages}` : ""}
        </p>

        <GaleriGrid items={items} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/galeri"
          extraParams={extraParams}
        />
      </div>
    </section>
  );
}
