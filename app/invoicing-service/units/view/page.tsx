"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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
  japo_kontrak: string | null;
  status: number;
  id_customer: number;
  created_at: string;
  updated_at: string;
  customers: Customer;
}

const UnitDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [unit, setUnit] = useState<Unit | null>(null);

  useEffect(() => {
    const fetchUnitDetail = async () => {
      try {
        const response = await axios.get(
          `https://personalproject.nusantaratranssentosa.co.id/api/unit/${id}`
        );
        setUnit(response.data.data);
      } catch (error) {
        console.error("Error fetching unit details:", error);
      }
    };

    if (id) fetchUnitDetail();
  }, [id]);

  if (!unit)
    return (
      <div className="flex items-center justify-center bg-customGreen-light dark:bg-gray-900 h-full min-h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-4xl mx-auto p-6">
        <Navbar title={`Unit Detail`} />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-eggplant mb-4">
            Unit Information
          </h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="font-semibold text-nowrap">No Polisi:</td>
                <td className="text-right">{unit.nopol}</td>
              </tr>
              <tr>
                <td className="font-semibold">Tipe:</td>
                <td className="text-right">{unit.tipe}</td>
              </tr>
              <tr>
                <td className="font-semibold text-nowrap">No Rangka:</td>
                <td className="text-right">{unit.no_rangka}</td>
              </tr>
              <tr>
                <td className="font-semibold text-nowrap">No Mesin:</td>
                <td className="text-right">{unit.no_mesin}</td>
              </tr>
              <tr>
                <td className="font-semibold">Driver:</td>
                <td className="text-right">{unit.driver}</td>
              </tr>
              <tr>
                <td className="font-semibold">Tahun:</td>
                <td className="text-right">{unit.tahun}</td>
              </tr>
              <tr>
                <td className="font-semibold text-nowrap">KIR:</td>
                <td className="text-right">
                  {new Date(unit.japo_kir).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-nowrap">Pajak:</td>
                <td className="text-right">
                  {new Date(unit.japo_pajak).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-nowrap">STNK:</td>
                <td className="text-right">
                  {new Date(unit.japo_stnk).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
              {unit.japo_kontrak && (
                <tr>
                  <td className="font-semibold text-nowrap">Kontrak:</td>
                  <td className="text-right">
                    {new Date(unit.japo_kontrak).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              )}
              {unit.status == 1 ? (
                <tr>
                  <td className="font-semibold">Status:</td>
                  <td className="text-right">Terdaftar</td>
                </tr>
              ) : (
                <tr>
                  <td className="font-semibold">Status:</td>
                  <td className="text-right">Tidak Terdaftar</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold text-eggplant mb-4">
            Customer Information
          </h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="font-semibold">Nama Perusahaan:</td>
                <td>{unit.customers.nama_perusahaan}</td>
              </tr>
              <tr>
                <td className="font-semibold">Alamat:</td>
                <td>{unit.customers.alamat}</td>
              </tr>
              <tr>
                <td className="font-semibold">PIC:</td>
                <td>{unit.customers.pic}</td>
              </tr>
              <tr>
                <td className="font-semibold">Kontak:</td>
                <td>{unit.customers.kontak}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UnitDetailPage;
