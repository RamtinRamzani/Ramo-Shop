import React, { ReactNode } from "react";

interface FormRowVerticalProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

const FormRowVertical = ({ label, error, children }: FormRowVerticalProps) => {
  return (
    <div className="flex flex-col gap-2 py-3">
      {label && (
        <label
          htmlFor={
            React.isValidElement(children) ? children.props.id : undefined
          }
          className="font-medium"
        >
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[1.4rem] text-red-700">{error}</span>}
    </div>
  );
};

export default FormRowVertical;
