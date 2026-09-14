import Link from "next/link";

type SiteSettingsProps = {
  namaGereja: string;
  motto?: string | null;
  alamat: string;
  telepon?: string | null;
  email?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  googleMapsUrl?: string | null;
};

type QuickLink = { href: string; label: string; external?: boolean };

const quickLinks: QuickLink[] = [
  { href: "/tentang", label: "Tentang" },
  { href: "/pengurus", label: "Pengurus" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/komunitas", label: "Komunitas" },
  { href: "/media", label: "Media" },
  {
    href: "https://gky.or.id/gema.jsp?title=Gerakan+Membaca+Alkitab",
    label: "GEMA",
    external: true,
  },
  { href: "/faq", label: "FAQ" },
  { href: "/kontak", label: "Kontak" },
];

export default function Footer({
  siteSettings,
}: {
  siteSettings: SiteSettingsProps;
}) {
  return (
    <footer className="bg-primary text-white shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top row: info + social icons */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 pb-6 border-b border-white/10">
          <div className="min-w-0">
            <h3 className="font-bold text-lg leading-tight">{siteSettings.namaGereja}</h3>
            {siteSettings.motto && (
              <p className="text-white/70 text-sm mt-1 italic leading-relaxed max-w-xs">
                {siteSettings.motto}
              </p>
            )}
            <p className="text-white/40 text-xs mt-2 leading-relaxed max-w-xs">
              {siteSettings.alamat}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {siteSettings.googleMapsUrl && (
              <a
                href={siteSettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Lokasi di Google Maps"
                title="Lihat Lokasi"
              >
                {/* Google Maps pin icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </a>
            )}

            {siteSettings.instagram && (
              <a
                href={siteSettings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            )}

            {siteSettings.youtube && (
              <a
                href={siteSettings.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
                title="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Bottom row: quick links + copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-5">
          <nav className="flex flex-wrap gap-x-4 gap-y-1.5">
            {quickLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 hover:text-white text-xs transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/55 hover:text-white text-xs transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <p className="text-white/30 text-xs flex-shrink-0">
            © {new Date().getFullYear()} {siteSettings.namaGereja}
          </p>
        </div>
      </div>
    </footer>
  );
}
