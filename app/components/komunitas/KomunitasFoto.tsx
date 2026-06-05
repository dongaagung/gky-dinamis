"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type FotoItem = {
  id: string;
  keterangan: string;
  foto?: {
    url?: string | null;
    sizes?: {
      thumbnail?: { url?: string | null } | null;
      medium?: { url?: string | null } | null;
    } | null;
  } | null;
};

function resolveUrl(foto: FotoItem["foto"], size: "thumbnail" | "medium" | "full" = "full") {
  if (!foto) return null;
  if (size === "thumbnail") return foto.sizes?.thumbnail?.url ?? foto.url ?? null;
  if (size === "medium") return foto.sizes?.medium?.url ?? foto.url ?? null;
  return foto.url ?? null;
}

export default function KomunitasFoto({ items }: { items: FotoItem[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const isOpen = selectedIdx !== null;
  const selected = isOpen ? items[selectedIdx] : null;

  const prev = useCallback(
    () => setSelectedIdx((i) => (i !== null ? (i - 1 + items.length) % items.length : null)),
    [items.length]
  );
  const next = useCallback(
    () => setSelectedIdx((i) => (i !== null ? (i + 1) % items.length : null)),
    [items.length]
  );
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-accent rounded-full" />
            <h2 className="text-xl font-bold text-gray-800">Galeri Foto</h2>
          </div>
          <span className="text-sm text-gray-400">{items.length} foto</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((item, idx) => {
            const thumb = resolveUrl(item.foto, "thumbnail");
            return (
              <button
                key={item.id}
                onClick={() => setSelectedIdx(idx)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Lihat foto: ${item.keterangan}`}
              >
                {thumb ? (
                  <Image
                    src={thumb}
                    alt={item.keterangan}
                    fill
                    unoptimized
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                {item.keterangan && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium line-clamp-1">{item.keterangan}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
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
              {resolveUrl(selected.foto, "medium") && (
                <Image
                  src={resolveUrl(selected.foto, "medium")!}
                  alt={selected.keterangan}
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <button onClick={prev} className="text-gray-500 hover:text-gray-900 text-sm flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Sebelumnya
              </button>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800">{selected.keterangan}</p>
                <p className="text-xs text-gray-400 mt-0.5">{(selectedIdx ?? 0) + 1} / {items.length}</p>
              </div>
              <button onClick={next} className="text-gray-500 hover:text-gray-900 text-sm flex items-center gap-1.5">
                Berikutnya
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
