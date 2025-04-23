import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "../../ui/DarkModeToggle";
import { HamburgerMenu } from "../../ui/HamburgerMenu";
import MainContainer from "../../ui/MainContainer";
import ScrollYMotion from "../../ui/ScrollYMotion";
import UserAvatar from "../authentication/UserAvatar";

export default function Header() {
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/cart", label: "Cart" },
  ];

  return (
    <header className="fixed top-0 left-0 z-[999] w-full shadow-md bg-bg-color dark:bg-grey-900 dark:border-b dark:border-grey-800">
      <MainContainer className="flex items-center justify-between h-[70px] py-2">
        <button
          onClick={() => navigate("/")}
          className="flex items-center focus:outline-none focus:ring-2 focus:ring-orange-200"
          aria-label="Go to homepage"
        >
          <h2
            className="~text-xl/3xl font-bold tracking-tight text-neutral-07 dark:text-grey-200"
            style={{ fontFamily: "Poppins" }}
          >
            R.A.M.O
          </h2>
        </button>

        <ul className="hidden xl:flex items-center gap-6 font-semibold capitalize text-neutral-07 dark:text-grey-200">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-orange-200 dark:bg-grey-700"
                      : "hover:bg-orange-100 dark:hover:bg-grey-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center ~gap-2/4">
          <UserAvatar />
          <DarkModeToggle />
          <HamburgerMenu />
        </div>

        <ScrollYMotion />
      </MainContainer>
    </header>
  );
}
