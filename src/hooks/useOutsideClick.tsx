import { useEffect, useRef } from "react";

interface UseOutsideClickProps {
  handler: () => void;
  listenCapturing?: boolean;
}

interface RefObject {
  current: HTMLElement | null;
}

export default function useOutsideClick({
  handler,
  listenCapturing = true,
}: UseOutsideClickProps): RefObject {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
