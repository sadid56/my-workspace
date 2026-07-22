"use client";

import { useEffect, useState } from "react";
import { THEME_COLORS, useConfigStore } from "@/store/useConfigStore";

export default function ThemeColorManager() {
  const { themeColor, siteTheme, _hasHydrated } = useConfigStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !_hasHydrated) return;

    const root = document.documentElement;
    const colors = THEME_COLORS[themeColor] || THEME_COLORS.orange;
    root.style.setProperty("--theme-primary", colors.primary);
    root.style.setProperty("--theme-secondary", colors.secondary);
  }, [themeColor, mounted, _hasHydrated]);

  useEffect(() => {
    if (!mounted || !_hasHydrated) return;

    const root = document.documentElement;
    if (siteTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [siteTheme, mounted, _hasHydrated]);

  return null;
}
