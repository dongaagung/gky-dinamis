import Link from "next/link";
import { siteInfo } from "@/data/siteInfo";

export default function HeroSection() {
  return (
    <section className="relative bg-primary min-h-[85vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-dark to-transparent opacity-60"
      />

      <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
        <div className="inline-block mb-6">
          <span className="bg-white/10 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full border border-white/20">
            Selamat Datang
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight tracking-tight">
          {siteInfo.namaGereja}
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          {siteInfo.tagline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#jadwal-ibadah"
            className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-accent/20"
          >
            Jadwal Ibadah
          </Link>
          <Link
            href="/tentang"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full border border-white/30 transition-colors"
          >
            Tentang Kami
          </Link>
        </div>
      </div>
    </section>
  );
}
