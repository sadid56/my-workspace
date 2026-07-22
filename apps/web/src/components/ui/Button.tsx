"use client";

import React from "react";

export default function Button({ children }: { children?: React.ReactNode }) {
  return (
    <button
      className='
        px-8 h-12  rounded-xl text-white font-semibold tracking-wide font-montserrat
        transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]
         bg-gradient-to-r from-white/10 via-white/20 to-white/10
        cursor-pointer
      '
    >
      {children}
    </button>
  );
}
