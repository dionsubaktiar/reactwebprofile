"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Link from "next/link";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

interface Books {
  id: number;
  title: string;
  author: string;
  genre: string;
  vote_count: number;
}

const MainPage = () => {
  const [books, setBooks] = useState<Books[]>([]);
  const [search, setSearch] = useState({ title: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDataBooks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://personalproject.nusantaratranssentosa.co.id/api/books"
        );
        setBooks(response.data.data);
        console.log(response.data.data);
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
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  // const handleLikes = async () => {
  //   await axios.get(
  //     "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie"
  //   );
  //   await axios.put(
  //     `https://personalproject.nusantaratranssentosa.co.id/api/books/likes/${book.id}`
  //   );
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie"
      );
      const response = await axios.post(
        "https://personalproject.nusantaratranssentosa.co.id/api/books/search",
        search
      );
      router.push("/test-orbiz");
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-customGreen-light text-brown dark:bg-gray-900 dark:text-honeyDew">
      <div className="mx-2">
        <Navbar title="Books" />
        <div className="flex justify-evenly gap-2 mb-2">
          <div>
            <form onSubmit={handleSubmit} className="space-y-2">
              <label className="block text-sm font-medium dark:text-honeyDew">
                Search
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="title"
                  placeholder="masukkan judul buku"
                  value={search.title}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-honeyDew"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting ? "bg-gray-400" : "bg-customGreen-default"
                  } text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300`}
                >
                  {isSubmitting ? "Submitting..." : "Search"}
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-end">
            <Link href="/test-orbiz/login">
              <button className="bg-customGreen-default text-white px-4 py-2 rounded-lg shadow-md hover:bg-customGreen-dark transition duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>
        {isLoading ? (
          <div className="text-center text-honeyDew">Loading...</div>
        ) : (
          <div className="mx-2 grid grid-cols-1 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="border border-lg rounded-lg shadow-md border-black"
              >
                <div className="flex-col mx-2">
                  <h2>
                    {book.id}. {book.title}
                  </h2>
                  <h3>Author: {book.author}</h3>
                  <h3>Genre: {book.genre}</h3>
                  <div className="flex justify-evenly mt-2">
                    <div>
                      <button
                        onClick={async () => {
                          await axios.get(
                            "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie"
                          );
                          await axios.put(
                            `https://personalproject.nusantaratranssentosa.co.id/api/books/likes/${book.id}`
                          );
                          const response = await axios.get(
                            "https://personalproject.nusantaratranssentosa.co.id/api/books"
                          );
                          setBooks(response.data.data);
                        }}
                      >
                        {" "}
                        {book.vote_count > 0 ? (
                          <FaRegThumbsUp />
                        ) : (
                          <FaThumbsUp />
                        )}
                      </button>
                    </div>
                    <div>Like Count : {book.vote_count}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MainPage;
