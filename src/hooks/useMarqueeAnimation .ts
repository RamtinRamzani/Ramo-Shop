import { useEffect, useRef } from "react";

export function useMarqueeAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      const animateMarquee = () => {
        const elementHeight = element.offsetHeight;
        if (elementHeight > 0) {
          element.style.animation = "none";
          void element.offsetHeight; // Trigger reflow to reset animation
          element.style.animation = "marquee 10s linear infinite"; // Restart the animation
        }
      };

      animateMarquee();
    }

    return () => {
      if (element) {
        element.style.animation = "none"; // Cleanup animation on unmount
      }
    };
  }, []);

  return { containerRef };
}
