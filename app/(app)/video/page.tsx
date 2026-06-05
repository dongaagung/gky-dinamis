import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";
import VideoClient from "@/app/components/video/VideoClient";
import PageHero from "@/app/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Video Khotbah — GKY Balikpapan",
  description: "Koleksi video khotbah dan rekaman ibadah GKY Balikpapan",
};

const LIMIT = 12;

const fetchVideo = unstable_cache(
  async (page: number) => {
    const payload = await getPayload({ config });
    return payload.find({
      collection: "video-khotbah",
      where: { status: { equals: "published" } },
      sort: "-tanggal",
      limit: LIMIT,
      page,
    });
  },
  ["video-list"],
  { revalidate: 3600 }
);

export default async function VideoPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { docs: videos, totalPages } = await fetchVideo(currentPage);

  return (
    <>
      <PageHero
        title="Media Video"
        subtitle="Saksikan kembali khotbah dan ibadah GKY Balikpapan"
      />
      <VideoClient
        videos={videos.map((v) => ({
          id: String(v.id),
          judul: v.judul,
          pembicara: v.pembicara,
          tanggal: v.tanggal,
          youtubeId: v.youtubeId,
          deskripsi: v.deskripsi ?? null,
        }))}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
