// Service: reactwebprofile | File: app/components/MiniPlayground.tsx
'use client';

import Link from 'next/link';
import { FiCode, FiArrowRight, FiActivity } from 'react-icons/fi';

interface PlaygroundItem {
  title: string;
  description: string;
  href: string;
  category: string;
  isNew?: boolean;
}

const playgroundItems: PlaygroundItem[] = [
  {
    title: 'Tech Radar & Metrics',
    href: '/tech-radar',
    description: 'Interactive architecture observatory, technology adoption rings, and live engineering metrics.',
    category: 'Architecture Telemetry',
    isNew: true
  },
  {
    title: 'BMI & BFP Calculator',
    href: '/bmi',
    description: 'On-the-fly computational logic implemented in TypeScript with responsive desktop dashboard layout.',
    category: 'TypeScript Module'
  },
  {
    title: 'Simulasi Cicilan',
    href: '/simulasi-cicilan',
    description: 'Dynamic financial compounding loan schedules calculated inside client-side React hooks with full amortization table.',
    category: 'React Logic'
  },
  {
    title: 'Auth & Role CRUD',
    href: '/auth-crud/login',
    description: 'Integrating Socialite OAuth, RBAC (Role-Based Access Control), and core data persistence architectures.',
    category: 'Laravel Integrated'
  },
  {
    title: 'JSONPlaceholder Posts',
    href: '/posts',
    description: 'Consuming REST endpoints asynchronously with custom loading states and responsive card listings.',
    category: 'API Integration'
  },
  {
    title: 'PokeAPI V2 Explorer',
    href: '/pokeapi',
    description: 'Consuming and listing structured endpoints dynamically with rich image previews and responsive grid.',
    category: 'API Integration'
  },
  {
    title: 'SwiperJS Landing Demo',
    href: '/nusantaratrans',
    description: 'Custom touch-swipe sliders and viewport-optimized landing templates for Nusantara Trans.',
    category: 'UI Component'
  }
];

const MiniPlayground = () => {
  return (
    <section id="playground" className="py-24 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto space-y-12 px-4 sm:px-6">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80">
            <FiActivity /> Live Sandbox Hub
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-poppins text-zinc-900 dark:text-white tracking-tight">
            Developer Sandbox &amp; Interactive Prototypes
          </h2>
          <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Eksplorasi sandbox fungsional: dari observatorium arsitektur sistem, simulasi komputasi finansial, hingga integrasi API publik yang dioptimalkan untuk desktop dan perangkat modern.
          </p>
        </div>

        {/* Responsive Desktop-First Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {playgroundItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group relative ${
                item.isNew
                  ? 'border-indigo-500/60 dark:border-indigo-500/50 bg-gradient-to-br from-indigo-500/5 to-transparent shadow-md'
                  : 'border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 hover:border-indigo-500/50 hover:shadow-lg'
              }`}
            >
              {item.isNew && (
                <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-sm uppercase tracking-wider">
                  New Sandbox
                </span>
              )}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block font-poppins">
                    {item.category}
                  </span>
                  <FiCode size={16} className="text-zinc-400 dark:text-zinc-600 group-hover:text-indigo-500 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-poppins group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/50 mt-4 flex items-center justify-between">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline"
                >
                  Buka Sandbox
                  <FiArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <span className="text-[11px] font-mono text-zinc-400">Next.js 14</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiniPlayground;
