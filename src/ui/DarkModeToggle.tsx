import { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import ButtonIcon from "./ButtonIcon";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark);
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isDark]);

  return (
    <ButtonIcon
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="focus:ring-2 focus:ring-orange-200"
    >
      {isDark ? (
        <IoSunnyOutline className="~text-lg/2xl text-neutral-07 dark:text-grey-200" />
      ) : (
        <IoMoonOutline className="~text-lg/2xl text-neutral-07 dark:text-grey-200" />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
