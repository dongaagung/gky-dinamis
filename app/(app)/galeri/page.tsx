import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import GaleriClient from "@/app/components/galeri/GaleriClient";
import PageHero from "@/app/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Galeri — GKY Balikpapan",
  description: "Kumpulan foto kegiatan dan momen berharga GKY Balikpapan",
};

export default async function GaleriPage() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "galeri",
    sort: "urutan",
    limit: 200,
  });

  return (
    <>
      <PageHero
        title="Galeri"
        subtitle="Momen-momen berharga dalam perjalanan pelayanan kami"
      />
      <GaleriClient items={docs} />
    </>
  );
}
