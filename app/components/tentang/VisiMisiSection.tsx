import SectionTitle from "@/app/components/ui/SectionTitle";
import { tentang } from "@/data/tentang";

export default function VisiMisiSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Visi & Misi" subtitle="Arah dan panggilan pelayanan GKY Balikpapan" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          <div className="lg:col-span-2 bg-primary rounded-2xl p-8 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm font-medium px-3 py-1 rounded-full mb-5 border border-white/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Visi
              </div>
              <h3 className="text-xl md:text-2xl font-bold leading-relaxed">
                {tentang.visi}
              </h3>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full mb-5 border border-accent/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Misi
            </div>
            <h3 className="text-xl font-bold text-primary mb-6">Panggilan Pelayanan Kami</h3>

            <ul className="space-y-4">
              {tentang.misi.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-gray-600 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
