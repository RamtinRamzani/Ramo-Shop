import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isPending } = useLogout();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <ButtonIcon disabled={isPending} onClick={handleLogout}>
      <HiArrowRightOnRectangle className="~text-lg/3xl" color="red" />
    </ButtonIcon>
  );
}

export default Logout;
