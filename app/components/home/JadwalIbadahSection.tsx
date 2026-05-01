import { jadwalIbadah } from "@/data/jadwalIbadah";
import SectionTitle from "@/app/components/ui/SectionTitle";

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function JadwalIbadahSection() {
  return (
    <section id="jadwal-ibadah" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Jadwal Ibadah"
          subtitle="Bergabunglah bersama kami dalam persekutuan doa dan penyembahan"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {jadwalIbadah.map((jadwal) => (
            <div
              key={jadwal.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>

              <h3 className="text-primary font-bold text-xl mb-4">{jadwal.nama}</h3>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-gray-600 text-sm">
                  <CalendarIcon />
                  <span>{jadwal.hari}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600 text-sm">
                  <ClockIcon />
                  <span>{jadwal.waktu}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600 text-sm">
                  <LocationIcon />
                  <span>{jadwal.lokasi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
