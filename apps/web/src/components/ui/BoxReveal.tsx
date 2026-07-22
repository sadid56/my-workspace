import { JSX } from "react";
import * as motion from "motion/react-client";

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  duration?: number;
  overflow?: "visible" | "hidden";
  viewportAnimate?: boolean;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  duration = 0.6,
  overflow = "hidden",
  viewportAnimate = true,
}: BoxRevealProps) => {
  // If viewportAnimate is true, use motion.div
  if (viewportAnimate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }} // animate to normal position
        viewport={{ once: true, amount: 0.6 }} // trigger only once when 60% is visible
        transition={{
          duration,
          ease: [0.4, 0, 0.2, 1],
          delay: 0.2,
        }}
      >
        {children}
      </motion.div>
    );
  } else {
    return (
      <div style={{ position: "relative", width, overflow }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2,
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }
};

export default BoxReveal;
