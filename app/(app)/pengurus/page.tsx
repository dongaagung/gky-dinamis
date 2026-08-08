import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import PengurusCard, { type PengurusItem } from "@/app/components/pengurus/PengurusCard";
import PageHero from "@/app/components/ui/PageHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pengurus — GKY Balikpapan",
  description: "Struktur pengurus dan pelayan jemaat GKY Balikpapan",
};

const KELOMPOK_META = [
  {
    kategori: "Rohaniwan",
    label: "Rohaniwan",
    deskripsi: "Rohaniwan yang melayani dan menggembalakan jemaat",
  },
  {
    kategori: "Majelis Jemaat",
    label: "Majelis Jemaat",
    deskripsi: "Penatua dan diaken yang terpilih memimpin jemaat bersama",
  },
  {
    kategori: "Karyawan Gereja",
    label: "Staf Pelayan",
    deskripsi:
      "Staf yang mendukung pelayanan administrasi dan operasional gereja",
  },
] as const;

export default async function PengurusPage() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pengurus",
    sort: "urutan",
    limit: 200,
  });

  const byKategori = new Map<string, PengurusItem[]>();
  for (const p of docs) {
    const key = p.kategori as string;
    if (!byKategori.has(key)) byKategori.set(key, []);
    byKategori.get(key)!.push(p as unknown as PengurusItem);
  }

  return (
    <>
      <PageHero
        title="Struktur Pengurus"
        subtitle="Mengenal para pelayan dan pengurus GKY Balikpapan"
      />

      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 space-y-20">
          {KELOMPOK_META.map((kelompok, kelompokIndex) => {
            const anggota = byKategori.get(kelompok.kategori) ?? [];
            if (anggota.length === 0) return null;
            const isFeatured = kelompok.kategori === "Rohaniwan";

            return (
              <section key={kelompok.kategori}>
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {kelompokIndex + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary">
                      {kelompok.label}
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
                    <div key={p.id} className={isFeatured ? "w-48 md:w-56" : undefined}>
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
