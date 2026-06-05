import SectionTitle from "@/app/components/ui/SectionTitle";

type SejarahItem = {
  id?: string | null
  tahun: number
  judul: string
  deskripsi: string
}

export default function SejarahSection({ sejarah }: { sejarah: SejarahItem[] }) {
  return (
    <section id="sejarah" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle
          title="Sejarah Gereja"
          subtitle="Perjalanan iman GKY Balikpapan dari tahun ke tahun"
        />

        <div className="relative mt-14">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px" />

          <div className="space-y-10">
            {sejarah.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={item.id ?? item.tahun} className="relative flex items-start gap-6 md:gap-0">
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-accent rounded-full border-2 border-white shadow-sm md:-translate-x-1.5 mt-5" />

                  <div className="hidden md:block w-1/2" />

                  <div
                    className={`ml-14 md:ml-0 w-full md:w-[calc(50%-2rem)] ${
                      isEven ? "md:ml-10 md:mr-0" : "md:order-first md:mr-10 md:text-right"
                    }`}
                  >
                    <div
                      className={`bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-accent/30 hover:shadow-sm transition-all ${
                        isEven ? "" : "md:items-end"
                      }`}
                    >
                      <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                        {item.tahun}
                      </span>
                      <h3 className="font-bold text-primary text-lg mb-2">{item.judul}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.deskripsi}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
