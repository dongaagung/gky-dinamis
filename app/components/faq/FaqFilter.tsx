"use client";

type KategoriFaq = "semua" | "umum" | "ibadah" | "pelayanan";

interface FaqFilterProps {
  aktif: KategoriFaq;
  onChange: (kategori: KategoriFaq) => void;
}

const filters: { value: KategoriFaq; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "umum", label: "Umum" },
  { value: "ibadah", label: "Ibadah" },
  { value: "pelayanan", label: "Pelayanan" },
];

export default function FaqFilter({ aktif, onChange }: FaqFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
            aktif === f.value
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export type { KategoriFaq };
