export type KategoriGaleri = "Ibadah" | "Kegiatan" | "Persekutuan" | "Bangunan";

export interface IGaleri {
  id: number;
  foto: string;
  keterangan: string;
  kategori: KategoriGaleri;
}

export const galeri: IGaleri[] = [
  // Ibadah
  {
    id: 1,
    foto: "https://placehold.co/800x600/1a3a6b/ffffff?text=Ibadah+Natal+2024",
    keterangan: "Ibadah Natal 2024",
    kategori: "Ibadah",
  },
  {
    id: 2,
    foto: "https://placehold.co/800x600/1a3a6b/ffffff?text=Ibadah+Paskah+2025",
    keterangan: "Ibadah Paskah 2025",
    kategori: "Ibadah",
  },
  {
    id: 3,
    foto: "https://placehold.co/800x600/1a3a6b/ffffff?text=Ibadah+Umum+Minggu",
    keterangan: "Ibadah Umum Minggu",
    kategori: "Ibadah",
  },
  {
    id: 4,
    foto: "https://placehold.co/800x600/1a3a6b/ffffff?text=Ibadah+Doa+Rabu",
    keterangan: "Ibadah Doa Rabu Malam",
    kategori: "Ibadah",
  },
  {
    id: 5,
    foto: "https://placehold.co/800x600/1a3a6b/ffffff?text=HUT+ke-40+Gereja",
    keterangan: "Perayaan HUT ke-40 GKY Balikpapan",
    kategori: "Ibadah",
  },

  // Kegiatan
  {
    id: 6,
    foto: "https://placehold.co/800x600/b5420a/ffffff?text=Bakti+Sosial+2025",
    keterangan: "Bakti Sosial Maret 2025",
    kategori: "Kegiatan",
  },
  {
    id: 7,
    foto: "https://placehold.co/800x600/b5420a/ffffff?text=Retreat+Remaja+2025",
    keterangan: "Retreat Remaja Mei 2025",
    kategori: "Kegiatan",
  },
  {
    id: 8,
    foto: "https://placehold.co/800x600/b5420a/ffffff?text=Pelatihan+Pelayan",
    keterangan: "Pelatihan Pelayan Ibadah April 2025",
    kategori: "Kegiatan",
  },
  {
    id: 9,
    foto: "https://placehold.co/800x600/b5420a/ffffff?text=Pendalaman+Alkitab",
    keterangan: "Pendalaman Alkitab Injil Yohanes",
    kategori: "Kegiatan",
  },

  // Persekutuan
  {
    id: 10,
    foto: "https://placehold.co/800x600/2d6a4f/ffffff?text=Gathering+Keluarga",
    keterangan: "Gathering Keluarga Jemaat",
    kategori: "Persekutuan",
  },
  {
    id: 11,
    foto: "https://placehold.co/800x600/2d6a4f/ffffff?text=Makan+Bersama",
    keterangan: "Makan Bersama Usai Ibadah",
    kategori: "Persekutuan",
  },
  {
    id: 12,
    foto: "https://placehold.co/800x600/2d6a4f/ffffff?text=Arisan+Rohani",
    keterangan: "Arisan Rohani Komisi Ibu",
    kategori: "Persekutuan",
  },

  // Bangunan
  {
    id: 13,
    foto: "https://placehold.co/800x600/4a5568/ffffff?text=Gedung+Gereja",
    keterangan: "Gedung Gereja Tampak Depan",
    kategori: "Bangunan",
  },
  {
    id: 14,
    foto: "https://placehold.co/800x600/4a5568/ffffff?text=Interior+Aula",
    keterangan: "Interior Aula Utama",
    kategori: "Bangunan",
  },
  {
    id: 15,
    foto: "https://placehold.co/800x600/4a5568/ffffff?text=Taman+Gereja",
    keterangan: "Taman Gereja",
    kategori: "Bangunan",
  },
];

export const kategoriGaleri: KategoriGaleri[] = ["Ibadah", "Kegiatan", "Persekutuan", "Bangunan"];
