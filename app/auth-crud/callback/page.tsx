"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/app/lib/api";
import { useAuth } from "../../context/authContext";

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
        const response = await apiClient.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data?.user;
        if (!user) {
          throw new Error("Invalid user payload from /api/me");
        }

        setAuth(user, token);

        router.replace("/auth-crud");
      } catch (error) {
        console.error("Error during callback:", error);
        router.replace("/auth-crud/login?error=callback_failed");
      }
    };

    handleCallback();
  }, [router, setAuth]);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <p className="text-lg font-medium">Authenticating, please wait...</p>
    </div>
  );
};

export default AuthCallback;
