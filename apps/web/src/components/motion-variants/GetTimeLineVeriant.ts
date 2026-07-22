export const getTimelineVariants = (isEven: boolean, isMobile: boolean) => ({
  hidden: {
    opacity: 0,
    x: isEven ? (isMobile ? 100 : -100) : 100,
    scale: 0.8,
    rotate: isEven ? (isMobile ? 0 : -10) : isMobile ? 0 : 10,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 20,
      duration: 0.8,
    },
  },
});
