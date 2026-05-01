"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "BERANDA" },
  { href: "/tentang", label: "TENTANG" },
  { href: "/pengurus", label: "PENGURUS" },
  { href: "/kegiatan", label: "KEGIATAN" },
  { href: "/galeri", label: "GALERI" },
  { href: "/video", label: "VIDEO" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontak", label: "KONTAK" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-gray-300/60" : "shadow-sm shadow-gray-200/40"}`}>
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

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative flex flex-col items-center gap-0.5 pb-0.5"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  <span
                    className={`text-sm font-bold tracking-wider transition-colors duration-200 ${
                      isActive ? "text-primary" : "text-gray-500 group-hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Sliding underline */}
                  <span
                    className={`h-[2px] rounded-full transition-all duration-300 ease-out ${
                      isActive
                        ? "w-full bg-accent"
                        : "w-0 group-hover:w-full bg-primary"
                    }`}
                  />
                </Link>
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

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md font-bold text-sm tracking-wider transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/5 border-l-2 border-accent"
                      : "text-gray-500 hover:text-primary hover:bg-gray-50 hover:border-l-2 hover:border-primary border-l-2 border-transparent"
                  }`}
                  style={{ fontFamily: "var(--font-lato)" }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
