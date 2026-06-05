"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

type VideoItem = {
  id: string;
  judul: string;
  youtubeId: string;
  pembicara?: string | null;
  tanggal?: string | null;
};

function VideoCard({ video, onClick }: { video: VideoItem; onClick: () => void }) {
  const thumb = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <button
      onClick={onClick}
      className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300">
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          <Image
            src={thumb}
            alt={video.judul}
            fill
            unoptimized
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 mb-1">
            {video.judul}
          </h4>
          {video.pembicara && (
            <p className="text-xs text-gray-500">{video.pembicara}</p>
          )}
          {video.tanggal && (
            <p className="text-xs text-gray-400 mt-1">
              {new Date(video.tanggal).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function VideoModal({ video, onClose }: { video: VideoItem | null; onClose: () => void }) {
  if (!video) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-colors"
          aria-label="Tutup"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.judul}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="p-4 bg-white">
          <p className="font-semibold text-gray-800 text-sm">{video.judul}</p>
          {video.pembicara && <p className="text-xs text-gray-500 mt-0.5">{video.pembicara}</p>}
        </div>
      </div>
    </div>
  );
}

export default function KomunitasVideo({ videos }: { videos: VideoItem[] }) {
  const [selected, setSelected] = useState<VideoItem | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-accent rounded-full" />
            <h2 className="text-xl font-bold text-gray-800">Video</h2>
          </div>
          <span className="text-sm text-gray-400">{videos.length} video</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onClick={() => setSelected(video)} />
          ))}
        </div>
      </div>

      <VideoModal video={selected} onClose={handleClose} />
    </section>
  );
}
