import { Button as NextButton } from "@heroui/button";

export default function Button({
  children,
  className = "",
  type = "button",
  onClick,
  disabled = false,
  size = "md",
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
}) {
  // Base classes that apply to all buttons
  const baseClasses = `
    font-medium rounded-md transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
    disabled:opacity-70 disabled:cursor-not-allowed
    flex items-center justify-center
  `;

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: `
      bg-black text-white hover:bg-gray-800
      dark:bg-grey-200 dark:text-grey-800 dark:hover:bg-grey-300
    `,
    secondary: `
      bg-gray-100 text-gray-800 hover:bg-gray-200
      dark:bg-grey-700 dark:text-grey-200 dark:hover:bg-grey-600
    `,
    outline: `
      border border-gray-300 text-gray-700 hover:bg-gray-50
      dark:border-grey-600 dark:text-grey-200 dark:hover:bg-grey-700
    `,
  };

  return (
    <NextButton
      type={type}
      onPress={onClick || (() => {})}
      isDisabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </NextButton>
  );
}
