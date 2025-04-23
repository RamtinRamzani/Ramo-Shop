import { ButtonHTMLAttributes } from "react";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function ButtonIcon({ children, className = "", ...props }: ButtonIconProps) {
  return (
    <button
      className={`p-2 rounded-md transition-all hover:bg-orange-100 dark:hover:bg-grey-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
