import type { Metadata } from "next";
import VideoSection from "@/app/components/video/VideoSection";
import PageHero from "@/app/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Video Khotbah — GKY Balikpapan",
  description: "Koleksi video khotbah dan rekaman ibadah GKY Balikpapan Balikpapan",
};

export default function VideoPage() {
  return (
    <>
      <PageHero
        title="Video Khotbah"
        subtitle="Saksikan kembali khotbah dan ibadah GKY Balikpapan"
      />

      <VideoSection />
    </>
  );
}
