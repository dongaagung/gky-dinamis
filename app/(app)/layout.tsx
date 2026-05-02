import "./globals.css";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { getPayload } from "payload";
import config from "@/payload.config";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
