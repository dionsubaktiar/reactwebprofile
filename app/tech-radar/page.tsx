// Service: reactwebprofile | File: app/tech-radar/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '../components/navbar';
import { FiCpu, FiActivity, FiLayers, FiShield, FiTrendingUp, FiSearch, FiExternalLink, FiCompass } from 'react-icons/fi';

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
  { id: '1', name: 'TypeScript 5.x', category: 'Languages', ring: 'Adopt', description: 'Strict type safety, const type parameters, performance optimization for enterprise web apps.', maturity: 95, momentum: 'up', tags: ['Core', 'TypeSafe'] },
  { id: '2', name: 'Next.js App Router', category: 'Frameworks', ring: 'Adopt', description: 'React Server Components, nested streaming layouts, and zero-bundle server logic.', maturity: 90, momentum: 'up', tags: ['React', 'SSR'] },
  { id: '3', name: 'Tailwind CSS', category: 'Frameworks', ring: 'Adopt', description: 'Utility-first styling with responsive design tokens and dark mode architecture.', maturity: 98, momentum: 'stable', tags: ['CSS', 'Responsive'] },
  { id: '4', name: 'Hermes Agentic Swarm', category: 'Data & AI', ring: 'Adopt', description: 'Multi-agent SDLC orchestration with autonomous Planner, Coder, and QA gatekeepers.', maturity: 85, momentum: 'up', tags: ['Agentic', 'Automation'] },
  { id: '5', name: 'FastAPI Router', category: 'Frameworks', ring: 'Adopt', description: 'High-performance Python async backend router with automatic OpenAPI 3.0 docs.', maturity: 92, momentum: 'stable', tags: ['Python', 'Async'] },
  { id: '6', name: 'Docker Multi-Stage', category: 'Infrastructure', ring: 'Adopt', description: 'Minimal production containers with non-root security clearance.', maturity: 96, momentum: 'stable', tags: ['DevOps', 'Containers'] },
  { id: '7', name: 'Preact Stateful Layer', category: 'Frameworks', ring: 'Trial', description: '3KB React alternative for ultra-fast reactive micro-widgets and embedded webviews.', maturity: 80, momentum: 'up', tags: ['Lightweight', 'Reactive'] },
  { id: '8', name: 'WebSockets & SSE Stream', category: 'Infrastructure', ring: 'Adopt', description: 'Live bi-directional telemetry and event streaming without manual browser polling.', maturity: 88, momentum: 'up', tags: ['RealTime', 'SSE'] }
];

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-poppins">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
              <FiCompass /> Developer Sandbox &bull; Interactive Architecture Telemetry
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Tech Radar &amp; Engineering Metrics
            </h1>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
              Showcase observabilitas teknologi, adopsi stack modern, dan evaluasi kesiapan arsitektur sistem dengan visualisasi desktop-first.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Telemetry Active
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
                  onClick={() => setSelectedRing(ring)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    activeItem.id === item.id
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                      : 'bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.ring === 'Adopt' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' :
                        item.ring === 'Trial' ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400' :
                        'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                      }`}>
                        {item.ring}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5 flex items-center justify-between">
                      {item.name}
                      <span className="text-xs font-mono font-normal text-indigo-500">{item.maturity}%</span>
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[9.5px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                      Detail &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Deep Inspector Panel (4 Cols on Desktop) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Inspector Detail</span>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{activeItem.name}</h2>
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
                    <span className="text-indigo-600 dark:text-indigo-400">{activeItem.maturity}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full" style={{ width: `${activeItem.maturity}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/70 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Ring Status:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{activeItem.ring}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Category:</span>
                  <span className="font-semibold">{activeItem.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Adoption Strategy:</span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">Recommended Standard</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="/#playground"
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <FiLayers /> Kembali ke Sandbox Hub
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
