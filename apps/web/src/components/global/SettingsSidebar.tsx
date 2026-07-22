"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sun, Moon, LayoutList, LayoutGrid, Check, Keyboard, Eye, EyeOff } from "lucide-react";
import { useConfigStore, THEME_COLORS, ThemeColorName } from "@/store/useConfigStore";
import { cn } from "@/lib/cn";
import Dropdown from "@/components/ui/Dropdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  atomDark,
  dracula,
  oneDark,
  nightOwl,
  nord,
  shadesOfPurple,
  tomorrow,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const syntaxThemes: Record<string, any> = {
  vscDarkPlus,
  atomDark,
  dracula,
  oneDark,
  nightOwl,
  nord,
  shadesOfPurple,
  tomorrow,
};

const SYNTAX_THEMES = [
  { value: "vscDarkPlus", label: "VS Code Dark" },
  { value: "atomDark", label: "Atom Dark" },
  { value: "dracula", label: "Dracula" },
  { value: "oneDark", label: "One Dark" },
  { value: "nightOwl", label: "Night Owl" },
  { value: "nord", label: "Nord" },
  { value: "shadesOfPurple", label: "Shades of Purple" },
  { value: "tomorrow", label: "Tomorrow" },
];

export default function SettingsSidebar() {
  const {
    showTweakDialog,
    setShowTweakDialog,
    themeColor,
    setThemeColor,
    siteTheme,
    setSiteTheme,
    blogLayout,
    setBlogLayout,
    isZenMode,
    setIsZenMode,
    syntaxTheme,
    setSyntaxTheme,
    shortcutKeys,
    setShortcutKeys,
    _hasHydrated,
  } = useConfigStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !_hasHydrated) return null;

  return (
    <AnimatePresence>
      {showTweakDialog && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTweakDialog(false)}
            className="fixed inset-0 bg-black z-[99] cursor-pointer"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-[#0c1222] border-l border-white/10 p-6 shadow-2xl z-[100] overflow-y-auto text-white scrollbar-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <h2 className="text-xl font-bold font-montserrat tracking-wider flex items-center gap-2">
                Customize Settings
              </h2>
              <button
                onClick={() => setShowTweakDialog(false)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-theme-primary/30 text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8 pb-10">
              {/* Site Theme Setting */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 font-montserrat uppercase tracking-wider">
                  Site Theme
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSiteTheme("light")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all duration-300 cursor-pointer active:scale-95",
                      siteTheme === "light"
                        ? "border-theme-primary bg-theme-primary/10 text-theme-primary font-bold"
                        : "border-white/10 bg-white/5 hover:border-white/20 text-slate-300 hover:text-white"
                    )}
                  >
                    <Sun className="w-5 h-5" />
                    Light
                  </button>
                  <button
                    onClick={() => setSiteTheme("dark")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all duration-300 cursor-pointer active:scale-95",
                      siteTheme === "dark"
                        ? "border-theme-primary bg-theme-primary/10 text-theme-primary font-bold"
                        : "border-white/10 bg-white/5 hover:border-white/20 text-slate-300 hover:text-white"
                    )}
                  >
                    <Moon className="w-5 h-5" />
                    Dark
                  </button>
                </div>
              </div>

              {/* Accent Color Setting */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 font-montserrat uppercase tracking-wider">
                  Accent Color
                </h3>
                <div className="grid grid-cols-4 gap-2.5">
                  {(Object.keys(THEME_COLORS) as ThemeColorName[]).map((colorKey) => {
                    const active = themeColor === colorKey;
                    const colors = THEME_COLORS[colorKey];
                    return (
                      <button
                        key={colorKey}
                        onClick={() => setThemeColor(colorKey)}
                        className={cn(
                          "relative flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all duration-300 cursor-pointer active:scale-95",
                          active
                            ? "border-theme-primary bg-theme-primary/10 font-bold"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <span
                          className="w-5 h-5 rounded-full flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          }}
                        />
                        <span className="text-xs capitalize font-semibold text-slate-300">
                          {colorKey}
                        </span>
                        {active && (
                          <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-theme-primary flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Blog Layout Setting */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 font-montserrat uppercase tracking-wider">
                  Blog Card Layout
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBlogLayout("horizontal")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all duration-300 cursor-pointer active:scale-95",
                      blogLayout === "horizontal"
                        ? "border-theme-primary bg-theme-primary/10 text-theme-primary font-bold"
                        : "border-white/10 bg-white/5 hover:border-white/20 text-slate-300 hover:text-white"
                    )}
                  >
                    <LayoutList className="w-5 h-5" />
                    Horizontal
                  </button>
                  <button
                    onClick={() => setBlogLayout("grid")}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all duration-300 cursor-pointer active:scale-95",
                      blogLayout === "grid"
                        ? "border-theme-primary bg-theme-primary/10 text-theme-primary font-bold"
                        : "border-white/10 bg-white/5 hover:border-white/20 text-slate-300 hover:text-white"
                    )}
                  >
                    <LayoutGrid className="w-5 h-5" />
                    Grid Layout
                  </button>
                </div>
              </div>

              {/* Zen Mode Setting */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 font-montserrat uppercase tracking-wider">
                  Zen Mode (Hide Nav & Footer)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsZenMode(true)}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all duration-300 cursor-pointer active:scale-95",
                      isZenMode
                        ? "border-theme-primary bg-theme-primary/10 text-theme-primary font-bold"
                        : "border-white/10 bg-white/5 hover:border-white/20 text-slate-300 hover:text-white"
                    )}
                  >
                    <EyeOff className="w-5 h-5" />
                    Enabled
                  </button>
                  <button
                    onClick={() => setIsZenMode(false)}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all duration-300 cursor-pointer active:scale-95",
                      !isZenMode
                        ? "border-theme-primary bg-theme-primary/10 text-theme-primary font-bold"
                        : "border-white/10 bg-white/5 hover:border-white/20 text-slate-300 hover:text-white"
                    )}
                  >
                    <Eye className="w-5 h-5" />
                    Disabled
                  </button>
                </div>
              </div>

              {/* Syntax Highlight Setting */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 font-montserrat uppercase tracking-wider">
                  Code Syntax Theme
                </h3>
                <Dropdown
                  options={SYNTAX_THEMES}
                  value={syntaxTheme}
                  onChange={setSyntaxTheme}
                  className="w-full"
                />
                
                {/* Live Preview Block */}
                <div className="mt-3 rounded-xl overflow-hidden border border-white/10 bg-[#070b14]/80 p-3.5 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 font-mono tracking-wider">Live Preview ({syntaxTheme})</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] uppercase tracking-widest font-extrabold text-slate-500 font-mono">active</span>
                    </span>
                  </div>
                  <div className="text-xs overflow-x-auto rounded-lg">
                    <SyntaxHighlighter
                      language="typescript"
                      style={syntaxThemes[syntaxTheme] || vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: "0.5rem",
                        background: "transparent",
                        fontSize: "0.75rem",
                        lineHeight: "1.5",
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily: 'var(--font-mono), ui-monospace, monospace',
                        },
                      }}
                    >
{`function greet(user: string): string {
  return \`Hello, \${user}! ✨\`;
}
console.log(greet("Sadid"));`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>

              {/* Keyboard Shortcuts Rebinding */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 font-montserrat uppercase tracking-wider flex items-center gap-2">
                  <Keyboard className="w-4 h-4" />
                  Keyboard Shortcuts
                </h3>
                <div className="space-y-3.5 bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Toggle Settings Panel</span>
                    <input
                      type="text"
                      maxLength={1}
                      value={shortcutKeys?.tweakDialog || "A"}
                      onChange={(e) =>
                        setShortcutKeys({
                          ...shortcutKeys,
                          tweakDialog: e.target.value.toUpperCase() || "A",
                        })
                      }
                      className="w-10 h-8 text-center bg-white/10 border border-white/20 hover:border-theme-primary/45 rounded-lg text-sm text-white focus:outline-none focus:border-theme-primary font-bold uppercase transition-all duration-200"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5">
                    <span className="text-sm text-slate-300">Toggle Zen Mode</span>
                    <input
                      type="text"
                      maxLength={1}
                      value={shortcutKeys?.zenMode || "Z"}
                      onChange={(e) =>
                        setShortcutKeys({
                          ...shortcutKeys,
                          zenMode: e.target.value.toUpperCase() || "Z",
                        })
                      }
                      className="w-10 h-8 text-center bg-white/10 border border-white/20 hover:border-theme-primary/45 rounded-lg text-sm text-white focus:outline-none focus:border-theme-primary font-bold uppercase transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
