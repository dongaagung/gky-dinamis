import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import InfoKontak from "@/app/components/kontak/InfoKontak";
import PetaLokasi from "@/app/components/kontak/PetaLokasi";
import FormKontak from "@/app/components/kontak/FormKontak";
import PageHero from "@/app/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Kontak — GKY Balikpapan",
  description: "Hubungi GKY Balikpapan — alamat, telepon, email, dan formulir pesan",
};

export default async function KontakPage() {
  const payload = await getPayload({ config });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  return (
    <>
      <PageHero
        title="Kontak"
        subtitle="Kami senang mendengar dari Anda — jangan ragu untuk menghubungi kami"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <InfoKontak siteSettings={siteSettings} />
              <PetaLokasi
                alamat={siteSettings.alamat ?? ""}
                googleMapsEmbedUrl={siteSettings.googleMapsEmbedUrl}
              />
            </div>

            <div className="lg:sticky lg:top-24">
              <FormKontak />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
