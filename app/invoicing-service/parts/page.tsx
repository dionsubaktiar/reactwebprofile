"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Payload {
  message: string;
  data: {
    current_page: number;
    data: Parts[];
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}

interface Pagination {
  current_page: number;
  last_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
}

interface Parts {
  id: number;
  part_number: string | null;
  nama_barang: string;
  merk: string;
  kendaraan: string;
  harga: number;
  jasa: number;
}

const PartsPage = () => {
  const [parts, setParts] = useState<Parts[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await axios.get<Payload>(
          `https://personalproject.nusantaratranssentosa.co.id/api/part?page=${page}`
        );
        setParts(response.data.data.data);
        setPagination(response.data.data);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(
          `https://personalproject.nusantaratranssentosa.co.id/api/parts/${id}`
        );
        setParts(parts.filter((part) => part.id !== id));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <Navbar title="Parts" />
      <div className="flex justify-end mb-4 mx-2">
        <Link href="/invoicing-service/parts/create">
          <button className="bg-customGreen-default text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300">
            Create New Data
          </button>
        </Link>
      </div>
      {isLoading ? (
        <div className="text-center text-honeyDew">Loading...</div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg mx-2">
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
              {parts.map((part) => (
                <tr
                  key={part.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{part.nama_barang}</td>
                  <td className="px-4 py-2">{part.part_number}</td>
                  <td className="px-4 py-2">{part.kendaraan}</td>
                  <td className="px-4 py-2">{part.merk}</td>
                  <td className="px-4 py-2 relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === part.id ? null : part.id
                          )
                        }
                        className="bg-gray-200 text-eggplant px-3 py-1 rounded-md hover:bg-gray-300 transition"
                      >
                        Actions
                      </button>
                      {openDropdown === part.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <button
                            onClick={() => handleDelete(part.id)}
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

      <div className="flex justify-between mt-6 mx-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!pagination?.prev_page_url}
          className={`px-4 py-2 rounded-md ${
            pagination?.prev_page_url
              ? "bg-customGreen-dark text-white hover:bg-customGreen-default"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        <span>
          Page {pagination?.current_page} of {pagination?.last_page}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!pagination?.next_page_url}
          className={`px-4 py-2 rounded-md ${
            pagination?.next_page_url
              ? "bg-customGreen-dark text-white hover:bg-customGreen-default"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default PartsPage;
