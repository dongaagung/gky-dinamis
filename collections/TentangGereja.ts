import type { GlobalConfig } from 'payload'

export const TentangGereja: GlobalConfig = {
  slug: 'tentang-gereja',
  admin: {
    group: 'Konten',
  },
  fields: [
    {
      name: 'deskripsi',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Paragraf deskripsi profil gereja',
      },
    },
    {
      name: 'tahunBerdiri',
      type: 'number',
    },
    {
      name: 'jumlahJemaat',
      type: 'text',
      admin: {
        description: 'Contoh: ±500 jiwa',
      },
    },
    {
      name: 'denominasi',
      type: 'text',
      admin: {
        description: 'Contoh: Reformed Injili',
      },
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Foto gedung atau jemaat gereja',
      },
    },
    {
      name: 'visi',
      type: 'textarea',
      required: true,
    },
    {
      name: 'misi',
      type: 'array',
      label: 'Poin-poin Misi',
      minRows: 1,
      fields: [
        {
          name: 'poin',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sejarah',
      type: 'array',
      label: 'Tonggak Sejarah',
      admin: {
        description: 'Urutan tampil sesuai urutan di sini (dari atas ke bawah)',
      },
      fields: [
        {
          name: 'tahun',
          type: 'number',
          required: true,
        },
        {
          name: 'judul',
          type: 'text',
          required: true,
        },
        {
          name: 'deskripsi',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
