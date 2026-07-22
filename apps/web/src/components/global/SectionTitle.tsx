"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import styles from "@/styles/section-title.module.css";

interface SectionTitleProps {
  color: string;
  text: string;
  lineBrak?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ color, text, lineBrak = false }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <motion.div ref={ref} initial='hidden' animate={controls} variants={variants} transition={{ duration: 1 }} className=' relative'>
      <h2
        className={`${inView && `${styles.animation}`} flex ${
          lineBrak ? "flex-col" : ""
        } gap-2 text-3xl md:text-5xl font-semibold font-montserrat bg-gradient-to-r from-white/50 via-slate-300 to-slate-600 bg-clip-text text-transparent`}
      >
        <span>{color}</span> <span className='text-slate-300'>{text}</span>
      </h2>
    </motion.div>
  );
};

export default SectionTitle;
