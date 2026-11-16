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
    { href: "/invoicing-service/parts", label: "Parts" },
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
      <Navbar title="Invoice Service" />
      <div className="flex justify-end mb-4 mr-2">
        <div className="flex gap-2">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              <button className="bg-customGreen-default text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300">
                {label}
              </button>
            </Link>
          ))}
          <Link href="/invoicing-service/invoice/create">
            <button className="bg-customGreen-default text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300">
              Create Invoice
            </button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center text-honeyDew h-32">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg mx-2">
          <table className="min-w-full table-auto bg-white dark:bg-gray-800 dark:text-honeyDew">
            <thead>
              <tr className="bg-white text-eggplant">
                {[
                  "Nomor Polisi",
                  "Tanggal",
                  "Kilometer",
                  "Jenis Service",
                  "Customer",
                  "Status",
                  "Actions",
                ].map((col) => (
                  <th key={col} className="px-4 py-2 text-left text-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.map((inv) => (
                <tr key={inv.id} className="border-t">
                  <td className="px-4 py-2 text-nowrap">{inv.units.nopol}</td>
                  <td className="px-4 py-2 text-nowrap">
                    {new Date(inv.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 text-nowrap">
                    {Number(inv.kilometer).toLocaleString("id-ID")} Km
                  </td>
                  <td className="px-4 py-2 text-nowrap">
                    {inv.packages?.kode_packages ?? "ADHOC"}
                  </td>
                  <td className="px-4 py-2">
                    {inv.units.customers.nama_perusahaan}
                  </td>
                  <td className="px-4 py-2">
                    {inv.status_invoice === "Pending" &&
                    inv.status_spk === "Pending"
                      ? "Pending"
                      : inv.status_invoice === "Pending"
                      ? "Invoice Pending"
                      : inv.status_spk === "Pending"
                      ? "SPK Pending"
                      : "Other Status"}
                  </td>
                  <td className="px-4 py-2 relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === inv.id ? null : inv.id
                          )
                        }
                        className="bg-gray-200 text-eggplant px-3 py-1 rounded-md hover:bg-gray-300 transition"
                      >
                        Actions
                      </button>
                      {openDropdown === inv.id && (
                        <div className="absolute right-0 top-full w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          {[
                            {
                              label: "Edit",
                              href: `/invoicing-service/invoice/edit?id=${inv.id}`,
                            },
                            {
                              label: "View",
                              href: `/invoicing-service/invoice/view?id=${inv.id}`,
                            },
                          ].map(({ label, href }) => (
                            <Link key={href} href={href}>
                              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                {label}
                              </button>
                            </Link>
                          ))}
                          <button
                            onClick={() => handleDelete(inv.id)}
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

      <div className="flex justify-between mt-6 mx-2 text-center">
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
