import Navbar from "./components/navbar";
import EnhancedHero from "./components/EnhancedHero";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import MiniPlayground from "./components/MiniPlayground";
import ClientsSection from "./components/ClientsSection";
import ActivityLogSection from "./components/ActivityLogSection";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-slate-800 dark:text-zinc-200 selection:bg-indigo-500 selection:text-white">
      {/* Global Navigation Bar: tombol kembali dinonaktifkan di halaman landing */}
      <Navbar showBack={false} />

      <main>
        {/* Hero Section with Live Metrics & Architecture Summary */}
        <EnhancedHero />

        {/* Core Technical Competencies & Architecture Paradigms */}
        <SkillsSection />

        {/* Professional Career Track & Proven Impact */}
        <ExperienceSection />

        {/* Featured Enterprise & Architecture Projects */}
        <ProjectsSection />

        {/* Interactive Live Sandboxes (Termasuk Invoicing, Simulasi Cicilan, PokeAPI, dll) */}
        <MiniPlayground />

        {/* Enterprise Client Trust & Implementations */}
        <ClientsSection />

        {/* Professional Philosophy & Full Stack Values */}
        <AboutSection />

        {/* Audit, Telemetry & Git Engineering Activity */}
        <ActivityLogSection />
      </main>

      {/* Clean Global Footer */}
      <footer className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-10 text-center text-xs text-slate-500 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Dion Subaktiar. Architected with Next.js, TypeScript & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
