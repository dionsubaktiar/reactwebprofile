"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext"; // Adjust based on your context location
import axios from "axios";

const AuthCallback = () => {
  const router = useRouter();
  const { setAuth } = useAuth(); // Your custom auth context

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
          throw new Error("No token found in the callback URL.");
        }

        const response = await axios.get(
          "https://personalproject.nusantaratranssentosa.co.id/api/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = response.data;

        setAuth(user, token); // Save user and token in the context
        router.replace("/auth-crud/"); // Redirect to dashboard or another page
      } catch (error) {
        console.error("Error handling callback:", error);
        router.replace("/auth-crud/login"); // Redirect to login on failure
      }
    };

    handleCallback();
  }, [router, setAuth]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Authenticating, please wait...</p>
    </div>
  );
};

export default AuthCallback;
