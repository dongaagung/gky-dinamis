import Image from "next/image";
import { tentang } from "@/data/tentang";

const stats = [
  {
    label: "Tahun Berdiri",
    value: String(tentang.profil.tahunBerdiri),
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Jumlah Jemaat",
    value: tentang.profil.jumlahJemaat,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Denominasi",
    value: tentang.profil.denominasi,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

export default function ProfilSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={tentang.profil.foto}
              alt="Gedung GKY Balikpapan"
              width={720}
              height={480}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Profil Gereja
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 leading-tight">
              Mengenal GKY Balikpapan
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mb-6" />

            <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {tentang.profil.deskripsi}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-2">
                    {stat.icon}
                  </div>
                  <p className="font-bold text-primary text-sm md:text-base leading-tight">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
