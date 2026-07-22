"use client";
import { useScroll, motion, useSpring } from "motion/react";
import styles from "@/styles/progressbar.module.css";
import { cn } from "@/lib/cn";

const TopProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <motion.div className={cn(styles.progressBar)} style={{ scaleX }} />
    </>
  );
};

export default TopProgressBar;
