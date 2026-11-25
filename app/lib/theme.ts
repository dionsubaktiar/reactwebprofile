"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const THEME_CHANGE_EVENT = "theme-change";

function subscribeTheme(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    media.removeEventListener("change", callback);
  };
}

function getClientThemeSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;
  return (
    document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function getServerThemeSnapshot(): boolean {
  return false;
}

export function useTheme(): { isDark: boolean; toggleTheme: () => void } {
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getClientThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    const nextDark = !getClientThemeSnapshot();
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", nextDark);
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    }
  }, []);

  return { isDark, toggleTheme };
}
