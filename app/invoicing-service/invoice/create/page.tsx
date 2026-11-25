"use client";

import SubPageHeader from "@/app/components/SubPageHeader";
import apiClient from "@/app/lib/api";
import { parsePaginatedResponse } from "@/app/lib/api-response";
import type { ApiResponse, Unit, Package, Part } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiFileText, FiPlus, FiTrash2 } from "react-icons/fi";
import FormField, { formControlClass } from "../../_components/FormField";

const CreateInvoicePage = () => {
  const [formData, setFormData] = useState({
    kilometer: "",
    tanggal: "",
    id_unit: "",
    id_package: "",
    id_part: [{ id_part: "", qty: "" }],
  });

  const [units, setUnits] = useState<Unit[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitResp, partsResp, packagesResp] = await Promise.all([
          apiClient.get<ApiResponse<Unit>>("/getunit"),
          apiClient.get<ApiResponse<Part>>("/getparts"),
          apiClient.get<ApiResponse<Package>>("/packages"),
        ]);

        setUnits(unitResp.data.data.data);
        setParts(partsResp.data.data.data);
        // Validasi bentuk respons /packages di satu tempat (Hari 7):
        // bentuk lama (array langsung) ditolak dengan error yang jelas,
        // bukan crash diam-diam saat .map() dipanggil.
        setPackages(parsePaginatedResponse<Package>(packagesResp.data).data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev.id_part) return prev; // Ensure id_part exists

      const updatedParts = [...prev.id_part];
      updatedParts[index] = { ...updatedParts[index], [name]: value };
      return { ...prev, id_part: updatedParts };
    });
  };

  const addPart = () => {
    setFormData((prev) => ({
      ...prev,
      id_part: prev.id_part
        ? [...prev.id_part, { id_part: "", qty: "" }]
        : [{ id_part: "", qty: "" }],
    }));
  };

  const removePart = (index: number) => {
    setFormData((prev) => {
      const updatedParts = prev.id_part.filter((_, i) => i !== index);
      return {
        ...prev,
        id_part: updatedParts, // Tidak menambahkan elemen kosong
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Pastikan `id_part` dikirim sebagai `null` jika kosong
    const payload = {
      ...formData,
      id_part: formData.id_part.length > 0 ? formData.id_part : null,
    };

    try {
      await apiClient.post("/invoice", payload);
      setSuccessMessage("Invoice berhasil dibuat!");
      router.push("/invoicing-service");
    } catch (error) {
      setErrorMessage("Gagal membuat invoice. Periksa data isian lalu coba lagi.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors pb-16">
      <SubPageHeader title="Buat Invoice" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/invoicing-service"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition"
          >
            <FiArrowLeft /> Kembali ke Hub Invoicing
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mt-2 flex items-center gap-2">
            <FiFileText className="text-indigo-600 dark:text-indigo-500" /> Form
            Buat Invoice
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Buat invoice servis baru untuk satu unit armada.
          </p>
        </div>

        {successMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-sm text-indigo-600 dark:text-indigo-400">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
        >
          <FormField label="Unit" htmlFor="id_unit" required>
            <select
              id="id_unit"
              name="id_unit"
              value={formData.id_unit}
              onChange={handleChange}
              className={formControlClass("indigo")}
              required
            >
              <option value="">Pilih Unit</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.nopol}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Kilometer" htmlFor="kilometer" required>
            <input
              type="number"
              id="kilometer"
              name="kilometer"
              placeholder="1234 (km)"
              value={formData.kilometer}
              onChange={handleChange}
              className={formControlClass("indigo")}
              required
            />
          </FormField>

          <FormField label="Tanggal" htmlFor="tanggal" required>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className={formControlClass("indigo")}
              required
            />
          </FormField>

          <FormField label="Package" htmlFor="id_package">
            <select
              id="id_package"
              name="id_package"
              value={formData.id_package}
              onChange={handleChange}
              className={formControlClass("indigo")}
            >
              <option value="">Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.kode_packages}
                </option>
              ))}
            </select>
          </FormField>

          <div>
            <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Parts
            </span>
            {formData.id_part.length > 0 &&
              formData.id_part.map((part, index) => (
                <div key={index} className="flex gap-2 items-end mt-2">
                  <div className="w-3/4">
                    <select
                      name="id_part"
                      value={part.id_part}
                      onChange={(e) => handlePartChange(index, e)}
                      className={formControlClass("indigo")}
                      aria-label={`Part baris ${index + 1}`}
                    >
                      <option value="">Select Part</option>
                      {parts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nama_barang} - {p.merk}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end gap-2 w-1/4">
                    <input
                      type="number"
                      name="qty"
                      value={part.qty}
                      onChange={(e) => handlePartChange(index, e)}
                      placeholder="Qty"
                      aria-label={`Jumlah baris ${index + 1}`}
                      className={formControlClass("indigo")}
                    />
                    <button
                      type="button"
                      onClick={() => removePart(index)}
                      aria-label={`Hapus baris part ${index + 1}`}
                      className="p-2.5 rounded-xl bg-red-500 text-white shadow-sm hover:bg-red-600 transition"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}

            <button
              type="button"
              onClick={addPart}
              className="w-full mt-3 px-4 py-2.5 text-xs font-bold rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              + Tambah Part
            </button>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm disabled:opacity-50"
            >
              <FiPlus size={15} />
              {isSubmitting ? "Menyimpan..." : "Simpan Invoice"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateInvoicePage;
