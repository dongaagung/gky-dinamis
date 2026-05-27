import type { CollectionConfig } from "payload";

export const KontakPesan: CollectionConfig = {
  slug: "kontak-pesan",
  labels: {
    singular: "Pesan Kontak",
    plural: "Pesan Kontak",
  },
  admin: {
    useAsTitle: "nama",
    group: "Administrasi",
    defaultColumns: ["nama", "nomorWA", "dibaca", "createdAt"],
  },
  access: {
    create: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: "nama",
      type: "text",
      required: true,
      access: { update: () => false },
    },
    {
      name: "nomorWA",
      label: "Nomor WhatsApp / Telepon",
      type: "text",
      required: true,
      access: { update: () => false },
    },
    {
      name: "pesan",
      type: "textarea",
      required: true,
      access: { update: () => false },
    },
    {
      name: "dibaca",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
