"use client";

import Link from "next/link";
import { FiCode, FiArrowRight } from "react-icons/fi";

interface PlaygroundItem {
  title: string;
  description: string;
  href: string;
  category: string;
}

const playgroundItems: PlaygroundItem[] = [
  {
    title: "BMI & BFP Calculator",
    href: "/bmi",
    description: "On-the-fly computational logic implemented in TypeScript. Zero backend dependencies.",
    category: "TypeScript Module"
  },
  {
    title: "Auth & Role CRUD",
    href: "/auth-crud/login",
    description: "Integrating Socialite OAuth, RBAC (Role-Based Access Control), and core data persistence architectures.",
    category: "Laravel Integrated"
  },
  {
    title: "Simulasi Cicilan",
    href: "/simulasi-cicilan",
    description: "Dynamic financial compounding loan schedules calculated inside client-side React hooks.",
    category: "React Logic"
  },
  {
    title: "JSONPlaceholder Posts",
    href: "/posts",
    description: "Consuming REST endpoints asynchronously with custom loading states and card listings.",
    category: "API Integration"
  },
  {
    title: "PokeAPI V2 Explorer",
    href: "/pokeapi",
    description: "Consuming and listing structured endpoints dynamically with rich image previews.",
    category: "API Integration"
  },
  {
    title: "SwiperJS Landing Page Demo",
    href: "/nusantaratrans",
    description: "Custom touch-swipe sliders and viewport-optimized landing templates for Nusantara Trans.",
    category: "UI Component"
  }
];

const MiniPlayground = () => {
  return (
    <section id="playground" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold font-poppins text-zinc-900 dark:text-white">
            Developer Sandbox
          </h2>
          <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light max-w-md mx-auto">
            A sandbox containing quick client-side logic experiments, third-party API configurations, and prototype interfaces.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {playgroundItems.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/10 hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block font-poppins">
                    {item.category}
                  </span>
                  <FiCode size={14} className="text-zinc-400 dark:text-zinc-600" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white font-poppins group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 hover:text-indigo-600 dark:text-zinc-300 dark:hover:text-indigo-400 transition-colors"
                >
                  Open Sandbox
                  <FiArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiniPlayground;
