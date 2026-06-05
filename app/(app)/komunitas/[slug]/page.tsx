import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import KomunitasFoto from "@/app/components/komunitas/KomunitasFoto";
import KomunitasVideo from "@/app/components/komunitas/KomunitasVideo";

export const dynamic = "force-dynamic";

type MediaObj = {
  url?: string | null;
  sizes?: {
    thumbnail?: { url?: string | null } | null;
    medium?: { url?: string | null } | null;
  } | null;
};

type SubGrup = { id?: string | null; namaGrup: string; deskripsi?: string | null };
type JadwalItem = {
  id?: string | null;
  namaIbadah: string;
  subGrupNama?: string | null;
  hari: string;
  waktu: string;
  lokasi?: string | null;
  keterangan?: string | null;
};
type FotoItem = {
  id?: string | null;
  gambar?: MediaObj | null;
  keterangan?: string | null;
};
type VideoItem = {
  id?: string | null;
  judul: string;
  youtubeId: string;
  pembicara?: string | null;
  tanggal?: string | null;
};
type KomunitasDoc = {
  id: string | number;
  nama: string;
  slug: string;
  deskripsi?: string | null;
  fotoCover?: MediaObj | null;
  subGrup?: SubGrup[] | null;
  jadwal?: JadwalItem[] | null;
  foto?: FotoItem[] | null;
  video?: VideoItem[] | null;
};

type Props = { params: Promise<{ slug: string }> };

async function fetchKomunitas(slug: string): Promise<KomunitasDoc | null> {
  const payload = await getPayload({ config });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { docs } = (await (payload as any).find({
    collection: "komunitas",
    where: { slug: { equals: slug }, aktif: { equals: true } },
    limit: 1,
  })) as { docs: KomunitasDoc[] };
  return docs[0] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const komunitas = await fetchKomunitas(slug);
  if (!komunitas) return { title: "Komunitas — GKY Balikpapan" };
  return {
    title: `${komunitas.nama} — GKY Balikpapan`,
    description: komunitas.deskripsi ?? `Komunitas ${komunitas.nama} GKY Balikpapan`,
  };
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { docs } = (await (payload as any).find({
      collection: "komunitas",
      where: { aktif: { equals: true } },
    })) as { docs: KomunitasDoc[] };
    return docs.map((k) => ({ slug: k.slug }));
  } catch {
    return [];
  }
}

export default async function KomunitasDetailPage({ params }: Props) {
  const { slug } = await params;
  const komunitas = await fetchKomunitas(slug);
  if (!komunitas) notFound();

  const coverUrl =
    komunitas.fotoCover && typeof komunitas.fotoCover === "object"
      ? komunitas.fotoCover.url ?? null
      : null;

  const fotoItems = (komunitas.foto ?? []).map((f) => ({
    id: String(f.id ?? Math.random()),
    keterangan: f.keterangan ?? "",
    foto: f.gambar ?? null,
  }));

  const videoItems = (komunitas.video ?? []).map((v) => ({
    id: String(v.id ?? Math.random()),
    judul: v.judul,
    youtubeId: v.youtubeId,
    pembicara: v.pembicara ?? null,
    tanggal: v.tanggal ? String(v.tanggal) : null,
  }));

  const deskripsiBaris = (komunitas.deskripsi ?? "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const jadwal = komunitas.jadwal ?? [];

  return (
    <>
      {/* ── Hero: konsisten dengan PageHero (#002F5F) + cover photo 20% ── */}
      <div className="relative bg-[#002F5F] overflow-hidden">
        {coverUrl && (
          <div className="absolute inset-0" style={{ opacity: 0.2 }}>
            <Image
              src={coverUrl}
              alt=""
              fill
              unoptimized
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-16 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/komunitas" className="hover:text-white transition-colors">Komunitas</Link>
            <span>/</span>
            <span className="text-white/90 truncate">{komunitas.nama}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
            {komunitas.nama}
          </h1>

          {/* Jadwal — white cards on blue background */}
          {jadwal.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-2">
              {jadwal.map((item, idx) => (
                <div
                  key={item.id ?? idx}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800 text-sm leading-snug flex-1">
                      {item.namaIbadah}
                    </h4>
                    <span className="flex-shrink-0 bg-[#002F5F]/10 text-[#002F5F] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {item.hari}
                    </span>
                  </div>
                  {item.subGrupNama && (
                    <p className="text-gray-400 text-xs mb-2">{item.subGrupNama}</p>
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.waktu}
                    </div>
                    {item.lokasi && (
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <svg className="w-3.5 h-3.5 flex-shrink-0 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.lokasi}
                      </div>
                    )}
                    {item.keterangan && (
                      <p className="text-gray-400 text-xs pt-0.5">{item.keterangan}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Cover photo (large) + description + sub-groups ── */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {coverUrl && (
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-10">
            <Image
              src={coverUrl}
              alt={komunitas.nama}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        )}

        {deskripsiBaris.length > 0 && (
          <div className="space-y-4">
            {deskripsiBaris.map((para, i) => {
              if (i !== 0) {
                return (
                  <p key={i} className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {para}
                  </p>
                );
              }
              return (
                <p
                  key={0}
                  className="text-gray-700 leading-relaxed text-base md:text-lg"
                  style={{ display: "flow-root" }}
                >
                  <span
                    style={{
                      float: "left",
                      fontSize: "3.5rem",
                      fontWeight: "700",
                      lineHeight: "0.8",
                      marginRight: "0.1em",
                      marginTop: "0.08em",
                      color: "#005E9B",
                    }}
                  >
                    {para.charAt(0)}
                  </span>
                  {para.slice(1)}
                </p>
              );
            })}
          </div>
        )}

        {komunitas.subGrup && komunitas.subGrup.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {komunitas.subGrup.map((grup, idx) => (
              <div
                key={grup.id ?? idx}
                className="bg-primary/5 border border-primary/15 rounded-2xl p-5"
              >
                <h3 className="font-bold text-primary text-base mb-1">{grup.namaGrup}</h3>
                {grup.deskripsi && (
                  <p className="text-gray-600 text-sm leading-relaxed">{grup.deskripsi}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Galeri Foto ── */}
      {fotoItems.length > 0 && <KomunitasFoto items={fotoItems} />}

      {/* ── Video ── */}
      {videoItems.length > 0 && <KomunitasVideo videos={videoItems} />}

      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="pt-8 border-t border-gray-200">
          <Link
            href="/komunitas"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Komunitas
          </Link>
        </div>
      </div>
    </>
  );
}
