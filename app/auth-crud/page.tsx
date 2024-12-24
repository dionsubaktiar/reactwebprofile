"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateArticleButton from "../components/createArticleButton";
import Navbar from "../components/navbar";
import Dropdown from "../components/dropdownButton"; // Import the custom dropdown component

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
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<{ data: Article[] }>(
          "https://personalproject.nusantaratranssentosa.co.id/api/article"
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

    fetchArticles();
  }, []);

  const handleManageAction = (action: string, articleId: number) => {
    console.log(`Action: ${action}, Article ID: ${articleId}`);
    // Add your logic here for each action (e.g., delete, edit, etc.)
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
