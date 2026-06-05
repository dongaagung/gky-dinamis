import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";
import PageHero from "@/app/components/ui/PageHero";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Komunitas — GKY Balikpapan",
  description: "Komunitas dan persekutuan GKY Balikpapan — ibadah umum, remaja, pemuda, dan lainnya",
};

type KomunitasDoc = {
  id: string | number;
  nama: string;
  slug: string;
  deskripsi?: string | null;
  jadwal?: { id?: string | null; namaIbadah: string }[] | null;
};

export default async function KomunitasPage() {
  const payload = await getPayload({ config });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { docs: komunitas } = (await (payload as any).find({
    collection: "komunitas",
    where: { aktif: { equals: true } },
    sort: "urutan",
  })) as { docs: KomunitasDoc[] };

  return (
    <>
      <PageHero
        title="Komunitas"
        subtitle="Bergabunglah dalam komunitas dan persekutuan GKY Balikpapan"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {komunitas.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-medium">Konten komunitas sedang disiapkan.</p>
              <p className="text-sm mt-2">Silakan kembali lagi nanti.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {komunitas.map((k) => (
                <Link
                  key={k.id}
                  href={`/komunitas/${k.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-primary group-hover:text-primary/80 mb-2">
                    {k.nama}
                  </h3>
                  {k.deskripsi && (
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {k.deskripsi}
                    </p>
                  )}
                  {k.jadwal && k.jadwal.length > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {k.jadwal.length} jadwal
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                    Lihat Detail
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
