import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GKY Balikpapan",
  description: "Website resmi GKY Balikpapan — Bertumbuh dalam Iman, Melayani dalam Kasih",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
