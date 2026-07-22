"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import usePageScroll from "@/hooks/usePageScroll";
import ShinnyButton from "@/components/ui/ShinnyButton";
import Link from "next/link";
import LINKS from "@/constant/links";
import socialLinks from "@/data/socialLinks";
import { Drawer } from "vaul";
import { IconX } from "@tabler/icons-react";

const Navbar = () => {
  const handleScroll = usePageScroll();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScrollState = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScrollState);
    return () => window.removeEventListener("scroll", handleScrollState);
  }, []);

  const links = [
    { path: "#experience", label: "Experience" },
    { path: "#projects", label: "Projects" },
  ];

  return (
    <nav
      className={cn(
        "fixed transition-all -translate-x-1/2 left-1/2 top-4 duration-500 z-[60]",
        isScrolled
          ? "w-[90%] md:w-[70%] lg:w-[64%] backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl"
          : " bg-transparent border-transparent md:py-2 w-[90%] md:w-[70%] lg:w-[68%]"
      )}
    >
      <div className={cn("flex items-center justify-between transition-all duration-500 p-1 md:p-3")}>
        {/* Logo */}
        <button
          onClick={() => {
            window.location.href = "/";
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className='flex items-center cursor-pointer group'
        >
          <div className='relative overflow-hidden'>
            <Image
              src='/logo-name.png'
              alt='Logo'
              width={100}
              height={100}
              priority
              className='transition-all duration-500 group-hover:scale-105'
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </button>

        {/* Desktop Links */}
        <div>
          <div className='hidden md:flex items-center gap-8'>
            <div className='flex gap-10 items-center'>
              {links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleScroll(e, link.path)}
                  className='cursor-pointer relative font-semibold text-slate-300 transition-all duration-300 hover:text-white uppercase font-montserrat tracking-wider text-sm group'
                >
                  {link.label}
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full'></span>
                </button>
              ))}
            </div>
            <Link target='_blank' href={LINKS.blog}>
              <ShinnyButton className={cn("transition-all duration-300", isScrolled ? "scale-90" : "scale-100")}>BLOGS</ShinnyButton>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className='md:hidden text-white pr-2 z-[70] relative'>
            <Drawer.Root open={open} onOpenChange={setOpen} direction='bottom' shouldScaleBackground>
              <Drawer.Trigger asChild>
                <div className='md:hidden text-white z-[70] relative'>
                  <label className='hamburger'>
                    <svg viewBox='0 0 32 32'>
                      <path
                        className='line line-top-bottom'
                        d='M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22'
                      ></path>
                      <path className='line' d='M7 16 27 16'></path>
                    </svg>
                  </label>
                </div>
              </Drawer.Trigger>

              <Drawer.Portal>
                <Drawer.Overlay className='fixed inset-0 bg-black/40 backdrop-blur-md z-[999]' />
                <Drawer.Content className='fixed bottom-0 left-0 right-0 z-[1000] mt-4 flex h-auto flex-col rounded-t-[40px] bg-[#0a0f1d] border-t border-white/10 shadow-2xl'>
                  {/* Handle */}
                  <Drawer.Title className='sr-only' />
                  <div className='mx-auto mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-white/20' />

                  {/* Close Button */}
                  <button
                    onClick={() => setOpen(false)}
                    className='absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-95'
                    aria-label='Close menu'
                  >
                    <IconX className='w-6 h-6 text-white' />
                  </button>

                  <div className='p-8 pt-12'>
                    {/* Mobile Logo */}
                    <button
                      onClick={() => {
                        window.location.href = "/";
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setOpen(false);
                      }}
                      className='flex justify-center mb-12 mx-auto'
                    >
                      <Image src='/logo-name.png' alt='Logo' width={160} height={160} priority style={{ width: "auto", height: "auto" }} />
                    </button>

                    {/* Links */}
                    <div className='flex flex-col items-center mb-16'>
                      {links.map((link, idx) => (
                        <Drawer.Close key={idx} asChild>
                          <button
                            onClick={(e) => {
                              handleScroll(e, link.path);
                              setOpen(false);
                            }}
                            className='font-semibold text-white uppercase font-montserrat tracking-widest py-3 px-6 hover:text-sky-400 transition-all active:scale-95'
                          >
                            {link.label}
                          </button>
                        </Drawer.Close>
                      ))}

                      <Drawer.Close asChild>
                        <Link href={LINKS.blog} className='mt-6'>
                          <ShinnyButton>BLOGS</ShinnyButton>
                        </Link>
                      </Drawer.Close>
                    </div>

                    {/* Social Links */}
                    <div className='flex justify-center gap-6 mt-8 pt-10 border-t border-white/5'>
                      {socialLinks.map(({ Icon, href, label, color }) => (
                        <Drawer.Close key={label} asChild>
                          <Link
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10'
                            aria-label={label}
                          >
                            <Icon className={cn("w-7 h-7 text-slate-300 transition-colors", color)} />
                          </Link>
                        </Drawer.Close>
                      ))}
                    </div>
                  </div>

                  {/* Safe area for mobile devices */}
                  <div className='h-10' />
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
