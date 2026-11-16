import Link from "next/link";
import { IoAdd } from "react-icons/io5";

const CreateArticleButton = () => {
  return (
    <div className="relative">
      {/* Button to open modal, floated on the right side */}

      <Link href="/auth-crud/create">
        <button className="fixed bottom-6 right-6 px-4 py-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all">
          <IoAdd></IoAdd>
        </button>
      </Link>
    </div>
  );
};

export default CreateArticleButton;
