# React Web Profile & Interactive Showcase

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.0+-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

Repositori web portofolio personal dan showcase aplikasi interaktif yang dibangun menggunakan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**. Repositori ini menampilkan profil profesional, pengalaman kerja, proyek terpilih, serta berbagai modul aplikasi interaktif dan mock API endpoint.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Direktori](#-struktur-direktori)
- [Panduan Instalasi & Penggunaan](#-panduan-instalasi--penggunaan)
- [Daftar Endpoint API (Mock Routes)](#-daftar-endpoint-api-mock-routes)
- [Skrip yang Tersedia](#-skrip-yang-tersedia)
- [Kontribusi & Lisensi](#-kontribusi--lisensi)

---

## ✨ Fitur Utama

### 1. Portofolio & Profil Interaktif
- **Enhanced Hero & Hero Section**: Tampilan pembuka dinamis dan responsif.
- **About Section**: Informasi latar belakang profesional, ringkasan keahlian, dan minat.
- **Experience Section**: Riwayat pengalaman kerja dan perjalanan karier.
- **Projects Section**: Katalog showcase proyek-proyek unggulan.
- **Clients Section**: Daftar klien atau mitra kerja sama.
- **Activity Log Section**: Catatan log aktivitas dan pembaruan berkala.
- **Mini Playground**: Komponen interaktif untuk eksplorasi langsung di halaman profil.

### 2. Modul Aplikasi Tambahan
- **Kalkulator BMI (`/bmi`)**: Aplikasi penghitung Indeks Massa Tubuh (Body Mass Index) dengan antarmuka interaktif.
- **Auth & CRUD Showcase (`/auth-crud`)**:
  - Autentikasi Pengguna (`/auth-crud/login`, `/auth-crud/register`)
  - Penanganan OAuth callback (`/auth-crud/callback`)
  - Operasi CRUD data (`/auth-crud/create`, `/auth-crud/edit`, `/auth-crud`)

### 3. API Mocking & Endpoint Integrasi (`/api/*`)
Next.js Route Handlers internal yang menyediakan simulasi data untuk pengujian frontend tanpa ketergantungan langsung ke backend eksternal.

---

## 🛠 Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Linting & Code Quality**: ESLint
- **Node Package Manager**: npm

---

## 📁 Struktur Direktori

text
reactwebprofile/
├── app/
│   ├── api/                 # Mock API & Route Handlers
│   │   ├── article/         # Endpoint CRUD artikel
│   │   ├── auth/            # OAuth redirect handler
│   │   ├── books/           # Endpoint buku, pencarian, dan likes
│   │   ├── customer/        # Endpoint data pelanggan
│   │   ├── invoice/         # Endpoint invoice
│   │   ├── pinjaman/        # Endpoint data pinjaman
│   │   ├── unit/            # Endpoint data unit
│   │   ├── part/            # Endpoint suku cadang / spareparts
│   │   └── mockData.ts      # Kumpulan mock data terpusat
│   ├── auth-crud/           # Modul halaman autentikasi dan CRUD
│   │   ├── callback/        # Halaman penerimaan callback OAuth
│   │   ├── create/          # Formulir pembuatan data baru
│   │   ├── edit/            # Formulir pembaruan data
│   │   ├── login/           # Halaman login
│   │   └── register/        # Halaman pendaftaran
│   ├── bmi/                 # Aplikasi kalkulator BMI
│   └── components/          # Komponen tampilan halaman utama
│       ├── AboutSection.tsx
│       ├── ActivityLogSection.tsx
│       ├── ClientsSection.tsx
│       ├── EnhancedHero.tsx
│       ├── ExperienceSection.tsx
│       ├── HeroSection.tsx
│       ├── MiniPlayground.tsx
│       └── ProjectsSection.tsx
├── .env.example             # Contoh konfigurasi environment variable
├── .eslintrc.json           # Konfigurasi ESLint
├── .npmrc                   # Konfigurasi paket npm
└── README.md                # Dokumentasi proyek


---

## 🚀 Panduan Instalasi & Penggunaan

### Prasyarat
Pastikan Anda telah memasang lingkungan runtime berikut:
- [Node.js](https://nodejs.org/) (versi 18.x atau versi LTS terbaru yang didukung)
- npm (bawaan Node.js) atau package manager pilihan Anda (yarn/pnpm)
- [Git](https://git-scm.com/)

### 1. Kloning Repositori
bash
git clone https://github.com/dionsubaktiar/reactwebprofile.git
cd reactwebprofile


### 2. Pasang Dependensi
bash
npm install


### 3. Konfigurasi Environment Variable
Salin file contoh konfigurasi dan sesuaikan variabel yang dibutuhkan:
bash
cp .env.example .env.local


Buka `.env.local` dan isi konfigurasi yang diperlukan sesuai kebutuhan lingkungan Anda.

### 4. Jalankan Server Pengembangan
bash
npm run dev


Buka browser Anda dan navigasikan ke `http://localhost:3000` untuk melihat hasilnya.

---

## 📡 Daftar Endpoint API (Mock Routes)

| Endpoint | Metode | Deskripsi |
|---|---|---|
| `/api/article` | `GET`, `POST` | Mendapatkan daftar artikel atau membuat artikel baru |
| `/api/article/[id]` | `GET`, `PUT`, `DELETE` | Operasi detail, update, dan delete artikel |
| `/api/books` | `GET`, `POST` | Mendapatkan daftar buku |
| `/api/books/search` | `GET` | Pencarian data buku berdasarkan kata kunci |
| `/api/books/likes/[id]` | `POST` | Menambahkan like pada buku tertentu |
| `/api/customer` | `GET`, `POST` | Manajemen data pelanggan/konsumen |
| `/api/invoice` | `GET`, `POST` | Manajemen data invoice |
| `/api/pinjaman` | `GET`, `POST` | Manajemen pengajuan/data pinjaman |
| `/api/unit` | `GET`, `POST` | Manajemen katalog unit |
| `/api/part` | `GET`, `POST` | Manajemen data suku cadang / parts |
| `/api/sanctum/csrf-cookie`| `GET` | Simulasi inisialisasi CSRF cookie |
| `/api/auth/[provider]/redirect` | `GET` | Simulasi alur redirect OAuth provider |
| `/api/me` | `GET` | Mendapatkan data profil sesi pengguna aktif |

---

## 📜 Skrip yang Tersedia

Dalam berkas `package.json`, Anda dapat menjalankan skrip-skrip berikut:

- `npm run dev`: Menjalankan server pengembangan Next.js dengan Hot Module Replacement (HMR).
- `npm run build`: Mengompilasi dan mengoptimasi aplikasi untuk kebutuhan produksi.
- `npm run start`: Menjalankan server Next.js pada mode produksi setelah build.
- `npm run lint`: Menjalankan pemeriksaan kode menggunakan ESLint.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi [MIT](LICENSE) - silakan lihat berkas lisensi untuk detail selengkapnya.

---

## 👤 Pemilik Proyek

Dikembangkan oleh **Dion Subaktiar**  
GitHub: [@dionsubaktiar](https://github.com/dionsubaktiar)
