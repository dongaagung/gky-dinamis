export type KategoriKegiatan = "Ibadah" | "Persekutuan" | "Pelayanan Sosial" | "Pendidikan";

export interface IKegiatan {
  id: number;
  judul: string;
  kategori: KategoriKegiatan;
  tanggal: string;
  lokasi: string;
  deskripsi: string;
  deskripsiLengkap: string;
  foto: string;
}

export const kegiatan: IKegiatan[] = [
  {
    id: 1,
    judul: "Ibadah Paskah 2025",
    kategori: "Ibadah",
    tanggal: "20 April 2025",
    lokasi: "Taman Gereja",
    deskripsi: "Ibadah padang memperingati kebangkitan Kristus bersama seluruh jemaat.",
    deskripsiLengkap: `Ibadah Paskah 2025 merupakan momen yang sangat istimewa bagi seluruh jemaat GKY Balikpapan. Bertempat di taman gereja yang asri, seluruh jemaat berkumpul untuk merayakan kebangkitan Tuhan Yesus Kristus dengan penuh sukacita.

Perayaan dimulai dengan prosesi Jalan Salib yang dipimpin oleh para pendeta, dilanjutkan dengan ibadah bersama yang penuh pujian dan penyembahan. Khotbah Paskah disampaikan oleh Pdt. Yohanes Susilo dengan tema "Hidup Baru dalam Kebangkitan Kristus".

Seluruh jemaat dari berbagai komisi turut berpartisipasi, termasuk paduan suara, tim worship, dan kelompok remaja yang menampilkan drama musikal tentang kisah kebangkitan. Kegiatan ditutup dengan jamuan kasih bersama yang mempererat persekutuan jemaat.`,
    foto: "https://placehold.co/800x500/1a3a6b/ffffff?text=Ibadah+Paskah+2025",
  },
  {
    id: 2,
    judul: "Bakti Sosial Maret 2025",
    kategori: "Pelayanan Sosial",
    tanggal: "15 Maret 2025",
    lokasi: "Panti Asuhan Kasih Mulia, Balikpapan",
    deskripsi: "Kunjungan dan pemberian bantuan kepada anak-anak yatim piatu di panti asuhan.",
    deskripsiLengkap: `Dalam semangat kasih dan kepedulian, GKY Balikpapan mengadakan kegiatan Bakti Sosial ke Panti Asuhan Kasih Mulia pada bulan Maret 2025. Kegiatan ini melibatkan lebih dari 60 relawan dari berbagai komisi jemaat.

Tim bakti sosial membawa berbagai bantuan berupa perlengkapan sekolah, sembako, pakaian layak pakai, serta sumbangan dana untuk kebutuhan operasional panti. Selain memberikan bantuan materi, tim juga mengadakan sesi hiburan dan bermain bersama anak-anak panti.

Kegiatan ini merupakan bagian dari program pelayanan sosial bulanan GKY Balikpapan yang bertujuan mewujudkan iman melalui tindakan nyata. Antusias jemaat yang luar biasa membuktikan bahwa gereja bukan hanya hadir untuk dirinya sendiri, tetapi juga untuk masyarakat sekitar.`,
    foto: "https://placehold.co/800x500/b5420a/ffffff?text=Bakti+Sosial+2025",
  },
  {
    id: 3,
    judul: "Retreat Remaja 2025",
    kategori: "Persekutuan",
    tanggal: "2–4 Mei 2025",
    lokasi: "Wisma Bukit Kasih, Samarinda",
    deskripsi: "Retreat dua malam untuk pemuda remaja guna memperdalam iman dan persekutuan.",
    deskripsiLengkap: `Retreat Remaja 2025 merupakan agenda tahunan yang sangat ditunggu-tunggu oleh generasi muda GKY Balikpapan. Selama tiga hari dua malam di Wisma Bukit Kasih Samarinda, sekitar 45 remaja dan pemuda mengikuti serangkaian sesi pendalaman iman dan pembangunan karakter.

Tema retreat tahun ini adalah "Generasi yang Bernyala" — sebuah seruan bagi kaum muda untuk hidup penuh semangat dan tujuan di dalam Tuhan. Sesi retreat dipimpin oleh pembicara tamu dari Jakarta yang membawakan materi seputar identitas Kristen, vokasi, dan kepemimpinan pelayan.

Di luar sesi formal, para peserta menikmati berbagai aktivitas outdoor, sesi games, dan kelompok kecil yang memperkuat ikatan persaudaraan. Retreat ini menghasilkan komitmen nyata dari para peserta untuk terlibat lebih aktif dalam pelayanan jemaat.`,
    foto: "https://placehold.co/800x500/2d6a4f/ffffff?text=Retreat+Remaja+2025",
  },
  {
    id: 4,
    judul: "Pendalaman Alkitab: Injil Yohanes",
    kategori: "Pendidikan",
    tanggal: "Setiap Rabu, mulai 5 Maret 2025",
    lokasi: "Ruang Pertemuan Gereja",
    deskripsi: "Seri pendalaman Alkitab kitab Injil Yohanes setiap Rabu malam.",
    deskripsiLengkap: `Seri Pendalaman Alkitab Injil Yohanes hadir sebagai program pendidikan rohani rutin GKY Balikpapan yang berlangsung setiap Rabu malam. Program ini dipimpin langsung oleh Pdt. Maria Andini dan terbuka untuk seluruh jemaat dari berbagai kelompok usia.

Setiap pertemuan berlangsung selama 90 menit, mencakup presentasi eksposisi teks, diskusi kelompok, serta waktu refleksi dan doa. Metode belajar interaktif yang diterapkan membantu jemaat tidak hanya memahami makna teks secara intelektual, tetapi juga menerapkannya dalam kehidupan sehari-hari.

Hingga saat ini, program ini telah diikuti oleh rata-rata 35 jemaat setiap pekannya. Materi lengkap tersedia dalam bentuk handout yang dapat diunduh melalui papan pengumuman gereja, sehingga jemaat yang berhalangan hadir tetap dapat mengikuti perkembangannya.`,
    foto: "https://placehold.co/800x500/553c9a/ffffff?text=Pendalaman+Alkitab",
  },
  {
    id: 5,
    judul: "Perayaan Natal 2024",
    kategori: "Ibadah",
    tanggal: "25 Desember 2024",
    lokasi: "Gedung Utama GKY Balikpapan",
    deskripsi: "Perayaan Natal bersama seluruh jemaat dengan drama musikal dan kantata.",
    deskripsiLengkap: `Perayaan Natal 2024 menjadi salah satu momen paling berkesan dalam kalender jemaat GKY Balikpapan. Dengan tema "Terang yang Mengalahkan Kegelapan", seluruh jemaat berkumpul untuk merayakan kelahiran Sang Juruselamat dalam suasana yang hangat dan penuh sukacita.

Malam Natal diwarnai dengan penampilan cantata oleh Paduan Suara GKY Balikpapan yang membawakan karya-karya natal klasik dan kontemporer. Komisi remaja menampilkan drama musikal yang memukau tentang kisah kelahiran Yesus, diperankan oleh lebih dari 30 pemuda.

Ibadah yang dipimpin oleh Pdt. Yohanes Susilo ini menarik lebih dari 400 jemaat yang hadir, termasuk tamu dan keluarga dari luar kota. Seluruh rangkaian acara ditutup dengan nyala lilin bersama dan doa berkat memasuki tahun yang baru.`,
    foto: "https://placehold.co/800x500/1a3a6b/ffffff?text=Natal+2024",
  },
  {
    id: 6,
    judul: "HUT ke-40 GKY Balikpapan",
    kategori: "Persekutuan",
    tanggal: "10 Agustus 2025",
    lokasi: "Gedung Utama & Taman Gereja",
    deskripsi: "Perayaan 40 tahun GKY Balikpapan berdiri dan melayani kota Balikpapan.",
    deskripsiLengkap: `Tahun 2025 menjadi tahun yang sangat bermakna bagi GKY Balikpapan — tahun ke-40 berdiri dan melayani. Perayaan HUT ke-40 diselenggarakan selama satu hari penuh dengan rangkaian acara yang meriah dan bermakna.

Puncak perayaan dimulai dengan ibadah syukur yang dipimpin oleh Pdt. Yohanes Susilo, dihadiri oleh mantan-mantan pendeta dan majelis yang pernah melayani di jemaat ini. Perayaan dilanjutkan dengan pameran foto perjalanan gereja, pemutaran video sejarah 40 tahun, serta kesaksian dari jemaat senior.

Acara kemudian berlanjut ke Taman Gereja dengan pesta rakyat, bazar, dan pertunjukan seni dari berbagai komisi. Anak-anak, remaja, orang dewasa, dan lansia bersama-sama merayakan anugerah Tuhan yang telah menopang pelayanan gereja selama empat dekade. Momen ini diharapkan menjadi titik balik semangat baru bagi seluruh jemaat.`,
    foto: "https://placehold.co/800x500/c8982a/1a3a6b?text=HUT+ke-40",
  },
  {
    id: 7,
    judul: "Pelatihan Pelayan Ibadah",
    kategori: "Pendidikan",
    tanggal: "26 April 2025",
    lokasi: "Aula Remaja GKY Balikpapan",
    deskripsi: "Pelatihan intensif bagi anggota tim pelayan ibadah: worship, penyambut, dan pembaca.",
    deskripsiLengkap: `Dalam rangka meningkatkan kualitas pelayanan ibadah, GKY Balikpapan mengadakan Pelatihan Pelayan Ibadah yang diikuti oleh lebih dari 50 anggota tim pelayanan. Pelatihan ini mencakup tiga bidang utama: tim worship, tim penyambut jemaat, dan tim pembaca firman.

Sesi pelatihan dirancang secara praktis oleh tim majelis bidang ibadah, dengan mengundang instruktur vokal dan musik dari luar untuk memperkaya sesi tim worship. Sementara itu, tim penyambut mendapat materi tentang keramahan pelayanan, dan tim pembaca mendapat panduan tentang teknik membaca firman yang baik dan penuh penghayatan.

Pelatihan berlangsung dari pagi hingga sore hari dan diakhiri dengan sesi simulasi ibadah lengkap. Seluruh peserta menyambut kegiatan ini dengan antusias dan mengharapkan agar pelatihan serupa dapat diadakan secara rutin setiap tahun demi peningkatan mutu pelayanan yang berkelanjutan.`,
    foto: "https://placehold.co/800x500/553c9a/ffffff?text=Pelatihan+Pelayan",
  },
];

export const kategoriWarna: Record<KategoriKegiatan, { bg: string; text: string }> = {
  Ibadah: { bg: "bg-blue-100", text: "text-blue-800" },
  Persekutuan: { bg: "bg-green-100", text: "text-green-800" },
  "Pelayanan Sosial": { bg: "bg-orange-100", text: "text-orange-800" },
  Pendidikan: { bg: "bg-purple-100", text: "text-purple-800" },
};
