"use client";

import { useState } from "react";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Systems",
    skills: [
      ".NET (C#)",
      "Laravel (PHP)",
      "Microservices Architecture",
      "RESTful API Design",
      "RDBMS & SQL Query Optimization",
      "Database Schema Design (PostgreSQL/MySQL)"
    ]
  },
  {
    title: "Frontend & UI Core",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "PrimeReact",
      "React Table",
      "SwiperJS",
      "TypeScript"
    ]
  },
  {
    title: "DevOps & CI-CD",
    skills: [
      "VPS Management",
      "Cloudflare DNS & WAF Setup",
      "Tailscale Secure VPN",
      "Vercel Deployments",
      "GitHub Actions CI/CD",
      "Docker Environment Setup"
    ]
  },
  {
    title: "Business Logic Core",
    skills: [
      "Supply Chain Workflows",
      "Order Blasting Automation",
      "Real-time Transit Tracking",
      "Automated Customer Invoicing",
      "Logistics Billing Systems",
      "Geolocation Validations"
    ]
  },
  {
    title: "Project Management",
    skills: [
      "Agile & Scrum Methodologies",
      "Technical Task Decomposition",
      "DevOps Coordination",
      "Enterprise System Orchestration",
      "System Documentation & API Specs",
      "Release Management"
    ]
  },
  {
    title: "AI Research & Analytics",
    skills: [
      "MATLAB Computational Logic",
      "Deep Learning Modeling",
      "U-Net Medical Image Segmentation",
      "Computer Vision Tools"
    ]
  }
];

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Core Competencies
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Backend services, frontend interfaces, infrastructure, and logistics domain workflows.
          </p>
        </div>

        {/* Desktop tabbed / Grid responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tabs buttons column */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-2 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 md:pr-6 whitespace-nowrap">
            {skillCategories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  activeTab === index
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/45 dark:text-indigo-400 font-semibold"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Active category details grid */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
              {skillCategories[activeTab].title}
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {skillCategories[activeTab].skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 flex items-center gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
