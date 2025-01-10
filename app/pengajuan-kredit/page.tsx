"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import CreatePinjamanButton from "../components/createPinjamanButton";
import CreateKendaraanButton from "../components/createKendaraanButton";
import CreateKonsumenButton from "../components/createRegistButton";

interface kendaraan {
  id: number;
  dealer: string;
  merk_kendaraan: string;
  model_kendaraan: string;
  warna_kendaraan: string;
  harga_kendaraan: string;
}

interface konsumen {
  id: number;
  username: string;
  email: string;
  nama: string;
  nik: string;
  tanggal_lahir: string;
  status_perkawinan: string;
  data_pasangan: string | null;
}

interface Pinjaman {
  id: number;
  asuransi: string;
  down_payment: string;
  tenor: number;
  angsuran: string;
  kendaraan: kendaraan;
  konsumen: konsumen;
}

const PinjamanPage = () => {
  const [pinjamanData, setPinjamanData] = useState<Pinjaman[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const baseUrl =
    "https://personalproject.nusantaratranssentosa.co.id/api/pinjaman";

  useEffect(() => {
    const fetchPinjamanData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Pinjaman[]>(baseUrl);
        setPinjamanData(response.data);
      } catch (err) {
        console.error("Error fetching pinjaman data:", err);
        setError("Failed to load pinjaman data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPinjamanData();
  }, []);

  // Function to format numbers as currency
  const formatCurrency = (amount: string) => {
    const number = parseFloat(amount);
    if (isNaN(number)) return amount;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-800 dark:text-honeyDew">
        <div className="loader"></div>
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-800 dark:text-honeyDew">
        <p className="text-lg font-semibold">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-customGreen-dark text-white rounded hover:bg-customGreen-default transition dark:bg-customGreen-light dark:text-gray-800"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-4xl mx-auto p-6">
        <Navbar title="Pinjaman" />
        {pinjamanData.length > 0 ? (
          <ul className="space-y-6">
            {pinjamanData.map((pinjaman) => (
              <li
                key={pinjaman.id}
                className="p-4 bg-white rounded shadow border-l-4 border-customGreen-light dark:bg-gray-800 dark:border-customGreen-default dark:shadow-md"
              >
                <div className="flex flex-col space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-customGreen-default dark:text-customGreen-light mb-2">
                      <strong>Nama:</strong> {pinjaman.konsumen.nama}
                    </h2>

                    <div>
                      <p>
                        <strong>Dealer:</strong> {pinjaman.kendaraan.dealer}
                      </p>
                      <p>
                        <strong>Model:</strong>{" "}
                        {pinjaman.kendaraan.model_kendaraan}
                      </p>
                      <p>
                        <strong>Tenor:</strong> {pinjaman.tenor} months
                      </p>
                      <p>
                        <strong>Angsuran:</strong>{" "}
                        {formatCurrency(pinjaman.angsuran)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No pinjaman available.
          </p>
        )}
      </div>

      <CreatePinjamanButton />
      <CreateKendaraanButton />
      <CreateKonsumenButton />
    </div>
  );
};

export default PinjamanPage;
