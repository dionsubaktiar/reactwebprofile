"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
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

interface AuthSnapshot {
  user: User | null;
  token: string | null;
  isRestoringAuth: boolean;
}

interface AuthContextType extends AuthSnapshot {
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  loginWithOAuth: (provider: "google" | "github") => void;
}

const AUTH_CHANGE_EVENT = "auth-storage-change";

const SERVER_AUTH_SNAPSHOT: AuthSnapshot = {
  user: null,
  token: null,
  isRestoringAuth: true,
};

let cachedRawToken: string | null = null;
let cachedRawUser: string | null = null;
let cachedSnapshot: AuthSnapshot = {
  user: null,
  token: null,
  isRestoringAuth: false,
};

function subscribeAuth(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
}

function getClientAuthSnapshot(): AuthSnapshot {
  if (typeof window === "undefined") {
    return SERVER_AUTH_SNAPSHOT;
  }

  const rawToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const rawUser = localStorage.getItem(AUTH_USER_KEY);

  if (rawToken === cachedRawToken && rawUser === cachedRawUser) {
    return cachedSnapshot;
  }

  if (rawToken && rawUser) {
    try {
      const parsedUser = JSON.parse(rawUser) as User;
      cachedRawToken = rawToken;
      cachedRawUser = rawUser;
      cachedSnapshot = {
        user: parsedUser,
        token: rawToken,
        isRestoringAuth: false,
      };
      return cachedSnapshot;
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }

  cachedRawToken = null;
  cachedRawUser = null;
  cachedSnapshot = {
    user: null,
    token: null,
    isRestoringAuth: false,
  };
  return cachedSnapshot;
}

function getServerAuthSnapshot(): AuthSnapshot {
  return SERVER_AUTH_SNAPSHOT;
}

function emitAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, token, isRestoringAuth } = useSyncExternalStore(
    subscribeAuth,
    getClientAuthSnapshot,
    getServerAuthSnapshot,
  );
  const router = useRouter();

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
    emitAuthChange();
    router.push("/auth-crud/login");
  }, [router]);

  const setAuth = useCallback((nextUser: User, nextToken: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
    }
    emitAuthChange();
  }, []);

  const loginWithOAuth = useCallback(async (provider: "google" | "github") => {
    try {
      const redirectUrl = `/api/auth/${provider}/redirect`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  }, []);

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
