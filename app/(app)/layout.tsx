import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { getPayload } from "payload";
import config from "@/payload.config";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GKY Balikpapan",
  description: "Website resmi GKY Balikpapan — Bertumbuh dalam Iman, Melayani dalam Kasih",
};

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  return (
    <html lang="id">
      <body className={`${jakarta.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
