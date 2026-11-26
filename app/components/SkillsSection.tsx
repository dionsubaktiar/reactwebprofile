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
    <section id="skills" className="py-16 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 dark:text-white">
            Core Competencies
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Backend services, frontend interfaces, infrastructure, and logistics domain workflows.
          </p>
        </div>

        {/* Desktop tabbed / Grid responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tabs buttons column */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-2 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 md:pr-6 whitespace-nowrap">
            {skillCategories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  activeTab === index
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-400 font-medium"
                    : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Active category details grid */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-medium text-stone-800 dark:text-stone-200">
              {skillCategories[activeTab].title}
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {skillCategories[activeTab].skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900/30 flex items-center gap-3 hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
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
