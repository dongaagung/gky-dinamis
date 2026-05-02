import SectionTitle from "@/app/components/ui/SectionTitle";

type JadwalHariItem = {
  id?: string | null
  hari: string
  waktu: string
}

type JadwalItem = {
  id: string
  nama: string
  jadwalHari?: JadwalHariItem[] | null
  lokasi?: string | null
}

const HARI_ORDER = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

function groupByHari(jadwalHari: JadwalHariItem[]): { hari: string; waktuList: string[] }[] {
  const map = new Map<string, string[]>()
  for (const item of jadwalHari) {
    const existing = map.get(item.hari)
    if (existing) {
      existing.push(item.waktu)
    } else {
      map.set(item.hari, [item.waktu])
    }
  }
  return HARI_ORDER
    .filter((h) => map.has(h))
    .map((h) => ({ hari: h, waktuList: map.get(h)! }))
}

function LocationIcon() {
  return (
    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function JadwalIbadahSection({ jadwal }: { jadwal: JadwalItem[] }) {
  return (
    <section id="jadwal-ibadah" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Jadwal Ibadah"
          subtitle="Bergabunglah bersama kami dalam persekutuan doa dan penyembahan"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {jadwal.map((item) => {
            const grouped = item.jadwalHari ? groupByHari(item.jadwalHari) : []
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>

                <h3 className="text-primary font-bold text-xl mb-4">{item.nama}</h3>

                <div className="space-y-2.5">
                  {grouped.map(({ hari, waktuList }) => (
                    <div key={hari} className="flex items-start gap-3 text-sm">
                      <span className="font-semibold text-gray-700 w-16 flex-shrink-0">{hari}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {waktuList.map((waktu) => (
                          <span
                            key={waktu}
                            className="bg-primary/8 text-primary px-2 py-0.5 rounded-md text-xs font-medium"
                          >
                            {waktu}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {item.lokasi && (
                    <div className="flex items-center gap-2.5 text-gray-500 text-sm pt-2 mt-1 border-t border-gray-100">
                      <LocationIcon />
                      <span>{item.lokasi}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
