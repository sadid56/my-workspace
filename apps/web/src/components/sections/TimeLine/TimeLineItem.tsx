import React, { useLayoutEffect, useRef } from "react";
import useIsMobile from "@/hooks/useMobile";

import { TExperience } from "@/types/experienceTypes";
import Link from "next/link";

interface TimelineItemProps {
  item: TExperience;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement | null>(null);

  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    let cleanup: (() => void) | undefined;
    if (!ref.current) return;
    const el = ref.current;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = (gsapMod as any).gsap || (gsapMod as any).default || (gsapMod as any);
      const ScrollTrigger = (stMod as any).ScrollTrigger || (stMod as any).default || (stMod as any);

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      const fromX = isMobile ? 0 : isEven ? -60 : 60;
      const fromY = 40;

      gsap.set(el, { opacity: 0, x: fromX, y: fromY });

      const tween = gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      cleanup = () => tween.kill();
    })();

    return () => cleanup?.();
  }, [isEven, isMobile]);

  return (
    <div
      ref={ref}
      className={`relative lg:flex lg:justify-between z-20 gap-10 pt-20 md:pt-40 ${
        isEven ? "flex-row lg:mr-28 ml-10 lg:ml-0" : "flex-row-reverse ml-10 lg:ml-28"
      }`}
    >
      <div
        className={`group p-5 md:p-10 w-full lg:w-[50%] relative rounded-3xl
        border border-white/10 bg-slate-700/30 backdrop-blur-2xl
        shadow-xl hover:shadow-2xl transition-shadow duration-500 ${isEven ? "text-left lg:text-right" : "text-left"}`}
      >
        <div className='space-y-4'>
          {/* Role */}
          <h3 className='text-xl md:text-3xl font-bold text-neutral-100'>{item.role}</h3>

          {/* Company & Period */}
          <p className='text-sm text-neutral-400'>
            {item?.website ? (
              <Link className='underline' target='_blank' href={item.website}>
                {item.company}
              </Link>
            ) : (
              item.company
            )}{" "}
            · {item.location}
          </p>

          <p className='text-xs text-neutral-500'>{item.period}</p>

          {/* Tech stack */}
          <div className='flex flex-wrap gap-2 pt-2'>
            {item.tech.map((tech) => (
              <span
                key={tech}
                className='text-xs rounded-full bg-slate-800/60
                border border-white/10 px-3 py-1 text-neutral-300'
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <ul className='pt-4 space-y-3 text-sm md:text-[16px] text-neutral-300'>
            {item.highlights.map((point, i) => (
              <li key={i} className='flex gap-2 text-start'>
                <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500' />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
