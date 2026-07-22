"use client";
import { useRef, useEffect, useState } from "react";
import SectionTitle from "@/components/global/SectionTitle";
import projects from "@/data/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/global/Container";
import Card from "./Card";
import VideoModal from "./VideoModal";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  cardsRef.current = [];

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const totalCards = cardsRef.current.length;

      gsap.to(cardsRef.current, {
        xPercent: -100 * (totalCards - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalCards * 600}`,
          pin: true,
          scrub: 1,
          snap: 1 / (totalCards - 0.5),
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <Container id='projects' className='relative'>
      <SectionTitle text='Projects_' color='My' />
      <div ref={containerRef} className='relative h-auto md:h-screen overflow-visible md:overflow-hidden pt-10'>
        <div className='flex flex-col md:flex-row items-center h-full w-full gap-10 md:gap-10 pb-20 md:pb-0'>
          {projects.map((card, idx) => (
            <div ref={addToRefs} key={idx} className='w-full md:w-[850px] mx-auto h-[350px] md:h-[350px] flex-shrink-0 snap-center md:ml-0'>
              <Card project={card} onPlayVideo={() => setActiveVideo(card.video_url)} />
            </div>
          ))}
        </div>
      </div>

      <VideoModal videoKey={activeVideo} onClose={() => setActiveVideo(null)} />
    </Container>
  );
};

export default Projects;
