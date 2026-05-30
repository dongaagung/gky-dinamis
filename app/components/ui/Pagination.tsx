import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  extraParams?: Record<string, string>
}

function buildHref(basePath: string, page: number, extra?: Record<string, string>) {
  const params = new URLSearchParams(extra)
  if (page > 1) params.set("page", String(page))
  const qs = params.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

export default function Pagination({ currentPage, totalPages, basePath, extraParams }: PaginationProps) {
  if (totalPages <= 1) return null

  const rangeSet = new Set([1, totalPages])
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    rangeSet.add(i)
  }

  const sorted = [...rangeSet].sort((a, b) => a - b)
  const pages: (number | "ellipsis")[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) pages.push("ellipsis")
    pages.push(p)
    prev = p
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-12" aria-label="Navigasi halaman">
      {currentPage > 1 ? (
        <Link
          href={buildHref(basePath, currentPage - 1, extraParams)}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary border border-gray-200 rounded-lg hover:border-primary transition-colors"
        >
          ← Sebelumnya
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 border border-gray-100 rounded-lg cursor-not-allowed select-none">
          ← Sebelumnya
        </span>
      )}

      <div className="flex items-center gap-1 mx-1">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="px-2 py-2 text-gray-400 text-sm select-none">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(basePath, p, extraParams)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`min-w-[2.25rem] px-3 py-2 text-sm font-medium rounded-lg text-center transition-colors ${
                p === currentPage
                  ? "bg-primary text-white shadow-sm pointer-events-none"
                  : "text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {p}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={buildHref(basePath, currentPage + 1, extraParams)}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary border border-gray-200 rounded-lg hover:border-primary transition-colors"
        >
          Berikutnya →
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 border border-gray-100 rounded-lg cursor-not-allowed select-none">
          Berikutnya →
        </span>
      )}
    </nav>
  )
}
