import React from "react";

export default function HeaderList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li
      className="flex items-center text-heading-7 ~text-xl/2xl p-2 rounded-lg hover:bg-orange-400 dark:hover:bg-grey-700 
                 transition-all duration-200 ease-in-out transform hover:scale-110"
    >
      {children}
    </li>
  );
}

/* p-2 rounded-lg hover:bg-orange-400 dark:hover:bg-grey-700 
                 transition-all duration-200 ease-in-out transform hover:scale-110 */
