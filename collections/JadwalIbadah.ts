import type { CollectionConfig } from 'payload'

export const JadwalIbadah: CollectionConfig = {
  slug: 'jadwal-ibadah',
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'lokasi', 'urutan'],
    group: 'Konten',
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      required: true,
      admin: {
        description: 'Contoh: Ibadah Umum',
      },
    },
    {
      name: 'jadwalHari',
      type: 'array',
      label: 'Jadwal Hari & Waktu',
      minRows: 1,
      admin: {
        description: 'Tambah baris untuk setiap kombinasi hari dan waktu ibadah',
      },
      fields: [
        {
          name: 'hari',
          type: 'select',
          required: true,
          options: [
            { label: 'Minggu', value: 'Minggu' },
            { label: 'Senin', value: 'Senin' },
            { label: 'Selasa', value: 'Selasa' },
            { label: 'Rabu', value: 'Rabu' },
            { label: 'Kamis', value: 'Kamis' },
            { label: 'Jumat', value: 'Jumat' },
            { label: 'Sabtu', value: 'Sabtu' },
          ],
        },
        {
          name: 'waktu',
          type: 'text',
          required: true,
          admin: {
            description: 'Contoh: 08:00 WIB',
          },
        },
      ],
    },
    {
      name: 'lokasi',
      type: 'text',
      admin: {
        description: 'Contoh: Gedung Utama',
      },
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
