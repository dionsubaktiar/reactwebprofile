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

const metrics = [
  { value: "5+", label: "Years in software engineering" },
  { value: "4", label: "Client companies" },
  { value: "6", label: "Live sandboxes" },
  { value: "3.40", label: "GPA out of 4.00" },
];

export const EnhancedHero = () => {
  return (
    <section className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="space-y-6">
            <p className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-700 dark:bg-emerald-400" />
              Available for senior and architectural roles
            </p>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-stone-900 dark:text-stone-50">
                Hi, I&apos;m Dion Subaktiar
              </h1>
              <p className="text-lg sm:text-xl font-medium text-stone-700 dark:text-stone-300">
                Lead Developer &amp; Senior Software Engineer
              </p>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
                I build billing and logistics systems for companies — microservices,
                atomic transactions, and web apps that hold up in production.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
              <span className="inline-flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-stone-500 dark:text-stone-400" /> Surabaya, Indonesia
              </span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-2">
                <FiTerminal className="w-4 h-4 text-stone-500 dark:text-stone-400" /> Fullstack &amp; systems architecture
              </span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-2">
                <FiCheckCircle className="w-4 h-4 text-stone-500 dark:text-stone-400" /> Enterprise production ready
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors active:scale-[0.98]"
              >
                View featured works
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/invoicing-service"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-200 font-medium text-sm transition-colors active:scale-[0.98]"
              >
                Live invoicing demo
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
                <FiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://gitlab.clientsolve.com/dion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitLab Profile"
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:border-stone-300 dark:hover:border-stone-700 transition-colors bg-white dark:bg-stone-900"
              >
                <FiGitlab className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/dionsubaktiar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:border-stone-300 dark:hover:border-stone-700 transition-colors bg-white dark:bg-stone-900"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:dionsubaktiar@gmail.com"
                aria-label="Email Contact"
                className="p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:border-stone-300 dark:hover:border-stone-700 transition-colors bg-white dark:bg-stone-900"
              >
                <FiMail className="w-4 h-4" />
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

        {/* Metrics: numbers only, in mono */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
            >
              <p className="font-mono tabular-nums text-2xl font-medium text-stone-900 dark:text-stone-50">
                {m.value}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
