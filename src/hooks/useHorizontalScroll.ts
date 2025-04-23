import { useRef } from "react";

export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (distance: number = 200) => {
    containerRef.current?.scrollBy({ left: -distance, behavior: "smooth" });
  };

  const scrollRight = (distance: number = 200) => {
    containerRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  return { containerRef, scrollLeft, scrollRight };
}
