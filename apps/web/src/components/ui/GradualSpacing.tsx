"use client";

import { cn } from "@/lib/cn";
import { AnimatePresence, motion, useAnimation, useInView, Variants } from "motion/react";
import React, { ReactNode, ReactElement, useRef, useEffect } from "react";

interface GradualSpacingProps {
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
  children: ReactNode;
}

export function GradualSpacing({
  duration = 0.1,
  delayMultiple = 0.02,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
  children,
}: GradualSpacingProps) {
  const mainControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]);

  const renderContent = (node: ReactNode, index: number): ReactNode => {
    if (typeof node === "string") {
      return node.split("").map((char, i) => (
        <motion.span
          key={`${index}-${i}`}
          initial='hidden'
          animate={mainControls}
          exit='hidden'
          variants={framerProps}
          transition={{ duration, delay: (index + i) * delayMultiple }}
          className='inline-block'
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </motion.span>
      ));
    }

    if (React.isValidElement(node)) {
      const element = node as ReactElement<any>; // <-- tell TS it has props

      return React.cloneElement(element, {
        key: index,
        children: React.Children.map(element.props.children, (child, i) => renderContent(child, index + i)),
      });
    }

    return node;
  };

  return (
    <div ref={ref} className={cn("flex max-w-4xl flex-wrap justify-center", className)}>
      <AnimatePresence>{React.Children.map(children, renderContent)}</AnimatePresence>
    </div>
  );
}
