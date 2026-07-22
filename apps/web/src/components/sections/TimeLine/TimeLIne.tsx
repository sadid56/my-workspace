"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import BoxReveal from "../../ui/BoxReveal";
import "./timeline.css";
import TimelineItem from "./TimeLineItem";
import DockText from "../../ui/DockText";
import animationRocket from "@/assets/animation/rocket.json";
import useScrollTrigger from "@/hooks/useScrollTrigger";
import dynamic from "next/dynamic";
import { TExperience } from "@/types/experienceTypes";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface Props {
  data: TExperience[];
}

export const Timeline: React.FC<Props> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const scrollingDown = useScrollTrigger();
  const [rocketRotation, setRocketRotation] = useState(0);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  // Update rocket rotation based on scrolling direction
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRocketRotation(scrollingDown ? 180 : 0);
    }
  }, [scrollingDown]);

  // Set the height and init GSAP progress
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setHeight(rect.height);

    let cleanup: (() => void) | undefined;
    (async () => {
      if (!containerRef.current || !progressContainerRef.current || !progressFillRef.current) return;
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = (gsapMod as any).gsap || (gsapMod as any).default || (gsapMod as any);
      const ScrollTrigger = (stMod as any).ScrollTrigger || (stMod as any).default || (stMod as any);
      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }
      gsap.set(progressContainerRef.current, { height: rect.height });
      const tween = gsap.fromTo(
        progressFillRef.current,
        { height: 0, opacity: 0 },
        {
          height: rect.height,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 90%",
            scrub: true,
            onUpdate: (self: any) => {
              if (rocketRef.current) {
                const dir = self.direction; // 1 down, -1 up
                gsap.to(rocketRef.current, { rotate: dir === 1 ? 180 : 0, duration: 0.2, overwrite: true });
              }
            },
          },
        }
      );
      cleanup = () => {
        if (tween && (tween as any).kill) (tween as any).kill();
        if (ScrollTrigger && (ScrollTrigger as any).getAll) (ScrollTrigger as any).getAll().forEach((st: any) => st.kill());
      };
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className='w-full md:px-10 overflow-hidden z-10' ref={containerRef}>
      {/* Header Section */}
      <div className='px-4 lg:w-1/2 mx-auto text-center'>
        <BoxReveal duration={0.7}>
          <DockText text='My Professional Journey' />
        </BoxReveal>

        <BoxReveal duration={0.8}>
          <p className='max-w-2xl text-sm md:text-lg mt-5 text-slate-400 font-poppins'>
            A snapshot of my hands-on experience working with modern full-stack technologies, solving real problems, and contributing to
            impactful products across teams.
          </p>
        </BoxReveal>
      </div>

      {/* Timeline Section */}
      <div ref={ref} className='relative pb-20'>
        {data.map((item: TExperience, index: number) => (
          <TimelineItem item={item} index={index} key={item.id + index} />
        ))}

        {/* Centered Progress Line */}
        <div
          ref={progressContainerRef}
          style={{ height: height + "px" }}
          className='
    absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 top-0
    overflow-hidden w-[30px]
    bg-linear-to-b from-transparent via-slate-700/20 to-transparent
    mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]
    z-0
  '
        >
          <div ref={progressFillRef} className='absolute inset-x-0 top-0 w-20'>
            {/* Rocket Animation */}
            <div ref={rocketRef} style={{ transform: `rotate(${rocketRotation}deg)` }} className='w-14 h-14 absolute bottom-0 right-9'>
              <Lottie animationData={animationRocket} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
