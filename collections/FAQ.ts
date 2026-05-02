import type { CollectionConfig } from "payload";

export const FAQ: CollectionConfig = {
  slug: "faq",
  admin: {
    useAsTitle: "pertanyaan",
    group: "Konten",
    defaultColumns: ["pertanyaan", "kategori", "urutan"],
  },
  fields: [
    {
      name: "pertanyaan",
      type: "text",
      required: true,
    },
    {
      name: "jawaban",
      type: "textarea",
      required: true,
    },
    {
      name: "kategori",
      type: "select",
      required: true,
      options: [
        { label: "Umum", value: "umum" },
        { label: "Ibadah", value: "ibadah" },
        { label: "Pelayanan", value: "pelayanan" },
      ],
    },
    {
      name: "urutan",
      type: "number",
    },
  ],
};
