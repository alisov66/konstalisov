"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme | null; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);
const mediaQuery = "(prefers-color-scheme: dark)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(mediaQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSystemTheme(): Theme {
  return window.matchMedia(mediaQuery).matches ? "dark" : "light";
}

function getServerTheme() {
  return null;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useSyncExternalStore(subscribe, getSystemTheme, getServerTheme);
  const [override, setOverride] = useState<Theme | null>(null);
  const theme = override ?? systemTheme;

  useLayoutEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setOverride((current) => (current ?? getSystemTheme()) === "dark" ? "light" : "dark");
  }, []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
