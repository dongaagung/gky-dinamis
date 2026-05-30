import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import GaleriClient from "@/app/components/galeri/GaleriClient";
import PageHero from "@/app/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Galeri — GKY Balikpapan",
  description: "Kumpulan foto kegiatan dan momen berharga GKY Balikpapan",
};

const LIMIT = 12;
const KATEGORI_ORDER = ["Ibadah", "Kegiatan", "Persekutuan", "Bangunan"];

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; kategori?: string }>;
}) {
  const { page: pageParam, kategori: kategoriParam } = await searchParams;

  const parsed = parseInt(pageParam ?? "1", 10);
  const currentPage = Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  const currentKategori = KATEGORI_ORDER.includes(kategoriParam ?? "") ? (kategoriParam ?? "") : "";

  const payload = await getPayload({ config });

  // Fetch counts per category (no limit, just totalDocs)
  const countResults = await Promise.all(
    KATEGORI_ORDER.map((k) =>
      payload
        .find({ collection: "galeri", where: { kategori: { equals: k } }, limit: 0 })
        .then((r) => [k, r.totalDocs] as [string, number])
    )
  );
  const hitungPerKategori = Object.fromEntries(countResults);
  const kategoriList = KATEGORI_ORDER.filter((k) => hitungPerKategori[k] > 0);

  // Fetch paginated items, optionally filtered by category
  const { docs, totalPages } = await payload.find({
    collection: "galeri",
    sort: "urutan",
    limit: LIMIT,
    page: currentPage,
    ...(currentKategori ? { where: { kategori: { equals: currentKategori } } } : {}),
  });

  return (
    <>
      <PageHero
        title="Galeri"
        subtitle="Momen-momen berharga dalam perjalanan pelayanan kami"
      />
      <GaleriClient
        items={docs}
        kategoriList={kategoriList}
        hitungPerKategori={hitungPerKategori}
        currentKategori={currentKategori}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
