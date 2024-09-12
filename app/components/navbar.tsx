import BackButton from "./backButton";
import ToggleDarkModeButton from "./toggleDarkMode";

interface TitleProps {
  title: string;
}

const Navbar: React.FC<TitleProps> = ({ title }) => {
  return (
    <nav className="pt-7 pb-3 px-5 flex justify-between items-center">
      <div className="flex items-center">
        <BackButton />
      </div>
      <div className="flex items-center">
        <strong className="text-2xl text-eggplant dark:text-honeyDew">
          {title}
        </strong>
      </div>
      <div className="flex items-center">
        <ToggleDarkModeButton />
      </div>
    </nav>
  );
};

export default Navbar;
