import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";

const KATEGORI_WARNA: Record<string, { bg: string; text: string }> = {
  Ibadah: { bg: "bg-blue-100", text: "text-blue-800" },
  Persekutuan: { bg: "bg-green-100", text: "text-green-800" },
  "Pelayanan Sosial": { bg: "bg-orange-100", text: "text-orange-800" },
  Pendidikan: { bg: "bg-purple-100", text: "text-purple-800" },
}

const DEFAULT_WARNA = { bg: "bg-gray-100", text: "text-gray-800" }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "kegiatan",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const item = docs[0];
  if (!item) return {};
  return {
    title: `${item.judul} — GKY Balikpapan`,
    description: item.deskripsi,
  };
}

export default async function KegiatanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "kegiatan",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const item = docs[0];
  if (!item) notFound();

  const warna = KATEGORI_WARNA[item.kategori] ?? DEFAULT_WARNA

  const fotoUrl =
    item.foto && typeof item.foto === "object"
      ? (item.foto as { url?: string | null }).url ?? null
      : item.urlFoto ?? null

  const paragraphs = (item.deskripsiLengkap ?? "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <div className="relative bg-[#002F5F] py-16 overflow-hidden">
        {fotoUrl && (
          <Image
            src={fotoUrl}
            alt=""
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002F5F]/70 to-[#002F5F]/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/kegiatan" className="hover:text-white transition-colors">Kegiatan</Link>
            <span>/</span>
            <span className="text-white/90 truncate">{item.judul}</span>
          </nav>

          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${warna.bg} ${warna.text}`}>
            {item.kategori}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-5">
            {item.judul}
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {item.tanggal}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {item.lokasi}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {fotoUrl && (
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-10">
            <Image
              src={fotoUrl}
              alt={item.judul}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-5 text-base md:text-lg">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/kegiatan"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Daftar Kegiatan
          </Link>
        </div>
      </div>
    </>
  );
}
