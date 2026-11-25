'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { FiCpu, FiActivity, FiLayers, FiSearch } from 'react-icons/fi';

interface TechItem {
  id: string;
  name: string;
  category: 'Languages' | 'Frameworks' | 'Infrastructure' | 'Data & AI';
  ring: 'Adopt' | 'Trial' | 'Assess' | 'Hold';
  description: string;
  maturity: number; // 0-100
  momentum: 'up' | 'stable' | 'down';
  tags: string[];
}

const TECH_CATALOG: TechItem[] = [
  { id: '1', name: 'TypeScript 5.x', category: 'Languages', ring: 'Adopt', description: 'Strict typing, const type parameters, performance optimization for enterprise web apps.', maturity: 95, momentum: 'up', tags: ['Core', 'TypeSafe'] },
  { id: '2', name: 'Next.js App Router', category: 'Frameworks', ring: 'Adopt', description: 'React Server Components, nested streaming layouts, and zero-bundle server logic.', maturity: 90, momentum: 'up', tags: ['React', 'SSR'] },
  { id: '3', name: 'Tailwind CSS', category: 'Frameworks', ring: 'Adopt', description: 'Utility-first styling with responsive design tokens and dark mode architecture.', maturity: 98, momentum: 'stable', tags: ['CSS', 'Responsive'] },
  { id: '4', name: '.NET Core / C#', category: 'Frameworks', ring: 'Adopt', description: 'Enterprise backend microservices with atomic database transactions and background schedulers.', maturity: 92, momentum: 'up', tags: ['Backend', 'Microservices'] },
  { id: '5', name: 'Laravel (PHP)', category: 'Frameworks', ring: 'Adopt', description: 'RESTful API services, Sanctum auth, and RDBMS schema orchestration.', maturity: 90, momentum: 'stable', tags: ['PHP', 'API'] },
  { id: '6', name: 'Docker Multi-Stage', category: 'Infrastructure', ring: 'Adopt', description: 'Minimal production containers with non-root security clearance.', maturity: 96, momentum: 'stable', tags: ['DevOps', 'Containers'] },
  { id: '7', name: 'Preact Stateful Layer', category: 'Frameworks', ring: 'Trial', description: '3KB React alternative for ultra-fast reactive micro-widgets and embedded webviews.', maturity: 80, momentum: 'up', tags: ['Lightweight', 'Reactive'] },
  { id: '8', name: 'Bun Runtime', category: 'Infrastructure', ring: 'Assess', description: 'High-speed JavaScript runtime and package manager evaluated for tooling and test pipelines.', maturity: 72, momentum: 'up', tags: ['Runtime', 'Tooling'] },
  { id: '9', name: 'jQuery Legacy', category: 'Frameworks', ring: 'Hold', description: 'Maintained only in legacy corporate portals; new UI modules use React/TypeScript.', maturity: 40, momentum: 'down', tags: ['Legacy', 'DOM'] },
];

const RING_BADGE_STYLES: Record<TechItem['ring'], string> = {
  Adopt: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400',
  Trial: 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400',
  Assess: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400',
  Hold: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400',
};

const RING_TEXT_STYLES: Record<TechItem['ring'], string> = {
  Adopt: 'text-emerald-600 dark:text-emerald-400',
  Trial: 'text-sky-600 dark:text-sky-400',
  Assess: 'text-amber-600 dark:text-amber-400',
  Hold: 'text-rose-600 dark:text-rose-400',
};

const ADOPTION_STRATEGY: Record<TechItem['ring'], string> = {
  Adopt: 'Recommended Standard',
  Trial: 'Pilot in Non-Critical Modules',
  Assess: 'Explore & Benchmark',
  Hold: 'Avoid for New Projects',
};

export default function TechRadarPage() {
  const [selectedRing, setSelectedRing] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<TechItem>(TECH_CATALOG[0]);

  const filteredItems = useMemo(() => {
    return TECH_CATALOG.filter(item => {
      const matchRing = selectedRing === 'All' || item.ring === selectedRing;
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchRing && matchCat && matchSearch;
    });
  }, [selectedRing, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              <FiActivity /> Developer Sandbox &bull; Technology Radar
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Tech Radar &amp; Engineering Metrics
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              Showcase observabilitas teknologi, adopsi stack modern, dan evaluasi kesiapan arsitektur sistem.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 tabular-nums">
              {TECH_CATALOG.length} technologies tracked
            </span>
          </div>
        </div>

        {/* Filter Controls Bar - Responsive Desktop-First */}
        <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari teknologi, tag, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-800/80 p-1 text-xs font-medium">
              {['All', 'Adopt', 'Trial', 'Assess', 'Hold'].map((ring) => (
                <button
                  key={ring}
                  type="button"
                  onClick={() => setSelectedRing(ring)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    selectedRing === ring
                      ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {ring}
                </button>
              ))}
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter kategori teknologi"
              className="px-3 py-2 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border-0 text-zinc-700 dark:text-zinc-300 font-medium focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">Semua Kategori</option>
              <option value="Languages">Languages</option>
              <option value="Frameworks">Frameworks</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Data & AI">Data &amp; AI</option>
            </select>
          </div>
        </div>

        {/* 2-Column Responsive Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Tech Grid (8 Cols on Desktop) */}
          <div className="lg:col-span-8 space-y-4">
            {filteredItems.length === 0 ? (
              <div className="p-12 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 text-center text-sm text-zinc-500 dark:text-zinc-400">
                Tidak ada teknologi yang cocok dengan filter saat ini.
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveItem(item)}
                  aria-pressed={activeItem.id === item.id}
                  className={`w-full text-left p-5 rounded-2xl border transition-colors flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    activeItem.id === item.id
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                      : 'bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {item.category}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${RING_BADGE_STYLES[item.ring]}`}>
                        {item.ring}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1.5 flex items-center justify-between">
                      {item.name}
                      <span className="text-xs font-mono font-medium tabular-nums text-indigo-600 dark:text-indigo-400">{item.maturity}%</span>
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-full mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                      Detail &rarr;
                    </span>
                  </div>
                </button>
              ))}
            </div>
            )}
          </div>

          {/* Right Column: Deep Inspector Panel (4 Cols on Desktop) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Inspector Detail</span>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{activeItem.name}</h2>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                  <FiCpu size={22} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {activeItem.description}
                </div>
                
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Maturity Index</span>
                    <span className="text-indigo-600 dark:text-indigo-400 tabular-nums">{activeItem.maturity}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${activeItem.maturity}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/70 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Ring Status:</span>
                  <span className={`font-semibold ${RING_TEXT_STYLES[activeItem.ring]}`}>{activeItem.ring}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Category:</span>
                  <span className="font-semibold">{activeItem.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Adoption Strategy:</span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">{ADOPTION_STRATEGY[activeItem.ring]}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/#sandbox"
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FiLayers /> Hubungkan ke Modul Sandbox Lain
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
