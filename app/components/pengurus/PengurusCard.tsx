import Image from "next/image";
import type { IPengurus } from "@/data/pengurus";

interface PengurusCardProps {
  pengurus: IPengurus;
  featured?: boolean;
}

export default function PengurusCard({ pengurus, featured = false }: PengurusCardProps) {
  const imgSize = featured ? 112 : 88;

  return (
    <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center">
      <div
        className="relative rounded-full overflow-hidden ring-4 ring-gray-100 mb-4 flex-shrink-0"
        style={{ width: imgSize, height: imgSize }}
      >
        <Image
          src={pengurus.foto}
          alt={`Foto ${pengurus.nama}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 88px, 112px"
        />
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
  );
}
