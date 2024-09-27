import Navbar from "../components/navbar";
import Link from "next/link";
import SectionCardNusantara from "../components/sectionCardNusantara";

const NusantaraPage = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-brandColor-backgroundColor font-productSans">
      <Navbar title="Nusantara Trans Sentosa"></Navbar>
      <SectionCardNusantara
        idSection="home"
        content={
          <div className="flex justify-center flex-col items-center gap-4 py-3">
            <h1 className="text-2xl font-semibold dark:text-white px-5 sm:text-center">
              Kami Berpengalaman dalam Pendistribusian Barang, dengan Cepat &
              Tepat
            </h1>
            <div className="grid grid-cols-2 sm:flex">
              <div></div>
              <Link
                href="/nusantaratrans/#contact"
                className="bg-brandColor-darkenBlue border-2 rounded-xl
            border-brandColor-darkenBlue text-white py-3 px-7
            hover:bg-white hover:text-brandColor-darkenBlue 
            dark:bg-brandColor-darkenRed dark:border-brandColor-darkenRed 
            dark:text-brandColor-backgroundColor hover:dark:bg-transparent hover:dark:text-brandColor-darkenRed
            transition duration-300 ease-in-out"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        }
      ></SectionCardNusantara>
    </div>
  );
};

export default NusantaraPage;
