import type { Metadata } from "next";
import { pengurus, kelompokPengurus } from "@/data/pengurus";
import PengurusCard from "@/app/components/pengurus/PengurusCard";
import PageHero from "@/app/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Pengurus — GKY Balikpapan",
  description: "Struktur pengurus dan pelayan jemaat GKY Balikpapan Balikpapan",
};

export default function PengurusPage() {
  return (
    <>
      <PageHero
        title="Struktur Pengurus"
        subtitle="Mengenal para pelayan dan pengurus GKY Balikpapan"
      />

      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 space-y-20">
          {kelompokPengurus.map((kelompok, kelompokIndex) => {
            const anggota = pengurus.filter(
              (p) => p.kategori === kelompok.kategori
            );
            const isFeatured = kelompok.kategori === "Pelayan Firman";

            return (
              <section key={kelompok.kategori}>
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {kelompokIndex + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                      {kelompok.kategori}
                    </h2>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {kelompok.deskripsi}
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 hidden sm:block" />
                </div>

                <div
                  className={
                    isFeatured
                      ? "flex flex-wrap justify-center gap-6"
                      : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
                  }
                >
                  {anggota.map((p) => (
                    <div
                      key={p.id}
                      className={isFeatured ? "w-48 md:w-56" : undefined}
                    >
                      <PengurusCard pengurus={p} featured={isFeatured} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
