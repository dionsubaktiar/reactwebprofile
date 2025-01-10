"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";

const CreateKonsumenPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    nama: "",
    nik: "",
    tanggal_lahir: "",
    status_perkawinan: "",
    data_pasangan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const apiUrl =
    "https://personalproject.nusantaratranssentosa.co.id/api/bcaregister";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie",
        { withCredentials: true }
      );
      await axios.post(
        apiUrl,
        {
          ...formData,
        },
        { withCredentials: true }
      );
      setSuccess("Konsumen created successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        nama: "",
        nik: "",
        tanggal_lahir: "",
        status_perkawinan: "",
        data_pasangan: "",
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "An error occurred while creating konsumen."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-900 dark:text-honeyDew">
      <Navbar title="Create Konsumen" />
      <div className="max-w-3xl mx-auto py-8 px-6">
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 text-green-700 bg-green-100 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: "username", label: "Username", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "password", label: "Password", type: "password" },
            {
              id: "password_confirmation",
              label: "Confirm Password",
              type: "password",
            },
            { id: "nama", label: "Nama", type: "text" },
            { id: "nik", label: "NIK", type: "text" },
            {
              id: "tanggal_lahir",
              label: "Tanggal Lahir",
              type: "date",
            },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label
                className="block font-semibold mb-2 text-gray-700 dark:text-honeyDew"
                htmlFor={id}
              >
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                value={formData[id as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
              />
            </div>
          ))}

          <div>
            <label
              className="block font-semibold mb-2 text-gray-700 dark:text-honeyDew"
              htmlFor="status_perkawinan"
            >
              Status Perkawinan
            </label>
            <select
              id="status_perkawinan"
              name="status_perkawinan"
              value={formData.status_perkawinan}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          <div>
            <label
              className="block font-semibold mb-2 text-gray-700 dark:text-honeyDew"
              htmlFor="data_pasangan"
            >
              Data Pasangan (Optional)
            </label>
            <input
              type="text"
              id="data_pasangan"
              name="data_pasangan"
              value={formData.data_pasangan}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-customGreen-light dark:bg-gray-700 dark:text-honeyDew dark:border-gray-600"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-customGreen-dark text-white rounded-md shadow-md hover:bg-customGreen-default transition disabled:opacity-50 disabled:cursor-not-allowed dark:bg-customGreen-light dark:text-gray-800"
            >
              {isSubmitting ? "Submitting..." : "Create Konsumen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateKonsumenPage;
