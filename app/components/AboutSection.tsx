const AboutSection = () => {
  return (
    <section id="about" className="py-16 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 dark:text-white">
            About Me
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Engineering background and academic foundation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Summary & Background */}
          <div className="md:col-span-2 space-y-5 text-stone-600 dark:text-stone-400 leading-relaxed">
            <p>
              I am a Fullstack Developer and Software Engineer with a background in{" "}
              <strong>Information Engineering</strong> from the{" "}
              <span className="text-stone-800 dark:text-stone-200 font-medium">University of 17 August 1945 Surabaya</span>.
              In enterprise software development, I architect business platforms, design microservices, and
              orchestrate supply chain workflows — from vendor procurement automation to client billing.
            </p>
            <p>
              I bridge secure, microservices-driven backends with responsive interfaces
              and cloud-native deployments.
            </p>
          </div>

          {/* Academic Stats Box */}
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-medium text-sm text-stone-800 dark:text-stone-200">
              Academic background
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400">University</p>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                  Univ. 17 Agustus 1945 Surabaya
                </p>
              </div>

              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400">Degree</p>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
                  Bachelor of Information Engineering
                </p>
              </div>

              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400">Academic achievement</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium tabular-nums">
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
