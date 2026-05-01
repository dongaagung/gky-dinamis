import type { Metadata } from "next";
import ProfilSection from "@/app/components/tentang/ProfilSection";
import VisiMisiSection from "@/app/components/tentang/VisiMisiSection";
import SejarahSection from "@/app/components/tentang/SejarahSection";
import PageHero from "@/app/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Tentang Gereja — GKY Balikpapan",
  description: "Profil, visi misi, dan sejarah GKY Balikpapan Balikpapan",
};

export default function TentangPage() {
  return (
    <>
      <PageHero
        title="Tentang Gereja"
        subtitle="Mengenal lebih dekat GKY Balikpapan — sejarah, visi, dan misi kami"
      />

      <ProfilSection />
      <VisiMisiSection />
      <SejarahSection />
    </>
  );
}
