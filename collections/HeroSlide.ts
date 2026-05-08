import type { CollectionConfig } from 'payload'

export const HeroSlide: CollectionConfig = {
  slug: "hero-slide",
  labels: {
    singular: "Slideshow Utama",
    plural: "Slideshow Utama",
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "urutan", "aktif"],
    group: "Konten",
    description: "Gambar slideshow di halaman utama (Hero Section)",
  },
  fields: [
    {
      name: "gambar",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload foto dari komputer (prioritas utama jika diisi)",
      },
    },
    {
      name: "urlEksternal",
      type: "text",
      admin: {
        description:
          "URL gambar eksternal — digunakan jika field Gambar di atas kosong. Contoh: https://images.unsplash.com/...",
      },
    },
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Teks deskripsi gambar (untuk aksesibilitas). Contoh: Interior gereja",
      },
    },
    {
      name: "urutan",
      type: "number",
      admin: {
        description: "Angka kecil tampil lebih dulu",
      },
    },
    {
      name: "aktif",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Centang untuk menampilkan slide ini di website",
      },
    },
  ],
};
