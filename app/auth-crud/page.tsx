"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CreateArticleButton from "../components/createArticleButton";
import Navbar from "../components/navbar";
import Dropdown from "../components/dropdownButton"; // Import the custom dropdown component
import { useRouter } from "next/navigation"; // Import Next.js router
import { useAuth } from "../context/authContext";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  provider: string | null;
  provider_id: string | null;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

interface Article {
  id: number;
  title: string;
  article: string;
  tanggal: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
}

const ArticlesPage = () => {
  const { user, token } = useAuth(); // Get authentication status from useAuth
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter(); // Initialize Next.js router

  // Check if the user is authenticated by checking if user is null or not
  const isAuthenticated = user !== null;

  // Function to fetch articles
  const fetchArticles = async () => {
    try {
      const response = await axios.get<{ data: Article[] }>(
        "https://personalproject.nusantaratranssentosa.co.id/api/article",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from useAuth
          },
        }
      );

      const validArticles = response.data.data.filter(
        (article) => article.id && article.title && article.article
      );

      setArticles(validArticles);
    } catch (err) {
      setError("Failed to load articles.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push("/auth-crud/login");
    } else {
      fetchArticles(); // Fetch articles when the component mounts
    }
  }, [isAuthenticated, router]); // Add isAuthenticated as a dependency to trigger rerender when auth changes

  // Handle actions like edit, delete, etc.
  const handleManageAction = async (action: string, articleId: number) => {
    console.log(`Action: ${action}, Article ID: ${articleId}`);

    if (action === "edit") {
      // Navigate to the edit page with the article ID as a query parameter
      router.push(`/auth-crud/edit?pageId=${articleId}`);
    } else if (action === "delete") {
      try {
        await axios.delete(
          `https://personalproject.nusantaratranssentosa.co.id/api/article/${articleId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use token from useAuth
            },
          }
        );
        console.log("Article deleted successfully");

        // Refetch articles after deletion
        fetchArticles();
      } catch (error) {
        console.error("Failed to delete article:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-800 dark:text-honeyDew">
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
        <Navbar title="Article"></Navbar>

        {articles.length > 0 ? (
          <ul className="space-y-6">
            {articles.map((article) => (
              <li
                key={article.id}
                className="p-4 bg-white rounded shadow border-l-4 border-customGreen-light dark:bg-gray-800 dark:border-customGreen-default dark:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-customGreen-default dark:text-customGreen-light mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {article.article}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Author:</strong> {article.user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <strong>Date:</strong>{" "}
                      {new Date(article.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    {/* Use the custom Dropdown component */}
                    <Dropdown
                      onAction={(action) =>
                        handleManageAction(action, article.id)
                      }
                      articleId={article.id}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No valid articles available.
          </p>
        )}
      </div>
      <CreateArticleButton />
    </div>
  );
};

export default ArticlesPage;
