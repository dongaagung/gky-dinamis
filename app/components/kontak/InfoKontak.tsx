import { siteInfo } from "@/data/siteInfo";

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  );
}

export default function InfoKontak() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <h2 className="text-xl font-bold text-primary mb-6">Informasi Kontak</h2>

      <div className="space-y-6">
        <Row
          label="Alamat"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          <p className="text-gray-700 leading-relaxed">{siteInfo.alamat}</p>
        </Row>

        <Row
          label="Telepon"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
        >
          <a
            href={`tel:${siteInfo.telepon.replace(/-/g, "")}`}
            className="text-gray-700 hover:text-primary transition-colors font-medium"
          >
            {siteInfo.telepon}
          </a>
        </Row>

        <Row
          label="Email"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        >
          <a
            href={`mailto:${siteInfo.email}`}
            className="text-gray-700 hover:text-primary transition-colors font-medium"
          >
            {siteInfo.email}
          </a>
        </Row>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">Media Sosial</p>
        <div className="flex gap-3">
          <a
            href={siteInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-50 hover:bg-primary hover:text-white text-gray-600 border border-gray-200 hover:border-primary px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Instagram
          </a>
          <a
            href={siteInfo.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-50 hover:bg-primary hover:text-white text-gray-600 border border-gray-200 hover:border-primary px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
            </svg>
            YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
