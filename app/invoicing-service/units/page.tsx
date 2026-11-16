"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Customer {
  id: number;
  nama_perusahaan: string;
  alamat: string;
  pic: string;
  kontak: string;
  created_at: string;
  updated_at: string;
}

interface Unit {
  id: number;
  nopol: string;
  tipe: string;
  driver: string;
  tahun: string;
  id_customer: number;
  customers: Customer;
}

interface Pagination {
  current_page: number;
  last_page: number;
  prev_page_url: string | null;
  next_page_url: string | null;
}

interface ApiResponse {
  message: string;
  data: {
    current_page: number;
    data: Unit[];
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
  };
}

const UnitsPage = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUnits = async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>(
          `https://personalproject.nusantaratranssentosa.co.id/api/unit?page=${page}`
        );
        setUnits(response.data.data.data);
        setPagination(response.data.data);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnits(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(
          `https://personalproject.nusantaratranssentosa.co.id/api/unit/${id}`
        );
        setUnits(units.filter((unit) => unit.id !== id));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      {/* <div className="max-w-7xl mx-auto p-6"> */}
      <Navbar title="Units" />

      <div className="flex justify-end mb-4 mx-2">
        <Link href="/invoicing-service/units/create">
          <button className="bg-customGreen-default text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300">
            Create New Data
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center text-honeyDew">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 dark:text-honeyDew rounded-lg shadow-md mx-2">
          <table className="min-w-full table-auto overflow-visible">
            <thead>
              <tr className="bg-white text-eggplant">
                <th className="px-4 py-2 text-left">Nomor Polisi</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Driver</th>
                <th className="px-4 py-2 text-left">Year</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="overflow-visible">
              {units.map((unit) => (
                <tr key={unit.id} className="border-t">
                  <td className="px-4 py-2 text-nowrap">{unit.nopol}</td>
                  <td className="px-4 py-2">{unit.tipe}</td>
                  <td className="px-4 py-2 text-nowrap">{unit.driver}</td>
                  <td className="px-4 py-2">{unit.tahun}</td>
                  <td className="px-4 py-2 text-nowrap">
                    {unit.customers.nama_perusahaan}
                  </td>
                  <td className="px-4 py-2 relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === unit.id ? null : unit.id
                          )
                        }
                        className="bg-gray-200 text-eggplant px-3 py-1 rounded-md hover:bg-gray-300 transition"
                      >
                        Actions
                      </button>
                      {openDropdown === unit.id && (
                        <div className="absolute right-0 top-full w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          <Link
                            href={`/invoicing-service/units/edit?id=${unit.id}`}
                          >
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                              Edit
                            </button>
                          </Link>
                          <Link
                            href={`/invoicing-service/units/view?id=${unit.id}`}
                          >
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                              View
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(unit.id)}
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

export default UnitsPage;
