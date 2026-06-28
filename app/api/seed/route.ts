import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

// Only usable in development. Call once: GET /api/seed
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const payload = await getPayload({ config });

  // ── SiteSettings ──────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      namaGereja: "GKY Balikpapan",
      motto: "Bertumbuh dalam Iman, Melayani dalam Kasih",
      mottoHero: "Hadir Bagi Kota, Berbuah Bagi Bangsa",
      alamat:
        "Jl. Mayjend Sutoyo No. 1A RT. 44 Gn. Malang Balikpapan - Kalimantan Timur",
      telepon: "0821 5746 7134",
      email: "info@gkybalikpapan.org",
      instagram: "https://instagram.com/gky_balikpapan96",
      youtube: "https://youtube.com/@GKYBalikpapan",
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8490483696773!2d116.84377747502486!3d-1.2629689987249995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df146e22a57bac3%3A0xca36685924e06024!2sGKY%20Balikpapan!5e0!3m2!1sen!2sid!4v1777626744949!5m2!1sen!2sid",
    },
  });

  // ── JadwalIbadah ──────────────────────────────────────────────────────────
  // Hapus data lama dulu agar tidak duplikat
  const existing = await payload.find({ collection: "jadwal-ibadah", limit: 100 });
  for (const doc of existing.docs) {
    await payload.delete({ collection: "jadwal-ibadah", id: doc.id });
  }

  await payload.create({
    collection: "jadwal-ibadah",
    data: {
      nama: "Ibadah Umum",
      jadwalHari: [
        { hari: "Minggu", waktu: "08:00 WIB" },
        { hari: "Minggu", waktu: "10:30 WIB" },
      ],
      lokasi: "Gedung Utama",
      urutan: 1,
    },
  });

  await payload.create({
    collection: "jadwal-ibadah",
    data: {
      nama: "Ibadah Remaja",
      jadwalHari: [
        { hari: "Minggu", waktu: "10:30 WIB" },
      ],
      lokasi: "Aula Remaja",
      urutan: 2,
    },
  });

  await payload.create({
    collection: "jadwal-ibadah",
    data: {
      nama: "Ibadah Doa",
      jadwalHari: [
        { hari: "Rabu", waktu: "19:00 WIB" },
      ],
      lokasi: "Gedung Utama",
      urutan: 3,
    },
  });

  // ── TentangGereja ─────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: "tentang-gereja",
    data: {
      deskripsi:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      tahunBerdiri: 1985,
      jumlahJemaat: "±500 jiwa",
      denominasi: "Reformed Injili",
      visi: "Menjadi jemaat yang bertumbuh dalam iman, bersatu dalam kasih, dan menjangkau dunia bagi Kristus.",
      misi: [
        { poin: "Membangun persekutuan yang hidup melalui ibadah, doa, dan firman Tuhan" },
        { poin: "Mendewasakan setiap jemaat menjadi murid Kristus yang sejati" },
        { poin: "Melayani masyarakat dengan kasih tanpa memandang latar belakang" },
        { poin: "Bermitra dengan gereja-gereja lain dalam pekabaran Injil" },
        { poin: "Memberdayakan generasi muda untuk menjadi pemimpin masa depan" },
      ],
      sejarah: [
        {
          tahun: 1985,
          judul: "Pendirian Jemaat",
          deskripsi:
            "GKY Balikpapan berdiri sebagai kelompok ibadah kecil dengan 30 jiwa jemaat di kawasan Balikpapan Utara atas inisiatif beberapa keluarga Kristen yang rindu bergereja.",
        },
        {
          tahun: 1992,
          judul: "Gedung Gereja Pertama",
          deskripsi:
            "Pembangunan gedung gereja pertama dirampungkan dan diresmikan sebagai tempat ibadah tetap, menandai fase baru pertumbuhan jemaat yang semakin solid.",
        },
        {
          tahun: 2001,
          judul: "Renovasi & Perluasan",
          deskripsi:
            "Seiring pertumbuhan jemaat yang pesat, gedung gereja direnovasi dan diperluas untuk menampung lebih banyak warga dan mendukung berbagai kegiatan pelayanan.",
        },
        {
          tahun: 2010,
          judul: "Peluncuran Ibadah Remaja",
          deskripsi:
            "Ibadah khusus remaja diluncurkan sebagai wujud komitmen gereja dalam membina generasi muda Kristiani agar bertumbuh dalam iman dan karakter.",
        },
        {
          tahun: 2019,
          judul: "Gedung Serbaguna",
          deskripsi:
            "Peresmian aula serbaguna yang digunakan untuk ibadah, persekutuan kelompok, pelatihan, dan berbagai kegiatan pelayanan sosial kepada masyarakat.",
        },
        {
          tahun: 2025,
          judul: "Memasuki 40 Tahun Pelayanan",
          deskripsi:
            "GKY Balikpapan merayakan 40 tahun berdiri dengan semangat baru, memperbarui komitmen untuk terus melayani, bertumbuh, dan menjadi berkat bagi kota Balikpapan.",
        },
      ],
    },
  });

  // ── HeroSlide ─────────────────────────────────────────────────────────────
  const existingSlides = await payload.find({ collection: "hero-slide", limit: 100 });
  for (const doc of existingSlides.docs) {
    await payload.delete({ collection: "hero-slide", id: doc.id });
  }

  const heroSeedData = [
    { alt: "Interior gereja", urlEksternal: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80", urutan: 1 },
    { alt: "Alkitab dan doa", urlEksternal: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80", urutan: 2 },
    { alt: "Komunitas jemaat", urlEksternal: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80", urutan: 3 },
    { alt: "Ibadah bersama", urlEksternal: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80", urutan: 4 },
  ];

  for (const slide of heroSeedData) {
    await payload.create({ collection: "hero-slide", data: { ...slide, aktif: true } });
  }

  // ── Pengurus ──────────────────────────────────────────────────────────────
  const existingPengurus = await payload.find({ collection: "pengurus", limit: 200 });
  for (const doc of existingPengurus.docs) {
    await payload.delete({ collection: "pengurus", id: doc.id });
  }

  const pengurusData = [
    // Pelayan Firman
    { nama: "Pdt. Yohanes Susilo", jabatan: "Pendeta Jemaat", kategori: "Pelayan Firman", urlFoto: "https://placehold.co/300x300/1a3a6b/ffffff?text=YS", urutan: 1 },
    { nama: "Pdt. Maria Andini", jabatan: "Pendeta Muda", kategori: "Pelayan Firman", urlFoto: "https://placehold.co/300x300/1a3a6b/ffffff?text=MA", urutan: 2 },
    // Majelis Jemaat
    { nama: "Budi Santoso", jabatan: "Ketua Majelis", kategori: "Majelis Jemaat", urlFoto: "https://placehold.co/300x300/2c5282/ffffff?text=BS", urutan: 1 },
    { nama: "Sri Wahyuni", jabatan: "Wakil Ketua Majelis", kategori: "Majelis Jemaat", urlFoto: "https://placehold.co/300x300/2c5282/ffffff?text=SW", urutan: 2 },
    { nama: "Hendri Kurniawan", jabatan: "Sekretaris", kategori: "Majelis Jemaat", urlFoto: "https://placehold.co/300x300/2c5282/ffffff?text=HK", urutan: 3 },
    { nama: "Dewi Rahayu", jabatan: "Wakil Sekretaris", kategori: "Majelis Jemaat", urlFoto: "https://placehold.co/300x300/2c5282/ffffff?text=DR", urutan: 4 },
    { nama: "Anton Wijaya", jabatan: "Bendahara", kategori: "Majelis Jemaat", urlFoto: "https://placehold.co/300x300/2c5282/ffffff?text=AW", urutan: 5 },
    { nama: "Lisa Permata", jabatan: "Wakil Bendahara", kategori: "Majelis Jemaat", urlFoto: "https://placehold.co/300x300/2c5282/ffffff?text=LP", urutan: 6 },
    { nama: "Rudi Hartono", jabatan: "Penatua Bidang Ibadah", kategori: "Majelis Jemaat", urlFoto: "https://placehold.co/300x300/2c5282/ffffff?text=RH", urutan: 7 },
    { nama: "Yenny Kristanti", jabatan: "Penatua Bidang Pelayanan", kategori: "Majelis Jemaat", urlFoto: "https://placehold.co/300x300/2c5282/ffffff?text=YK", urutan: 8 },
    // Karyawan Gereja
    { nama: "Daniel Saputra", jabatan: "Kepala Tata Usaha", kategori: "Karyawan Gereja", urlFoto: "https://placehold.co/300x300/4a5568/ffffff?text=DS", urutan: 1 },
    { nama: "Putri Sari", jabatan: "Staf Administrasi", kategori: "Karyawan Gereja", urlFoto: "https://placehold.co/300x300/4a5568/ffffff?text=PS", urutan: 2 },
    { nama: "Agus Setiawan", jabatan: "Teknisi & Sound System", kategori: "Karyawan Gereja", urlFoto: "https://placehold.co/300x300/4a5568/ffffff?text=AS", urutan: 3 },
  ] as const;

  for (const data of pengurusData) {
    await payload.create({ collection: "pengurus", data });
  }

  // ── Kegiatan ──────────────────────────────────────────────────────────────
  const existingKegiatan = await payload.find({ collection: "kegiatan", limit: 200 });
  for (const doc of existingKegiatan.docs) {
    await payload.delete({ collection: "kegiatan", id: doc.id });
  }

  const kegiatanData = [
    {
      judul: "Ibadah Paskah 2025",
      slug: "ibadah-paskah-2025",
      kategori: "Ibadah",
      tanggal: "20 April 2025",
      lokasi: "Taman Gereja",
      deskripsi: "Ibadah padang memperingati kebangkitan Kristus bersama seluruh jemaat.",
      deskripsiLengkap: "Ibadah Paskah 2025 merupakan momen yang sangat istimewa bagi seluruh jemaat GKY Balikpapan. Bertempat di taman gereja yang asri, seluruh jemaat berkumpul untuk merayakan kebangkitan Tuhan Yesus Kristus dengan penuh sukacita.\n\nPerayaan dimulai dengan prosesi Jalan Salib yang dipimpin oleh para pendeta, dilanjutkan dengan ibadah bersama yang penuh pujian dan penyembahan. Khotbah Paskah disampaikan oleh Pdt. Yohanes Susilo dengan tema \"Hidup Baru dalam Kebangkitan Kristus\".\n\nSeluruh jemaat dari berbagai komisi turut berpartisipasi, termasuk paduan suara, tim worship, dan kelompok remaja yang menampilkan drama musikal tentang kisah kebangkitan. Kegiatan ditutup dengan jamuan kasih bersama yang mempererat persekutuan jemaat.",
      urlFoto: "https://placehold.co/800x500/1a3a6b/ffffff?text=Ibadah+Paskah+2025",
    },
    {
      judul: "Bakti Sosial Maret 2025",
      slug: "bakti-sosial-maret-2025",
      kategori: "Pelayanan Sosial",
      tanggal: "15 Maret 2025",
      lokasi: "Panti Asuhan Kasih Mulia, Balikpapan",
      deskripsi: "Kunjungan dan pemberian bantuan kepada anak-anak yatim piatu di panti asuhan.",
      deskripsiLengkap: "Dalam semangat kasih dan kepedulian, GKY Balikpapan mengadakan kegiatan Bakti Sosial ke Panti Asuhan Kasih Mulia pada bulan Maret 2025. Kegiatan ini melibatkan lebih dari 60 relawan dari berbagai komisi jemaat.\n\nTim bakti sosial membawa berbagai bantuan berupa perlengkapan sekolah, sembako, pakaian layak pakai, serta sumbangan dana untuk kebutuhan operasional panti. Selain memberikan bantuan materi, tim juga mengadakan sesi hiburan dan bermain bersama anak-anak panti.\n\nKegiatan ini merupakan bagian dari program pelayanan sosial bulanan GKY Balikpapan yang bertujuan mewujudkan iman melalui tindakan nyata.",
      urlFoto: "https://placehold.co/800x500/b5420a/ffffff?text=Bakti+Sosial+2025",
    },
    {
      judul: "Retreat Remaja 2025",
      slug: "retreat-remaja-2025",
      kategori: "Persekutuan",
      tanggal: "2–4 Mei 2025",
      lokasi: "Wisma Bukit Kasih, Samarinda",
      deskripsi: "Retreat dua malam untuk pemuda remaja guna memperdalam iman dan persekutuan.",
      deskripsiLengkap: "Retreat Remaja 2025 merupakan agenda tahunan yang sangat ditunggu-tunggu oleh generasi muda GKY Balikpapan. Selama tiga hari dua malam di Wisma Bukit Kasih Samarinda, sekitar 45 remaja dan pemuda mengikuti serangkaian sesi pendalaman iman dan pembangunan karakter.\n\nTema retreat tahun ini adalah \"Generasi yang Bernyala\" — sebuah seruan bagi kaum muda untuk hidup penuh semangat dan tujuan di dalam Tuhan. Sesi retreat dipimpin oleh pembicara tamu dari Jakarta yang membawakan materi seputar identitas Kristen, vokasi, dan kepemimpinan pelayan.\n\nDi luar sesi formal, para peserta menikmati berbagai aktivitas outdoor, sesi games, dan kelompok kecil yang memperkuat ikatan persaudaraan.",
      urlFoto: "https://placehold.co/800x500/2d6a4f/ffffff?text=Retreat+Remaja+2025",
    },
    {
      judul: "Pendalaman Alkitab: Injil Yohanes",
      slug: "pendalaman-alkitab-injil-yohanes",
      kategori: "Pendidikan",
      tanggal: "Setiap Rabu, mulai 5 Maret 2025",
      lokasi: "Ruang Pertemuan Gereja",
      deskripsi: "Seri pendalaman Alkitab kitab Injil Yohanes setiap Rabu malam.",
      deskripsiLengkap: "Seri Pendalaman Alkitab Injil Yohanes hadir sebagai program pendidikan rohani rutin GKY Balikpapan yang berlangsung setiap Rabu malam. Program ini dipimpin langsung oleh Pdt. Maria Andini dan terbuka untuk seluruh jemaat dari berbagai kelompok usia.\n\nSetiap pertemuan berlangsung selama 90 menit, mencakup presentasi eksposisi teks, diskusi kelompok, serta waktu refleksi dan doa. Metode belajar interaktif yang diterapkan membantu jemaat tidak hanya memahami makna teks secara intelektual, tetapi juga menerapkannya dalam kehidupan sehari-hari.\n\nHingga saat ini, program ini telah diikuti oleh rata-rata 35 jemaat setiap pekannya.",
      urlFoto: "https://placehold.co/800x500/553c9a/ffffff?text=Pendalaman+Alkitab",
    },
    {
      judul: "Perayaan Natal 2024",
      slug: "perayaan-natal-2024",
      kategori: "Ibadah",
      tanggal: "25 Desember 2024",
      lokasi: "Gedung Utama GKY Balikpapan",
      deskripsi: "Perayaan Natal bersama seluruh jemaat dengan drama musikal dan kantata.",
      deskripsiLengkap: "Perayaan Natal 2024 menjadi salah satu momen paling berkesan dalam kalender jemaat GKY Balikpapan. Dengan tema \"Terang yang Mengalahkan Kegelapan\", seluruh jemaat berkumpul untuk merayakan kelahiran Sang Juruselamat dalam suasana yang hangat dan penuh sukacita.\n\nMalam Natal diwarnai dengan penampilan cantata oleh Paduan Suara GKY Balikpapan yang membawakan karya-karya natal klasik dan kontemporer. Komisi remaja menampilkan drama musikal yang memukau tentang kisah kelahiran Yesus, diperankan oleh lebih dari 30 pemuda.\n\nIbadah yang dipimpin oleh Pdt. Yohanes Susilo ini menarik lebih dari 400 jemaat yang hadir, termasuk tamu dan keluarga dari luar kota.",
      urlFoto: "https://placehold.co/800x500/1a3a6b/ffffff?text=Natal+2024",
    },
    {
      judul: "HUT ke-40 GKY Balikpapan",
      slug: "hut-ke-40-gky-balikpapan",
      kategori: "Persekutuan",
      tanggal: "10 Agustus 2025",
      lokasi: "Gedung Utama & Taman Gereja",
      deskripsi: "Perayaan 40 tahun GKY Balikpapan berdiri dan melayani kota Balikpapan.",
      deskripsiLengkap: "Tahun 2025 menjadi tahun yang sangat bermakna bagi GKY Balikpapan — tahun ke-40 berdiri dan melayani. Perayaan HUT ke-40 diselenggarakan selama satu hari penuh dengan rangkaian acara yang meriah dan bermakna.\n\nPuncak perayaan dimulai dengan ibadah syukur yang dipimpin oleh Pdt. Yohanes Susilo, dihadiri oleh mantan-mantan pendeta dan majelis yang pernah melayani di jemaat ini. Perayaan dilanjutkan dengan pameran foto perjalanan gereja, pemutaran video sejarah 40 tahun, serta kesaksian dari jemaat senior.\n\nAcara kemudian berlanjut ke Taman Gereja dengan pesta rakyat, bazar, dan pertunjukan seni dari berbagai komisi.",
      urlFoto: "https://placehold.co/800x500/c8982a/1a3a6b?text=HUT+ke-40",
    },
    {
      judul: "Pelatihan Pelayan Ibadah",
      slug: "pelatihan-pelayan-ibadah",
      kategori: "Pendidikan",
      tanggal: "26 April 2025",
      lokasi: "Aula Remaja GKY Balikpapan",
      deskripsi: "Pelatihan intensif bagi anggota tim pelayan ibadah: worship, penyambut, dan pembaca.",
      deskripsiLengkap: "Dalam rangka meningkatkan kualitas pelayanan ibadah, GKY Balikpapan mengadakan Pelatihan Pelayan Ibadah yang diikuti oleh lebih dari 50 anggota tim pelayanan. Pelatihan ini mencakup tiga bidang utama: tim worship, tim penyambut jemaat, dan tim pembaca firman.\n\nSesi pelatihan dirancang secara praktis oleh tim majelis bidang ibadah, dengan mengundang instruktur vokal dan musik dari luar untuk memperkaya sesi tim worship. Sementara itu, tim penyambut mendapat materi tentang keramahan pelayanan, dan tim pembaca mendapat panduan tentang teknik membaca firman yang baik dan penuh penghayatan.\n\nPelatihan berlangsung dari pagi hingga sore hari dan diakhiri dengan sesi simulasi ibadah lengkap.",
      urlFoto: "https://placehold.co/800x500/553c9a/ffffff?text=Pelatihan+Pelayan",
    },
  ] as const;

  for (const data of kegiatanData) {
    await payload.create({ collection: "kegiatan", data });
  }

  // ── Galeri ────────────────────────────────────────────────────────────────
  const existingGaleri = await payload.find({ collection: "galeri", limit: 200 });
  for (const doc of existingGaleri.docs) {
    await payload.delete({ collection: "galeri", id: doc.id });
  }

  const galeriData = [
    { keterangan: "Ibadah Natal 2024", kategori: "Ibadah", urlFoto: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80", urutan: 1 },
    { keterangan: "Ibadah Paskah 2025", kategori: "Ibadah", urlFoto: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80", urutan: 2 },
    { keterangan: "Ibadah Umum Minggu", kategori: "Ibadah", urlFoto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80", urutan: 3 },
    { keterangan: "Ibadah Doa Rabu Malam", kategori: "Ibadah", urlFoto: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", urutan: 4 },
    { keterangan: "Perayaan HUT ke-40 GKY Balikpapan", kategori: "Ibadah", urlFoto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", urutan: 5 },
    { keterangan: "Bakti Sosial Maret 2025", kategori: "Kegiatan", urlFoto: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80", urutan: 6 },
    { keterangan: "Retreat Remaja Mei 2025", kategori: "Kegiatan", urlFoto: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80", urutan: 7 },
    { keterangan: "Pelatihan Pelayan Ibadah April 2025", kategori: "Kegiatan", urlFoto: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80", urutan: 8 },
    { keterangan: "Pendalaman Alkitab Injil Yohanes", kategori: "Kegiatan", urlFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", urutan: 9 },
    { keterangan: "Gathering Keluarga Jemaat", kategori: "Persekutuan", urlFoto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", urutan: 10 },
    { keterangan: "Makan Bersama Usai Ibadah", kategori: "Persekutuan", urlFoto: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80", urutan: 11 },
    { keterangan: "Arisan Rohani Komisi Ibu", kategori: "Persekutuan", urlFoto: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80", urutan: 12 },
    { keterangan: "Gedung Gereja Tampak Depan", kategori: "Bangunan", urlFoto: "https://images.unsplash.com/photo-1548625361-58a9b86aa83b?w=800&q=80", urutan: 13 },
    { keterangan: "Interior Aula Utama", kategori: "Bangunan", urlFoto: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", urutan: 14 },
    { keterangan: "Taman Gereja", kategori: "Bangunan", urlFoto: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", urutan: 15 },
  ] as const;

  for (const data of galeriData) {
    await payload.create({ collection: "galeri", data });
  }

  // ── VideoKhotbah ──────────────────────────────────────────────────────────
  const existingVideo = await payload.find({ collection: "video-khotbah", limit: 100 });
  for (const doc of existingVideo.docs) {
    await payload.delete({ collection: "video-khotbah", id: doc.id });
  }

  const videoData = [
    {
      judul: "Hidup dalam Pengharapan",
      pembicara: "Pdt. Yohanes Susilo",
      tanggal: "20 April 2025",
      youtubeId: "dQw4w9WgXcQ",
      deskripsi: "Pengharapan bukan sekadar optimisme, melainkan keyakinan yang berakar pada janji-janji Allah yang tidak pernah gagal.",
      status: "published",
    },
    {
      judul: "Kasih yang Tak Berkesudahan",
      pembicara: "Pdt. Maria Andini",
      tanggal: "13 April 2025",
      youtubeId: "LXb3EKWsInQ",
      deskripsi: "Merenungkan kasih Allah yang sempurna sebagaimana terungkap dalam Yohanes 3:16 dan dampaknya bagi kehidupan sehari-hari.",
      status: "published",
    },
    {
      judul: "Iman yang Bertumbuh",
      pembicara: "Pdt. Yohanes Susilo",
      tanggal: "6 April 2025",
      youtubeId: "JGwWNGJdvx8",
      deskripsi: "Iman bukan sesuatu yang statis — iman bertumbuh melalui pengalaman, pergumulan, dan perjumpaan kita dengan Allah.",
      status: "published",
    },
    {
      judul: "Kekuatan dalam Kelemahan",
      pembicara: "Pdt. Maria Andini",
      tanggal: "30 Maret 2025",
      youtubeId: "oHg5SJYRHA0",
      deskripsi: "Berdasarkan 2 Korintus 12:9 — ketika kita merasa lemah, di situlah kuasa Kristus menjadi sempurna dalam diri kita.",
      status: "published",
    },
    {
      judul: "Berjalan dengan Tuhan di Lembah Kekelaman",
      pembicara: "Pdt. Yohanes Susilo",
      tanggal: "23 Maret 2025",
      youtubeId: "Y61kGpPMeGk",
      deskripsi: "Mazmur 23 mengajarkan bahwa Allah menyertai kita bahkan di saat-saat paling gelap dalam hidup kita.",
      status: "published",
    },
    {
      judul: "Berkat di Tengah Badai",
      pembicara: "Pdt. Maria Andini",
      tanggal: "16 Maret 2025",
      youtubeId: "9bZkp7q19f0",
      deskripsi: "Kisah Paulus dalam badai di Kisah Para Rasul 27 mengajarkan kita untuk tetap percaya pada penyertaan Allah.",
      status: "published",
    },
    {
      judul: "Pelayanan sebagai Panggilan Hidup",
      pembicara: "Pdt. Yohanes Susilo",
      tanggal: "9 Maret 2025",
      youtubeId: "M7lc1UVf-VE",
      deskripsi: "Setiap orang percaya dipanggil untuk melayani — bukan karena kewajiban, tetapi karena kasih yang kita terima dari Tuhan.",
      status: "published",
    },
    {
      judul: "Damai Sejahtera Kristus",
      pembicara: "Pdt. Maria Andini",
      tanggal: "2 Maret 2025",
      youtubeId: "3JZ_D3ELwOQ",
      deskripsi: "Filipi 4:7 — damai sejahtera Allah yang melampaui segala akal budi akan menjaga hati dan pikiranmu.",
      status: "published",
    },
  ] as const;

  for (const data of videoData) {
    await payload.create({ collection: "video-khotbah", data });
  }

  // ── FAQ ───────────────────────────────────────────────────────────────────
  const existingFaq = await payload.find({ collection: "faq", limit: 100 });
  for (const doc of existingFaq.docs) {
    await payload.delete({ collection: "faq", id: doc.id });
  }

  const faqData = [
    {
      pertanyaan: "Jam berapa ibadah minggu dimulai?",
      jawaban: "Ibadah Umum dimulai pukul 08:00 WIB dan Ibadah Remaja pukul 10:30 WIB setiap hari Minggu.",
      kategori: "ibadah",
      urutan: 1,
    },
    {
      pertanyaan: "Apakah ada ibadah selain hari Minggu?",
      jawaban: "Ya, setiap Rabu malam pukul 19:00 WIB ada Ibadah Doa bersama di Gedung Utama.",
      kategori: "ibadah",
      urutan: 2,
    },
    {
      pertanyaan: "Bagaimana cara mendaftarkan baptis?",
      jawaban: "Pendaftaran baptis dapat dilakukan dengan menghubungi sekretariat gereja melalui telepon atau email yang tertera di halaman Kontak.",
      kategori: "pelayanan",
      urutan: 3,
    },
    {
      pertanyaan: "Apakah gereja menyediakan kelas anak?",
      jawaban: "Ya, tersedia Sekolah Minggu untuk anak-anak yang berlangsung bersamaan dengan Ibadah Umum setiap hari Minggu.",
      kategori: "umum",
      urutan: 4,
    },
    {
      pertanyaan: "Bagaimana cara bergabung dengan tim pelayanan?",
      jawaban: "Silakan hubungi koordinator pelayanan melalui kontak gereja atau langsung temui pengurus setelah ibadah.",
      kategori: "pelayanan",
      urutan: 5,
    },
    {
      pertanyaan: "Apakah ada parkir di gereja?",
      jawaban: "Ya, tersedia area parkir di sekitar gedung gereja untuk kendaraan roda dua dan roda empat.",
      kategori: "umum",
      urutan: 6,
    },
  ] as const;

  for (const data of faqData) {
    await payload.create({ collection: "faq", data });
  }

  return NextResponse.json({ ok: true, message: "Seed berhasil." });
}
