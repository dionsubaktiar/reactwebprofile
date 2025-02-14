"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/components/navbar";

const LoginPageOrbiz = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newLogin = {
      email,
      password,
    };

    try {
      console.log(
        await axios.get(
          "https://personalproject.nusantaratranssentosa.co.id/api/books"
        )
      );
      const response = await axios.post(
        "https://personalproject.nusantaratranssentosa.co.id/api/orbiz/login",
        newLogin
        // {
        //   withXSRFToken: true,
        //   headers: {
        //     "X-Requested-With": "XMLHttpRequest",
        //   },
        // }
      );
      console.log(response.data);
      if (response.data == 200) {
        router.push("/test-orbiz/admin");
      }
      localStorage.setItem("tokenOrbiz", response.data.token);
      localStorage.setItem("userOrbiz", response.data.user);
    } catch (error) {
      console.error("Error login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-honeyDew text-customGreen-dark dark:bg-gray-900 dark:text-honeyDew">
      <div className="max-w-md mx-auto p-6">
        <Navbar title="Login Orbiz" />

        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

        <div className="space-y-4">
          {/* Email and Password Input */}
          <form onSubmit={handleSubmit} className="mt-6">
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
        </div>
      </div>
    </div>
  );
};

export default LoginPageOrbiz;
