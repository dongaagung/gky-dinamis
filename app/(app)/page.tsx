export const dynamic = "force-dynamic";

import { getPayload } from "payload";
import config from "@/payload.config";
import HeroSection from "@/app/components/home/HeroSection";
import HighlightStrip from "@/app/components/home/HighlightStrip";
import JadwalIbadahSection from "@/app/components/home/JadwalIbadahSection";
import VerseSection from "@/app/components/home/VerseSection";
import MenuRingkasanSection from "@/app/components/home/MenuRingkasanSection";

export default async function HomePage() {
  const payload = await getPayload({ config });

  const [siteSettings, { docs: jadwal }, { docs: heroSlides }] = await Promise.all([
    payload.findGlobal({ slug: "site-settings" }),
    payload.find({ collection: "jadwal-ibadah", sort: "urutan" }),
    payload.find({
      collection: "hero-slide",
      where: { aktif: { equals: true } },
      sort: "urutan",
    }),
  ]);

  const slides = heroSlides
    .map((s) => {
      const uploadedUrl = typeof s.gambar === "object" && s.gambar?.url ? s.gambar.url : null;
      const src = uploadedUrl ?? s.urlEksternal ?? "";
      return { src, alt: s.alt };
    })
    .filter((s) => s.src !== "");

  return (
    <>
      <HeroSection
        namaGereja={siteSettings.namaGereja ?? ""}
        motto={siteSettings.mottoHero ?? ""}
        slides={slides}
      />
      <HighlightStrip />
      <JadwalIbadahSection jadwal={jadwal} />
      <VerseSection
        ayat={siteSettings.ayatAlkitab ?? "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal."}
        referensi={siteSettings.referensiAyat ?? "Yohanes 3:16"}
      />
      <MenuRingkasanSection />
    </>
  );
}
