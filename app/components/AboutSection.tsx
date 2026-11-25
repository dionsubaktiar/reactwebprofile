const AboutSection = () => {
  return (
    <section id="about" className="py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            About Me
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Engineering background and academic foundation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Summary & Background */}
          <div className="md:col-span-2 space-y-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>
              I am a versatile Fullstack Developer and Software Engineer with a strong foundation in{" "}
              <strong>Information Engineering</strong> from the{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">University of 17 August 1945 Surabaya</span>.
              With a proven track record in enterprise software development, I specialize in architecting
              highly scalable business platforms, designing microservices, and orchestrating complex
              corporate supply chain workflows—ranging from vendor procurement automation to client billing ecosystems.
            </p>
            <p>
              Driven by robust logical engineering and modern infrastructure management, I successfully
              bridge secure, microservices-driven backend environments with responsive user interfaces
              and cloud-native production deployments.
            </p>
          </div>

          {/* Academic Stats Box */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
              Academic Background
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">University</p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Univ. 17 Agustus 1945 Surabaya
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Degree</p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Bachelor of Information Engineering
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Academic Achievement</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tabular-nums">
                    GPA: 3.40 / 4.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
