"use client";

import { useState } from "react";
import Link from "next/link";
import { siteInfo } from "@/data/siteInfo";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/pengurus", label: "Pengurus" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/video", label: "Video" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg md:text-xl leading-tight">
              {siteInfo.namaGereja}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

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

        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2.5 text-gray-600 hover:text-primary hover:bg-gray-50 font-medium rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
