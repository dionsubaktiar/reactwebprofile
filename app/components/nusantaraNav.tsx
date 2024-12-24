"use client";

import { useState } from "react";
import Image from "next/image";
import { IoReorderThreeOutline } from "react-icons/io5";

interface Link {
  href: string;
  label: string;
}

interface LinkProps {
  links: Link[];
}

// Navbar component that accepts an array of links
const NusantaraNav: React.FC<LinkProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" bg-white dark:bg-brandColor-backgroundColor py-5 px-5 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center justify-center">
        <div className="relative w-12">
          <Image
            src="https://nusantaratranssentosa.co.id/css/Icon.png"
            className="object-cover"
            width={1900}
            height={496}
            alt="logo nusantara trans sentosa"
          />
        </div>
        <div>
          <h2 className="font-productSans font-bold text-black dark:text-white text-xl md:text-2xl py-1 pt-3 px-2">
            Nusantara Trans <br />
            Sentosa
          </h2>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brandColor-darkenBlue border-2 rounded-xl
            border-brandColor-darkenBlue text-white py-2 px-3
            hover:bg-white hover:text-brandColor-darkenBlue 
            dark:bg-brandColor-darkenRed dark:border-brandColor-darkenRed 
            dark:text-brandColor-backgroundColor hover:dark:bg-transparent hover:dark:text-brandColor-darkenRed
            transition duration-300 ease-in-out"
        >
          <IoReorderThreeOutline className="text-2xl" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48  bg-slate-200 dark:bg-brandColor-mainBlue rounded-md shadow-lg z-10 transition duration-200 ease-in">
            <ul className="py-1">
              {links.map((link) => (
                <li
                  key={link.href}
                  className="block transition duration-300 ease-in-out"
                >
                  <a
                    href={link.href}
                    className="block px-4 py-2 dark:text-white dark:hover:bg-brandColor-gradationBlue  hover:bg-slate-100 transition duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NusantaraNav;
