import type { Metadata } from "next";
import GaleriSection from "@/app/components/galeri/GaleriSection";
import PageHero from "@/app/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Galeri — GKY Balikpapan",
  description: "Kumpulan foto kegiatan dan momen berharga GKY Balikpapan Balikpapan",
};

export default function GaleriPage() {
  return (
    <>
      <PageHero
        title="Galeri"
        subtitle="Momen-momen berharga dalam perjalanan pelayanan kami"
      />

      <GaleriSection />
    </>
  );
}
