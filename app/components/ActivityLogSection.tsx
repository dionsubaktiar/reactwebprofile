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
    icon: <FiCpu className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />,
    details: [
      "Engineered single-transaction database operations (atomic commits) to secure critical verify/settlement workflows, resolving out-of-order execution issues.",
      "Designed dynamic Lead Time and Max Registration Time tracking scripts matching driver sitetime parameters.",
      "Programmed automated route naming generators that map transit trajectories from origin to last destination automatically."
    ]
  },
  {
    project: "Android Driver Telemetry App",
    category: "Mobile & Telemetry Engineering",
    icon: <FiSmartphone className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />,
    details: [
      "Architected background GPS location capture routines on Android (Kotlin/Jetpack Compose) configured to sync real-time coordinates between journey Start and Stop events.",
      "Built interactive sign-and-canvas UI modules for secure driver signatures.",
      "Integrated secure staging routing targeting UAT servers over Cloudflare proxies."
    ]
  },
  {
    project: "Rins Global Logistics Infrastructure",
    category: "DevOps & Cloud Deployments",
    icon: <FiGitBranch className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />,
    details: [
      "Configured automated Git-to-cPanel deployments utilizing GitHub Actions and SSH commands to minimize manual pipeline errors.",
      "Designed secure production server environment configurations including MySQL RDBMS setup.",
      "Upgraded Next.js configurations to address legacy module dependencies security warnings."
    ]
  },
  {
    project: "DevOps Operations & Fleet Management",
    category: "Systems Administration",
    icon: <FiCode className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />,
    details: [
      "Orchestrated Docker environments for SIT/UAT staging using custom yaml configuration profiles.",
      "Developed automated alarm algorithms to flag expiring vehicle taxes (STNK), driving licenses (SIM), and road safety tests (KIR) with color-coded dashboard indicators."
    ]
  }
];

const ActivityLogSection = () => {
  return (
    <section id="activity" className="py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Systems &amp; Engineering Operations Log
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Selected backend optimizations, mobile telemetry work, and infrastructure setups.
          </p>
        </div>

        {/* Log Entries Layout */}
        <div className="space-y-6">
          {logs.map((log, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Left Column: Icon & Metas */}
              <div className="flex md:flex-col items-center md:items-start gap-4 md:w-48 flex-shrink-0">
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  {log.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block">
                    {log.category}
                  </span>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {log.project}
                </h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc pl-4">
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
