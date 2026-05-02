interface GaleriFilterProps {
  kategori: string[];
  aktif: string;
  onChange: (k: string) => void;
  hitungPerKategori: Record<string, number>;
}

export default function GaleriFilter({
  kategori,
  aktif,
  onChange,
  hitungPerKategori,
}: GaleriFilterProps) {
  const semua = Object.values(hitungPerKategori).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onChange("Semua")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          aktif === "Semua"
            ? "bg-primary text-white shadow-sm"
            : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
        }`}
      >
        Semua
        <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${aktif === "Semua" ? "bg-white/20" : "bg-gray-100"}`}>
          {semua}
        </span>
      </button>

      {kategori.map((k) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            aktif === k
              ? "bg-primary text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
          }`}
        >
          {k}
          <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${aktif === k ? "bg-white/20" : "bg-gray-100"}`}>
            {hitungPerKategori[k] ?? 0}
          </span>
        </button>
      ))}
    </div>
  );
}
