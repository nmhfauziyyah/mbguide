# 🍱 MBGuide (Monitoring & Barcode Guide)

> **Prototipe Interaktif High-Fidelity & Sistem Pengawasan Digital Terintegrasi untuk Program Makan Bergizi Gratis (MBG)**

## 🌟 Latar Belakang & Konteks Penelitian (KTI)

Proyek **MBGuide** dirancang sebagai proposal rancang bangun software sekaligus **prototipe interaktif** untuk mendukung **Karya Tulis Ilmiah (KTI)** dengan detail kegiatan berikut:

- **Tema Kegiatan:** *AGROSPHERE: Growing Innovation for Sustainable Global Transformation* (Menumbuhkan Inovasi untuk Transformasi Global yang Berkelanjutan).
- **Tema KTI:** *Mengaktualisasikan Peran Gen-Z melalui Implementasi Inovasi Transformatif sebagai Langkah Strategis Menuju Tujuan Pembangunan Berkelanjutan (SDGs) Global 2030*.
- **SDGs Target:** **SDG 2 (Zero Hunger / Tanpa Kelaparan)** & **SDG 3 (Good Health and Well-being / Kehidupan Sehat dan Sejahtera)** dengan menjamin standar kelayakan gizi dan keamanan pangan bagi anak-anak sekolah penerima manfaat program Makan Bergizi Gratis (MBG) di Indonesia.

---

## 🚀 4 Pilar Inovasi Utama (Core Features)

MBGuide menghadirkan solusi pengawasan terpadu dari hulu ke hilir untuk memitigasi risiko keamanan pangan, keracunan makanan, manipulasi gizi, dan operasional dapur ilegal melalui 4 teknologi utama:

1. **AI-Powered Nutrition Scanning**  
   Mengintegrasikan teknologi *Computer Vision* (seperti YOLO/CNN) untuk memindai piring makanan secara visual. Sistem AI dapat mengenali komponen makanan (nasi, lauk pauk, sayur) serta mengecek standar kelayakan porsi dan kalori real-time sesuai pedoman Kementerian Kesehatan.
   
2. **IoT-Enabled Food Box Auditing & Kitchen Hygiene**  
   Sensor IoT tersemat di dapur resmi serta kotak pengiriman untuk memantau suhu ruangan, kelembaban, serta mendeteksi gas amonia/VOC (sebagai indikasi awal makanan basi/rusak selama distribusi).
   
3. **Geofencing GPS Verification**  
   Membatasi akses pengiriman dan validasi dapur. Sistem hanya memproses data dari koordinat GPS dapur resmi yang telah terdaftar (*Whitelist*), guna menghindari suplai makanan dari dapur ilegal/tidak higienis.
   
4. **Digital Barcode Passport (QR Code)**  
   Setiap batch makanan dilengkapi kode QR unik yang berfungsi sebagai "Paspor Transparansi". Ketika dipindai oleh penerima manfaat, ia menyajikan data asal bahan baku, waktu masak, kelayakan gizi AI, status sensor IoT, hingga log rantai pasok.

---

## 👥 4 Alur Pengguna (User Flows)

Aplikasi MBGuide dirancang dengan membedakan 4 peran aktor utama secara real-time:

### 👨‍🍳 1. Pengelola Dapur (Kitchen Flow)
- Menginput data menu harian dan takaran gizi (gramasi karbohidrat, protein, sayuran).
- Melakukan verifikasi *Geofencing* lokasi dapur sebelum memulai operasional.
- Memantau indikator sensor suhu dan kelembapan dapur secara langsung.
- Melakukan *Generate QR Code (Digital Barcode Passport)* untuk setiap batch produksi.

### 🚚 2. Distributor / Kurir (Distributor Flow)
- Melihat jadwal pengiriman aktif dan rute navigasi menuju sekolah penerima manfaat.
- Melacak suhu boks penyimpanan makanan secara real-time menggunakan simulasi telemetri IoT.
- Mengirimkan update status perjalanan (Keberangkatan, Transit, Tiba).
- Melakukan konfirmasi serah terima makanan dengan tanda tangan digital.

### 🏢 3. Admin Pemerintah (Admin Flow - BGN & Dinas Kesehatan)
- Dashboard pemantauan terpadu seluruh kota (Dapur aktif, total porsi, persentase kelayakan AI).
- Peta persebaran dapur resmi dan pelacakan GPS distributor aktif.
- Menampilkan grafik kualitas udara/suhu dari sensor IoT dapur secara agregasi.
- Menampung laporan pengaduan masyarakat jika ada indikasi makanan yang tidak layak.

### 🎒 4. Penerima Manfaat (Beneficiary Flow - Siswa, Guru, Orang Tua)
- Memindai QR Code pada kotak makanan untuk mengakses detail paspor gizi.
- Melihat kalkulator kalori dan zat gizi makro (Karbohidrat, Protein, Lemak) yang dikonsumsi hari ini.
- Membaca audit kebersihan dari dapur pembuatnya secara transparan.
- Memberikan ulasan/feedback berupa rating bintang 1–5 serta komentar langsung ke sistem.

---

## 🛠️ Spesifikasi Teknologi (Tech Stack)

Aplikasi prototipe ini dibangun menggunakan arsitektur modern berkinerja tinggi:

- **Library Utama:** [React 19](https://react.dev/) & [Vite 8](https://vite.dev/) (dengan Fast HMR).
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/) untuk kode yang aman dan minim bug (*type-safe*).
- **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/) dengan plugin compiler baru `@tailwindcss/vite` untuk kecepatan build instan.
- **Animasi:** [Framer Motion 12](https://www.framer.com/motion/) untuk transisi perpindahan layar iOS yang mulus.
- **Ikon:** [Lucide React](https://lucide.dev/) untuk koleksi ikon SVG berkualitas tinggi.
- **Sistem Desain (Branding Palette):**
  - **Navy (`#071E49`):** Merepresentasikan profesionalisme, keamanan data, dan integrasi pemerintah.
  - **Green (`#92D05D`):** Merepresentasikan makanan segar, higienitas, kesehatan, dan SDGs.
  - **Blue (`#B5E0EA`):** Warna pendukung yang tenang, melambangkan kebersihan & teknologi IoT.
  - **Gold (`#D1B06C`):** Warna aksen untuk highlight gizi unggul, prestasi, dan kualitas premium.

---

## 📁 Struktur Folder Proyek

```bash
mbguide/
├── public/                  # Aset statis & logo
├── src/
│   ├── assets/              # Gambar dan grafis penunjang
│   ├── components/          # Komponen UI Reusable
│   │   ├── AIResultCard.tsx     # Kartu hasil analisis AI gizi
│   │   ├── BottomNavigation.tsx # Navigasi bawah perangkat mobile
│   │   ├── GlassCard.tsx        # Efek Glassmorphism premium
│   │   ├── MapCard.tsx          # Peta navigasi kurir & geofencing
│   │   ├── SensorCard.tsx       # Monitor data IoT (suhu/gas)
│   │   ├── StatisticCard.tsx    # Dashboard statistik admin
│   │   ├── StatusBadge.tsx      # Label status operasional
│   │   ├── Timeline.tsx         # Pelacakan status pengiriman
│   │   └── TopAppBar.tsx        # Header atas aplikasi
│   ├── screens/             # Modul alur per-aktor (Screens)
│   │   ├── SplashScreen.tsx     # Layar pembuka / perkenalan
│   │   ├── RoleSelection.tsx    # Layar pilih akses aktor
│   │   ├── LoginScreen.tsx      # Autentikasi simulasi
│   │   ├── KitchenFlow.tsx      # Panel Dapur MBG
│   │   ├── DistributorFlow.tsx  # Panel Kurir MBG
│   │   ├── AdminFlow.tsx        # Panel Dinas & Admin Pemerintah
│   │   └── BeneficiaryFlow.tsx  # Panel Siswa & Orang Tua (Scan QR)
│   ├── App.tsx              # Pusat state, rute, dan panel simulasi presentasi
│   ├── index.css            # Konfigurasi Tailwind v4 & gaya custom (Mesh gradient)
│   └── main.tsx             # Entrypoint React
├── vite.config.ts           # Konfigurasi bundler Vite
├── package.json             # Manajer modul Node.js
└── README.md                # Dokumentasi proyek (Dokumen ini)
```

---

## ⚡ Cara Menjalankan Secara Lokal

Pastikan Anda telah memasang [Node.js](https://nodejs.org/) di perangkat Anda.

1. **Kloning repositori:**
   ```bash
   git clone https://github.com/nmhfauziyyah/mbguide.git
   cd mbguide
   ```

2. **Pasang dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Dev Server):**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara lokal di alamat yang tertera pada konsol Anda (biasanya `http://localhost:5173/mbguide/` atau `http://localhost:5174/mbguide/`).

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```
   Hasil build siap saji akan diletakkan di dalam direktori `dist/`.

---

## 🌐 Deployment (GitHub Pages)

Proyek ini telah dikonfigurasi untuk dideploy langsung ke **GitHub Pages** menggunakan pustaka `gh-pages`.

Untuk mempublikasikan versi terbaru aplikasi:
```bash
npm run deploy
```
Pastikan pengaturan `base` pada `vite.config.ts` sudah disesuaikan dengan nama sub-folder repositori Anda (default: `/mbguide/`).

---
