"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { IGaleri } from "@/data/galeri";

interface GaleriGridProps {
  items: IGaleri[];
}

export default function GaleriGrid({ items }: GaleriGridProps) {
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
      <div className="text-center py-16 text-gray-400">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm">Belum ada foto untuk kategori ini.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setSelectedIdx(idx)}
            className="relative aspect-square overflow-hidden rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Lihat foto: ${item.keterangan}`}
          >
            <Image
              src={item.foto}
              alt={item.keterangan}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-end">
              <p className="p-3 text-white text-xs font-medium leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-200 line-clamp-2">
                {item.keterangan}
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {isOpen && selected && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
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
              <Image
                src={selected.foto}
                alt={selected.keterangan}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-white">
              <button
                onClick={prev}
                className="flex items-center gap-1 text-gray-600 hover:text-primary font-medium text-sm transition-colors disabled:opacity-30"
                aria-label="Foto sebelumnya"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Sebelumnya
              </button>

              <div className="text-center">
                <p className="text-sm font-medium text-gray-800">{selected.keterangan}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {selectedIdx + 1} / {items.length}
                </p>
              </div>

              <button
                onClick={next}
                className="flex items-center gap-1 text-gray-600 hover:text-primary font-medium text-sm transition-colors"
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
