"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface Invoice {
  id: number;
  kilometer: number;
  tanggal: string;
  harga: number;
  id_package: number;
  status_invoice: string;
  status_spk: string;
  units: Unit;
  packages: Package | null;
  parts: Part[] | null;
  package_items: Package_items[] | null;
}

interface Part {
  id_part: number;
  name: string;
  quantity: number;
  total_price: number;
}

interface Package_items {
  id: number;
  sparepart: string;
  harga_part: number;
  harga_jasa: number;
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

const ViewInvoicePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://personalproject.nusantaratranssentosa.co.id/api/invoice/${id}`
        );
        setInvoice(response.data.data);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (!invoice)
    return (
      <p className="text-center text-lg font-semibold text-red-500">
        No data found
      </p>
    );

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-4xl mx-auto p-6">
        <Navbar title={`Invoice Detail`} />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-eggplant mb-6">
            Invoice Details
          </h2>

          <div className="grid grid-cols-2 gap-4 text-lg">
            <p>
              <strong>Kilometer:</strong>{" "}
              {invoice.kilometer.toLocaleString("id-ID")} KM
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(invoice.tanggal).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {invoice.harga.toLocaleString("id-ID", {
                currency: "IDR",
                style: "currency",
              })}
            </p>
            <p>
              <strong>Status Invoice:</strong> {invoice.status_invoice}
            </p>
            <p>
              <strong>Status SPK:</strong> {invoice.status_spk}
            </p>
          </div>

          {invoice.units && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Unit Information
              </h3>
              <p>
                <strong>Plate Number:</strong> {invoice.units.nopol}
              </p>
              <p>
                <strong>Type:</strong> {invoice.units.tipe}
              </p>
              <p>
                <strong>Driver:</strong> {invoice.units.driver}
              </p>
              <p>
                <strong>Year:</strong> {invoice.units.tahun}
              </p>
            </div>
          )}

          {invoice.units?.customers && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Customer Information
              </h3>
              <p>
                <strong>Company:</strong>{" "}
                {invoice.units.customers.nama_perusahaan}
              </p>
              <p>
                <strong>PIC:</strong> {invoice.units.customers.pic}
              </p>
              <p>
                <strong>Address:</strong> {invoice.units.customers.alamat}
              </p>
            </div>
          )}

          {invoice.parts && invoice.parts.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Parts Detail
              </h3>
              <div className="space-y-2">
                {invoice.parts.map((part) => (
                  <div
                    key={part.id_part}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    <p className="font-semibold">{part.name}</p>
                    <p>
                      {part.total_price.toLocaleString("id-ID", {
                        currency: "IDR",
                        style: "currency",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {invoice.package_items && invoice.package_items.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Package Detail
              </h3>
              <div className="space-y-2">
                {invoice.package_items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    <p className="font-semibold">{item.sparepart}</p>
                    <p>
                      {(item.harga_part + item.harga_jasa).toLocaleString(
                        "id-ID",
                        {
                          currency: "IDR",
                          style: "currency",
                        }
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SuspenseInvoiceEditPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ViewInvoicePage />
  </Suspense>
);

export default SuspenseInvoiceEditPage;
