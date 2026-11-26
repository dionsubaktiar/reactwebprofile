"use client";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-medium text-stone-900 dark:text-stone-50">
            About Me
          </h2>
          <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Summary & Background */}
          <div className="md:col-span-2 space-y-6 text-stone-600 dark:text-stone-400 leading-relaxed">
            <p>
              I am a versatile Fullstack Developer and Software Engineer with a strong foundation in 
              <strong> Information Engineering</strong> from the 
              <span className="text-stone-800 dark:text-stone-200 font-normal"> University of 17 August 1945 Surabaya</span>. 
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
          <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800/80 space-y-4">
            <h3 className="font-medium text-sm text-stone-800 dark:text-stone-200">
              Academic Background
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
                <p className="text-xs text-stone-500 dark:text-stone-400">Academic Achievement</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs tabular-nums text-emerald-700 dark:text-emerald-400">
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
