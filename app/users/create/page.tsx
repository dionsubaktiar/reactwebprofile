"use client";

import { useState } from "react";
import axios from "axios";
import InputForm from "@/app/components/input";
import Navbar from "@/app/components/navbar";
// import { useFormik } from "formik";

interface User {
  name: string;
  email: string;
  // bio: string;
}

const CreatePageUsers = () => {
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [message, setMessage] = useState<string>("");

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi untuk menangani POST request saat form di-submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Mengirim POST request ke API
      await axios.post("http://localhost:2000/users", user);
      setMessage(`User created: ${user.name}`);
    } catch (error) {
      setMessage("Error creating user" + error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-eggplant dark:text-honeyDew dark:bg-eggplant bg-honeyDew ">
      <Navbar title="Create Users"></Navbar>
      <main className="flex-col items-center justify-center">
        <div className="mx-8">
          <form onSubmit={handleSubmit}>
            <div className="gap-4">
              <InputForm
                id="name"
                type="text"
                inputName="Name"
                name="name"
                placeholder="masukkan nama"
                value={user.name} // Nilai dari input diatur berdasarkan state
                onChangeValue={handleChange} // Memantau perubahan input
              />
              <InputForm
                id="email"
                type="email"
                inputName="Email"
                name="email"
                placeholder="masukkan email"
                value={user.email} // Nilai dari input diatur berdasarkan state
                onChangeValue={handleChange} // Memantau perubahan input
              />
              <button
                type="submit"
                className="rounded-lg bg-customGreen-default border-2 border-customGreen-default text-honeyDew 
          hover:bg-transparent hover:text-customGreen-default dark:text-eggplant dark:bg-customGreen-light
          dark:border-customGreen-light dark:hover:bg-transparent dark:hover:text-customGreen-light py-1 px-5 transition ease-linear duration-300"
              >
                Daftar
              </button>
            </div>
          </form>
          {message && <p>{message}</p>} {/* Pesan sukses atau error */}
        </div>
        <div></div>
      </main>
    </div>
  );
};

export default CreatePageUsers;
