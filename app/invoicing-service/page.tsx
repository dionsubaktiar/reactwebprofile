"use client";

import Link from "next/link";
import Navbar from "../components/navbar";

const MainPageInvoice = () => {
  const links = [
    { href: "/invoicing-service/units", label: "Units" },
    { href: "/invoicing-service/customers", label: "Customers" },
  ];

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <Navbar title="Invoice Service"></Navbar>
      <div className="flex justify-center space-x-4">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            <button className="bg-customGreen-default text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300">
              {label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPageInvoice;
