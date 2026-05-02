import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
    // placehold.co returns SVG by default — safe for static placeholder use
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default withPayload(nextConfig)
