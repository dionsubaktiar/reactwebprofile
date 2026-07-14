"use client";

import { FiExternalLink, FiFolder } from "react-icons/fi";

interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  links?: { label: string; url: string }[];
}

const projects: ProjectItem[] = [
  {
    title: "End-to-End Digital Logistics & Supply Chain Management System",
    description: 
      "A massive internal logistics system automating the entire supply chain business cycle. " +
      "The system handles automated order blasting to partner vendor/carrier networks, real-time " +
      "shipment transit tracking, and automated customer billing and invoice reconciliation workflows.",
    tech: [".NET Microservices", "Laravel (PHP)", "React.js", "Next.js", "PostgreSQL"],
    links: [
      { label: "Rins Global Logistic", url: "https://rinsgloballogistic.com" },
      { label: "Nusantara Trans Sentosa", url: "https://nusantaratranssentosa.co.id" }
    ]
  },
  {
    title: "Medical Image Segmentation Tool (Research)",
    description: 
      "Developed a custom deep learning medical image segmentation tool utilizing MATLAB and the U-Net convolutional neural network architecture. " +
      "This system delivers highly precise automated segmentation of medical scans, providing critical visual data to support research in digital health classification and diagnostics.",
    tech: ["MATLAB", "U-Net Architecture", "Computer Vision Toolboxes", "Deep Learning"]
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold font-poppins text-zinc-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="group p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300 space-y-6"
            >
              {/* Project Title Block */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <FiFolder size={20} />
                    <span className="text-xs font-semibold uppercase tracking-wider font-poppins">
                      Featured Work
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white font-poppins mt-2">
                    {proj.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                {proj.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800/40"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              {proj.links && proj.links.length > 0 && (
                <div className="border-t border-zinc-100 dark:border-zinc-800/50 pt-4 flex flex-wrap items-center gap-4">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                    Live Productions:
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {proj.links.map((link, linkIdx) => (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/55 transition-colors"
                      >
                        {link.label}
                        <FiExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
