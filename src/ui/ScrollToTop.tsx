import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrolledFromTop = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show the button when near the bottom
      if (scrolledFromTop >= documentHeight - 2000) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed ~bottom-4/8 ~right-3/8 ~px-4/6 ~py-4/5 rounded-full bg-[#fb923c] cursor-pointer shadow-[0px 4px 6px rgba(0, 0, 0, 0.2)] z-[1]"
        >
          <FaArrowUp className="~w-4/5 ~h-4/5" color="#431407" />
        </motion.button>
      )}
    </div>
  );
}
