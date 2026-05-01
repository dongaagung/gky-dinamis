"use client";

import { useState, useCallback } from "react";
import { videoKhotbah, type IVideoKhotbah } from "@/data/videoKhotbah";
import VideoCard from "@/app/components/video/VideoCard";
import VideoModal from "@/app/components/video/VideoModal";
import SectionTitle from "@/app/components/ui/SectionTitle";

export default function VideoSection() {
  const [selected, setSelected] = useState<IVideoKhotbah | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Video Khotbah"
          subtitle="Dengarkan dan saksikan kembali khotbah-khotbah terpilih dari GKY Balikpapan"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12">
          {videoKhotbah.map((video) => (
            <VideoCard key={video.id} video={video} onClick={setSelected} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://youtube.com/@gkybalikpapan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
            </svg>
            Lihat Semua di YouTube
          </a>
        </div>
      </div>

      <VideoModal video={selected} onClose={handleClose} />
    </section>
  );
}
