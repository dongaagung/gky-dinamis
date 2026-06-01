import Image from "next/image";
import Link from "next/link";

export type KategoriKegiatan = "Ibadah" | "Persekutuan" | "Pelayanan Sosial" | "Pendidikan";

export type KegiatanItem = {
  id: string
  slug: string
  judul: string
  kategori: string
  tanggal: string
  lokasi: string
  deskripsi: string
  foto?: { url?: string | null; sizes?: { thumbnail?: { url?: string | null } | null } | null } | string | null
  urlFoto?: string | null
}

const KATEGORI_WARNA: Record<string, { bg: string; text: string }> = {
  Ibadah: { bg: "bg-blue-100", text: "text-blue-800" },
  Persekutuan: { bg: "bg-green-100", text: "text-green-800" },
  "Pelayanan Sosial": { bg: "bg-orange-100", text: "text-orange-800" },
  Pendidikan: { bg: "bg-purple-100", text: "text-purple-800" },
}

const DEFAULT_WARNA = { bg: "bg-gray-100", text: "text-gray-800" }

export default function KegiatanCard({ kegiatan }: { kegiatan: KegiatanItem }) {
  const warna = KATEGORI_WARNA[kegiatan.kategori] ?? DEFAULT_WARNA

  const fotoUrl =
    kegiatan.foto && typeof kegiatan.foto === "object"
      ? (kegiatan.foto.sizes?.thumbnail?.url ?? kegiatan.foto.url ?? null)
      : kegiatan.urlFoto ?? null

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {fotoUrl ? (
          <Image
            src={fotoUrl}
            alt={kegiatan.judul}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${warna.bg} ${warna.text}`}>
          {kegiatan.kategori}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-primary text-base md:text-lg leading-snug mb-3">
          {kegiatan.judul}
        </h3>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{kegiatan.tanggal}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{kegiatan.lokasi}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 flex-1">
          {kegiatan.deskripsi}
        </p>

        <Link
          href={`/kegiatan/${kegiatan.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
        >
          Lihat Detail
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
