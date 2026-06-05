export const dynamic = "force-dynamic";

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
const GALERI_LIMIT = 18;
const VIDEO_LIMIT = 12;

const fetchTabCounts = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const [galeri, video] = await Promise.all([
      payload.count({ collection: "galeri" }),
      payload.count({
        collection: "video-khotbah",
        where: { status: { equals: "published" } },
      }),
    ]);
    return { galeriTotal: galeri.totalDocs, videoTotal: video.totalDocs };
  },
  ["media-tab-counts"],
  { revalidate: 300 }
);

const fetchMediaGaleri = unstable_cache(
  async (page: number, kategori: string) => {
    const payload = await getPayload({ config });

    const [galeriResult, ...kategoriCounts] = await Promise.all([
      payload.find({
        collection: "galeri",
        sort: "urutan",
        limit: GALERI_LIMIT,
        page,
        ...(kategori ? { where: { kategori: { equals: kategori } } } : {}),
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
      docs: galeriResult.docs,
      totalPages: galeriResult.totalPages,
      kategoriList,
      hitungPerKategori,
    };
  },
  ["media-galeri"],
  { revalidate: 300 }
);

const fetchMediaVideo = unstable_cache(
  async (page: number) => {
    const payload = await getPayload({ config });
    return payload.find({
      collection: "video-khotbah",
      where: { status: { equals: "published" } },
      sort: "-tanggal",
      limit: VIDEO_LIMIT,
      page,
    });
  },
  ["media-video"],
  { revalidate: 300 }
);

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; page?: string; kategori?: string }>;
}) {
  const { tab, page: pageParam, kategori: kategoriParam } = await searchParams;
  const activeTab = tab === "video" ? "video" : "foto";
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const currentKategori = KATEGORI_ORDER.includes(kategoriParam ?? "") ? (kategoriParam ?? "") : "";

  const counts = await fetchTabCounts();

  let fotoData: Awaited<ReturnType<typeof fetchMediaGaleri>> | null = null;
  let videoData: Awaited<ReturnType<typeof fetchMediaVideo>> | null = null;

  if (activeTab === "foto") {
    fotoData = await fetchMediaGaleri(currentPage, currentKategori);
  } else {
    videoData = await fetchMediaVideo(currentPage);
  }

  return (
    <>
      <PageHero
        title="Media"
        subtitle="Galeri foto dan video khotbah GKY Balikpapan"
      />
      <MediaClient
        activeTab={activeTab}
        currentPage={currentPage}
        fotoItems={fotoData?.docs ?? null}
        fotoTotalPages={fotoData?.totalPages ?? 1}
        kategoriList={fotoData?.kategoriList ?? []}
        hitungPerKategori={fotoData?.hitungPerKategori ?? {}}
        currentKategori={currentKategori}
        videos={
          videoData?.docs.map((v) => ({
            id: String(v.id),
            judul: v.judul,
            pembicara: v.pembicara,
            tanggal: v.tanggal,
            youtubeId: v.youtubeId,
            deskripsi: v.deskripsi ?? null,
          })) ?? null
        }
        videoTotalPages={videoData?.totalPages ?? 1}
        galeriTotal={counts.galeriTotal}
        videoTotal={counts.videoTotal}
      />
    </>
  );
}
