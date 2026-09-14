import Image from "next/image"

interface PageHeroProps {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <div className="relative bg-[#002F5F] py-14 overflow-hidden">
      <Image
        src="/faq-hero.jpg"
        alt=""
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#002F5F]/60 to-[#002F5F]/70" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-base md:text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
