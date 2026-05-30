import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Pengaturan',
  },
  fields: [
    {
      name: 'namaGereja',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'alamat',
      type: 'textarea',
      required: true,
    },
    {
      name: 'telepon',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'instagram',
      type: 'text',
      admin: {
        description: 'URL lengkap Instagram (https://instagram.com/...)',
      },
    },
    {
      name: 'youtube',
      type: 'text',
      admin: {
        description: 'URL lengkap YouTube (https://youtube.com/...)',
      },
    },
    {
      name: 'googleMapsEmbedUrl',
      type: 'text',
      admin: {
        description: 'URL embed Google Maps (https://www.google.com/maps/embed?...)',
      },
    },
    {
      name: 'ayatAlkitab',
      type: 'textarea',
      admin: {
        description: 'Teks ayat Alkitab yang ditampilkan di halaman utama',
      },
    },
    {
      name: 'referensiAyat',
      type: 'text',
      admin: {
        description: 'Referensi ayat, contoh: Yohanes 3:16',
      },
    },
  ],
}
