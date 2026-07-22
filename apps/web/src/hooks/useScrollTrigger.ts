import { useState, useEffect, useRef } from "react";

const useScrollTrigger = (threshold: number = 50) => {
  const [scrollingDown, setScrollingDown] = useState<boolean>(false);
  const lastScrollTopRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;
      const scrollDiff = currentScrollTop - lastScrollTopRef.current;

      if (Math.abs(scrollDiff) >= threshold) {
        setScrollingDown(scrollDiff > 0);
        lastScrollTopRef.current = currentScrollTop;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrollingDown;
};

export default useScrollTrigger;
