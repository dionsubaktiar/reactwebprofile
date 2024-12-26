"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/navbar";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/authContext"; // Import useAuth hook

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuth(); // Access setAuth function from context

  const handleOAuthLogin = (provider: "google" | "github") => {
    router.push(
      `https://personalproject.nusantaratranssentosa.co.id/api/auth/${provider}/redirect`
    );
  };

  const handleLogin = async (role: "admin" | "user" | "custom") => {
    const credentials =
      role === "admin"
        ? { email: "admin@example.com", password: "adminpassword" }
        : { email: "johndoe@example.com", password: "Johndoe123" };

    setEmail(credentials.email);
    setPassword(credentials.password);

    try {
      setIsLoading(true);

      // Get CSRF token
      await axios.get(
        "https://personalproject.nusantaratranssentosa.co.id/sanctum/csrf-cookie",
        { withCredentials: true }
      );

      // Perform the login request
      const response = await axios.post(
        "https://personalproject.nusantaratranssentosa.co.id/api/login",
        credentials,
        { withCredentials: true }
      );

      // Get user data and token from response
      const user = response.data.user;
      const token = response.data.token;

      // Save user and token using context
      setAuth(user, token);

      console.log(`${role} logged in successfully.`);

      // Redirect to dashboard or home page after login
      router.replace("/auth-crud/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-md mx-auto p-6">
        <Navbar title="Login" />

        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

        <div className="space-y-4">
          {/* Google Login Button */}
          <button
            className="flex items-center justify-center w-full px-4 py-2 bg-white text-gray-700 rounded shadow hover:bg-gray-100 transition dark:bg-gray-800 dark:text-gray-300"
            onClick={() => {
              handleOAuthLogin("google");
            }}
          >
            <Image
              src="/assets/images/google-logo.png"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Login with Google
          </button>

          {/* GitHub Login Button */}
          <button
            className="flex items-center justify-center w-full px-4 py-2 bg-white text-gray-700 rounded shadow hover:bg-gray-100 transition dark:bg-gray-800 dark:text-gray-300"
            onClick={() => {
              handleOAuthLogin("github");
            }}
          >
            <Image
              src="/assets/images/github-logo.png"
              alt="GitHub"
              width={20}
              height={20}
              className="mr-2"
            />
            Login with GitHub
          </button>

          <div className="relative text-center mt-6">
            <span className="bg-honeyDew px-4 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              or
            </span>
            <div className="absolute inset-x-0 top-1 border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          {/* Login as Admin */}
          <button
            className="w-full px-4 py-2 bg-customGreen-dark text-white rounded hover:bg-customGreen-default transition dark:bg-customGreen-light dark:text-gray-800"
            onClick={() => handleLogin("admin")}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login as Admin"}
          </button>

          {/* Login as User */}
          <button
            className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
            onClick={() => handleLogin("user")}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login as User"}
          </button>

          {/* Email and Password Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin("custom");
            }}
            className="mt-6"
          >
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-honeyDew"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-honeyDew"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-customGreen-dark text-white rounded hover:bg-customGreen-default transition dark:bg-customGreen-light dark:text-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Dont have an account?{" "}
              <Link
                href="/auth-crud/register"
                className="text-customGreen-dark underline hover:text-customGreen-default dark:text-customGreen-light"
              >
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
