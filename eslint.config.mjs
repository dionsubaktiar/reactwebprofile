/**
 * Konfigurasi ESLint 9 flat config.
 * Menggunakan export flat bawaan `eslint-config-next` (core-web-vitals + typescript).
 */
import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    ignores: [".next/**", "out/**", "coverage/**", "node_modules/**"],
  },
];

export default config;
