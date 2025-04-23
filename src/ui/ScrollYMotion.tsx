import { motion, useSpring, useScroll } from "motion/react";

export default function ScrollYMotion() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      id="scroll-indicator"
      style={{
        scaleX,
      }}
      className="fixed top-0 left-0 right-0 h-2 bg-[#431407] origin-left z-[1]"
    />
  );
}
