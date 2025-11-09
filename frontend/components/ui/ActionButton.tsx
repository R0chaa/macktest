"use client";

import { ReactNode, useState } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "blue" | "green" | "red";
  title: string;
  ariaLabel: string;
  iconColor?: string;
}

const variantStyles = {
  blue: "hover:text-blue-600 hover:bg-blue-50",
  green: "hover:text-green-600 hover:bg-green-50",
  red: "hover:text-red-600 hover:bg-red-50",
};

export function ActionButton({
  icon,
  onClick,
  variant = "blue",
  title,
  ariaLabel,
  iconColor = "text-black",
}: ActionButtonProps) {
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
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`p-2 text-gray-600 ${variantStyles[variant]} rounded transition-all duration-150 hover:cursor-pointer ${
        isPressed ? "brightness-90" : ""
      }`}
      title={title}
      aria-label={ariaLabel}
    >
      <span className={iconColor}>{icon}</span>
    </button>
  );
}
