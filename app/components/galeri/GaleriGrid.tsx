"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type FotoSizes = {
  thumbnail?: { url?: string | null } | null
  medium?: { url?: string | null } | null
}

export type GaleriItem = {
  id: string
  keterangan: string
  kategori: string
  foto?: { url?: string | null; sizes?: FotoSizes | null } | string | null
  urlFoto?: string | null
}

function resolveFotoUrl(item: GaleriItem, size: "thumbnail" | "medium" | "full" = "full"): string | null {
  if (item.foto && typeof item.foto === "object") {
    if (size === "thumbnail") return item.foto.sizes?.thumbnail?.url ?? item.foto.url ?? null;
    if (size === "medium") return item.foto.sizes?.medium?.url ?? item.foto.url ?? null;
    return item.foto.url ?? null;
  }
  return item.urlFoto ?? null;
}

function GaleriCard({ item, onClick }: { item: GaleriItem; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const fotoUrl = resolveFotoUrl(item, "thumbnail");

  return (
    <button
      onClick={onClick}
      className="group w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
      aria-label={`Lihat foto: ${item.keterangan}`}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.13)] transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-100" />
          )}
          {fotoUrl ? (
            <Image
              src={fotoUrl}
              alt={item.keterangan}
              fill
              unoptimized
              loading="lazy"
              className={`object-cover transition-all duration-500 group-hover:scale-[1.04] ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setLoaded(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="px-4 py-3 flex items-center justify-between gap-2">
          <p className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-1">
            {item.keterangan}
          </p>
          <svg
            className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export default function GaleriGrid({ items }: { items: GaleriItem[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const isOpen = selectedIdx !== null;
  const selected = isOpen ? items[selectedIdx] : null;

  const prev = useCallback(() => {
    setSelectedIdx((i) => (i !== null ? (i - 1 + items.length) % items.length : null));
  }, [items.length]);

  const next = useCallback(() => {
    setSelectedIdx((i) => (i !== null ? (i + 1) % items.length : null));
  }, [items.length]);

  const close = useCallback(() => setSelectedIdx(null), []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, prev, next, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm">Belum ada foto untuk kategori ini.</p>
      </div>
    );
  }

  const selectedFotoUrl = selected ? resolveFotoUrl(selected, "medium") : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item, idx) => (
          <GaleriCard key={item.id} item={item} onClick={() => setSelectedIdx(idx)} />
        ))}
      </div>

      {isOpen && selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={selected.keterangan}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
              aria-label="Tutup"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative aspect-video bg-gray-100">
              {selectedFotoUrl && (
                <Image
                  src={selectedFotoUrl}
                  alt={selected.keterangan}
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                />
              )}
            </div>

            <div className="flex items-center justify-between px-5 py-4 bg-white">
              <button
                onClick={prev}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
                aria-label="Foto sebelumnya"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Sebelumnya
              </button>

              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800">{selected.keterangan}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {(selectedIdx ?? 0) + 1} / {items.length}
                </p>
              </div>

              <button
                onClick={next}
                className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
                aria-label="Foto berikutnya"
              >
                Berikutnya
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
