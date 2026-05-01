export interface FAQ {
  id: number
  pertanyaan: string
  jawaban: string
  kategori: "umum" | "ibadah" | "pelayanan"
}

export const faq: FAQ[] = [
  {
    id: 1,
    pertanyaan: "Jam berapa ibadah minggu dimulai?",
    jawaban: "Ibadah Umum dimulai pukul 08:00 WIB dan Ibadah Remaja pukul 10:30 WIB setiap hari Minggu.",
    kategori: "ibadah",
  },
  {
    id: 2,
    pertanyaan: "Apakah ada ibadah selain hari Minggu?",
    jawaban: "Ya, setiap Rabu malam pukul 19:00 WIB ada Ibadah Doa bersama di Gedung Utama.",
    kategori: "ibadah",
  },
  {
    id: 3,
    pertanyaan: "Bagaimana cara mendaftarkan baptis?",
    jawaban: "Pendaftaran baptis dapat dilakukan dengan menghubungi sekretariat gereja melalui telepon atau email yang tertera di halaman Kontak.",
    kategori: "pelayanan",
  },
  {
    id: 4,
    pertanyaan: "Apakah gereja menyediakan kelas anak?",
    jawaban: "Ya, tersedia Sekolah Minggu untuk anak-anak yang berlangsung bersamaan dengan Ibadah Umum setiap hari Minggu.",
    kategori: "umum",
  },
  {
    id: 5,
    pertanyaan: "Bagaimana cara bergabung dengan tim pelayanan?",
    jawaban: "Silakan hubungi koordinator pelayanan melalui kontak gereja atau langsung temui pengurus setelah ibadah.",
    kategori: "pelayanan",
  },
  {
    id: 6,
    pertanyaan: "Apakah ada parkir di gereja?",
    jawaban: "Ya, tersedia area parkir di sekitar gedung gereja untuk kendaraan roda dua dan roda empat.",
    kategori: "umum",
  },
]
