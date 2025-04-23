import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { useUser } from "../authentication/useUser";

interface Account {
  title: string;
  to?: string;
}

interface AccountNavProps {
  account: Account[];
  setPageTitle: (title: string) => void;
}

export default function AccountNav({ account, setPageTitle }: AccountNavProps) {
  const { user } = useUser();
  const avatar = user?.user_metadata?.avatar;
  const fullName = user?.user_metadata?.fullName;
  const navigate = useNavigate();

  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedTitle(selected);
    setPageTitle(selected);
    const selectedAccount = account.find((acc) => acc.title === selected);
    if (selectedAccount?.to) {
      navigate(selectedAccount.to);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-2 my-10">
        <div className="relative">
          <img
            src={avatar || "default-user.jpg"}
            alt={`Avatar of ${fullName}`}
            className="w-20 h-20 rounded-full"
          />
        </div>
        <h3 className="font-semibold text-xl">{fullName}</h3>
      </div>

      {/* List for medium and larger screens */}
      <ul className="hidden lg:flex flex-col gap-6 mb-10 font-semibold text-neutral-04 dark:text-grey-400 w-full md:w-1/3">
        {account.map((acc) => (
          <li
            key={acc.title}
            onClick={() => {
              setPageTitle(acc.title);
              setSelectedTitle(acc.title);
            }}
            className="cursor-pointer hover:text-neutral-06 dark:hover:text-grey-200 transition-all duration-200 text-lg"
          >
            <Link
              to={acc.to || "#"}
              className={`${
                acc.title === selectedTitle
                  ? "text-neutral-06 dark:text-grey-200"
                  : ""
              }`}
            >
              {acc.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Select dropdown for small screens */}
      <div className="lg:hidden mb-10 w-full px-4">
        <select
          value={selectedTitle}
          onChange={handleSelectChange}
          className="w-full p-2 font-semibold text-neutral-04 dark:text-grey-400 bg-white dark:bg-gray-800 border border-neutral-04 dark:border-grey-400 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-06 dark:focus:ring-grey-200 transition-all duration-200 text-lg"
        >
          {/* <option value="" disabled>
            Select an option
          </option> */}
          {account.map((acc) => (
            <option key={acc.title} value={acc.title} className="~text-sm/lg">
              {acc.title}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
