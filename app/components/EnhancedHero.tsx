"use client";

import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiGithub,
  FiGitlab,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiTerminal,
} from "react-icons/fi";

export const EnhancedHero = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-zinc-200 dark:border-zinc-800/80 bg-gradient-to-b from-zinc-50 via-white to-zinc-50/50 dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950">
      {/* Subtle decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl rounded-full"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for Senior & Architectural Roles
          </div>

          {/* Main Title & Role */}
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-poppins tracking-tight text-zinc-900 dark:text-white">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Dion Subaktiar
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300 font-poppins">
              Lead Developer & Senior Software Engineer
            </p>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
              Specializing in scalable distributed enterprise platforms, microservices architecture,
              and corporate logistics ecosystems. Bridging high-performance backend systems with
              clean, accessible modern web and mobile applications.
            </p>
          </div>

          {/* Location & Meta */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin className="text-indigo-500" /> Surabaya, Indonesia
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <FiTerminal className="text-indigo-500" /> Fullstack & Systems Architecture
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <FiCheckCircle /> Enterprise Production Ready
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all shadow-sm hover:shadow-indigo-500/20 active:scale-95"
            >
              View Featured Works
              <FiArrowRight />
            </Link>
            <Link
              href="/invoicing-service"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium text-sm transition-all shadow-sm active:scale-95"
            >
              Live Invoicing Demo
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-3">
            <a
              href="https://github.com/dionsubaktiar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors bg-white dark:bg-zinc-900 shadow-sm"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a
              href="https://gitlab.clientsolve.com/dion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitLab Profile"
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors bg-white dark:bg-zinc-900 shadow-sm"
            >
              <FiGitlab className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/dionsubaktiar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors bg-white dark:bg-zinc-900 shadow-sm"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:dionsubaktiar@gmail.com"
              aria-label="Email Contact"
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors bg-white dark:bg-zinc-900 shadow-sm"
            >
              <FiMail className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Metrics / Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-8 text-left">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
              <p className="text-2xl font-bold font-poppins text-indigo-600 dark:text-indigo-400">5+ Yrs</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-light">
                Software Engineering Experience
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
              <p className="text-2xl font-bold font-poppins text-indigo-600 dark:text-indigo-400">Enterprise</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-light">
                Transport & Logistics Platforms
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
              <p className="text-2xl font-bold font-poppins text-indigo-600 dark:text-indigo-400">Microservices</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-light">
                Atomic Transactions & Cloud Pipelines
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 shadow-sm">
              <p className="text-2xl font-bold font-poppins text-indigo-600 dark:text-indigo-400">3.40 / 4.0</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-light">
                Information Engineering Degree
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
