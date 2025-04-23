import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  type?: "regular" | "modal";
  [key: string]: unknown;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

function Form({ children, type = "regular", onSubmit, ...props }: FormProps) {
  const baseClasses = "overflow-hidden text-sm"; // Tailwind's text-sm corresponds to 1.4rem

  const typeClasses =
    type === "regular" ? "p-6 rounded-md" : type === "modal" ? "w-[80rem]" : "";

  return (
    <form
      className={`${baseClasses} ${typeClasses}`}
      {...props}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
