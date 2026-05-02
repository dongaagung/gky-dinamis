import type { CollectionConfig } from 'payload'

export const Galeri: CollectionConfig = {
  slug: 'galeri',
  admin: {
    useAsTitle: 'keterangan',
    defaultColumns: ['keterangan', 'kategori', 'urutan'],
    group: 'Konten',
  },
  fields: [
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload foto dari komputer (prioritas utama jika diisi)',
      },
    },
    {
      name: 'urlFoto',
      type: 'text',
      admin: {
        description: 'URL foto eksternal — digunakan jika field Foto di atas kosong',
      },
    },
    {
      name: 'keterangan',
      type: 'text',
      required: true,
      admin: {
        description: 'Contoh: Ibadah Natal 2024',
      },
    },
    {
      name: 'kategori',
      type: 'select',
      required: true,
      options: [
        { label: 'Ibadah', value: 'Ibadah' },
        { label: 'Kegiatan', value: 'Kegiatan' },
        { label: 'Persekutuan', value: 'Persekutuan' },
        { label: 'Bangunan', value: 'Bangunan' },
      ],
    },
    {
      name: 'urutan',
      type: 'number',
      admin: {
        description: 'Angka kecil tampil lebih dulu',
      },
    },
  ],
}
