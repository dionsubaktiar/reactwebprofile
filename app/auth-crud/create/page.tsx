"use client";

import { useState } from "react";
import axios from "axios";
import ToggleDarkModeButton from "../../components/toggleDarkMode";

const CreateArticlePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    article: "",
    user_id: 1, // Default user ID (can be dynamically set based on the application)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/api/article",
        { withCredentials: true }
      );
      await axios.post(
        "https://personalproject.nusantaratranssentosa.co.id/api/article",
        formData,
        { withCredentials: true }
      );

      setSuccessMessage("Article created successfully!");
      setFormData({ title: "", article: "", user_id: 1 });
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to create the article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header with dark mode toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-customGreen-default dark:text-customGreen-light">
            Create New Article
          </h1>
          <ToggleDarkModeButton />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
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
              value={formData.title}
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
              value={formData.article}
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
            {isSubmitting ? "Submitting..." : "Create Article"}
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

export default CreateArticlePage;
