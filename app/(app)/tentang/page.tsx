import type { Metadata } from "next";
import ProfilSection from "@/app/components/tentang/ProfilSection";
import VisiMisiSection from "@/app/components/tentang/VisiMisiSection";
import SejarahSection from "@/app/components/tentang/SejarahSection";

export const metadata: Metadata = {
  title: "Tentang Gereja — GKY Balikpapan",
  description: "Profil, visi misi, dan sejarah GKY Balikpapan Balikpapan",
};

export default function TentangPage() {
  return (
    <>
      <div className="bg-primary py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Tentang Gereja</h1>
          <p className="text-white/70 text-base md:text-lg">
            Mengenal lebih dekat GKY Balikpapan — sejarah, visi, dan misi kami
          </p>
        </div>
      </div>

      <ProfilSection />
      <VisiMisiSection />
      <SejarahSection />
    </>
  );
}
