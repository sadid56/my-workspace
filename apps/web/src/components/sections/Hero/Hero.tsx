"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconBrandReact, IconBrandNextjs, IconBrandTypescript, IconRocket } from "@tabler/icons-react";
import Container from "@/components/global/Container";
import { cn } from "@/lib/cn";
import Link from "next/link";
import socialLinks from "@/data/socialLinks";
import usePageScroll from "@/hooks/usePageScroll";
import { FlipWords } from "@/components/ui/FlipWords";
import Skills from "../Skills/Skills";
import LINKS from "@/constant/links";
import styles from "@/styles/hero.module.css";
import useScrollTrigger from "@/hooks/useScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const dLetterRef = useRef<HTMLSpanElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const handleScroll = usePageScroll();
  const isScroll = useScrollTrigger();
  const words = ["Software developer", "Web developer", "Full stack developer", "React developer"];

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px)",
      () => {
        const ctaButtons = containerRef.current?.querySelectorAll(".cta-btn") ?? [];
        const gradualEls = containerRef.current?.querySelectorAll(".GradualSpacing") ?? [];
        const socialEls = containerRef.current?.querySelectorAll(".social-links-container") ?? [];
        const blurTargets = containerRef.current?.querySelectorAll(".blur-target") ?? [];

        // Initial states
        if (revealRef.current) gsap.set(revealRef.current, { clipPath: "circle(0% at 50% 50%)" });
        if (dLetterRef.current) {
          gsap.set(dLetterRef.current, {
            scale: 1,
            opacity: 1,
            transformOrigin: "50% 50%",
          });
        }

        const letters = Array.from(nameRef.current?.querySelectorAll("span") ?? []);
        const leftLetters = letters.slice(0, 2); // S, A
        const rightLetters = letters.slice(3, 5); // I, D
        const dLetter = dLetterRef.current;
        const description = containerRef.current?.querySelector(".GradualSpacing");
        const cta = containerRef.current?.querySelector(".cta-btn");
        const social = containerRef.current?.querySelector(".social-links-container");

        const otherContentTargets: (Element | HTMLElement)[] = [
          ...Array.from(gradualEls),
          ...Array.from(ctaButtons),
          ...Array.from(socialEls),
          ...Array.from(blurTargets),
        ];
        if (portraitRef.current) otherContentTargets.push(portraitRef.current);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onLeaveBack: () => {
              gsap.to(otherContentTargets, {
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                duration: 0.5,
                clearProps: "all",
              });
              gsap.to([nameRef.current, description, cta, dLetter, social, ...leftLetters, ...rightLetters], {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.5,
                clearProps: "all",
              });
              gsap.to(revealRef.current, {
                clipPath: "circle(0% at 50% 50%)",
                duration: 0.5,
                clearProps: "all",
              });
            },
          },
        });

        gsap.set(otherContentTargets, {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
        });
        gsap.set([...leftLetters, ...rightLetters], {
          filter: "blur(0px)",
          opacity: 1,
          x: 0,
        });

        tl.to(
          otherContentTargets,
          {
            filter: "blur(3px)",
            opacity: 0.8,
            scale: 0.98,
            duration: 0.8,
            ease: "power2.out",
          },
          0,
        );

        tl.to(
          otherContentTargets,
          {
            filter: "blur(8px)",
            opacity: 0.5,
            scale: 0.96,
            duration: 0.7,
            ease: "power2.inOut",
          },
          0.8,
        );

        // Final blur stage
        tl.to(
          otherContentTargets,
          {
            filter: "blur(12px)",
            opacity: 0.2,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.in",
          },
          1.5,
        );

        tl.to(
          dLetter,
          {
            x: () => {
              if (!dLetter) return 0;
              const dRect = dLetter.getBoundingClientRect();
              const dCenterX = dRect.left + dRect.width / 2;
              return window.innerWidth / 2 - dCenterX;
            },
            y: () => {
              if (!dLetter) return 0;
              const dRect = dLetter.getBoundingClientRect();
              const dCenterY = dRect.top + dRect.height / 2;
              return window.innerHeight / 2 - dCenterY;
            },
            duration: 1.5,
            ease: "power2.inOut",
          },
          0,
        );

        if (socialEls.length > 0) {
          tl.to(
            socialEls,
            {
              y: -350,
              opacity: 0.1,
              duration: 1.2,
              ease: "power3.inOut",
            },
            0.5,
          );
        }

        tl.to(
          [description, cta],
          {
            y: 100,
            opacity: 0.1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          0.5,
        );

        // Combine movement with blur so they don't look stuck
        tl.to(
          leftLetters,
          {
            x: -300,
            opacity: 0,
            filter: "blur(12px)",
            duration: 2,
            ease: "power2.inOut",
          },
          0,
        );

        tl.to(
          rightLetters,
          {
            x: 300,
            opacity: 0,
            filter: "blur(12px)",
            duration: 2,
            ease: "power2.inOut",
          },
          0,
        );

        tl.to(
          dLetter,
          {
            scale: 30,
            fontWeight: 900,
            textShadow: "0 0 80px rgba(56, 189, 248, 0.6)",
            ease: "power3.inOut",
            duration: 1.5,
            force3D: false,
            lazy: false,
            onStart: () => {
              if (!dLetterRef.current) return;
              gsap.set(dLetterRef.current, {
                backgroundImage: "linear-gradient(to right, #ffffff, #e2e8f0, #f8fafc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              });
            },
          },
          2.3,
        );

        tl.to(
          revealRef.current,
          {
            clipPath: "circle(150% at 50% 50%)",
            ease: "power2.in",
            duration: 1.5,
          },
          3.2,
        );

        tl.to(
          dLetterRef.current,
          {
            opacity: 0,
            duration: 1,
          },
          3.4,
        );

        // Floating icons gentle animation
        const floatingIcons = Array.from(containerRef.current?.querySelectorAll(".floating-icon") ?? []);
        floatingIcons.forEach((el, idx) => {
          const baseDuration = 3 + (idx % 3) * 0.6;
          gsap.to(el, {
            y: "+=18",
            rotate: idx % 2 === 0 ? 6 : -6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: baseDuration,
          });
        });

        // Parallax with mouse move
        const onMouseMove = (e: MouseEvent) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const mx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
          const my = (e.clientY - rect.top) / rect.height - 0.5;
          floatingIcons.forEach((el, idx) => {
            const speed = 10 + (idx % 4) * 5;
            gsap.to(el, { x: mx * speed, yPercent: my * 2, duration: 0.3, ease: "power2.out" });
          });
        };
        containerRef.current?.addEventListener("mousemove", onMouseMove);

        return () => {
          containerRef.current?.removeEventListener("mousemove", onMouseMove);
          gsap.killTweensOf(floatingIcons);
        };
      },
      containerRef,
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id='home' ref={containerRef} className='relative h-screen overflow-hidden'>
      <div className='pointer-events-none hidden lg:block absolute inset-0 z-20 blur-target'>
        <IconBrandReact className='floating-icon absolute top-[20%] right-[30%] w-9 h-9 text-blue-300/70 drop-shadow-[0_0_10px_rgba(203,213,225,0.25)]' />

        <IconBrandNextjs className='floating-icon absolute bottom-32 left-[35%] w-10 h-10 text-slate-200/70' />
        <IconBrandTypescript className='floating-icon absolute top-[15%] md:top-1/2 right-[10%] w-9 h-9 text-blue-300/70' />
      </div>
      <div ref={revealRef} className='absolute inset-0 z-50 bg-mainBgColor' style={{ clipPath: "circle(0% at 50% 50%)" }}>
        <Skills />
      </div>
      <div className='absolute inset-0 z-0 blur-target'>
        <div className='absolute top-1/3 -right-20 w-96 h-96 bg-linear-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl float-slow'></div>
      </div>
      <div className='absolute inset-0 z-0 blur-target bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,black_20%,transparent_100%)]'></div>

      {/* Background Portrait Overlay */}
      <div ref={portraitRef} className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
        <div
          className='absolute right-[10%] md:right-[40%] bottom-[40%] md:-bottom-[20%] w-full h-[130%] bg-no-repeat bg-bottom-right bg-contain opacity-[0.08]'
          style={{
            backgroundImage: "url('/images/v3.png')",
            maskImage: "linear-gradient(to left, black 20%, transparent 80%), linear-gradient(to top, black 20%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to left, black 20%, transparent 80%), linear-gradient(to top, black 100%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            filter: "grayscale(100%) brightness(1.5) contrast(1.1)",
          }}
        />
      </div>
      <Container className='relative z-30 pb-20 pr-4 lg:pr-28 2xl:pr-0 h-full flex flex-col justify-end items-end text-right'>
        {/* Name */}
        <div ref={nameRef} className='mb-6'>
          <h1 className='text-[90px] leading-[90%] md:text-[130px] lg:text-[150px] xl:text-[210px] font-montserrat uppercase font-black select-none'>
            {"Sadid".split("").map((letter, idx) => (
              <span
                key={idx}
                ref={idx === 2 ? dLetterRef : null}
                className={cn(
                  "inline-block mx-1 bg-linear-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent",
                  "cursor-default",
                )}
                style={
                  idx === 2
                    ? {
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                        textRendering: "optimizeLegibility",
                      }
                    : undefined
                }
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Description */}
        <div className='text-slate-300 font-poppins font-normal max-w-[700px] mb-6 GradualSpacing'>
          Passionate {<FlipWords words={words} />} specializing in React, Next.js, Node.js, PostgreSQL, and TypeScript, with a strong focus
          on clean code, scalability, and continuous learning.
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-wrap gap-4 justify-end cta-btn'>
          <button
            onClick={(e) => handleScroll(e, "#projects")}
            className={cn(
              "group relative h-12 px-8 bg-slate-800/40 backdrop-blur-xl border border-sky-500/20 outline-none cursor-pointer font-montserrat rounded-xl font-semibold tracking-wide transition-all duration-500 hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] hover:-translate-y-1 flex items-center gap-2 text-sky-100 overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-slate-950",
              isScroll ? "z-[-1]" : "z-1",
            )}
          >
            <span className='absolute inset-0 bg-linear-to-r from-transparent via-sky-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700'></span>
            <span className='relative z-10'>Projects</span>
            <IconRocket className='relative z-10 w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110' />
          </button>
          <Link
            target='_blank'
            href={LINKS.resume}
            className={cn(
              "group relative h-12 px-8 bg-sky-500/20 backdrop-blur-xl border border-sky-400/30 outline-none cursor-pointer font-montserrat rounded-xl font-semibold tracking-wide transition-all duration-500 hover:bg-sky-500/30 hover:border-sky-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:-translate-y-1 flex items-center gap-2 text-sky-100 overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-slate-950",
              isScroll ? "z-[-1]" : "z-1",
            )}
          >
            <span>Resume</span>
          </Link>
        </div>
      </Container>
      {/* Social Links */}
      <div
        className={cn(
          "social-links-container hidden absolute bottom-4 left-1/2 -translate-x-1/2 lg:flex gap-6 md:flex-col md:fixed md:right-4 md:top-1/2 md:-translate-y-1/2 md:left-auto md:translate-x-0 h-fit",
        )}
      >
        {socialLinks.map(({ Icon, href, label, color }) => (
          <Link
            key={label}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='group p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-600/80 transition-all duration-300 hover:scale-110 hover:bg-slate-800/50 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-500/10'
            aria-label={label}
          >
            <Icon className={cn("w-6 h-6 text-slate-300 transition-colors", color)} />
          </Link>
        ))}
      </div>
      {/* Mouse scroll indicator (right side) */}
      <div className='fixed right-3 bottom-5 z-40 pointer-events-none hidden md:flex flex-col items-center gap-2'>
        <p className='text-slate-400 text-xs rotate-90 font-poppins tracking-widest pr-4'>
          <small>Scroll</small>
        </p>
        <div className={cn(styles.arrow, "mr-px")}></div>
      </div>
    </section>
  );
};

export default Hero;
