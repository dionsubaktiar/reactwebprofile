import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import InvoicingSection from "./components/InvoicingSection";
import ProjectsSection from "./components/ProjectsSection";
import ClientsSection from "./components/ClientsSection";
import MiniPlayground from "./components/MiniPlayground";
import ActivityLogSection from "./components/ActivityLogSection";

export const metadata = {
  title: "Dion Subaktiar | Senior Software Engineer & System Architect",
  description:
    "Portfolio profesional Dion Subaktiar - Senior Software Engineer & System Architect berpengalaman dalam backend microservices, sistem invoicing, simulasi kredit, dan arsitektur enterprise.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50 pb-20 md:pb-12">
      {/* Top Navigation Bar */}
      <Navbar title="Dion Subaktiar" subtitle="Senior Software Engineer" />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 pt-6 sm:pt-10">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. About Section */}
        <AboutSection />

        {/* 3. Skills Section */}
        <SkillsSection />

        {/* 4. Experience Section */}
        <ExperienceSection />

        {/* 5. Invoicing & Billing Simulation Section (Reactivated & Enhanced) */}
        <InvoicingSection />

        {/* 6. Projects Section */}
        <ProjectsSection />

        {/* 7. Clients & Partners Section */}
        <ClientsSection />

        {/* 8. Interactive Mini Playground */}
        <MiniPlayground />

        {/* 9. Activity Log Section */}
        <ActivityLogSection />
      </main>

      {/* Landing Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Dion Subaktiar. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a href="#invoicing" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Simulasi Invoicing
            </a>
            <span className="text-slate-300 dark:text-zinc-700">•</span>
            <a href="/invoicing-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Portal Invoicing
            </a>
            <span className="text-slate-300 dark:text-zinc-700">•</span>
            <a href="/simulasi-cicilan" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Simulasi Cicilan
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
