export type KategoriPengurus = "Pelayan Firman" | "Majelis Jemaat" | "Karyawan Gereja";

export interface IPengurus {
  id: number;
  nama: string;
  jabatan: string;
  kategori: KategoriPengurus;
  foto: string;
}

export const pengurus: IPengurus[] = [
  // Pelayan Firman
  {
    id: 1,
    nama: "Pdt. Yohanes Susilo",
    jabatan: "Pendeta Jemaat",
    kategori: "Pelayan Firman",
    foto: "https://placehold.co/300x300/1a3a6b/ffffff?text=YS",
  },
  {
    id: 2,
    nama: "Pdt. Maria Andini",
    jabatan: "Pendeta Muda",
    kategori: "Pelayan Firman",
    foto: "https://placehold.co/300x300/1a3a6b/ffffff?text=MA",
  },

  // Majelis Jemaat
  {
    id: 3,
    nama: "Budi Santoso",
    jabatan: "Ketua Majelis",
    kategori: "Majelis Jemaat",
    foto: "https://placehold.co/300x300/2c5282/ffffff?text=BS",
  },
  {
    id: 4,
    nama: "Sri Wahyuni",
    jabatan: "Wakil Ketua Majelis",
    kategori: "Majelis Jemaat",
    foto: "https://placehold.co/300x300/2c5282/ffffff?text=SW",
  },
  {
    id: 5,
    nama: "Hendri Kurniawan",
    jabatan: "Sekretaris",
    kategori: "Majelis Jemaat",
    foto: "https://placehold.co/300x300/2c5282/ffffff?text=HK",
  },
  {
    id: 6,
    nama: "Dewi Rahayu",
    jabatan: "Wakil Sekretaris",
    kategori: "Majelis Jemaat",
    foto: "https://placehold.co/300x300/2c5282/ffffff?text=DR",
  },
  {
    id: 7,
    nama: "Anton Wijaya",
    jabatan: "Bendahara",
    kategori: "Majelis Jemaat",
    foto: "https://placehold.co/300x300/2c5282/ffffff?text=AW",
  },
  {
    id: 8,
    nama: "Lisa Permata",
    jabatan: "Wakil Bendahara",
    kategori: "Majelis Jemaat",
    foto: "https://placehold.co/300x300/2c5282/ffffff?text=LP",
  },
  {
    id: 9,
    nama: "Rudi Hartono",
    jabatan: "Penatua Bidang Ibadah",
    kategori: "Majelis Jemaat",
    foto: "https://placehold.co/300x300/2c5282/ffffff?text=RH",
  },
  {
    id: 10,
    nama: "Yenny Kristanti",
    jabatan: "Penatua Bidang Pelayanan",
    kategori: "Majelis Jemaat",
    foto: "https://placehold.co/300x300/2c5282/ffffff?text=YK",
  },

  // Karyawan Gereja
  {
    id: 11,
    nama: "Daniel Saputra",
    jabatan: "Kepala Tata Usaha",
    kategori: "Karyawan Gereja",
    foto: "https://placehold.co/300x300/4a5568/ffffff?text=DS",
  },
  {
    id: 12,
    nama: "Putri Sari",
    jabatan: "Staf Administrasi",
    kategori: "Karyawan Gereja",
    foto: "https://placehold.co/300x300/4a5568/ffffff?text=PS",
  },
  {
    id: 13,
    nama: "Agus Setiawan",
    jabatan: "Teknisi & Sound System",
    kategori: "Karyawan Gereja",
    foto: "https://placehold.co/300x300/4a5568/ffffff?text=AS",
  },
];

export const kelompokPengurus: {
  kategori: KategoriPengurus;
  deskripsi: string;
}[] = [
  {
    kategori: "Pelayan Firman",
    deskripsi: "Pendeta yang melayani dan menggembalakan jemaat",
  },
  {
    kategori: "Majelis Jemaat",
    deskripsi: "Penatua dan diaken yang terpilih memimpin jemaat bersama",
  },
  {
    kategori: "Karyawan Gereja",
    deskripsi: "Staf yang mendukung pelayanan administrasi dan operasional gereja",
  },
];
