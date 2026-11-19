"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiTerminal,
  HiExternalLink,
  HiSparkles,
  HiPlay,
  HiCode,
  HiServer,
  HiCube,
  HiDocumentText,
} from "react-icons/hi";

interface SandboxProject {
  id: string;
  name: string;
  category: "CRUD & State" | "External API" | "Fintech Engine" | "Interactive";
  status: "Production" | "Ready" | "Interactive";
  description: string;
  techStack: string[];
  path: string;
  icon: React.ReactNode;
  badgeColor: string;
}

const SANDBOX_PROJECTS: SandboxProject[] = [
  {
    id: "invoicing",
    name: "Sistem Invoicing & Faktur",
    category: "Fintech Engine",
    status: "Production",
    description:
      "Generator faktur otomatis dengan kalkulasi multi-item, diskon bertingkat (persen & nominal), DPP, PPN 11%, dan cetak invoice profesional.",
    techStack: ["Next.js", "TypeScript", "Tax Engine", "Tailwind"],
    path: "/invoicing-service",
    icon: <HiDocumentText className="h-5 w-5 text-indigo-500" />,
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60",
  },
  {
    id: "simulasi-cicilan",
    name: "Simulasi Cicilan Bunga Menurun",
    category: "Fintech Engine",
    status: "Production",
    description:
      "Kalkulator pinjaman multi-metode (Anuitas vs Flat), breakdown amortisasi bulanan, visualisasi proporsi bunga & pokok.",
    techStack: ["Next.js", "Financial Math", "TypeScript", "Tailwind"],
    path: "/simulasi-cicilan",
    icon: <HiTerminal className="h-5 w-5 text-emerald-500" />,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60",
  },
  {
    id: "pengajuan-kredit",
    name: "Kredit Kendaraan & Simulasi DP",
    category: "Fintech Engine",
    status: "Production",
    description:
      "Sistem pengajuan kredit unit kendaraan, kalkulasi DP minimum OJK, pemilihan tenor, dan verifikasi kelayakan debitur.",
    techStack: ["Next.js", "REST API", "Client Validation"],
    path: "/pengajuan-kredit",
    icon: <HiCube className="h-5 w-5 text-cyan-500" />,
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/60",
  },
  {
    id: "pokeapi",
    name: "PokeAPI Infinite Directory",
    category: "External API",
    status: "Ready",
    description:
      "Integrasi real REST PokeAPI v2 dengan client-side pagination, dynamic type tagging, caching layer, dan skeleton loading state.",
    techStack: ["PokeAPI v2", "Async Fetch", "TypeScript"],
    path: "/pokeapi",
    icon: <HiServer className="h-5 w-5 text-amber-500" />,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60",
  },
  {
    id: "auth-crud",
    name: "Knowledge Base Articles CRUD",
    category: "CRUD & State",
    status: "Ready",
    description:
      "Manajemen artikel teknis lengkap dengan operasi Create, Read, Update, Delete didukung mock database RESTful routes.",
    techStack: ["Next.js API Routes", "Full CRUD", "Form State"],
    path: "/auth-crud",
    icon: <HiCode className="h-5 w-5 text-violet-500" />,
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800/60",
  },
  {
    id: "bmi",
    name: "Interactive Health Index (BMI)",
    category: "Interactive",
    status: "Interactive",
    description:
      "Simulasi indeks massa tubuh real-time dengan status klasifikasi kesehatan WHO, kalkulasi berat badan ideal, dan saran nutrisi.",
    techStack: ["React State", "Tailwind UI", "Math Calc"],
    path: "/bmi",
    icon: <HiPlay className="h-5 w-5 text-rose-500" />,
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60",
  },
];

export default function MiniPlayground() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  const categories = ["Semua", "Fintech Engine", "CRUD & State", "External API", "Interactive"];

  const filteredProjects = activeFilter === "Semua"
    ? SANDBOX_PROJECTS
    : SANDBOX_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="sandbox" className="scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-zinc-900/40 border-y border-slate-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 mb-3">
              <HiSparkles className="h-3.5 w-3.5" />
              Live Interactive Sandboxes
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Interactive Engineering Sandboxes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
              Eksplorasi aplikasi nyata, engine perhitungan finansial, generator faktur invoice, serta implementasi REST API yang berjalan langsung di browser.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700/80 shadow-xs self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeFilter === cat
                    ? "bg-indigo-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sandbox Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between bg-white dark:bg-zinc-900/90 rounded-2xl border border-slate-200/90 dark:border-zinc-800/90 p-6 shadow-sm hover:shadow-lg hover:border-indigo-500/50 dark:hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/80 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${project.badgeColor}`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                  {project.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 border border-slate-200/60 dark:border-zinc-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">
                  {project.category}
                </span>
                <Link
                  href={project.path}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group/link transition-colors"
                >
                  Buka Sandbox
                  <HiExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
