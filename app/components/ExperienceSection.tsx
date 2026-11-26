"use client";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Middle Developer",
    company: "PT. Besmart Global Indonesia",
    period: "December 2025 - Present",
    bullets: [
      "Leading collaborative discussions and modeling core business logic & system workflow architectures.",
      "Conducting extensive research and development for shared core library modules to standardize backend operations.",
      "Designing and implementing background job schedulers and automation tasks for high-concurrency systems.",
      "Supervising git branching strategies, pull requests, and conducting structural code reviews for database migrations."
    ],
    tags: [
      "System Workflows",
      "Logic Design",
      "Library R&D",
      "Job Schedulers",
      "Code Reviews",
      "Git Branching",
      "Database Migrations"
    ],
  },
  {
    role: "Junior Developer",
    company: "PT. Besmart Global Indonesia",
    period: "March 2025 - December 2025",
    bullets: [
      "Architecting and developing secure, highly maintainable Backend Microservices utilizing C# and the .NET framework ecosystem.",
      "Building dynamic, responsive, and performance-optimized Frontend Microservices leveraging React.js, Next.js, and advanced data architectures.",
      "Integrating intricate third-party libraries and web tools to optimize analytical interfaces and core enterprise data flows.",
      "Participating in end-to-end development lifecycles, structured code reviews, and microservice integration testing."
    ],
    tags: [
      ".NET Core",
      "C#",
      "Microservices",
      "React.js",
      "Next.js",
      "REST APIs",
      "Integration Testing",
    ],
  },
  {
    role: "IT Specialist & Developer",
    company: "PT Nusantara Trans Sentosa",
    period: "January 2024 - December 2024",
    bullets: [
      "Engineered and deployed custom production websites and infrastructure for corporate transport logistics ecosystems (including live domains: nusantaratranssentosa.co.id).",
      "Managed, configured, and optimized independent cloud infrastructure including VPS (Virtual Private Servers) and production deployment pipelines.",
      "Implemented secure corporate routing and remote network environments utilizing Tailscale VPN and Cloudflare proxies for enhanced data protection.",
      "Developed internal operational programs aimed at automating tracking metrics, resolving critical network bottlenecks, and decreasing manual operational processing.",
    ],
    tags: [
      "Logistics Tech",
      "VPS Management",
      "Tailscale VPN",
      "Cloudflare WAF/DNS",
      "Network Routing",
      "Infrastructure automation",
    ],
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Self-Employed",
    period: "June 2023 - January 2024",
    bullets: [
      "Successfully developed and published operational landing and corporate web solutions (such as rinsgloballogistic.com), matching complex business demands with performant tech stacks.",
      "Utilized Laravel (PHP) for robust backend architecture, data persistence handling, and secure RESTful API development.",
      "Designed optimized Relational Database Management Systems (RDBMS) schemas, ensuring highly efficient queries for concurrent users.",
    ],
    tags: [
      "Laravel (PHP)",
      "RDBMS",
      "Database Optimization",
      "API Integration",
      "Corporate Landing Pages",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="py-20 border-t border-stone-200 dark:border-stone-800"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-medium text-stone-900 dark:text-stone-50">
            Professional Experience
          </h2>
          <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto"></div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-stone-200 dark:border-stone-800 ml-4 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-10 group">
              {/* Timeline Indicator Dot */}
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950"></span>

              <div className="space-y-3">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <h3 className="text-xl font-medium text-stone-900 dark:text-stone-50">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      {exp.company}
                    </p>
                  </div>
                  <span className="inline-block text-xs font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 px-3 py-1 rounded-md w-max">
                    {exp.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed list-disc pl-4">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-600 dark:bg-stone-900 dark:text-stone-400 border border-stone-200/50 dark:border-stone-800/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
