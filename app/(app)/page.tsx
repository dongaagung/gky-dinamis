import { getPayload } from "payload";
import config from "@/payload.config";
import HeroSection from "@/app/components/home/HeroSection";
import JadwalIbadahSection from "@/app/components/home/JadwalIbadahSection";
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
        tagline={siteSettings.tagline ?? ""}
        slides={slides}
      />
      <JadwalIbadahSection jadwal={jadwal} />
      <MenuRingkasanSection />
    </>
  );
}
