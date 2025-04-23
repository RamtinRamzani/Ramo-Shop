import { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AccountNav from "./AccountNav";
import MainContainer from "../../ui/MainContainer";

export default function Account() {
  const account = useMemo(
    () => [
      { title: "Dashboard", to: "dashboard" },
      { title: "Address", to: "address" },
      { title: "Orders", to: "orders" },
      { title: "Wishlist", to: "wishlist" },
    ],
    []
  );

  const location = useLocation();
  const [pageTitle, setPageTitle] = useState(account[0].title);

  useEffect(() => {
    const currentAccount = account.find(
      (acc) => acc.to && location.pathname.includes(acc.to)
    );
    setPageTitle(currentAccount?.title || account[0].title); // Fallback to Dashboard
  }, [location, account]);

  return (
    <MainContainer>
      <div className="lg:grid lg:grid-cols-[1fr_3fr] flex flex-col gap-6 ~px-4/8">
        <h2
          className="col-span-2 text-center ~text-2xl/4xl font-semibold mt-20 ~py-6/16"
          aria-live="polite"
        >
          {pageTitle}
        </h2>

        <div className="border-2 bg-neutral-03 px-4 flex flex-col rounded-md h-fit dark:bg-grey-800 dark:border-grey-700">
          <AccountNav account={account} setPageTitle={setPageTitle} />
        </div>

        <div className="md:ml-10">
          <Outlet />
        </div>
      </div>
    </MainContainer>
  );
}
