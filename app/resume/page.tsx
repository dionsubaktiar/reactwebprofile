import CardResume from "../components/cardResume";
import Navbar from "../components/navbar";
import ResumeItemButton from "../components/resumeItemButton";

const Resume = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gradient-to-b from-teal-600 to-black dark:text-gray-200">
      <Navbar title="Resume" />
      <main className="flex flex-1 items-center justify-center px-10 font-poppins">
        <section>
          <CardResume>
            <ResumeItemButton
              title="Fake Posts API"
              href="/posts"
              description="This project was build using React TSX and Tailwind as Front-End, API are provided by JSON Placeholder at https://jsonplaceholder.typicode.com/posts"
            />
          </CardResume>
        </section>
      </main>
    </div>
  );
};

export default Resume;
