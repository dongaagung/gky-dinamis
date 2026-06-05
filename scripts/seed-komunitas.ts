import { getPayload } from 'payload'
import config from '../payload.config'

const data = [
  {
    nama: 'Ibadah Umum',
    slug: 'ibadah-umum',
    deskripsi:
      'Ibadah mingguan GKY Balikpapan yang terbuka untuk seluruh jemaat. Tersedia dua lokasi: Gedung Utama (KU 1 & KU 2) dan IPEKA Grand City (KU 3).',
    subGrup: [
      {
        namaGrup: 'KU 1 & KU 2 — Gedung Utama',
        deskripsi: 'Kebaktian Umum 1 dan 2 di gedung utama GKY Balikpapan.',
      },
      {
        namaGrup: 'KU 3 — IPEKA Grand City',
        deskripsi: 'Kebaktian Umum 3 di lokasi IPEKA Grand City.',
      },
    ],
    jadwal: [
      {
        namaIbadah: 'Kebaktian Umum 1',
        subGrupNama: 'KU 1 & KU 2 — Gedung Utama',
        hari: 'Minggu',
        waktu: '08:00 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
      {
        namaIbadah: 'Kebaktian Umum 2',
        subGrupNama: 'KU 1 & KU 2 — Gedung Utama',
        hari: 'Minggu',
        waktu: '10:30 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
      {
        namaIbadah: 'Kebaktian Umum 3',
        subGrupNama: 'KU 3 — IPEKA Grand City',
        hari: 'Minggu',
        waktu: '09:00 WIB',
        lokasi: 'IPEKA Grand City',
      },
    ],
    urutan: 1,
    aktif: true,
  },
  {
    nama: 'Sekolah Minggu',
    slug: 'sekolah-minggu',
    deskripsi:
      'Pelayanan anak-anak yang berlangsung setiap Minggu, tersedia di dua lokasi: Gunung Malang dan IPEKA Grand City.',
    subGrup: [
      {
        namaGrup: 'Gunung Malang',
        deskripsi: 'Sekolah Minggu di lokasi Gunung Malang.',
      },
      {
        namaGrup: 'IPEKA Grand City',
        deskripsi: 'Sekolah Minggu di lokasi IPEKA Grand City.',
      },
    ],
    jadwal: [
      {
        namaIbadah: 'Sekolah Minggu',
        subGrupNama: 'Gunung Malang',
        hari: 'Minggu',
        waktu: '09:00 WIB',
        lokasi: 'Gunung Malang',
      },
      {
        namaIbadah: 'Sekolah Minggu',
        subGrupNama: 'IPEKA Grand City',
        hari: 'Minggu',
        waktu: '09:00 WIB',
        lokasi: 'IPEKA Grand City',
      },
    ],
    urutan: 2,
    aktif: true,
  },
  {
    nama: 'Remaja',
    slug: 'remaja',
    deskripsi:
      'Komunitas remaja GKY Balikpapan — ruang bertumbuh bersama dalam iman, persahabatan, dan pelayanan.',
    subGrup: [],
    jadwal: [
      {
        namaIbadah: 'Persekutuan Remaja',
        hari: 'Sabtu',
        waktu: '16:00 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
    ],
    urutan: 3,
    aktif: true,
  },
  {
    nama: 'Pemuda',
    slug: 'pemuda',
    deskripsi:
      'Komunitas pemuda GKY Balikpapan — bersama membangun karakter, iman, dan visi pelayanan.',
    subGrup: [],
    jadwal: [
      {
        namaIbadah: 'Persekutuan Pemuda',
        hari: 'Sabtu',
        waktu: '18:00 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
    ],
    urutan: 4,
    aktif: true,
  },
  {
    nama: 'Pasutri',
    slug: 'pasutri',
    deskripsi:
      'Komunitas pasangan suami istri GKY Balikpapan — bertumbuh bersama dalam keluarga yang beriman.',
    subGrup: [],
    jadwal: [
      {
        namaIbadah: 'Persekutuan Pasutri',
        hari: 'Jumat',
        waktu: '19:00 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
    ],
    urutan: 5,
    aktif: true,
  },
  {
    nama: 'Komisi Wanita',
    slug: 'komisi-wanita',
    deskripsi:
      'Komisi Wanita GKY Balikpapan — persekutuan wanita yang saling menguatkan dan melayani dalam kasih Kristus.',
    subGrup: [],
    jadwal: [
      {
        namaIbadah: 'Persekutuan Komisi Wanita',
        hari: 'Sabtu',
        waktu: '08:00 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
    ],
    urutan: 6,
    aktif: true,
  },
]

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding komunitas...\n')

  for (const item of data) {
    try {
      // Check if already exists
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existing = await (payload as any).find({
        collection: 'komunitas',
        where: { slug: { equals: item.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`⏭  Skipped (already exists): ${item.nama}`)
        continue
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (payload as any).create({
        collection: 'komunitas',
        data: item,
      })

      console.log(`✅ Created: ${item.nama}`)
    } catch (err) {
      console.error(`❌ Failed: ${item.nama}`, err)
    }
  }

  console.log('\n✨ Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
