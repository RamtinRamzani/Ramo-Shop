import React, { ReactNode } from "react";

interface FormRowProps {
  label?: string;
  error?: string;
  children: ReactNode;
  // disabled?: boolean;
}

function FormRow({ label, error, children }: FormRowProps) {
  const isButton = React.isValidElement(children) && children.type === "button";

  return (
    <div
      className={`grid items-center grid-cols-[16rem_1fr_1.2fr] gap-4 py-3 border-gray-500
          ${!error ? "border-b" : ""} 
          ${isButton ? "flex justify-end gap-3 border-none" : ""}`}
    >
      {label && React.isValidElement(children) && (
        <label htmlFor={children.props.id} className="font-medium">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
