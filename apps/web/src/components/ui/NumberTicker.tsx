"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in seconds
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // Initialize motionValue based on the direction (up or down)
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  // Track whether the span element is in the viewport
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    // Debug: Log when in view is true
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value); // Start animation
      }, delay * 1000); // Apply delay if any
    }
  }, [isInView, motionValue, delay, value, direction]);

  useEffect(() => {
    // Listen to changes in springValue and update the text content
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces))); // Format with decimal places
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [springValue, decimalPlaces]);

  return (
    <span
      className={cn(className)} // Apply custom styles via className
      ref={ref} // Attach the ref to the span
    />
  );
}
