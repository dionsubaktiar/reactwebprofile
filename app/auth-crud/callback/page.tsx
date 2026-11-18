"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/app/lib/api";

const AuthCallback = () => {
  const router = useRouter();
  const { setAuth } = useAuth();

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
        // Fetch user data using the token
        const response = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const { user } = await response.json();

        setAuth(user, token);

        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

        router.replace("/auth-crud/");
      } catch (error) {
        console.error("Error during callback:", error);
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
