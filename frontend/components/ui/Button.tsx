"use client";

import { ReactNode, useState } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
  secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
  outline:
    "bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
};

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`px-4 py-2 font-semibold rounded-lg transition-all duration-150 flex items-center gap-2 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${
        isPressed ? "brightness-90" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

