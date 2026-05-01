import type { Metadata } from "next";
import VideoSection from "@/app/components/video/VideoSection";

export const metadata: Metadata = {
  title: "Video Khotbah — GKY Balikpapan",
  description: "Koleksi video khotbah dan rekaman ibadah GKY Balikpapan Balikpapan",
};

export default function VideoPage() {
  return (
    <>
      <div className="bg-primary py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Video Khotbah
          </h1>
          <p className="text-white/70 text-base md:text-lg">
            Saksikan kembali khotbah dan ibadah GKY Balikpapan
          </p>
        </div>
      </div>

      <VideoSection />
    </>
  );
}
