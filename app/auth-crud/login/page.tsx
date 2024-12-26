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

  const handleLogin = async () => {
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
    <div className="min-h-screen bg-gray-100">
      <Navbar title="Login" />
      <div className="container mx-auto p-4">
        <button
          onClick={() => loginWithOAuth("google")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login with Google
        </button>
        <button
          onClick={() => loginWithOAuth("github")}
          className="bg-gray-800 text-white p-2 rounded"
        >
          Login with GitHub
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
