// Service: reactwebprofile | File: app/components/toggleDarkMode.tsx
'use client';

import { useState, useEffect } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

interface ToggleDarkModeProps {
  readonly className?: string;
}

export default function ToggleDarkMode({ className = '' }: Readonly<ToggleDarkModeProps>) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasDark =
      document.documentElement.classList.contains('dark') ||
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDark(hasDark);
    if (hasDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggle = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className={`h-9 w-9 rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle Dark Mode"
      className={`group relative flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:border-slate-300 hover:bg-slate-100 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 ${className}`}
    >
      <div className="relative flex h-5 w-5 items-center justify-center">
        {isDark ? (
          <HiSun className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <HiMoon className="h-4 w-4 text-blue-600 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>
      <span className="hidden sm:inline">
        {isDark ? 'Mode Terang' : 'Mode Gelap'}
      </span>
    </button>
  );
}