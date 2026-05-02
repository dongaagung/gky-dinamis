"use server";

import { getPayload } from "payload";
import config from "@/payload.config";

export async function kirimPesan(
  _prevState: { success: boolean; message: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const nama = (formData.get("nama") as string)?.trim();
  const nomorWA = (formData.get("nomorWA") as string)?.trim();
  const pesan = (formData.get("pesan") as string)?.trim();

  if (!nama || !nomorWA || !pesan) {
    return { success: false, message: "Semua field wajib diisi." };
  }

  const nomorValid = /^[0-9+\-\s()]{7,20}$/.test(nomorWA);
  if (!nomorValid) {
    return { success: false, message: "Format nomor WhatsApp/telepon tidak valid." };
  }

  try {
    const payload = await getPayload({ config });

    await payload.create({
      collection: "kontak-pesan",
      data: { nama, nomorWA, pesan, dibaca: false },
    });

    return {
      success: true,
      message: "Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.",
    };
  } catch (error) {
    console.error("Error kirim pesan:", error);
    return {
      success: false,
      message: "Terjadi kesalahan. Silakan coba lagi.",
    };
  }
}
