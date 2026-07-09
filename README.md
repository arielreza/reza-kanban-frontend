# 📋 Mini Kanban Board - Front-End

Aplikasi **Mini Kanban Board** ini dibuat untuk memenuhi Tes Teknis Seleksi Magang posisi **Web Developer (Front-End)**. Proyek ini dibangun menggunakan **React 19**, **Vite**, dan **Tailwind CSS v4** dengan fokus pada kualitas visual (premium UI/UX), animasi yang halus, serta pemenuhan seluruh kebutuhan fungsionalitas board secara detail.

---

## 🧑‍💻 Detail Peserta
* **Nama Peserta:** Ariel Reza
* **Posisi:** Web Developer (Front-End)

---

## 🛠️ Teknologi yang Digunakan
* **Library Utama:** React 19 (Hooks, State Management, Effects)
* **Build Tool:** Vite 8 (Fast HMR & Dev Server)
* **Styling (CSS):** Tailwind CSS v4 (Native Theme Token Config, Utility Classes)
* **Font:** Inter (Google Fonts Integration)
* **API Drag & Drop:** HTML5 Native Drag and Drop API
* **Icons & Emojis:** Native Emojis (untuk performa optimal dan tampilan modern)

---

## 🔑 Kredensial Login Demo
Aplikasi dilengkapi sistem autentikasi sederhana (mocked) dengan kredensial berikut:

| Peran (Role) | Email | Password |
|---|---|---|
| **Administrator** | `admin@admin.com` | `password123` |
| **Testing Member** | `user1@example.com` | `password123` |

---

## 🚀 Cara Menjalankan Project Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di lingkungan lokal Anda:

1. **Clone Repository:**
   ```bash
   git clone https://github.com/arielreza/reza-kanban-frontend.git
   cd reza-kanban-frontend
   ```

2. **Instal Dependensi:**
   Pastikan Anda telah menginstal Node.js versi 18+. Jalankan perintah berikut untuk menginstal modul pendukung:
   ```bash
   npm install
   ```

3. **Jalankan Development Server:**
   Mulai server pengembangan lokal menggunakan perintah:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan dan dapat diakses melalui browser pada alamat default: `http://localhost:5173`.

4. **Build untuk Produksi (Opsional):**
   Untuk melakukan compile kode produksi yang dioptimalkan:
   ```bash
   npm run build
   ```

---

## ✨ Fitur-Fitur Utama & Nilai Tambah (Bonus)

Berikut adalah daftar fitur yang telah sepenuhnya diimplementasikan berdasarkan dokumen persyaratan tes teknis:

### 1. Sistem Autentikasi (Login & Logout)
* Validasi form login (input email dan password wajib diisi).
* Pesan error yang informatif jika login gagal.
* Halaman Dashboard Board yang langsung terbuka setelah login sukses.
* Tombol Logout di **Board Header** dan **Halaman Detail Profil**.

### 2. Kanban Board (4 Kolom Utama)
* Grid responsif yang nyaman dipandang di layar monitor laptop, tablet, maupun mobile.
* Empat kolom status bawaan: **Backlog**, **To Do**, **In Progress**, dan **Done**.
* Counter badge di setiap header kolom untuk menunjukkan jumlah tugas aktif.
* Desain warna border atas kolom yang berbeda (*color-coded header border*) untuk identifikasi cepat.

### 3. Manajemen Tugas (CRUD Lengkap & Reusable Modal)
* **Tambah Tugas (Create):** Modal form interaktif untuk mengisi judul (wajib), deskripsi, tingkat prioritas, deadline tanggal, dan langsung menempatkannya di kolom yang diinginkan.
* **Edit Tugas (Update):** Form pembaruan detail tugas secara real-time.
* **Hapus Tugas (Delete):** Penghapusan tugas dari state secara dinamis.

### 4. Interactive Drag & Drop (Nilai Tambah)
* Memindahkan kartu tugas dengan cara digeser (*drag-and-drop*) secara native dari satu kolom ke kolom lain menggunakan API HTML5.
* Animasi interaktif pada saat kartu diangkat atau diletakkan.
* Alternatif pemindahan status kolom melalui pilihan menu dropdown di modal Edit Tugas.

### 5. Pencarian & Filter Canggih (Search & Filter)
* Pencarian dinamis (real-time query) berdasarkan judul tugas.
* **Filter Prioritas (Nilai Tambah):** Tombol filter eksklusif (Semua, High, Medium, Low) dengan styling warna yang atraktif.
* Pencarian dan filter prioritas dapat dikombinasikan secara bersamaan untuk pencarian yang sangat presisi.

### 6. Desain Visual Premium (Day/Night Mode & Glassmorphism)
* **Dark Mode & Light Mode (Nilai Tambah):** Tombol toggle eksklusif dengan penyimpanan status otomatis ke `localStorage`.
* **Subtle Priority Color Coding:** Card tugas memiliki background tint warna pastel yang lembut (High: Merah, Medium: Kuning, Low: Hijau) baik pada mode terang maupun mode gelap agar memudahkan visibilitas.
* **Glassmorphic Elements:** Desain header dan area filter semi-transparan dengan efek blur latar belakang (*backdrop blur*).
* **Custom Confirm Modal:** Menggantikan dialog `window.confirm()` bawaan browser yang kaku dengan modal konfirmasi hapus kustom yang estetik dan selaras dengan tema aplikasi.
* **Custom Toast Notifications:** Notifikasi pop-up cantik yang dinamis untuk memberi konfirmasi visual pada setiap aksi sukses (seperti login, tambah tugas, edit tugas, delete tugas, perpindahan drag-drop).
