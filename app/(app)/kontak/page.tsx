import type { Metadata } from "next";
import InfoKontak from "@/app/components/kontak/InfoKontak";
import PetaLokasi from "@/app/components/kontak/PetaLokasi";
import FormKontak from "@/app/components/kontak/FormKontak";

export const metadata: Metadata = {
  title: "Kontak — GKY Balikpapan",
  description: "Hubungi GKY Balikpapan — alamat, telepon, email, dan formulir pesan",
};

export default function KontakPage() {
  return (
    <>
      <div className="bg-primary py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Kontak</h1>
          <p className="text-white/70 text-base md:text-lg">
            Kami senang mendengar dari Anda — jangan ragu untuk menghubungi kami
          </p>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Kolom kiri: Info + Peta */}
            <div className="space-y-6">
              <InfoKontak />
              <PetaLokasi />
            </div>

            {/* Kolom kanan: Form */}
            <div className="lg:sticky lg:top-24">
              <FormKontak />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
