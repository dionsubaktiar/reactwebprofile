"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiTerminal,
  HiExternalLink,
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
}

const iconClass = "h-4 w-4 text-stone-500 dark:text-stone-400";

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
    icon: <HiDocumentText className={iconClass} />,
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
    icon: <HiTerminal className={iconClass} />,
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
    icon: <HiCube className={iconClass} />,
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
    icon: <HiServer className={iconClass} />,
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
    icon: <HiCode className={iconClass} />,
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
    icon: <HiPlay className={iconClass} />,
  },
];

export default function MiniPlayground() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");

  const categories = ["Semua", "Fintech Engine", "CRUD & State", "External API", "Interactive"];

  const filteredProjects = activeFilter === "Semua"
    ? SANDBOX_PROJECTS
    : SANDBOX_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="sandbox" className="scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-stone-900/40 border-y border-stone-200 dark:border-stone-800">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-3">
              Live interactive sandboxes
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
              Interactive Engineering Sandboxes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl">
              Eksplorasi aplikasi nyata, engine perhitungan finansial, generator faktur invoice, serta implementasi REST API yang berjalan langsung di browser.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeFilter === cat
                    ? "bg-emerald-700 text-white"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:bg-stone-100 dark:hover:bg-stone-700"
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
              className="flex flex-col justify-between bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    {project.icon}
                  </div>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-md border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-base font-medium text-stone-900 dark:text-stone-50">
                  {project.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                  {project.category}
                </span>
                <Link
                  href={project.path}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                >
                  Buka Sandbox
                  <HiExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
