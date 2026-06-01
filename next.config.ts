import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cache hasil optimasi next/image selama 30 hari di CDN Vercel.
    // Berlaku untuk gambar eksternal (YouTube, Unsplash) yang masih pakai optimizer.
    // Gambar dari Vercel Blob pakai unoptimized=true sehingga setting ini tidak berpengaruh pada mereka.
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
    // placehold.co returns SVG by default — safe for static placeholder use
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default withPayload(nextConfig)
