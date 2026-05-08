import type { CollectionConfig } from "payload";

export const VideoKhotbah: CollectionConfig = {
  slug: "video-khotbah",
  labels: {
    singular: "Media Video",
    plural: "Media Video",
  },
  admin: {
    useAsTitle: "judul",
    group: "Konten",
    defaultColumns: ["judul", "pembicara", "tanggal", "status"],
  },
  fields: [
    {
      name: "judul",
      type: "text",
      required: true,
    },
    {
      name: "pembicara",
      type: "text",
      required: true,
    },
    {
      name: "tanggal",
      type: "text",
      required: true,
    },
    {
      name: "youtubeId",
      type: "text",
      required: true,
      admin: {
        description:
          "Hanya ID-nya saja, contoh: dQw4w9WgXcQ (bukan full URL YouTube)",
      },
    },
    {
      name: "deskripsi",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
  ],
};
