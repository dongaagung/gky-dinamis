import type { Metadata } from "next";
import GaleriSection from "@/app/components/galeri/GaleriSection";

export const metadata: Metadata = {
  title: "Galeri — GKY Balikpapan",
  description: "Kumpulan foto kegiatan dan momen berharga GKY Balikpapan Balikpapan",
};

export default function GaleriPage() {
  return (
    <>
      <div className="bg-primary py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Galeri</h1>
          <p className="text-white/70 text-base md:text-lg">
            Momen-momen berharga dalam perjalanan pelayanan kami
          </p>
        </div>
      </div>

      <GaleriSection />
    </>
  );
}
