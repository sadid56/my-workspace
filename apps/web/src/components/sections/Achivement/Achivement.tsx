"use client";
import { MagicCard } from "@/components/ui/MagicCard";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { cn } from "@/lib/cn";
import { IconAddressBook, IconBook2, IconCalendarEvent } from "@tabler/icons-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Achievements = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const items = [
    {
      title: "Years of Experience",
      value: 1.5,
      initial: { rotate: -20, x: -30, scale: 0.9 },
      icon: <IconCalendarEvent size={48} strokeWidth={1} className='text-primary' />,
    },
    {
      title: "Projects Completed",
      value: 10,
      initial: { rotate: 0, x: 0, scale: 0.9 },
      icon: <IconAddressBook size={48} strokeWidth={1} className='text-primary' />,
    },
    {
      title: "Achievement",
      value: 5,
      initial: { rotate: 20, x: 30, scale: 0.9 },
      icon: <IconBook2 size={48} strokeWidth={1} className='text-primary' />,
    },
  ];

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".achv-card");

      cards.forEach((card, index) => {
        const init = (items[index] as any)?.initial || { rotate: 0, x: 0, scale: 1 };
        gsap.set(card, { ...init, opacity: 0 });

        gsap.to(card, {
          rotate: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.9,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className='flex justify-center gap-10 items-center flex-col lg:flex-row pb-20 lg:pb-80 lg:mt-5'>
      {items.map((item, index) => (
        <MagicCard key={index} className={cn(`achv-card transition-all cursor-pointer duration-150 ease-out rounded-lg p-px relative`)}>
          <div className={`relative w-64 h-80 bg-gradient-to-b from-[#2d3138] to-[#04080e] flex justify-center items-center rounded-lg`}>
            <div className='flex flex-col items-center gap-3'>
              <div>{item.icon}</div>
              <h2 className='text-slate-300 font-bold font-montserrat text-4xl'>
                <NumberTicker value={item.value} />+
              </h2>
            </div>
            <span className='absolute bottom-0 w-full h-10 bg-white/5 flex justify-center items-center text-gray-400 font-poppins'>
              {item.title}
            </span>
          </div>
        </MagicCard>
      ))}
    </div>
  );
};

export default Achievements;
