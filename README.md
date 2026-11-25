# reactwebprofile — Web Profile & Portfolio Dion Subaktiar

Portfolio dan sandbox berbasis **Next.js 16**, **React 19**, **TypeScript**,
dan **Tailwind CSS**. Repositori ini berisi halaman profil (hero, skills,
experience, projects, clients) plus beberapa sandbox interaktif — yang
paling aktif dikembangkan adalah **sandbox invoicing** di
`/invoicing-service` (customers, units, parts, packages, invoice).

> Status: repo ini sedang dirapikan bertahap lewat roadmap 30 hari
> (lihat `docs/SPRINT_SUMMARY.md`). Klaim mutu di repo ini dibuktikan
> lewat CI (typecheck → lint → build → test), bukan lewat dokumen
> sertifikat — file `test/qa_report.md` dan `docs/QC_CERTIFICATE.md`
> yang klaimnya tidak bisa dibuktikan sudah dihapus pada Hari 7.

## Sandbox & rute utama

| Rute                                                             | Isi                                                                                 |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `/`                                                              | Landing page portfolio + MiniPlayground                                             |
| `/invoicing-service`                                             | Sandbox invoicing: customers, units, parts, packages, invoice (alur status + cetak) |
| `/pengajuan-kredit`                                              | Pengajuan kredit kendaraan (konsumen, kendaraan, pinjaman)                          |
| `/simulasi-cicilan`                                              | Simulasi angsuran & tenor pembiayaan                                                |
| `/auth-crud`                                                     | Login/register + CRUD user (mode mock)                                              |
| `/test-orbiz`                                                    | Sandbox auth Orbiz (mode mock)                                                      |
| `/bmi`, `/pokeapi`, `/posts`, `/tech-radar`, `/users`, `/resume` | Sandbox & halaman pendukung lainnya                                                 |

## Menjalankan secara lokal

Prasyarat: Node.js **>= 20** dan npm.

```bash
git clone https://github.com/dionsubaktiar/reactwebprofile.git
cd reactwebprofile
npm install --legacy-peer-deps   # .npmrc sudah mengatur legacy-peer-deps=true
npm run dev                      # http://localhost:3000
```

Build produksi:

```bash
npm run build
npm run start
```

## Dua mode API: mock dan Laravel

Secara default aplikasi memakai **mock API** (`app/api/*`, route handler
Next.js dengan store in-memory):

- Data customers/units/parts/packages/invoice tersimpan di memori server
  (`app/api/_store.ts`) dan **hilang saat server restart**.
- Login mock (`POST /api/orbiz/login`) hanya menerima akun demo yang
  ditampilkan di halaman login — ini **bukan keamanan sungguhan**.

Untuk memakai backend Laravel, salin `.env.example` ke `.env` dan atur:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_SANCTUM_URL=http://localhost:8000
```

Kontrak respons mock (`{ message, data: Paginated<T> }` untuk list,
`{ message, data: T }` untuk single, 404 bila id tidak ada, 400 bila
validasi gagal) didokumentasikan di `docs/openapi.yaml`.

## Perintah verifikasi

```bash
npm run build       # build produksi (Next.js)
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint 9 (flat config, eslint.config.mjs)
npm test            # Vitest (unit test)
npm run format      # Prettier (double quotes, semicolon, 2 spasi)
```

Keempat perintah pertama dijalankan otomatis oleh GitHub Actions
(`.github/workflows/ci.yml`) di setiap push dan pull request — semuanya
harus hijau sebelum PR di-merge.

## Struktur folder

```text
app/
  api/                  # Mock API (route handler Next.js): customer, part,
                        # unit, invoice, packages, orbiz, ...
  api/_store.ts         # Satu store in-memory per resource + paginate()
  api/_validate.ts      # Validasi minimal POST/PUT (400 bila tidak valid)
  invoicing-service/    # Sandbox invoicing (dashboard + customers/units/
                        # parts/packages/invoice) + komponen bersama
                        # di _components/
  pengajuan-kredit/     # Sandbox pengajuan kredit
  auth-crud/            # Login/register + CRUD user
  test-orbiz/           # Sandbox auth Orbiz
  components/           # Komponen bersama (navbar, MiniPlayground, ...)
  context/              # AuthContext (token di localStorage, mode mock)
  lib/
    api.ts              # apiClient (axios) — satu-satunya tempat base URL
    types.ts            # SATU-SATUNYA definisi Customer/Unit/Part/Invoice
    format.ts           # formatIDR, formatDateId, formatKm
    invoice-status.ts   # Alur status invoice/SPK (satu-satunya definisi)
    part-form.ts        # Logika form Part yang bisa diuji
    api-response.ts     # Parsing respons list { message, data: Paginated }
docs/
  SPRINT_SUMMARY.md     # Catatan jujur per hari roadmap 30 hari
  openapi.yaml          # Kontrak respons API
```

Aturan yang dijaga repo ini (lihat `docs/SPRINT_SUMMARY.md`):

- Satu definisi tipe di `app/lib/types.ts` — jangan mendefinisikan ulang
  `Customer`/`Unit`/`Part`/`Invoice` di halaman.
- Semua pemanggilan HTTP lewat `apiClient` (`app/lib/api.ts`) — tidak ada
  URL backend hardcode di luar file itu.
- Tidak ada pola "redirect seolah berhasil": request gagal harus
  menampilkan error yang terlihat, bukan redirect.

## Kontribusi

Perubahan masuk lewat satu PR kecil per hari (roadmap 30 hari, satu topik
per PR, build tetap hijau). Jangan merge PR sendiri tanpa persetujuan
pemilik repo. Setiap PR mencantumkan hasil verifikasi
(build/typecheck/lint/test) dan catatan jujur tentang apa yang belum
diuji.

## Lisensi

Seluruh hak cipta dilindungi © 2026 Dion Subaktiar.
