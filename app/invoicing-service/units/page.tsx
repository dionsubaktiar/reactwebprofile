"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useState, useEffect } from "react";

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
  no_rangka: string;
  no_mesin: string;
  driver: string;
  tahun: string;
  japo_kir: string;
  japo_pajak: string;
  japo_stnk: string;
  japo_kontrak: string;
  status: number;
  id_customer: number;
  created_at: string;
  updated_at: string;
  customers: Customer;
}

interface Pagination {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface ApiResponse {
  message: string;
  data: {
    current_page: number;
    data: Unit[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

const UnitsPage = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetchUnits = async () => {
      const response = await axios.get<ApiResponse>(
        "https://personalproject.nusantaratranssentosa.co.id/api/unit"
      );

      setUnits(response.data.data.data); // Set unit data
      setPagination(response.data.data); // Set pagination data
    };

    fetchUnits();
  }, []);

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-7xl mx-auto p-6">
        <Navbar title="Units" />

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 dark:text-honeyDew rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-customGreen-dark text-honeyDew">
                <th className="px-4 py-2 text-left">Nomor Polisi</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Driver</th>
                <th className="px-4 py-2 text-left">Year</th>
                <th className="px-4 py-2 text-left">Customer</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id} className="border-t">
                  <td className="px-4 py-2">{unit.nopol}</td>
                  <td className="px-4 py-2">{unit.tipe}</td>
                  <td className="px-4 py-2">{unit.driver}</td>
                  <td className="px-4 py-2">{unit.tahun}</td>
                  <td className="px-4 py-2">
                    {unit.customers.nama_perusahaan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          {pagination?.prev_page_url && (
            <a
              href={pagination.prev_page_url}
              className="text-customGreen-dark hover:text-customGreen-default"
            >
              Previous
            </a>
          )}
          <span>
            Page {pagination?.current_page} of {pagination?.last_page}
          </span>
          {pagination?.next_page_url && (
            <a
              href={pagination.next_page_url}
              className="text-customGreen-dark hover:text-customGreen-default"
            >
              Next
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitsPage;
