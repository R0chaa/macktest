"use client";

import { Activity, ReactNode, useState } from "react";
import Image from "next/image";
import { getMenuItems } from "@/components/ui/MenuItens";

const ICON_SIZE = 22;

const Icon = ({ src, size = ICON_SIZE }: { src: string; size?: number }) => (
  <Image src={src} alt="" width={size} height={size} />
);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const sizeIcon = ICON_SIZE;
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [closePressed, setClosePressed] = useState(false);

  const { primaryItems, secondaryItems, tertiaryItems, quaternaryItems } =
    getMenuItems(sizeIcon);

  const renderMenuItem = (
    item: { icon: ReactNode | string; label: string; active: boolean },
    index: number
  ) => (
    <button
      key={index}
      onMouseDown={() => setPressedIndex(index)}
      onMouseUp={() => setPressedIndex(null)}
      onMouseLeave={() => setPressedIndex(null)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
        item.active
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
      } ${pressedIndex === index ? "brightness-90" : ""}`}
      aria-label={item.label}
    >
      {typeof item.icon === "string" ? (
        <span className="text-xl">{item.icon}</span>
      ) : (
        item.icon
      )}
      <span className="text-sm font-medium">{item.label}</span>
    </button>
  );

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 md:hidden ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 md:hidden transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-end p-4 border-b border-gray-200">
              <button
                onClick={onClose}
                onMouseDown={() => setClosePressed(true)}
                onMouseUp={() => setClosePressed(false)}
                onMouseLeave={() => setClosePressed(false)}
                className={`p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-150 ${
                  closePressed ? "brightness-90" : ""
                }`}
                aria-label="Fechar menu"
              >
                <Icon src="/IconX.svg" size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col gap-1">
                {primaryItems.map((item, index) => renderMenuItem(item, index))}
              </div>
              <div className="flex flex-col gap-1 mt-4">
                {secondaryItems.map((item, index) =>
                  renderMenuItem(item, index)
                )}
              </div>
              <div className="flex flex-col gap-1 mt-4">
                {tertiaryItems.map((item, index) =>
                  renderMenuItem(item, index)
                )}
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="flex flex-col gap-1">
                {quaternaryItems.map((item, index) =>
                  renderMenuItem(item, index)
                )}
              </div>
            </div>
          </div>
        </div>
      </Activity>
    </>
  );
}
