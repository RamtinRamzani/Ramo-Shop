import React from "react";

export default function MainContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`~px-1/56 max-w-[1900px] mx-auto ${className}`}>
      {children}
    </div>
  );
}
