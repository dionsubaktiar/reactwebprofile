"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import Navbar from "../../components/navbar";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth, loginWithOAuth, isRestoringAuth } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (isRestoringAuth) {
    return <div>Loading authentication state...</div>;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Get CSRF token
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie",
        { withCredentials: true }
      );

      // Perform login
      const response = await axios.post(
        "https://personalproject.nusantaratranssentosa.co.id/api/login",
        { email, password },
        { withCredentials: true }
      );

      const { user, token } = response.data;
      setAuth(user, token); // Save authentication state

      router.push("/auth-crud");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-800 dark:text-honeyDew">
      <Navbar title="Login" />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md dark:bg-gray-700">
          <h2 className="text-2xl font-semibold text-center mb-4 text-customGreen-default dark:text-honeyDew">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-customGreen-dark text-white rounded hover:bg-customGreen-light dark:bg-customGreen-light dark:hover:bg-customGreen-dark transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => loginWithOAuth("google")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Login with Google
            </button>
            <button
              onClick={() => loginWithOAuth("github")}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
            >
              Login with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
