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
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        console.error("No token found in the callback URL.");
        router.replace("/auth-crud/login?error=missing_token");
        return;
      }

      try {
        // Fetch authenticated user data
        const response = await axios.get(
          "https://personalproject.nusantaratranssentosa.co.id/api/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = response.data;

        // Save token and user data in the context
        setAuth(user, token);
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user.id); // Save user_id in localStorage

        // Redirect to dashboard
        router.replace("/auth-crud/");
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.replace("/auth-crud/login?error=callback_failed");
      }
    };

    handleCallback();
  }, [router, setAuth]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-medium">Authenticating, please wait...</p>
    </div>
  );
};

export default AuthCallback;
