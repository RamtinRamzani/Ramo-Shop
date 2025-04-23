import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { CartIcon } from "../assets/icons";
import Logout from "../components/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HamburgerMenu } from "./HamburgerMenu";

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex">
      <div className="flex items-center ~gap-1/2 max-xl:hidden">
        <li>
          <ButtonIcon onClick={() => navigate("/account")}>
            <HiOutlineUser className="~text-lg/2xl" />
          </ButtonIcon>
        </li>

        {/* <li>
          <DarkModeToggle />
        </li> */}

        <li>
          <Logout />
        </li>

        <li className="flex items-center gap-0.5">
          <CartIcon />
          <span className="flex items-center justify-center w-5 h-5 p-2 text-sm text-white bg-black rounded-full">
            2
          </span>
        </li>
      </div>

      <HamburgerMenu />
    </ul>
  );
}

export default HeaderMenu;
