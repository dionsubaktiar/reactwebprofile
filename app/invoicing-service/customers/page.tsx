"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import Link from "next/link";

interface Customers {
  id: number;
  nama_perusahaan: string;
  alamat: string;
  pic: string;
  kontak: string;
}

const CustomerPage = () => {
  const [companies, setCompanies] = useState<Customers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://personalproject.nusantaratranssentosa.co.id/api/customer"
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(
          `https://personalproject.nusantaratranssentosa.co.id/api/customer/${id}`
        );
        setCompanies(companies.filter((company) => company.id !== id));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Companies" />

        <div className="flex justify-end mb-4">
          <Link href="/invoicing-service/customers/create">
            <button className="bg-customGreen-default text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300">
              Create New Data
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center text-honeyDew">Loading...</div>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto bg-white dark:bg-gray-800 dark:text-honeyDew">
              <thead>
                <tr className="bg-white text-eggplant">
                  <th className="px-4 py-2 text-left">Nama Perusahaan</th>
                  <th className="px-4 py-2 text-left">Alamat</th>
                  <th className="px-4 py-2 text-left">PIC</th>
                  <th className="px-4 py-2 text-left">Kontak</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr
                    key={company.id}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-4 py-2">{company.nama_perusahaan}</td>
                    <td className="px-4 py-2">{company.alamat}</td>
                    <td className="px-4 py-2">{company.pic}</td>
                    <td className="px-4 py-2">{company.kontak}</td>
                    <td className="px-4 py-2 relative">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === company.id ? null : company.id
                            )
                          }
                          className="bg-gray-200 text-eggplant px-3 py-1 rounded-md hover:bg-gray-300 transition"
                        >
                          Actions
                        </button>
                        {openDropdown === company.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <Link
                              href={`/invoicing-service/customers/edit?id=${company.id}`}
                            >
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(company.id)}
                              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
