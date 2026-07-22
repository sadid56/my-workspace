"use client";

import { useEffect, useState } from "react";
import { useConfigStore } from "@/store/useConfigStore";

export default function ShortcutManager() {
  const {
    shortcutKeys,
    isZenMode,
    toggleZenMode,
    showTweakDialog,
    setShowTweakDialog,
    _hasHydrated,
  } = useConfigStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for hotkeys
  useEffect(() => {
    if (!mounted || !_hasHydrated) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore hotkeys when typing in form controls
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      // Check if command keys are pressed to avoid overriding browser standard shortcuts
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      const key = e.key.toUpperCase();
      const tweakKey = (shortcutKeys?.tweakDialog || "A").toUpperCase();
      const zenKey = (shortcutKeys?.zenMode || "Z").toUpperCase();

      if (key === tweakKey) {
        e.preventDefault();
        setShowTweakDialog(!showTweakDialog);
      } else if (key === zenKey) {
        e.preventDefault();
        toggleZenMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mounted, _hasHydrated, shortcutKeys, showTweakDialog, setShowTweakDialog, toggleZenMode]);

  // Toggle zen-mode class on root element
  useEffect(() => {
    if (!mounted || !_hasHydrated) return;

    const root = document.documentElement;
    if (isZenMode) {
      root.classList.add("zen-mode");
    } else {
      root.classList.remove("zen-mode");
    }
  }, [isZenMode, mounted, _hasHydrated]);

  return null;
}
