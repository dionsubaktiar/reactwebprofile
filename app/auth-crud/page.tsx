"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CreateArticleButton from "../components/createArticleButton";
import Navbar from "../components/navbar";
import Dropdown from "../components/dropdownButton";
import { useRouter } from "next/navigation";
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
  isClamped?: boolean; // Add this line to extend the Article interface
}

interface ArticleResponse {
  data: Article[];
  next_page_url: string | null;
  prev_page_url: string | null;
}

const ArticlesPage = () => {
  const { user, token, logout, isRestoringAuth } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<{
    next: string | null;
    prev: string | null;
  }>({ next: null, prev: null });
  const router = useRouter();

  const isAuthenticated = user !== null;

  // Memoize the fetchArticles function to avoid changing dependencies
  const fetchArticles = useCallback(
    async (
      url: string = "https://personalproject.nusantaratranssentosa.co.id/api/article"
    ) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ArticleResponse>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Add isClamped to each article
        const articlesWithClamp = response.data.data.map((article) => ({
          ...article,
          isClamped: true, // Initialize `isClamped` to `true`
        }));
        setArticles(articlesWithClamp);
        setPagination({
          next: response.data.next_page_url,
          prev: response.data.prev_page_url,
        });
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
          setError("Failed to load articles.");
        } else {
          setError("Failed to load articles.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [token] // Only re-create the function if the token changes
  );

  useEffect(() => {
    if (isRestoringAuth) return;

    if (!isAuthenticated) {
      router.push("/auth-crud/login");
    } else {
      fetchArticles();
    }

    const interval = setInterval(() => {
      if (isAuthenticated) fetchArticles();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated, isRestoringAuth, router, fetchArticles]);

  const handleManageAction = async (action: string, articleId: number) => {
    if (action === "edit") {
      router.push(`/auth-crud/edit?pageId=${articleId}`);
    } else if (action === "delete") {
      try {
        await axios.delete(
          `https://personalproject.nusantaratranssentosa.co.id/api/article/${articleId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchArticles(); // Refresh articles after deletion
        alert("Article deleted successfully.");
      } catch (error) {
        console.error("Failed to delete article:", error);
        alert("Failed to delete the article. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/auth-crud/login");
  };

  const toggleClamp = (articleId: number) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === articleId
          ? { ...article, isClamped: !article.isClamped }
          : article
      )
    );
  };

  const handlePagination = (url: string | null) => {
    if (url) fetchArticles(url); // Load articles for the next or previous page
  };

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
        <div className="flex justify-between items-center">
          <Navbar title="Articles" />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition dark:bg-red-400 dark:hover:bg-red-500"
          >
            Logout
          </button>
        </div>

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
                    <p
                      className={`text-gray-700 dark:text-gray-300 mb-4 ${
                        article.isClamped ? "line-clamp-4" : ""
                      }`}
                    >
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
                    <button
                      onClick={() => toggleClamp(article.id)}
                      className="text-customGreen-default dark:text-customGreen-light mt-2"
                    >
                      {article.isClamped ? "Show More" : "Show Less"}
                    </button>
                  </div>
                  <Dropdown
                    onAction={(action) =>
                      handleManageAction(action, article.id)
                    }
                    articleId={article.id}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No valid articles available.
          </p>
        )}

        <div className="flex justify-between mt-4">
          {pagination.prev && (
            <button
              onClick={() => handlePagination(pagination.prev)}
              className="px-4 py-2 bg-customGreen-dark text-white rounded hover:bg-customGreen-default transition dark:bg-customGreen-light dark:text-gray-800"
            >
              Previous
            </button>
          )}
          {pagination.next && (
            <button
              onClick={() => handlePagination(pagination.next)}
              className="px-4 py-2 bg-customGreen-dark text-white rounded hover:bg-customGreen-default transition dark:bg-customGreen-light dark:text-gray-800"
            >
              Next
            </button>
          )}
        </div>
      </div>

      <CreateArticleButton />
    </div>
  );
};

export default ArticlesPage;
