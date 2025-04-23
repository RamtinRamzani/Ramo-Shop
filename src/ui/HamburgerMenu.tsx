import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartIcon } from "../assets/icons";
import Logout from "../components/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
import { RootState } from "../app/store";
import { getCart } from "../components/cartPage/cartSlice";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state: RootState) => getCart(state) || []);
  const cartItemCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      path: "/",
      label: "Home",
      icon: <HiOutlineHome className="~text-lg/2xl" />,
    },
    {
      path: "/account",
      label: "Account",
      icon: <HiOutlineUser className="~text-lg/2xl" />,
    },
    {
      path: "/account/wishlist",
      label: "Wishlist",
      icon: <HiOutlineHeart className="~text-lg/2xl" />,
    },
    {
      path: "/shop",
      label: "Shop",
      icon: <HiOutlineShoppingCart className="~text-lg/2xl" />,
    },
    {
      path: "/cart",
      label: "Cart",
      icon: (
        <div className="flex items-center gap-0.5">
          <CartIcon />
          {cartItemCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 p-2 text-sm text-white bg-black rounded-full dark:bg-grey-700">
              {cartItemCount}
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <li className="flex items-center">
      <button
        onClick={toggleMenu}
        className="w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-neutral-04 z-50 ~mt-[18px]/[15px]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span
          className={`block absolute h-1 w-6 rounded-full bg-neutral-07 dark:bg-grey-300 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
          }`}
        />
        <span
          className={`block absolute h-1 w-6 rounded-full bg-neutral-07 dark:bg-grey-300 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block absolute h-1 w-6 rounded-full bg-neutral-07 dark:bg-grey-300 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-30 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
            />

            {/* Sidebar Menu */}
            <motion.div
              className="fixed top-0 right-0 lg:w-80 md:w-[290px] sm:w-56 h-full z-40 bg-neutral-03 dark:bg-grey-800 py-10 px-6 shadow-lg rounded-l-md"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="mt-14 w-full text-base flex items-center flex-col gap-4">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.path}
                    className="font-semibold text-center list-none p-3 rounded-md hover:bg-orange-200 dark:hover:bg-grey-700 transition-all duration-200 ease-in-out transform hover:scale-105 w-full"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: index * 0.1,
                    }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center justify-center gap-3 text-neutral-07 dark:text-grey-200"
                      onClick={toggleMenu}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </motion.li>
                ))}

                <div className="flex items-center justify-between gap-4 mt-8">
                  <motion.li
                    className="font-semibold text-center list-none"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: 0.5,
                    }}
                  >
                    <DarkModeToggle />
                  </motion.li>

                  <motion.li
                    className="font-semibold text-center list-none"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: 0.6,
                    }}
                  >
                    <Logout />
                  </motion.li>
                </div>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </li>
  );
}
