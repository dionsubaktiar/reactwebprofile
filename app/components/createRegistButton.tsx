import Link from "next/link";
import { IoAdd } from "react-icons/io5";

const CreateKonsumenButton = () => {
  return (
    <div className="relative">
      {/* Button to open modal, floated on the right side */}
      <Link href="/pengajuan-kredit/create-konsumen">
        <button className="fixed bottom-36 right-6 px-4 py-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all">
          <div className="flex text-sm md:text-lg">
            <IoAdd /> Konsumen
          </div>
        </button>
      </Link>
    </div>
  );
};

export default CreateKonsumenButton;
