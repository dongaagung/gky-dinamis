import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import KegiatanCard from "@/app/components/kegiatan/KegiatanCard";
import SectionTitle from "@/app/components/ui/SectionTitle";
import PageHero from "@/app/components/ui/PageHero";
import Pagination from "@/app/components/ui/Pagination";

export const metadata: Metadata = {
  title: "Kegiatan — GKY Balikpapan",
  description: "Daftar kegiatan dan program pelayanan GKY Balikpapan",
};

const LIMIT = 9;

export default async function KegiatanPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const parsed = parseInt(pageParam ?? "1", 10);
  const currentPage = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;

  const payload = await getPayload({ config });
  const { docs, totalDocs, totalPages } = await payload.find({
    collection: "kegiatan",
    sort: "-tanggal",
    limit: LIMIT,
    page: currentPage,
  });

  return (
    <>
      <PageHero
        title="Kegiatan"
        subtitle="Program dan kegiatan pelayanan GKY Balikpapan"
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            title="Semua Kegiatan"
            subtitle={`${totalDocs} kegiatan tercatat`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {docs.map((item) => (
              <KegiatanCard key={item.id} kegiatan={item} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/kegiatan"
          />
        </div>
      </section>
    </>
  );
}
