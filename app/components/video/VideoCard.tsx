import Image from "next/image";
import type { IVideoKhotbah } from "@/data/videoKhotbah";

interface VideoCardProps {
  video: IVideoKhotbah;
  onClick: (video: IVideoKhotbah) => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <button
        className="relative w-full aspect-video overflow-hidden bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={() => onClick(video)}
        aria-label={`Putar video: ${video.judul}`}
      >
        <Image
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.judul}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 brightness-90 group-hover:brightness-75"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-200">
            <svg
              className="w-6 h-6 text-primary translate-x-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-6">
          <span className="text-white/80 text-xs">{video.tanggal}</span>
        </div>
      </button>

      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
          <span className="text-accent text-xs font-medium">{video.pembicara}</span>
        </div>

        <h3 className="font-bold text-primary text-sm md:text-base leading-snug mb-2 line-clamp-2">
          {video.judul}
        </h3>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
          {video.deskripsi}
        </p>
      </div>
    </article>
  );
}
