import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";
import MediaClient from "@/app/components/media/MediaClient";
import PageHero from "@/app/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Media — GKY Balikpapan",
  description: "Galeri foto dan video khotbah GKY Balikpapan",
};

const KATEGORI_ORDER = ["Ibadah", "Kegiatan", "Persekutuan", "Bangunan"];

const fetchMedia = unstable_cache(
  async () => {
    const payload = await getPayload({ config });

    const [galeriResult, videoResult, ...kategoriCounts] = await Promise.all([
      payload.find({ collection: "galeri", sort: "urutan", limit: 200 }),
      payload.find({
        collection: "video-khotbah",
        where: { status: { equals: "published" } },
        sort: "-tanggal",
      }),
      ...KATEGORI_ORDER.map((k) =>
        payload
          .find({ collection: "galeri", where: { kategori: { equals: k } }, limit: 0 })
          .then((r) => [k, r.totalDocs] as [string, number])
      ),
    ]);

    const hitungPerKategori = Object.fromEntries(kategoriCounts as [string, number][]);
    const kategoriList = KATEGORI_ORDER.filter((k) => hitungPerKategori[k] > 0);

    return {
      fotoItems: galeriResult.docs,
      videos: videoResult.docs,
      kategoriList,
      hitungPerKategori,
    };
  },
  ["media-combined"],
  { revalidate: 300 }
);

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const defaultTab = tab === "video" ? "video" : "foto";

  const { fotoItems, videos, kategoriList, hitungPerKategori } = await fetchMedia();

  return (
    <>
      <PageHero
        title="Media"
        subtitle="Galeri foto dan video khotbah GKY Balikpapan"
      />
      <MediaClient
        fotoItems={fotoItems}
        kategoriList={kategoriList}
        hitungPerKategori={hitungPerKategori}
        videos={videos.map((v) => ({
          id: String(v.id),
          judul: v.judul,
          pembicara: v.pembicara,
          tanggal: v.tanggal,
          youtubeId: v.youtubeId,
          deskripsi: v.deskripsi ?? null,
        }))}
        defaultTab={defaultTab as "foto" | "video"}
      />
    </>
  );
}
