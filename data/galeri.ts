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
    foto: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    keterangan: "Ibadah Natal 2024",
    kategori: "Ibadah",
  },
  {
    id: 2,
    foto: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80",
    keterangan: "Ibadah Paskah 2025",
    kategori: "Ibadah",
  },
  {
    id: 3,
    foto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    keterangan: "Ibadah Umum Minggu",
    kategori: "Ibadah",
  },
  {
    id: 4,
    foto: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    keterangan: "Ibadah Doa Rabu Malam",
    kategori: "Ibadah",
  },
  {
    id: 5,
    foto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    keterangan: "Perayaan HUT ke-40 GKY Balikpapan",
    kategori: "Ibadah",
  },

  // Kegiatan
  {
    id: 6,
    foto: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    keterangan: "Bakti Sosial Maret 2025",
    kategori: "Kegiatan",
  },
  {
    id: 7,
    foto: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    keterangan: "Retreat Remaja Mei 2025",
    kategori: "Kegiatan",
  },
  {
    id: 8,
    foto: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    keterangan: "Pelatihan Pelayan Ibadah April 2025",
    kategori: "Kegiatan",
  },
  {
    id: 9,
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    keterangan: "Pendalaman Alkitab Injil Yohanes",
    kategori: "Kegiatan",
  },

  // Persekutuan
  {
    id: 10,
    foto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    keterangan: "Gathering Keluarga Jemaat",
    kategori: "Persekutuan",
  },
  {
    id: 11,
    foto: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    keterangan: "Makan Bersama Usai Ibadah",
    kategori: "Persekutuan",
  },
  {
    id: 12,
    foto: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
    keterangan: "Arisan Rohani Komisi Ibu",
    kategori: "Persekutuan",
  },

  // Bangunan
  {
    id: 13,
    foto: "https://images.unsplash.com/photo-1548625361-58a9b86aa83b?w=800&q=80",
    keterangan: "Gedung Gereja Tampak Depan",
    kategori: "Bangunan",
  },
  {
    id: 14,
    foto: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    keterangan: "Interior Aula Utama",
    kategori: "Bangunan",
  },
  {
    id: 15,
    foto: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    keterangan: "Taman Gereja",
    kategori: "Bangunan",
  },
];

export const kategoriGaleri: KategoriGaleri[] = ["Ibadah", "Kegiatan", "Persekutuan", "Bangunan"];
