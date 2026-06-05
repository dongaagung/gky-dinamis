"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type SubLink = { href: string; label: string };
type NavLink = { href: string; label: string; submenu?: SubLink[] };

const navLinks: NavLink[] = [
  { href: "/", label: "BERANDA" },
  {
    href: "/tentang",
    label: "TENTANG",
    submenu: [
      { href: "/tentang#visi-misi", label: "Visi & Misi" },
      { href: "/tentang#sejarah", label: "Sejarah" },
    ],
  },
  { href: "/pengurus", label: "PENGURUS" },
  { href: "/kegiatan", label: "KEGIATAN" },
  {
    href: "/komunitas",
    label: "KOMUNITAS",
    submenu: [
      { href: "/komunitas/ibadah-umum", label: "Ibadah Umum" },
      { href: "/komunitas/sekolah-minggu", label: "Sekolah Minggu" },
      { href: "/komunitas/remaja", label: "Remaja" },
      { href: "/komunitas/pemuda", label: "Pemuda" },
      { href: "/komunitas/pasutri", label: "Pasutri" },
      { href: "/komunitas/komisi-wanita", label: "Komisi Wanita" },
    ],
  },
  { href: "/media", label: "MEDIA" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontak", label: "KONTAK" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const openDropdown = useCallback((href: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(href);
  }, []);

  const closeDropdown = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  function toggleMobileExpanded(href: string) {
    setMobileExpanded((prev) => (prev === href ? null : href));
  }

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-xl shadow-black/10" : "shadow-md shadow-black/5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-gky.png"
              alt="Logo GKY Balikpapan"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href !== "/komunitas"
                  ? pathname.startsWith(link.href)
                  : pathname.startsWith("/komunitas");

              const isOpen = activeDropdown === link.href;

              if (!link.submenu) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative flex flex-col items-center gap-0.5 pb-0.5"
                  >
                    <span
                      className={`text-sm font-bold tracking-wider transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-gray-500 group-hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`h-[2px] rounded-full transition-all duration-300 ease-out ${
                        isActive ? "w-full bg-accent" : "w-0 group-hover:w-full bg-primary"
                      }`}
                    />
                  </Link>
                );
              }

              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => openDropdown(link.href)}
                  onMouseLeave={closeDropdown}
                >
                  <Link
                    href={link.href}
                    className="group relative flex flex-col items-center gap-0.5 pb-0.5"
                  >
                    <span
                      className={`flex items-center gap-1 text-sm font-bold tracking-wider transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-gray-500 group-hover:text-primary"
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                    <span
                      className={`h-[2px] rounded-full transition-all duration-300 ease-out ${
                        isActive ? "w-full bg-accent" : "w-0 group-hover:w-full bg-primary"
                      }`}
                    />
                  </Link>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-[calc(100%+4px)] -left-3 z-50 transition-all duration-200 ${
                      isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                    onMouseEnter={cancelClose}
                    onMouseLeave={closeDropdown}
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 min-w-[180px]">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors font-medium"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-primary rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-2 pb-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (!link.submenu) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md font-bold text-sm tracking-wider transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/5 border-l-2 border-accent"
                        : "text-gray-500 hover:text-primary hover:bg-gray-50 border-l-2 border-transparent hover:border-primary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              }

              const isExpanded = mobileExpanded === link.href;

              return (
                <div key={link.href}>
                  <button
                    onClick={() => toggleMobileExpanded(link.href)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-3 rounded-md font-bold text-sm tracking-wider transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/5 border-l-2 border-accent"
                        : "text-gray-500 hover:text-primary hover:bg-gray-50 border-l-2 border-transparent hover:border-primary"
                    }`}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                      className="flex-1 text-left"
                    >
                      {link.label}
                    </Link>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="ml-4 pl-3 border-l-2 border-gray-100 mb-1">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-primary transition-colors font-medium rounded-md hover:bg-gray-50"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
