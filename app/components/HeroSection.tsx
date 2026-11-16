"use client";

import Image from "next/image";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import ToggleDarkModeButton from "./toggleDarkMode";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between py-8">
      {/* Top Navigation Row inside Hero */}
      <div className="w-full flex justify-between items-center mb-16">
        <h1 className="text-xl font-poppins font-semibold tracking-wider text-zinc-800 dark:text-zinc-200">
          DION.S
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="#about"
            className="text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            About
          </a>
          <a
            href="#experience"
            className="text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            Projects
          </a>
          <a
            href="#activity"
            className="text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            Activity Log
          </a>
          <span className="w-px h-4 bg-zinc-300 dark:bg-zinc-700"></span>
          <ToggleDarkModeButton />
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 my-auto">
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 dark:bg-indigo-950/30 dark:border-indigo-900/50 dark:text-indigo-400 text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Available for Enterprise Projects
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white font-poppins">
            Dion Subaktiar
          </h2>
          
          <p className="text-lg sm:text-xl font-medium text-indigo-600 dark:text-indigo-400 tracking-wide font-productSans">
            Fullstack Engineer | .NET & Laravel Systems | DevOps & Digital Logistics Specialist
          </p>
          
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed text-base font-light">
            Architecting highly secure, microservices-driven backend environments and bridging them with performant, responsive user interfaces and cloud-native production deployments.
          </p>

          {/* Social Badges and Actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 font-medium text-sm transition-all shadow-sm"
            >
              View Projects
            </a>
            
            <a
              href="https://github.com/dionsubaktiar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              aria-label="GitHub"
            >
              <AiFillGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/dion-subaktiar-767a94279"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              aria-label="LinkedIn"
            >
              <AiFillLinkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/dionsubaktiar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              aria-label="Instagram"
            >
              <AiFillInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Profile Avatar Frame */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
          <div className="absolute inset-0 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rotate-3 transform transition-transform hover:rotate-0 duration-300"></div>
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <Image
              src="/assets/images/profile.png"
              fill
              style={{ objectFit: "cover" }}
              alt="Dion Subaktiar Profile Picture"
              priority
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="hidden md:flex justify-center w-full animate-bounce pt-8">
        <a href="#about" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
