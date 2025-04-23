import clsx from "clsx";

const sizes = {
  small: "text-xs px-2 py-1 font-semibold uppercase text-center",
  medium: "text-sm px-4 py-3 font-medium",
  large: "text-base px-6 py-3 font-medium",
};

const variations = {
  primary: "text-brand-50 bg-brand-600 hover:bg-brand-700",
  secondary: "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50",
  danger: "text-red-100 bg-red-700 hover:bg-red-800",
};

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variation?: "primary" | "secondary" | "danger";
  className?: string;
}

function ShopButton({
  size = "medium",
  variation = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded shadow-sm border-none bg-white",
        sizes[size],
        variations[variation],
        className
      )}
      {...props}
    />
  );
}

export default ShopButton;
