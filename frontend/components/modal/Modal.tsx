"use client";

import { ReactNode } from "react";
import { Activity } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Activity mode={isOpen ? "visible" : "hidden"}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        onClick={handleBackdropClick}
      >
        <div
          className={`bg-white rounded-lg shadow-xl ${maxWidthClasses[maxWidth]} w-full mx-4 max-h-[90vh] border-2 border-gray-200 flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <Image 
                src="/IconX.svg" 
                alt="" 
                width={24} 
                height={24}
              />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    </Activity>
  );
}

