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
    <section id="projects" className="py-20 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-medium text-stone-900 dark:text-stone-50">
            Featured Projects
          </h2>
          <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto"></div>
        </div>

        <div className="grid gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="group p-6 md:p-8 rounded-2xl border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900/20 hover:border-stone-300 dark:hover:border-stone-700 transition-colors space-y-6"
            >
              {/* Project Title Block */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <FiFolder size={16} />
                    <span className="text-xs font-medium">
                      Featured Work
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium text-stone-900 dark:text-stone-50 mt-2">
                    {proj.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                {proj.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2">
                {proj.tech.map((t, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-600 dark:bg-stone-900 dark:text-stone-400 border border-stone-200/40 dark:border-stone-800/40"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              {proj.links && proj.links.length > 0 && (
                <div className="border-t border-stone-100 dark:border-stone-800/50 pt-4 flex flex-wrap items-center gap-4">
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    Live productions:
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {proj.links.map((link, linkIdx) => (
                      <a
                        key={linkIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-emerald-700 dark:text-stone-400 dark:hover:text-emerald-400 border border-stone-200 dark:border-stone-800 px-3 py-1.5 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-900/55 transition-colors"
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
