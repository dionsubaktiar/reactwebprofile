"use client";

import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/app/lib/api";

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

interface AuthContextType {
  user: User | null;
  token: string | null;
  isRestoringAuth: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  loginWithOAuth: (provider: "google" | "github") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isRestoringAuth, setIsRestoringAuth] = useState<boolean>(true);
  const router = useRouter();

  // Dideklarasikan SEBELUM effect restore di bawah (Hari 7): sebelumnya
  // `logout` dipakai di dalam effect padahal baru dideklarasikan sesudahnya
  // — bila JSON user tersimpan rusak, pemanggilan itu melempar
  // ReferenceError (TDZ) dan restore auth gagal total. `useCallback`
  // supaya identitasnya stabil dan bisa masuk dependency effect.
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    router.push("/auth-crud/login");
  }, [router]);

  // Restore authentication state from localStorage on initialization
  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        logout(); // Clear invalid data
      }
    }

    setIsRestoringAuth(false); // Mark as done restoring auth state
  }, [logout]);

  const setAuth = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  };

  const loginWithOAuth = async (provider: "google" | "github") => {
    try {
      const redirectUrl = `/api/auth/${provider}/redirect`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isRestoringAuth,
        setAuth,
        logout,
        loginWithOAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
