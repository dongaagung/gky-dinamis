import SectionTitle from "@/app/components/ui/SectionTitle";

type JadwalItem = {
  id?: string | null;
  namaIbadah: string;
  subGrupNama?: string | null;
  hari: string;
  waktu: string;
  lokasi?: string | null;
  keterangan?: string | null;
};

export default function KomunitasJadwal({ jadwal }: { jadwal: JadwalItem[] }) {
  // Group by subGrupNama if any item has one
  const hasSubGrup = jadwal.some((j) => j.subGrupNama);

  const grouped: Record<string, JadwalItem[]> = {};
  for (const item of jadwal) {
    const key = item.subGrupNama ?? "_default";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Jadwal Kegiatan" centered={false} />

        <div className="mt-10 space-y-8">
          {Object.entries(grouped).map(([grupName, items]) => (
            <div key={grupName}>
              {hasSubGrup && grupName !== "_default" && (
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                  {grupName}
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                  <div
                    key={item.id ?? idx}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h4 className="font-bold text-gray-800 text-sm leading-snug">
                        {item.namaIbadah}
                      </h4>
                      <span className="flex-shrink-0 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        {item.hari}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.waktu}
                      </div>
                      {item.lokasi && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {item.lokasi}
                        </div>
                      )}
                      {item.keterangan && (
                        <p className="text-xs text-gray-400 pt-1">{item.keterangan}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
