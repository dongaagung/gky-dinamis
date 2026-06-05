// Direct SQL seed for komunitas tables (bypasses Payload loadEnv issue)
const { Pool } = require('../node_modules/pg')
const { randomUUID } = require('crypto')

const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: { rejectUnauthorized: false },
})

const now = new Date().toISOString()

const komunitas = [
  {
    nama: 'Ibadah Umum',
    slug: 'ibadah-umum',
    deskripsi:
      'Ibadah mingguan GKY Balikpapan yang terbuka untuk seluruh jemaat. Tersedia dua lokasi: Gedung Utama (KU 1 & KU 2) dan IPEKA Grand City (KU 3).',
    urutan: 1,
    aktif: true,
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
  },
  {
    nama: 'Sekolah Minggu',
    slug: 'sekolah-minggu',
    deskripsi:
      'Pelayanan anak-anak yang berlangsung setiap Minggu, tersedia di dua lokasi: Gunung Malang dan IPEKA Grand City.',
    urutan: 2,
    aktif: true,
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
  },
  {
    nama: 'Remaja',
    slug: 'remaja',
    deskripsi:
      'Komunitas remaja GKY Balikpapan — ruang bertumbuh bersama dalam iman, persahabatan, dan pelayanan.',
    urutan: 3,
    aktif: true,
    subGrup: [],
    jadwal: [
      {
        namaIbadah: 'Persekutuan Remaja',
        hari: 'Sabtu',
        waktu: '16:00 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
    ],
  },
  {
    nama: 'Pemuda',
    slug: 'pemuda',
    deskripsi:
      'Komunitas pemuda GKY Balikpapan — bersama membangun karakter, iman, dan visi pelayanan.',
    urutan: 4,
    aktif: true,
    subGrup: [],
    jadwal: [
      {
        namaIbadah: 'Persekutuan Pemuda',
        hari: 'Sabtu',
        waktu: '18:00 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
    ],
  },
  {
    nama: 'Pasutri',
    slug: 'pasutri',
    deskripsi:
      'Komunitas pasangan suami istri GKY Balikpapan — bertumbuh bersama dalam keluarga yang beriman.',
    urutan: 5,
    aktif: true,
    subGrup: [],
    jadwal: [
      {
        namaIbadah: 'Persekutuan Pasutri',
        hari: 'Jumat',
        waktu: '19:00 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
    ],
  },
  {
    nama: 'Komisi Wanita',
    slug: 'komisi-wanita',
    deskripsi:
      'Komisi Wanita GKY Balikpapan — persekutuan wanita yang saling menguatkan dan melayani dalam kasih Kristus.',
    urutan: 6,
    aktif: true,
    subGrup: [],
    jadwal: [
      {
        namaIbadah: 'Persekutuan Komisi Wanita',
        hari: 'Sabtu',
        waktu: '08:00 WIB',
        lokasi: 'Gedung Utama GKY Balikpapan',
      },
    ],
  },
]

async function seed() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    for (const item of komunitas) {
      // Check existing
      const exists = await client.query('SELECT id FROM komunitas WHERE slug = $1', [item.slug])
      if (exists.rows.length > 0) {
        console.log(`⏭  Skipped (exists): ${item.nama}`)
        continue
      }

      // Insert parent row
      const res = await client.query(
        `INSERT INTO komunitas (nama, slug, deskripsi, urutan, aktif, updated_at, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [item.nama, item.slug, item.deskripsi, item.urutan, item.aktif, now, now]
      )
      const parentId = res.rows[0].id

      // Insert sub_grup rows
      for (let i = 0; i < item.subGrup.length; i++) {
        const g = item.subGrup[i]
        await client.query(
          `INSERT INTO komunitas_sub_grup (_order, _parent_id, id, nama_grup, deskripsi)
           VALUES ($1, $2, $3, $4, $5)`,
          [i + 1, parentId, randomUUID(), g.namaGrup, g.deskripsi ?? null]
        )
      }

      // Insert jadwal rows
      for (let i = 0; i < item.jadwal.length; i++) {
        const j = item.jadwal[i]
        await client.query(
          `INSERT INTO komunitas_jadwal (_order, _parent_id, id, nama_ibadah, sub_grup_nama, hari, waktu, lokasi, keterangan)
           VALUES ($1, $2, $3, $4, $5, $6::enum_komunitas_jadwal_hari, $7, $8, $9)`,
          [
            i + 1,
            parentId,
            randomUUID(),
            j.namaIbadah,
            j.subGrupNama ?? null,
            j.hari,
            j.waktu,
            j.lokasi ?? null,
            j.keterangan ?? null,
          ]
        )
      }

      console.log(`✅ Created: ${item.nama} (id=${parentId})`)
    }

    await client.query('COMMIT')
    console.log('\n✨ Seeding selesai.')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('❌ Rollback:', err.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
