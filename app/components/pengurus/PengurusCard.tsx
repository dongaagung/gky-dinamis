import Image from "next/image";

export type PengurusItem = {
  id: string
  nama: string
  jabatan: string
  foto?: { url?: string | null; sizes?: { thumbnail?: { url?: string | null } | null } | null } | string | null
  urlFoto?: string | null
}

interface PengurusCardProps {
  pengurus: PengurusItem
  featured?: boolean
}

export default function PengurusCard({ pengurus, featured = false }: PengurusCardProps) {
  const imgSize = featured ? 112 : 88

  const fotoUrl =
    pengurus.foto && typeof pengurus.foto === "object"
      ? (pengurus.foto.sizes?.thumbnail?.url ?? pengurus.foto.url ?? null)
      : pengurus.urlFoto ?? null

  return (
    <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center">
      <div
        className="relative rounded-full overflow-hidden ring-4 ring-gray-100 mb-4 flex-shrink-0"
        style={{ width: imgSize, height: imgSize }}
      >
        {fotoUrl ? (
          <Image
            src={fotoUrl}
            alt={`Foto ${pengurus.nama}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 88px, 112px"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
      </div>

      <h3
        className={`font-bold text-primary leading-tight mb-1 ${
          featured ? "text-base md:text-lg" : "text-sm md:text-base"
        }`}
      >
        {pengurus.nama}
      </h3>
      <p className="text-gray-500 text-xs md:text-sm">{pengurus.jabatan}</p>
    </div>
  )
}
