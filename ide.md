A. Tema Kegiatan

AGROSPHERE: Growing Innovation for Sustainable Global Transformation. (AGROSPHERE: Menumbuhkan Inovasi untuk Transformasi Global yang Berkelanjutan).

## B. Tema Karya Tulis Ilmiah

Mengaktualisasikan Peran Gen-Z melalui Implementasi Inovasi Transformatif sebagai Langkah Strategis Menuju Tujuan Pembangunan Berkelanjutan (SDGs) Global 2030

## Ide I

Lingkungan

- a. Inovasi dalam pengelolaan dan pemanfaatan limbah, baik organik maupun anorganik, yang bertujuan untuk mengurangi dampak lingkungan dan meningkatkan keberlanjutan.

Inovasi: Aplikasi untuk mendeteksi sampah supaya sesuai dengan tempatnya

## Ide 2

- b. Pengembangan teknologi pascapanen yang berkelanjutan dan inovasi pengolahan pangan untuk meningkatkan kualitas pangan, mengurangi kerugian (losses), dan menjamin keamanan pangan

- c. Penerapan Kecerdasan Buatan (AI), Internet of Things (IoT), dan sistem ketertelusuran digital untuk memperkuat jaminan keamanan pangan dari ladang hingga meja makan guna mendukung SDGs

- 1. Solusi Masalah Keracunan & Kelayakan Gizi (Pelatihan Model AI)

Untuk fitur Scan Nilai Gizi & Kelayakan Makanan, kamu bisa menggunakan teknologi Computer Vision (salah satu cabang AI). Cara melatih model AI-nya adalah sebagai berikut:

- Dataset Gambar Makanan: AI dilatih menggunakan ribuan foto porsi makanan MBG. Tim kamu bisa mensimulasikan dataset berupa foto makanan yang "Layak & Seimbang" vs makanan yang "Tidak Layak" (misal: porsi sayur terlalu sedikit, nasi terlalu banyak, atau makanan yang terlihat layu/basi).

- Algoritma Object Detection & Kategori: Menggunakan arsitektur seperti YOLO (You Only Look Once) atau CNN (Convolutional Neural Network). AI akan mendeteksi objek di piring: "Oh, ada nasi (estimasi gizi: X kalori), ada ayam (X protein), ada sayur sawi (X vitamin)."

- Pelatihan Prediksi Kelayakan (Classification): AI dicocokkan dengan standar gizi resmi dari Kemenkes/Dinas Kesehatan untuk anak sekolah. Jika hasil scan kamera menunjukkan porsi gizi di bawah standar atau ada indikasi visual makanan rusak (berubah warna ekstrem), AI akan melabelinya: "TIDAK LAYAK".

- 2. Mengatasi Dapur MBG Ilegal (Sistem Terpadu & Geofencing GPS) Ini poin yang sangat kuat! Kamu menggabungkan Digital Traceability dengan keamanan wilayah.

- Integrasi Whitelist Distributor: Aplikasi hanya menerima bahan baku dari distributor resmi yang sudah terverifikasi pemerintah (tercatat di database sistem). Dapur MBG wajib memindai nota digital atau QR code bahan baku saat barang datang.

## Keamanan Pangan


- Verifikasi GPS Terbimbing (Geofencing): Setiap dapur MBG resmi akan didaftarkan titik koordinatnya (garis bujur dan lintang). Saat mereka mau menyetor/mengirim makanan dan mengaktifkan fitur scan di aplikasi, sistem akan mengecek: "Apakah koordinat GPS HP/perangkat saat ini sama dengan koordinat Dapur Resmi yang terdaftar?"

- Penolakan Akses Sistem: Jika ada dapur liar yang mencoba memakai akun palsu tapi lokasinya berada di luar radius resmi (misal di rumah ilegal), fitur scan pada aplikasi akan langsung menolak akses secara otomatis. Pintu masuk makanan ke sistem langsung tertutup.

- 3. Integrasi dengan IoT untuk Monitoring Pusat

Bagian ini menjadi pelengkap sistem monitoring real-time bagi Dinas Kesehatan atau Koordinator Pusat:

- IoT Gateway di Dapur Resmi: Dapur resmi dipasangi perangkat IoT (seperti mikrokoloni konduktivitas atau sensor gas amonia/suhu ruang sederhana) untuk memantau higienitas dapur saat proses memasak.

- Pengiriman Data Otomatis: Data dari sensor IoT ini, bersama dengan data verifikasi GPS dan hasil scan kelayakan AI tadi, dikirimkan secara otomatis lewat internet ke Dashboard Pusat Monitoring Kota Surabaya.

- Pemerintah kota bisa melihat peta digital: Dapur mana saja yang aktif, mana yang higienis, dan jika ada dapur ilegal yang mencoba bypass, lokasinya langsung terlacak di peta untuk ditindaklanjuti.

## Inovasi yang sudah ada:

Badan Gizi Nasional (BGN) resmi meluncurkan aplikasi "Reviu MBG" untuk memperkuat pengawasan kualitas Program Makan Bergizi Gratis (MBG) langsung dari lapangan. Melalui aplikasi ini, para PIC di titik penerima manfaat (seperti guru, kepala posyandu, dan pengurus pesantren) dapat langsung menilai makanan yang didistribusikan berdasarkan 4 parameter utama: Ketepatan waktu pendistribusian, Aroma makanan, Rasa makanan, Variasi menu.


## Ide Rancang Bangun Software “MBGuide”

- 1. User Penerima Manfaat MBG (Guru, Siswa, Orang Tua)

## Dashboard Menu

- Scan QR Code Makanan MBG

- Status Kelayakan Makanan

- Jadwal Distribusi MBG

- Lokasi Dapur MBG

- Riwayat Penerimaan MBG

- Review Makanan

Hasil Scan QR Code

Setelah QR dipindai, aplikasi menampilkan:

## Informasi Menu

- Nama menu

- Komposisi makanan

- Nilai gizi

- Total kalori

- Protein, karbohidrat, lemak

- Informasi alergen (jika ada)

## Informasi Produksi

- Asal distributor bahan baku

- Tanggal produksi

- Waktu produksi

- Batch ID makanan

## Status Monitoring

- Status kelayakan berdasarkan AI

- Kondisi higienitas dapur berdasarkan sensor IoT

- Status dapur telah terverifikasi Geofencing

- Riwayat distribusi hingga makanan diterima

## Fitur Tambahan

- Beri penilaian makanan (rating dan komentar)

- Laporkan dugaan makanan tidak layak

- 2. User Pengelola Dapur MBG

## Dashboard menampilkan ringkasan:

- Jumlah porsi diproduksi


- Jumlah sekolah tujuan

- Distribusi hari ini

- Status sensor IoT

- Status dapur

## Manajemen Produksi

- Input komposisi makanan

- Input nilai gizi

- Input menu harian

- Generate QR Code setiap batch

## Manajemen Distribusi

- Input jadwal distribusi

- Data penerima manfaat secara real-time

- Monitoring status distribusi

## Monitoring IoT :

- Suhu dapur

- Kelembapan

- Indikasi kualitas udara (misalnya sensor gas amonia atau VOC)

- Status higienitas

## Verifikasi Lokasi

- Peta lokasi dapur

- Status geofencing

- Validasi lokasi sebelum distribusi

- 3. User Distributor MBG

## Dashboard

- Jadwal pengiriman

- Daftar tujuan

- Status pengiriman

## Pengiriman

- Lokasi dapur MBG

- Navigasi menuju sekolah

- Tracking pengiriman secara real-time

- Konfirmasi makanan telah diterima

## Riwayat Distribusi

- Waktu keberangkatan

- Waktu tiba


- Status pengiriman

- Riwayat seluruh distribusi

- 4. User Admin Pemerintah (BGN/Dinas Kesehatan)

- Pusat integrasi seluruh data dan memperlihatkan dampak sistem secara menyeluruh.

- Dashboard Monitoring

- Jumlah dapur aktif

- Jumlah makanan diproduksi

- Jumlah distribusi

- Jumlah penerima manfaat

- Jumlah laporan masyarakat

## Monitoring AI

- Persentase makanan dengan status "Layak"

- Makanan yang perlu inspeksi

- Rekap hasil analisis AI

- Monitoring IoT

- Status higienitas setiap dapur

- Riwayat data sensor

- Notifikasi jika parameter melewati ambang batas

- Monitoring Geofencing

- Status seluruh dapur resmi

- Deteksi aktivitas dari lokasi yang tidak sesuai

- Peta persebaran dapur MBG
