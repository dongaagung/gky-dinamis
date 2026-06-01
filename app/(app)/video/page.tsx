import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import VideoClient from "@/app/components/video/VideoClient";
import PageHero from "@/app/components/ui/PageHero";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Video Khotbah — GKY Balikpapan",
  description: "Koleksi video khotbah dan rekaman ibadah GKY Balikpapan",
};

export default async function VideoPage() {
  const payload = await getPayload({ config });

  const { docs: videos } = await payload.find({
    collection: "video-khotbah",
    where: { status: { equals: "published" } },
    sort: "-tanggal",
  });

  return (
    <>
      <PageHero
        title="Media Video"
        subtitle="Saksikan kembali khotbah dan ibadah GKY Balikpapan"
      />
      <VideoClient videos={videos.map((v) => ({
        id: String(v.id),
        judul: v.judul,
        pembicara: v.pembicara,
        tanggal: v.tanggal,
        youtubeId: v.youtubeId,
        deskripsi: v.deskripsi ?? null,
      }))} />
    </>
  );
}
