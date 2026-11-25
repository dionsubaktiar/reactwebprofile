import { createStore } from "./_store";

export interface ArticleItem {
  id: number;
  title: string;
  article: string;
  author: string;
  created_at: string;
  status: "Published" | "Draft";
}

const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: 1,
    title: "Membangun Arsitektur Micro-Frontend Responsif di Next.js",
    article:
      "Panduan menyeluruh membagi modular web application dengan state terpusat dan boundary komponen yang bersih.",
    author: "Admin Developer",
    created_at: "2026-02-15",
    status: "Published",
  },
  {
    id: 2,
    title: "Optimasi Performansi LCP dan Core Web Vitals pada Dashboard",
    article:
      "Eksperimen benchmark Tailwind CSS tree shaking, code splitting, dan dynamic import pada modul tabel transaksi.",
    author: "Staff Editor",
    created_at: "2026-02-18",
    status: "Published",
  },
  {
    id: 3,
    title: "Strategi Autentikasi JWT & Role-Based Access Control",
    article:
      "Penerapan bearer token session management serta validasi akses rute pada portal klien logistik.",
    author: "Security Lead",
    created_at: "2026-02-22",
    status: "Draft",
  },
];

export const articlesStore = createStore<ArticleItem>(INITIAL_ARTICLES);
