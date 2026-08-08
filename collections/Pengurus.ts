import type { CollectionConfig } from 'payload'

export const Pengurus: CollectionConfig = {
  slug: "pengurus",
  labels: {
    singular: "Pengurus",
    plural: "Pengurus", // <-- ini yang penting, override "Penguruses"
  },
  admin: {
    useAsTitle: "nama",
    defaultColumns: ["nama", "jabatan", "kategori", "urutan"],
    group: "Konten",
  },
  fields: [
    {
      name: "nama",
      type: "text",
      required: true,
    },
    {
      name: "jabatan",
      type: "text",
      required: true,
      admin: {
        description: "Contoh: Pendeta Jemaat, Ketua Majelis",
      },
    },
    {
      name: "kategori",
      type: "select",
      required: true,
      options: [
        { label: "Rohaniwan", value: "Rohaniwan" },
        { label: "Majelis Jemaat", value: "Majelis Jemaat" },
        { label: "Staf Pelayan", value: "Karyawan Gereja" },
      ],
    },
    {
      name: "foto",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Upload foto dari komputer (prioritas utama jika diisi)",
      },
    },
    {
      name: "urlFoto",
      type: "text",
      admin: {
        description:
          "URL foto eksternal — digunakan jika field Foto di atas kosong",
      },
    },
    {
      name: "urutan",
      type: "number",
      admin: {
        description: "Angka kecil tampil lebih dulu dalam kelompoknya",
      },
    },
  ],
};
