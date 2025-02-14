"use client";

import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Books {
  id: number;
  title: string;
  author: string;
  genre: string;
  vote_count: number;
}
const AdminPage = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Books[]>([]);
  const [users, setUsers] = useState("");
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    vote_count: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDataBooks = async () => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("userOrbiz");
        setUsers(user || "");
        const tokenItem = localStorage.getItem("tokenOrbiz");
        setToken(tokenItem || "");
      }
      setIsLoading(true);
      try {
        const checkLogin = await axios.post(
          "https://personalproject.nusantaratranssentosa.co.id/api/orbiz/me",
          { token: token }
        );
        if (checkLogin.status == 200) {
          const response = await axios.get(
            "https://personalproject.nusantaratranssentosa.co.id/api/books"
          );
          setBooks(response.data.data);
          console.log(response.data.data);
        } else {
          router.push("/test-orbiz");
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataBooks();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(
          `https://personalproject.nusantaratranssentosa.co.id/api/books/${id}`
        );
        setBooks(books.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie"
      );
      await axios.post(
        "https://personalproject.nusantaratranssentosa.co.id/api/books",
        formData
      );
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setIsSubmitting(false);
      const response = await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/api/books"
      );
      setBooks(response.data.data);
    }
  };

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="mx-2">
        <Navbar title="Admin Page" />
      </div>
      <div className="flex justify-end">
        <h3>{users}</h3>
      </div>
      <div className="mx-2 mb-5">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="masukkan title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>
          <div>
            <label
              htmlFor="Author"
              className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
            >
              Author
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="masukkan author"
              value={formData.author}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-honeyDew"
            >
              Genre
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="masukkan genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "bg-gray-400" : "bg-customGreen-default"
            } text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300`}
          >
            {isSubmitting ? "Submitting..." : "Tambahkan buku"}
          </button>
        </form>
      </div>
      {isLoading ? (
        <div className="text-center text-honeyDew">Loading...</div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg mx-2">
          <table className="min-w-full table-auto bg-white dark:bg-gray-800 dark:text-honeyDew">
            <thead>
              <tr className="bg-white text-eggplant">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Genre</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.genre}</td>
                  <td className="px-4 py-2 relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default AdminPage;
