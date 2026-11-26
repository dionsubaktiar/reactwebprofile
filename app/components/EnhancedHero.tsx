"use client";

import Link from "next/link";
import {
  FiArrowRight,
  FiGithub,
  FiGitlab,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

export const EnhancedHero = () => {
  return (
    <section className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="space-y-6">
            <p className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
              <FiMapPin className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              Surabaya, Indonesia &middot; Fullstack Software Engineer
            </p>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-stone-900 dark:text-stone-50">
                Dion Subaktiar
              </h1>
              <p className="text-lg sm:text-xl font-medium text-stone-700 dark:text-stone-300">
                Building enterprise logistics systems with .NET, Laravel, and Next.js.
              </p>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
                Middle Developer at PT. Besmart Global Indonesia focusing on core business
                workflows, shared backend modules, and supply chain platforms spanning
                order dispatching, shipment telemetry, and customer invoicing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors active:scale-[0.98]"
              >
                View Projects
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/invoicing-service"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-200 font-medium text-sm transition-colors active:scale-[0.98]"
              >
                Open Invoicing Demo
              </Link>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/dionsubaktiar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:border-stone-300 dark:hover:border-stone-700 transition-colors bg-white dark:bg-stone-900"
              >
                <FiGithub className="h-4 w-4" />
              </a>
              <a
                href="https://gitlab.clientsolve.com/dion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitLab Profile"
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:border-stone-300 dark:hover:border-stone-700 transition-colors bg-white dark:bg-stone-900"
              >
                <FiGitlab className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/dionsubaktiar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:border-stone-300 dark:hover:border-stone-700 transition-colors bg-white dark:bg-stone-900"
              >
                <FiLinkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:dionsubaktiar@gmail.com"
                aria-label="Email Contact"
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:border-stone-300 dark:hover:border-stone-700 transition-colors bg-white dark:bg-stone-900"
              >
                <FiMail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Invoice preview: the one bright moment on the screen */}
          <div className="relative">
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-50">Faktur</p>
                  <p className="mt-1 font-mono text-xs tabular-nums text-stone-500 dark:text-stone-400">
                    INV-2026-0142
                  </p>
                </div>
                <span className="inline-flex -rotate-6 rounded border-[1.5px] border-emerald-700 dark:border-emerald-400 px-2 py-0.5 font-mono text-xs text-emerald-700 dark:text-emerald-400">
                  Lunas
                </span>
              </div>

              <p className="mt-4 text-sm text-stone-600 dark:text-stone-400">
                PT Nusantara Trans Sentosa
              </p>

              <dl className="mt-4 space-y-2 border-t border-stone-200 dark:border-stone-800 pt-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-stone-600 dark:text-stone-400">Pengiriman Surabaya – Jakarta</dt>
                  <dd className="font-mono tabular-nums text-stone-900 dark:text-stone-50">2.450.000</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-stone-600 dark:text-stone-400">Biaya bongkar muat</dt>
                  <dd className="font-mono tabular-nums text-stone-900 dark:text-stone-50">350.000</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-stone-600 dark:text-stone-400">PPN 11%</dt>
                  <dd className="font-mono tabular-nums text-stone-900 dark:text-stone-50">308.000</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-stone-200 dark:border-stone-800 pt-2">
                  <dt className="font-medium text-stone-900 dark:text-stone-50">Total</dt>
                  <dd className="font-mono tabular-nums font-medium text-stone-900 dark:text-stone-50">Rp 3.108.000</dd>
                </div>
              </dl>
            </div>
            <p className="mt-4 text-xs text-stone-500 dark:text-stone-400">
              Preview faktur dari sandbox invoicing
            </p>
          </div>
        </div>

        {/* Facts strip: real data from the page, numbers in mono */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Current Role
            </p>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-50 mt-1">
              Middle Developer, PT. Besmart Global Indonesia
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Experience
            </p>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-50 mt-1">
              Since June 2023 (Backend, Web &amp; Logistics)
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
              Education
            </p>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-50 mt-1 tabular-nums">
              B.Eng. Information Engineering &middot; GPA 3.40
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
