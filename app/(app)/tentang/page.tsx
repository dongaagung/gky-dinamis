import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import ProfilSection from "@/app/components/tentang/ProfilSection";
import VisiMisiSection from "@/app/components/tentang/VisiMisiSection";
import SejarahSection from "@/app/components/tentang/SejarahSection";
import PageHero from "@/app/components/ui/PageHero";

export const revalidate = 3600; // ISR: regenerate setiap 1 jam di background

export const metadata: Metadata = {
  title: "Tentang Gereja — GKY Balikpapan",
  description: "Profil, visi misi, dan sejarah GKY Balikpapan Balikpapan",
};

export default async function TentangPage() {
  const payload = await getPayload({ config });
  const tentang = await payload.findGlobal({ slug: "tentang-gereja" });

  return (
    <>
      <PageHero
        title="Tentang Gereja"
        subtitle="Mengenal lebih dekat GKY Balikpapan — sejarah, visi, dan misi kami"
      />

      <ProfilSection
        profil={{
          deskripsi: tentang.deskripsi ?? "",
          tahunBerdiri: tentang.tahunBerdiri,
          jumlahJemaat: tentang.jumlahJemaat,
          denominasi: tentang.denominasi,
          foto: tentang.foto,
        }}
      />
      <VisiMisiSection
        visi={tentang.visi ?? ""}
        misi={tentang.misi ?? []}
      />
      <SejarahSection sejarah={tentang.sejarah ?? []} />
    </>
  );
}
