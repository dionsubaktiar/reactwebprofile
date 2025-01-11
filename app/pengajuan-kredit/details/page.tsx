"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/navbar";

// Define the interface for the data structure
interface Konsumen {
  id: number;
  username: string;
  email: string;
  nama: string;
  nik: string;
  tanggal_lahir: string;
  status_perkawinan: string;
  data_pasangan: string | null;
  created_at: string;
  updated_at: string;
}

interface Kendaraan {
  id: number;
  dealer: string;
  merk_kendaraan: string;
  model_kendaraan: string;
  warna_kendaraan: string;
  harga_kendaraan: string;
  created_at: string;
  updated_at: string;
}

interface PinjamanData {
  id: number;
  asuransi: string;
  down_payment: string;
  tenor: number;
  angsuran: string;
  id_kendaraan: number;
  id_user: number;
  created_at: string;
  updated_at: string;
  konsumen: Konsumen;
  kendaraan: Kendaraan;
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const ViewDetailPage = () => {
  const [data, setData] = useState<PinjamanData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the ID from query params

  useEffect(() => {
    if (!id) {
      setError("No ID provided.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://personalproject.nusantaratranssentosa.co.id/api/pinjaman/${id}`,
          { withCredentials: true }
        );
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      <div className="flex items-center justify-center min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-800 dark:text-honeyDew">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-5xl mx-auto p-6">
        <Navbar title="Detail Pembiayaan" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Data Pinjaman Section */}
          <div className="bg-white shadow-md p-4 rounded dark:bg-gray-800 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">
              Detail Pinjaman
            </h2>
            <p>
              <span className="font-semibold">Asuransi:</span>{" "}
              {currencyFormatter.format(Number(data?.asuransi))}
            </p>
            <p>
              <span className="font-semibold">Down Payment:</span>{" "}
              {currencyFormatter.format(Number(data?.down_payment))}
            </p>
            <p>
              <span className="font-semibold">Tenor:</span> {data?.tenor} bulan
            </p>
            <p>
              <span className="font-semibold">Angsuran:</span>{" "}
              {currencyFormatter.format(Number(data?.angsuran))}
            </p>
          </div>
          {/* Konsumen Section */}
          <div className="bg-white shadow-md p-4 rounded dark:bg-gray-800 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Detail Konsumen</h2>
            <p>
              <span className="font-semibold">Nama:</span> {data?.konsumen.nama}
            </p>
            <p>
              <span className="font-semibold">Username:</span>{" "}
              {data?.konsumen.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {data?.konsumen.email}
            </p>
            <p>
              <span className="font-semibold">NIK:</span> {data?.konsumen.nik}
            </p>
            <p>
              <span className="font-semibold">Tanggal Lahir:</span>{" "}
              {data?.konsumen.tanggal_lahir}
            </p>
            <p>
              <span className="font-semibold">Status Perkawinan:</span>{" "}
              {data?.konsumen.status_perkawinan}
            </p>
            {data?.konsumen.data_pasangan && (
              <p>
                <span className="font-semibold">Data Pasangan:</span>{" "}
                {data?.konsumen.data_pasangan}
              </p>
            )}
          </div>

          {/* Kendaraan Section */}
          <div className="bg-white shadow-md p-4 rounded dark:bg-gray-800 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Detail Kendaraan</h2>
            <p>
              <span className="font-semibold">Dealer:</span>{" "}
              {data?.kendaraan.dealer}
            </p>
            <p>
              <span className="font-semibold">Merk Kendaraan:</span>{" "}
              {data?.kendaraan.merk_kendaraan}
            </p>
            <p>
              <span className="font-semibold">Model Kendaraan:</span>{" "}
              {data?.kendaraan.model_kendaraan}
            </p>
            <p>
              <span className="font-semibold">Warna Kendaraan:</span>{" "}
              {data?.kendaraan.warna_kendaraan}
            </p>
            <p>
              <span className="font-semibold">Harga Kendaraan:</span>{" "}
              {currencyFormatter.format(
                Number(data?.kendaraan.harga_kendaraan)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailPage;
