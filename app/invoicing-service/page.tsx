"use client";

import Link from "next/link";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

interface Invoice {
  id: number;
  kilometer: number;
  tanggal: string;
  harga: number;
  id_package: number;
  status_invoice: string;
  status_spk: string;
  units: Unit;
  packages: Package;
}
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

interface Package {
  id: number;
  kode_packages: string | null;
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
    data: Invoice[];
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
  };
}

const MainPageInvoice = () => {
  const links = [
    { href: "/invoicing-service/units", label: "Units" },
    { href: "/invoicing-service/customers", label: "Customers" },
  ];

  const [invoice, setinvoice] = useState<Invoice[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (page = 1) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>(
          "https://personalproject.nusantaratranssentosa.co.id/api/invoice"
        );
        setinvoice(response.data.data.data);
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
          `https://personalproject.nusantaratranssentosa.co.id/api/invoice/${id}`
        );
        setinvoice(invoice.filter((invoice) => invoice.id !== id));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <Navbar title="Invoice Service"></Navbar>
      <div className="flex justify-end mb-4 mr-2">
        <div className="flex justify-center gap-2">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              <button className="bg-customGreen-default text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300">
                {label}
              </button>
            </Link>
          ))}
          <Link href={`invoicing-service/create`}>
            <button className="bg-customGreen-default text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300">
              Create Invoice
            </button>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center text-honeyDew justify-center items-center">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg mx-2">
          <table className="min-w-full table-auto bg-white dark:bg-gray-800 dark:text-honeyDew">
            <thead>
              <tr className="bg-white text-eggplant">
                <th className="px-4 py-2 text-left text-nowrap">
                  Nomor Polisi
                </th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Kilometer</th>
                <th className="px-4 py-2 text-left text-nowrap">
                  Jenis Service
                </th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoice.map((invoice) => (
                <tr key={invoice.id} className="border-t">
                  <td className="px-4 py-2 text-nowrap">
                    {invoice.units.nopol}
                  </td>
                  <td className="px-4 py-2 text-nowrap">
                    {new Date(invoice.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 text-nowrap">
                    {new Number(invoice.kilometer).toLocaleString("id-ID")} Km
                  </td>
                  {invoice.packages ? (
                    <td className="px-4 py-2 text-nowrap">
                      {invoice.packages?.kode_packages}
                    </td>
                  ) : (
                    <td className="px-4 py-2 text-nowrap">ADHOC</td>
                  )}
                  <td className="px-4 py-2">
                    {invoice.units.customers.nama_perusahaan}
                  </td>
                  <td className="px-4 py-2">
                    {invoice.status_invoice === "Pending" &&
                    invoice.status_spk === "Pending"
                      ? "Pending"
                      : invoice.status_invoice === "Pending"
                      ? "Invoice Pending"
                      : invoice.status_spk === "Pending"
                      ? "SPK Pending"
                      : "Other Status"}
                  </td>
                  <td className="px-4 py-2 relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === invoice.id ? null : invoice.id
                          )
                        }
                        className="bg-gray-200 text-eggplant px-3 py-1 rounded-md hover:bg-gray-300 transition"
                      >
                        Actions
                      </button>
                      {openDropdown === invoice.id && (
                        <div className="absolute right-0 top-full w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          <Link
                            href={`/invoicing-service/invoice/edit?id=${invoice.id}`}
                          >
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                              Edit
                            </button>
                          </Link>
                          <Link
                            href={`/invoicing-service/invoice/view?id=${invoice.id}`}
                          >
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                              View
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(invoice.id)}
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

export default MainPageInvoice;
