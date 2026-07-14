"use client";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold font-poppins text-zinc-900 dark:text-white">
            About Me
          </h2>
          <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Summary & Background */}
          <div className="md:col-span-2 space-y-6 text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            <p>
              I am a versatile Fullstack Developer and Software Engineer with a strong foundation in 
              <strong> Information Engineering</strong> from the 
              <span className="text-zinc-800 dark:text-zinc-200 font-normal"> University of 17 August 1945 Surabaya</span>. 
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
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 space-y-4">
            <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 font-poppins uppercase tracking-wider">
              Academic Background
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">University</p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Univ. 17 Agustus 1945 Surabaya
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">Degree</p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Bachelor of Information Engineering
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">Academic Achievement</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
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
