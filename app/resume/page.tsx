import CardResume from "../components/cardResume";
import Navbar from "../components/navbar";

const Resume = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 font-poppins transition-colors duration-300">
      <main className="max-w-xl w-full mx-auto px-4 py-8 flex-grow">
        <Navbar title="Sandbox Directory" />
        <section className="mt-8 space-y-4">
          <CardResume
            title="BMI & BFP Calculator"
            href="/bmi"
            description="On-the-fly computational logic implemented in TypeScript. Zero backend dependencies."
          />
          <CardResume
            title="Auth and CRUD using Laravel"
            href="/auth-crud/login"
            description="Integrating Socialite OAuth, RBAC (Role-Based Access Control), and core data persistence architectures."
          />
          <CardResume
            title="Simulasi Kredit"
            href="/simulasi-cicilan"
            description="Dynamic financial compounding loan schedules calculated inside client-side React hooks."
          />
          <CardResume
            title="Fake Posts API"
            href="/posts"
            description="Consuming REST endpoints asynchronously with custom loading states and card listings."
          />
          <CardResume
            title="PokeAPI"
            href="/pokeapi"
            description="Consuming and listing structured endpoints dynamically with rich image previews."
          />
          <CardResume
            title="Nusantara Trans Sentosa"
            description="Custom touch-swipe sliders and viewport-optimized landing templates for Nusantara Trans using SwiperJS."
            href="/nusantaratrans"
          />
        </section>
      </main>
    </div>
  );
};

export default Resume;
