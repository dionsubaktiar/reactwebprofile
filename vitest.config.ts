import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Konfigurasi Vitest (Hari 7).
 *
 * - `environment: "jsdom"` supaya test komponen React (Testing Library)
 *   bisa ditulis di hari-hari berikutnya; test logika murni di bawah ini
 *   tidak bergantung pada DOM.
 * - Alias `@` sama seperti `tsconfig.json` (`@/*` → `./*`).
 * - Test tinggal di `__tests__` di sebelah code yang diuji.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/__tests__/**/*.test.{ts,tsx}"],
  },
});
