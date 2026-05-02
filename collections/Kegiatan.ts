import type { CollectionConfig } from 'payload'

export const Kegiatan: CollectionConfig = {
  slug: 'kegiatan',
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'kategori', 'tanggal', 'slug'],
    group: 'Konten',
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier. Contoh: ibadah-paskah-2025 (huruf kecil, tanpa spasi, gunakan tanda hubung)',
      },
    },
    {
      name: 'kategori',
      type: 'select',
      required: true,
      options: [
        { label: 'Ibadah', value: 'Ibadah' },
        { label: 'Persekutuan', value: 'Persekutuan' },
        { label: 'Pelayanan Sosial', value: 'Pelayanan Sosial' },
        { label: 'Pendidikan', value: 'Pendidikan' },
      ],
    },
    {
      name: 'tanggal',
      type: 'text',
      required: true,
      admin: {
        description: 'Contoh: 20 April 2025 atau 2–4 Mei 2025',
      },
    },
    {
      name: 'lokasi',
      type: 'text',
      required: true,
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Ringkasan singkat yang tampil di kartu (1–2 kalimat)',
      },
    },
    {
      name: 'deskripsiLengkap',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Isi lengkap halaman detail. Pisahkan paragraf dengan baris kosong.',
      },
    },
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
  ],
}
