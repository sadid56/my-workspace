"use client";

import { useRef } from "react";

const Footer = () => {
  const containerRef = useRef(null);

  return (
    <footer className='relative w-full overflow-hidden '>
      <div ref={containerRef} className='relative z-10 flex pt-24 pb-12 items-center justify-center'>
        <div className='w-full px-4'>
          <div className='relative'>
            <div className='relative text-center'>
              <div className='relative inline-block group'>
                <div className='absolute -inset-x-8 -inset-y-4  transition-all duration-1000' />
                <p className='relative text-xl md:text-2xl font-light tracking-[0.3em] uppercase'>
                  <span className='bg-linear-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                    Developer & Creator
                  </span>
                </p>
                <div className='mt-8 flex items-center justify-center gap-6 opacity-60'>
                  <div className='h-px w-12 bg-linear-to-r from-transparent to-sky-500/50' />
                  <span className='text-[10px] text-sky-200/50 tracking-widest uppercase text-nowrap'>Crafting with Passion</span>
                  <div className='h-px w-12 bg-linear-to-l from-transparent to-sky-500/50' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sky Origin Indicator */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none'>
        <div className='relative w-[52rem] h-4'>
          <div className='absolute inset-0 bg-linear-to-r from-transparent via-sky-500 to-transparent blur-3xl opacity-70 animate-pulse' />

          <div className='absolute inset-0 bg-linear-to-r from-transparent via-blue-500 to-transparent blur-2xl opacity-80' />
          <div className='absolute inset-0 bg-linear-to-r from-transparent via-cyan-400 to-transparent blur-lg' />

          <div className='absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-linear-to-r from-transparent via-sky-300 to-transparent rounded-full' />
        </div>
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-40px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes skyFlow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-skyFlow {
          animation: skyFlow 2s ease-in-out infinite;
        }

        .name-letter {
          transition: transform 0.3s ease;
        }

        .name-letter:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
