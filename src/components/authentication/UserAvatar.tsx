import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const fullName = user?.user_metadata?.fullName;
  const avatar = user?.user_metadata?.avatar;
  const isActive = location.pathname.startsWith("/account");

  return (
    <div
      className={`flex ~gap-2/3 items-center text-neutral-07 dark:text-grey-200 font-medium cursor-pointer rounded-md transition-all ${
        isActive
          ? "bg-orange-200 dark:bg-grey-700"
          : "hover:bg-orange-100 dark:hover:bg-grey-600"
      }`}
      onClick={() => navigate("/account")}
      role="button"
      aria-label={`Go to account page for ${fullName || "user"}`}
    >
      <img
        src={avatar || "/images/default-user.jpg"}
        alt={`Avatar of ${fullName || "user"}`}
        className="block w-10 h-10 rounded-full object-cover object-center border-2 border-neutral-04 dark:border-grey-600 text-xs"
      />
      <span className="font-semibold capitalize ~text-sm/base pr-2">
        {fullName || "Guest"}
      </span>
    </div>
  );
}

export default UserAvatar;
