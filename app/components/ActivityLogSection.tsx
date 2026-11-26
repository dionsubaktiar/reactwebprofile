"use client";

import { FiCode, FiCpu, FiGitBranch, FiSmartphone } from "react-icons/fi";

interface LogItem {
  project: string;
  category: string;
  icon: React.ReactNode;
  details: string[];
}

const logs: LogItem[] = [
  {
    project: "SIV_Jalan Transport Logistics Platform",
    category: "Backend & Systems Architecture",
    icon: <FiCpu size={16} className="text-stone-500" />,
    details: [
      "Engineered single-transaction database operations (atomic commits) to secure critical verify/settlement workflows, resolving out-of-order execution issues.",
      "Designed dynamic Lead Time and Max Registration Time tracking scripts matching driver sitetime parameters.",
      "Programmed automated route naming generators that map transit trajectories from origin to last destination automatically."
    ]
  },
  {
    project: "Android Driver Telemetry App",
    category: "Mobile & Telemetry Engineering",
    icon: <FiSmartphone size={16} className="text-stone-500" />,
    details: [
      "Architected background GPS location capture routines on Android (Kotlin/Jetpack Compose) configured to sync real-time coordinates between journey Start and Stop events.",
      "Built interactive sign-and-canvas UI modules for secure driver signatures.",
      "Integrated secure staging routing targeting UAT servers over Cloudflare proxies."
    ]
  },
  {
    project: "Rins Global Logistics Infrastructure",
    category: "DevOps & Cloud Deployments",
    icon: <FiGitBranch size={16} className="text-stone-500" />,
    details: [
      "Configured automated Git-to-cPanel deployments utilizing GitHub Actions and SSH commands to minimize manual pipeline errors.",
      "Designed secure production server environment configurations including MySQL RDBMS setup.",
      "Upgraded Next.js configurations to address legacy module dependencies security warnings."
    ]
  },
  {
    project: "DevOps Operations & fleet Management",
    category: "Systems Administration",
    icon: <FiCode size={16} className="text-stone-500" />,
    details: [
      "Orchestrated Docker environments for SIT/UAT staging using custom yaml configuration profiles.",
      "Developed automated alarm algorithms to flag expiring vehicle taxes (STNK), driving licenses (SIM), and road safety tests (KIR) with color-coded dashboard indicators."
    ]
  }
];

const ActivityLogSection = () => {
  return (
    <section id="activity" className="py-20 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-medium text-stone-900 dark:text-stone-50">
            Systems & Engineering Operations Log
          </h2>
          <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto"></div>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto">
            A real-time chronicle of recent systems integrations, backend optimizations, and infrastructure deployments.
          </p>
        </div>

        {/* Log Entries Layout */}
        <div className="space-y-8">
          {logs.map((log, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/10 flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Left Column: Icon & Metas */}
              <div className="flex md:flex-col items-center md:items-start gap-4 md:w-48 flex-shrink-0">
                <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  {log.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 block">
                    {log.category}
                  </span>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-medium text-stone-900 dark:text-stone-50">
                  {log.project}
                </h3>
                <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed list-disc pl-4">
                  {log.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivityLogSection;
