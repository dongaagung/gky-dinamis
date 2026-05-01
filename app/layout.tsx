import type { Metadata } from "next";
import { Geist, Inter, Lato } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GKY Balikpapan",
  description: "Website resmi GKY Balikpapan — Bertumbuh dalam Iman, Melayani dalam Kasih",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geist.variable} ${inter.variable} ${lato.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
