import { Link } from "react-router-dom";

function NavLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="px-2 text-center capitalize transition-all duration-200 w-fit decoration-blue-700 active:bg-orange-200 hover:ring hover:outline-none hover:ring-secondary-orange hover:rounded-sm focus:ring focus:rounded-sm focus:ring-secondary-orange"
    >
      {children}
    </Link>
  );
}

export default NavLink;
