"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/components/navbar";

// Define the Article type
interface Article {
  id: number;
  title: string;
  article: string;
  tanggal: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

const EditArticlePage = () => {
  const searchParams = useSearchParams();
  const articleId = searchParams.get("pageId"); // Get the query parameter
  const [article, setArticle] = useState<Article | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch the article for editing
  useEffect(() => {
    if (articleId) {
      axios
        .get(
          `https://personalproject.nusantaratranssentosa.co.id/api/article/${articleId}`
        )
        .then((response) => {
          setArticle(response.data.data); // Set the fetched article
        })
        .catch(() => {
          setErrorMessage("Failed to load the article for editing.");
        });
    }
  }, [articleId]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!article) {
      setErrorMessage("No article data to update.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie",
        { withCredentials: true }
      );
      await axios.put(
        `https://personalproject.nusantaratranssentosa.co.id/api/article/${articleId}`,
        article,
        { withCredentials: true }
      );

      setSuccessMessage("Article updated successfully!");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to update the article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticle((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (!articleId) {
    return (
      <div className="text-center mt-6 text-red-500">
        <p>No article ID provided!</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center mt-6">
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-3xl mx-auto p-6">
        <Navbar title="Edit Article"></Navbar>

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          className="bg-white rounded-lg shadow p-6 space-y-4 dark:bg-gray-800"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={article.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customGreen-default focus:border-customGreen-default dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="article"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Article Content
            </label>
            <textarea
              id="article"
              name="article"
              value={article.article}
              onChange={handleChange}
              required
              rows={6}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-customGreen-default focus:border-customGreen-default dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white font-semibold rounded-md transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-customGreen-default hover:bg-customGreen-dark dark:bg-customGreen-light dark:hover:bg-customGreen-default dark:text-gray-900"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Article"}
          </button>
        </form>

        {/* Feedback Messages */}
        {successMessage && (
          <p className="mt-4 text-green-600 font-medium text-center dark:text-green-400">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-600 font-medium text-center dark:text-red-400">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditArticlePage;
