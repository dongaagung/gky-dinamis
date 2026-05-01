import type { Metadata } from "next";
import { kegiatan } from "@/data/kegiatan";
import KegiatanCard from "@/app/components/kegiatan/KegiatanCard";
import SectionTitle from "@/app/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Kegiatan — GKY Balikpapan",
  description: "Daftar kegiatan dan program pelayanan GKY Balikpapan Balikpapan",
};

export default function KegiatanPage() {
  return (
    <>
      <div className="bg-primary py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Kegiatan</h1>
          <p className="text-white/70 text-base md:text-lg">
            Program dan kegiatan pelayanan GKY Balikpapan
          </p>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            title="Semua Kegiatan"
            subtitle={`${kegiatan.length} kegiatan tercatat`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {kegiatan.map((item) => (
              <KegiatanCard key={item.id} kegiatan={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
