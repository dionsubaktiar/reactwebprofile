import CardResume from "../components/cardResume";
import Navbar from "../components/navbar";
//import ResumeItemButton from "../components/resumeItemButton";

const Resume = () => {
  return (
    <div className="min-h-screen flex flex-col text-eggplant bg-honeyDew dark:bg-eggplant dark:text-honeyDew">
      <Navbar title="Resume" />
      <main className="flex flex-1 items-center justify-center px-10 font-poppins">
        <section>
          <CardResume
            title="Fake Posts API"
            href="/posts"
            description="This project is build using React TSX and Tailwind as Front-End, API are provided by JSON Placeholder"
          ></CardResume>
          <CardResume
            title="PokeAPI"
            href="/pokeapi"
            description="This Project is build using React TSX and Tailwind as Front-End, API are provided by PokeAPI V2"
          ></CardResume>
        </section>
      </main>
    </div>
  );
};

export default Resume;
{
  /* <ResumeItemButton
              title="Fake Posts API"
              href="/posts"
              description="This project was build using React TSX and Tailwind as Front-End, API are provided by JSON Placeholder at https://jsonplaceholder.typicode.com/posts"
            /> */
}
