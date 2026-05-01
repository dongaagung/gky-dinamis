import Link from "next/link";
import SectionTitle from "@/app/components/ui/SectionTitle";

const menus = [
  {
    href: "/tentang",
    label: "Tentang Kami",
    deskripsi: "Kenali profil, visi misi, dan perjalanan sejarah GKY Balikpapan sejak berdiri hingga kini.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    href: "/pengurus",
    label: "Pengurus",
    deskripsi: "Kenali para pendeta, majelis, dan tim pelayanan yang memimpin jemaat GKY Balikpapan.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/kegiatan",
    label: "Kegiatan",
    deskripsi: "Ikuti berbagai agenda dan kegiatan gereja — dari ibadah khusus hingga aksi sosial bersama jemaat.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/galeri",
    label: "Galeri",
    deskripsi: "Lihat koleksi foto dokumentasi berbagai momen berharga dalam kehidupan jemaat.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/video",
    label: "Video Khotbah",
    deskripsi: "Tonton kembali rekaman khotbah dan ibadah dari para pendeta GKY Balikpapan.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/faq",
    label: "FAQ",
    deskripsi: "Temukan jawaban atas pertanyaan umum seputar ibadah, pelayanan, dan kehidupan jemaat.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/kontak",
    label: "Kontak",
    deskripsi: "Hubungi kami melalui telepon, email, atau kunjungi langsung lokasi gereja.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function MenuRingkasanSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Jelajahi Gereja Kami"
          subtitle="Temukan informasi lengkap tentang GKY Balikpapan — dari profil hingga cara bergabung bersama kami."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-primary hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center text-primary group-hover:text-white transition-all duration-300">
                {menu.icon}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-primary group-hover:text-white text-base mb-1.5 transition-colors duration-300">
                  {menu.label}
                </h3>
                <p className="text-gray-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-300">
                  {menu.deskripsi}
                </p>
              </div>

              <span className="text-sm font-semibold text-accent group-hover:text-white flex items-center gap-1 transition-colors duration-300">
                Lihat
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
