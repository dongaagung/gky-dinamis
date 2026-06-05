import type { CollectionConfig } from 'payload'

export const Komunitas: CollectionConfig = {
  slug: 'komunitas',
  admin: {
    useAsTitle: 'nama',
    group: 'Konten',
    defaultColumns: ['nama', 'slug', 'aktif', 'urutan'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      required: true,
      admin: { description: 'Nama komunitas, contoh: Ibadah Umum, Remaja' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'URL slug (huruf kecil, tanda hubung). Contoh: ibadah-umum, sekolah-minggu, remaja',
      },
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      admin: { description: 'Deskripsi komunitas ini — ditampilkan di bawah foto sampul' },
    },
    {
      name: 'fotoCover',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Foto sampul yang tampil di bagian paling atas halaman komunitas',
      },
    },
    {
      name: 'subGrup',
      type: 'array',
      label: 'Sub Grup',
      admin: {
        description:
          'Isi jika komunitas ini punya sub-grup (contoh: Ibadah Umum → KU 1&2, KU 3 IPEKA)',
      },
      fields: [
        {
          name: 'namaGrup',
          type: 'text',
          required: true,
          label: 'Nama Sub Grup',
        },
        {
          name: 'deskripsi',
          type: 'textarea',
          label: 'Deskripsi',
        },
      ],
    },
    {
      name: 'jadwal',
      type: 'array',
      label: 'Jadwal',
      fields: [
        {
          name: 'namaIbadah',
          type: 'text',
          required: true,
          label: 'Nama Ibadah / Kegiatan',
        },
        {
          name: 'subGrupNama',
          type: 'text',
          label: 'Sub Grup (opsional)',
          admin: {
            description: 'Isi jika jadwal ini untuk sub-grup tertentu, contoh: KU 1 & 2',
          },
        },
        {
          name: 'hari',
          type: 'select',
          required: true,
          label: 'Hari',
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
          label: 'Waktu',
          admin: { description: 'Contoh: 08:00 WIB' },
        },
        {
          name: 'lokasi',
          type: 'text',
          label: 'Lokasi',
        },
        {
          name: 'keterangan',
          type: 'text',
          label: 'Keterangan Tambahan',
        },
      ],
    },
    {
      name: 'foto',
      type: 'array',
      label: 'Galeri Foto',
      fields: [
        {
          name: 'gambar',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Gambar',
        },
        {
          name: 'keterangan',
          type: 'text',
          label: 'Keterangan Foto',
        },
      ],
    },
    {
      name: 'video',
      type: 'array',
      label: 'Video YouTube',
      fields: [
        {
          name: 'judul',
          type: 'text',
          required: true,
          label: 'Judul Video',
        },
        {
          name: 'youtubeId',
          type: 'text',
          required: true,
          label: 'YouTube ID',
          admin: {
            description: 'Hanya ID-nya saja (bagian setelah ?v= di URL YouTube). Contoh: dQw4w9WgXcQ',
          },
        },
        {
          name: 'pembicara',
          type: 'text',
          label: 'Pembicara / Host',
        },
        {
          name: 'tanggal',
          type: 'date',
          label: 'Tanggal',
        },
      ],
    },
    {
      name: 'urutan',
      type: 'number',
      admin: { description: 'Urutan tampil dalam daftar (angka kecil = lebih awal)' },
    },
    {
      name: 'aktif',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Centang untuk menampilkan halaman ini di website' },
    },
  ],
}
