import { IconBrandReact, IconBrandNextjs, IconBrandTypescript, IconRocket } from "@tabler/icons-react";
import Container from "@/components/global/Container";
import { cn } from "@/lib/cn";
import Link from "next/link";
import socialLinks from "@/data/socialLinks";
import { FlipWords } from "@/components/ui/FlipWords";
import LINKS from "@/constant/links";
import styles from "@/styles/hero.module.css";

const Hero = () => {
  const words = ["Software developer", "Web developer", "Full stack developer", "React developer"];

  return (
    <section id='home' className='relative h-screen overflow-hidden bg-background text-foreground transition-colors duration-300'>
      {/* Floating Tech Logos */}
      <div className='pointer-events-none hidden lg:block absolute inset-0 z-20'>
        <IconBrandReact className='absolute top-[20%] right-[30%] w-9 h-9 text-blue-400/40 dark:text-blue-400/60 drop-shadow-[0_0_10px_rgba(56,189,248,0.15)] animate-bounce' style={{ animationDuration: '3s' }} />
        <IconBrandNextjs className='absolute bottom-32 left-[35%] w-10 h-10 text-foreground/40 dark:text-foreground/60 animate-bounce' style={{ animationDuration: '4s' }} />
        <IconBrandTypescript className='absolute top-[15%] md:top-1/2 right-[10%] w-9 h-9 text-blue-500/40 dark:text-blue-500/50 animate-bounce' style={{ animationDuration: '5s' }} />
      </div>

      {/* Decorative Blob */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-1/3 -right-20 w-96 h-96 bg-linear-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl'></div>
      </div>

      {/* Background Portrait Overlay */}
      <div className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
        <div
          className='absolute right-[10%] md:right-[40%] bottom-[40%] md:-bottom-[20%] w-full h-[130%] bg-no-repeat bg-bottom-right bg-contain opacity-[0.04] dark:opacity-[0.07]'
          style={{
            backgroundImage: "url('/images/v3.png')",
            maskImage: "linear-gradient(to left, black 20%, transparent 80%), linear-gradient(to top, transparent 0%, black 20%)",
            WebkitMaskImage: "linear-gradient(to left, black 20%, transparent 80%), linear-gradient(to top, transparent 0%, black 20%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            filter: "grayscale(100%) brightness(1.2) contrast(1.1)",
          }}
        />
      </div>

      <Container className='relative z-30 pb-20 pr-4 lg:pr-28 2xl:pr-0 h-full flex flex-col justify-end items-end text-right'>
        {/* Name */}
        <div className='mb-6'>
          <h1 className='text-[90px] leading-[90%] md:text-[130px] lg:text-[150px] xl:text-[210px] font-montserrat uppercase font-black select-none'>
            {"Sadid".split("").map((letter, idx) => (
              <span
                key={idx}
                className={cn(
                  "inline-block mx-1 bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent",
                  "cursor-default"
                )}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Description */}
        <div className='text-slate-600 dark:text-slate-300 font-poppins font-normal max-w-[700px] mb-6'>
          Passionate {<FlipWords words={words} />} specializing in React, Next.js, Node.js, PostgreSQL, and TypeScript, with a strong focus
          on clean code, scalability, and continuous learning.
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-wrap gap-4 justify-end'>
          <Link
            href={"/projects"}
            className={cn(
              "group relative h-12 px-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none cursor-pointer font-montserrat rounded-xl font-semibold tracking-wide transition-all duration-300 hover:border-theme-primary/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] hover:-translate-y-0.5 flex items-center gap-2 text-slate-800 dark:text-slate-100 overflow-hidden focus:outline-none"
            )}
          >
            <span className='absolute inset-0 bg-linear-to-r from-transparent via-theme-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700'></span>
            <span className='relative z-10'>Projects</span>
            <IconRocket className='relative z-10 w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 text-theme-primary' />
          </Link>
          <Link
            target='_blank'
            href={LINKS.resume}
            className={cn(
              "group relative h-12 px-8 bg-theme-primary/10 dark:bg-theme-primary/20 border border-theme-primary/25 outline-none cursor-pointer font-montserrat rounded-xl font-semibold tracking-wide transition-all duration-300 hover:bg-theme-primary/20 dark:hover:bg-theme-primary/35 hover:border-theme-primary/45 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] hover:-translate-y-0.5 flex items-center gap-2 text-slate-800 dark:text-slate-100 overflow-hidden focus:outline-none"
            )}
          >
            <span>Resume</span>
          </Link>
        </div>
      </Container>

      {/* Social Links */}
      <div className='hidden absolute bottom-4 left-1/2 -translate-x-1/2 lg:flex gap-6 md:flex-col md:fixed md:right-4 md:top-1/2 md:-translate-y-1/2 md:left-auto md:translate-x-0 h-fit'>
        {socialLinks.map(({ Icon, href, label, color }) => (
          <Link
            key={label}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='group p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 transition-all duration-300 hover:scale-110 hover:bg-black/10 dark:hover:bg-white/10 hover:border-theme-primary/30 hover:shadow-lg'
            aria-label={label}
          >
            <Icon className={cn("w-6 h-6 text-slate-700 dark:text-slate-300 transition-colors", color)} />
          </Link>
        ))}
      </div>

      {/* Smooth bottom transition overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;
