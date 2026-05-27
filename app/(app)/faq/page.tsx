import type { Metadata } from "next";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";
import FAQClient from "@/app/components/faq/FAQClient";

export const metadata: Metadata = {
  title: "FAQ — GKY Balikpapan",
  description: "Pertanyaan yang sering diajukan seputar GKY Balikpapan",
};

export default async function FaqPage() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "faq",
    sort: "urutan",
    limit: 200,
  });

  

  return (
    <main className="min-h-screen">
      <section className="relative bg-[#002F5F] py-14 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#002F5F]/60 to-[#002F5F]/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Pertanyaan Umum
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Temukan jawaban atas pertanyaan yang sering diajukan seputar gereja kami.
          </p>
        </div>
      </section>

      <FAQClient
        items={docs.map((d) => ({
          id: String(d.id),
          pertanyaan: d.pertanyaan,
          jawaban: d.jawaban,
          kategori: d.kategori as "umum" | "ibadah" | "pelayanan",
        }))}
      />
    </main>
  );
}
