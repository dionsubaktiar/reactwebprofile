import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ClientsSection from "./components/ClientsSection";
import ActivityLogSection from "./components/ActivityLogSection";
import MiniPlayground from "./components/MiniPlayground";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 font-poppins transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Clients Section */}
        <ClientsSection />

        {/* Activity & Operational Logs */}
        <ActivityLogSection />

        {/* Secondary playground / mini apps */}
        <MiniPlayground />
      </main>

      {/* Modern minimal footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-12 transition-colors">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500 dark:text-zinc-600">
          <p>© {new Date().getFullYear()} Dion Subaktiar. All rights reserved.</p>
          <div className="flex gap-6 font-light">
            <a href="#about" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">About</a>
            <a href="#experience" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">Projects</a>
            <a href="#playground" className="hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">Sandbox</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
