"use client";

import { useState } from "react";
import type { FAQ } from "@/data/faq";

interface FaqItemProps {
  item: FAQ;
}

export default function FaqItem({ item }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-800 text-sm md:text-base">
          {item.pertanyaan}
        </span>
        <span className="flex-shrink-0 text-primary transition-transform duration-300 text-xl font-light">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-4 pt-1 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100">
          {item.jawaban}
        </p>
      </div>
    </div>
  );
}
