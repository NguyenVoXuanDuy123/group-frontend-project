import React from "react";

type TooltipProps = {
  children: React.ReactNode;
};

type TooltipBoxProps = {
  show: boolean;
  children: React.ReactNode;
};

export const TooltipText = ({ children }: TooltipProps) => (
  <div className="cursor-pointer">{children}</div>
);

export const TooltipBox = ({ show, children }: TooltipBoxProps) => (
  <div
    className={`absolute  ${
      show ? "visible opacity-100" : "invisible opacity-0"
    } bg-opacity-80 rounded transition-all duration-500 ease-in-out`}>
    <div className="absolute transform bg-opacity-80"></div>
    {children}
  </div>
);
