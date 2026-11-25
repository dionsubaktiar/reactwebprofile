import Image from "next/image";
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
    <section className="py-14 md:py-20 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="md:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <FiMapPin className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Surabaya, Indonesia &middot; Fullstack Software Engineer</span>
            </div>

            <div className="space-y-2.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Dion Subaktiar
              </h1>
              <p className="text-base sm:text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Building enterprise logistics systems with .NET, Laravel, and Next.js.
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              Middle Developer at PT. Besmart Global Indonesia focusing on core business
              workflows, shared backend modules, and supply chain platforms spanning
              order dispatching, shipment telemetry, and customer invoicing.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
              >
                View Projects
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/invoicing-service"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-sm transition-colors"
              >
                Open Invoicing Demo
              </Link>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://github.com/dionsubaktiar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900"
              >
                <FiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://gitlab.clientsolve.com/dion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitLab Profile"
                className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900"
              >
                <FiGitlab className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/dionsubaktiar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:dionsubaktiar@gmail.com"
                aria-label="Email Contact"
                className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors bg-white dark:bg-zinc-900"
              >
                <FiMail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-start md:justify-end">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <Image
                src="/assets/images/profile.png"
                alt="Dion Subaktiar"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Current Role
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white mt-1">
              Middle Developer, PT. Besmart Global Indonesia
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Experience
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white mt-1">
              Since June 2023 (Backend, Web &amp; Logistics)
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Education
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white mt-1 tabular-nums">
              B.Eng. Information Engineering &middot; GPA 3.40
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
