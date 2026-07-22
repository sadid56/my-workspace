"use client";
import { useScroll, useTransform, motion } from "motion/react";

export default function DynamicBackground({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.7, 0.8, 1],
    ["#010610", "#010610", "#010610", "#010610", "#090946", "#010610"]
  );

  return <motion.div style={{ backgroundColor }}>{children}</motion.div>;
}
