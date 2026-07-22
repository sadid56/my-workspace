
import React from "react";

export default function NoiseBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-300 overflow-hidden">
      {/* Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-50 opacity-[0.015] dark:opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Children Content */}
      <main className="relative z-10 w-full h-full bg-background text-foreground transition-colors duration-300 min-h-screen">
        {children}
      </main>
    </div>
  );
}
