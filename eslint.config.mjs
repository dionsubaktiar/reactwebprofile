/**
 * Konfigurasi ESLint 9 flat config (Hari 7).
 *
 * Menggantikan `.eslintrc.json` lama: Next.js 16 menghapus `next lint`
 * dan `eslint-config-next` 16 tidak lagi kompatibel dengan ESLint 8
 * (crash "Converting circular structure to JSON" — AUDIT.md §7).
 * Config ini memakai export flat bawaan `eslint-config-next`
 * (core-web-vitals + typescript).
 */
import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    ignores: [".next/**", "out/**", "coverage/**", "node_modules/**"],
  },
  {
    rules: {
      // "warn" sementara, bukan "error" (Hari 7): aturan baru
      // react-hooks v6 ini menandai pola fetch-di-dalam-effect yang
      // dipakai 13 halaman repo ini (`useEffect(() => { fetch...;
      // setData(...) }, [])`). Merombak pola fetch 13 halaman adalah
      // pekerjaan tersendiri (jalur Hari 22 Server Components / Hari 23
      // loading & error boundary) — bukan scope Hari 7. Warning tetap
      // tampil di output lint supaya tidak hilang diam-diam.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
