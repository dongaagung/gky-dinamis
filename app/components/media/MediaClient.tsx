"use client";

import { useState } from "react";
import GaleriFilter from "@/app/components/galeri/GaleriFilter";
import GaleriGrid from "@/app/components/galeri/GaleriGrid";
import VideoCard from "@/app/components/video/VideoCard";
import VideoModal from "@/app/components/video/VideoModal";
import type { GaleriItem } from "@/app/components/galeri/GaleriGrid";
import type { VideoItem } from "@/app/components/video/VideoClient";

interface MediaClientProps {
  fotoItems: GaleriItem[];
  kategoriList: string[];
  hitungPerKategori: Record<string, number>;
  videos: VideoItem[];
  defaultTab?: "foto" | "video";
}

export default function MediaClient({
  fotoItems,
  kategoriList,
  hitungPerKategori,
  videos,
  defaultTab = "foto",
}: MediaClientProps) {
  const [activeTab, setActiveTab] = useState<"foto" | "video">(defaultTab);
  const [activeKategori, setActiveKategori] = useState("Semua");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredFoto =
    activeKategori === "Semua"
      ? fotoItems
      : fotoItems.filter((f) => f.kategori === activeKategori);

  return (
    <>
      {/* Tab switcher */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab("foto")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold tracking-wide border-b-2 transition-colors ${
                activeTab === "foto"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Galeri Foto
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "foto" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500"}`}>
                {fotoItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold tracking-wide border-b-2 transition-colors ${
                activeTab === "video"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
              </svg>
              Video Khotbah
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "video" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500"}`}>
                {videos.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Foto tab */}
      {activeTab === "foto" && (
        <section className="py-12 bg-[#f7f7f8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {kategoriList.length > 0 && (
              <div className="mb-8">
                <GaleriFilter
                  kategori={kategoriList}
                  aktif={activeKategori}
                  onChange={setActiveKategori}
                  hitungPerKategori={hitungPerKategori}
                />
              </div>
            )}
            <GaleriGrid items={filteredFoto} />
          </div>
        </section>
      )}

      {/* Video tab */}
      {activeTab === "video" && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            {videos.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-sm">Belum ada video yang ditambahkan.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {videos.map((video) => (
                    <VideoCard key={video.id} video={video} onClick={setSelectedVideo} />
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
              </>
            )}
          </div>
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        </section>
      )}
    </>
  );
}
