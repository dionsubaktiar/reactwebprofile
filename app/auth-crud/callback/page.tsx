"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";

const AuthCallback = () => {
  const router = useRouter();
  const { setAuth } = useAuth(); // Use the setAuth function from context

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
        const response = await fetch(
          "https://personalproject.nusantaratranssentosa.co.id/api/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const { user } = await response.json(); // Extract the user object

        // Save the user and token in the context
        setAuth(user, token);

        // Optionally store data in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));

        // Redirect to the dashboard or home page
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
