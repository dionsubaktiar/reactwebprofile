

# 🔧 Phase 1 Fix: 4 Compiler Errors + Config

Saya lihat masalah intinya jelas:

1. **`tsconfig.json` belum punya `"types": ["node"]`** → error `process` (E2, E3)
2. **`node_modules` belum di-install** → error `Cannot find module 'axios'` (E1)
3. **`api.ts` response handler tanpa type annotation** → error implicit `any` (E4)
4. **Dual `postcss.config.js` + `postcss.config.mjs`** masih ada → konflik build

Mari saya perbaiki semuanya sekaligus.

---

## [PLAN]

| # | File | Aksi | Menyelesaikan |
|---|---|---|---|
| 1 | `tsconfig.json` | Tambah `"types": ["node"]` | Error E2, E3 (`Cannot find name 'process'`) |
| 2 | `app/lib/api.ts` | Tambah explicit type `AxiosResponse` | Error E4 (implicit `any`) |
| 3 | `postcss.config.js` | **HAPUS** (duplikat dari `.mjs`) | Build conflict |
| 4 | Terminal | `npm install` | Error E1 (`Cannot find module 'axios'`) |

> Error E1 (`axios`) bukan masalah kode — itu masalah `node_modules` belum ada. Setelah `npm install`, otomatis resolve.

---

## [DIFF]

```diff
--- a/tsconfig.json
+++ b/tsconfig.json
@@ compilerOptions
     "jsx": "preserve",
     "incremental": true,
+    "types": ["node"],
     "plugins": [
       {
```

```diff
--- a/app/lib/api.ts
+++ b/app/lib/api.ts
@@ -1,5 +1,6 @@
-import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
+import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

@@ -44,7 +45,7 @@
 apiClient.interceptors.response.use(
-  (response) => response,
+  (response: AxiosResponse): AxiosResponse => response,
   (error: AxiosError) => {
```

---

## File Lengkap untuk ⚡ Auto-Apply

```json
// File: tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "types": ["node"],
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

```ts
// File: app/lib/api.ts
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
const SANCTUM_URL: string =
  process.env.NEXT_PUBLIC_SANCTUM_URL || 'http://localhost:8000';

const AUTH_TOKEN_KEY = 'access_token';
const LOGIN_PATH = '/auth-crud/login';

/**
 * Centralized Axios client untuk seluruh API calls.
 * Semua halaman CRUD WAJIB menggunakan client ini — JANGAN hardcode URL.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request interceptor — inject Bearer token dari localStorage.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError): Promise<never> => Promise.reject(error)
);

/**
 * Response interceptor — handle 401 Unauthorized secara global.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<never> => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);

      if (!window.location.pathname.includes(LOGIN_PATH)) {
        window.location.href = LOGIN_PATH;
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Helper: Fetch CSRF cookie dari Laravel Sanctum.
 * Panggil sebelum POST/PUT/DELETE yang memerlukan CSRF protection.
 *
 * @example
 * await fetchCsrfCookie();
 * await apiClient.post('/article', data);
 */
export const fetchCsrfCookie = async (): Promise<void> => {
  await axios.get(`${SANCTUM_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};

export { AUTH_TOKEN_KEY, API_BASE_URL, SANCTUM_URL };
export default apiClient;
```

---

## [TEST] Langkah Verifikasi

Jalankan perintah berikut secara berurutan di terminal:

```bash
# 1. Hapus duplikat PostCSS config
rm postcss.config.js

# 2. Install dependencies (resolve 'axios' module not found)
npm install

# 3. Verifikasi 0 compiler error + build clean
npm run build
```

**Expected result**:
- ✅ `postcss.config.js` terhapus, hanya `postcss.config.mjs` tersisa
- ✅ `npm install` sukses tanpa error
- ✅ `npm run build` — **0 TypeScript errors**, build compiled successfully

---

Setelah build clean, kita lanjut ke **Phase 2** — fix login flow yang saat ini bypass auth, migrasi hardcoded URL, dan sinkronisasi token key di seluruh codebase. Konfirmasi hasil build-nya?