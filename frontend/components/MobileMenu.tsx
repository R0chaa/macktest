"use client";

import { ReactNode, useState } from "react";
import {
  IconAppWindow,
  IconHomeFilled,
  IconUserFilled,
  IconFolderFilled,
  IconCategoryFilled,
  IconList,
  IconCalendarWeek,
  IconHelpCircleFilled,
  IconPhone,
  IconTrophyFilled,
  IconX,
} from "@tabler/icons-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const sizeIcon = 22;
  const colorIcon = "#718096";
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [closePressed, setClosePressed] = useState(false);

  const primaryItems: Array<{
    icon: ReactNode | string;
    label: string;
    active: boolean;
  }> = [
    {
      icon: <IconAppWindow size={sizeIcon} color={colorIcon} />,
      label: "Documentos",
      active: false,
    },
    {
      icon: <IconHomeFilled size={sizeIcon} color={colorIcon} />,
      label: "Home",
      active: true,
    },
    {
      icon: <IconUserFilled size={sizeIcon} color={colorIcon} />,
      label: "Usuários",
      active: false,
    },
    {
      icon: <IconFolderFilled size={sizeIcon} color={colorIcon} />,
      label: "Arquivos",
      active: false,
    },
  ];

  const secondaryItems: Array<{
    icon: ReactNode | string;
    label: string;
    active: boolean;
  }> = [
    {
      icon: <IconCategoryFilled size={sizeIcon} color={colorIcon} />,
      label: "Grid",
      active: false,
    },
    {
      icon: <IconList size={sizeIcon} color={colorIcon} />,
      label: "Lista",
      active: false,
    },
    {
      icon: <IconCalendarWeek size={sizeIcon} color={colorIcon} />,
      label: "Calendário",
      active: false,
    },
  ];

  const tertiaryItems: Array<{
    icon: ReactNode | string;
    label: string;
    active: boolean;
  }> = [
    {
      icon: <IconHelpCircleFilled size={sizeIcon} color={colorIcon} />,
      label: "Ajuda",
      active: false,
    },
    {
      icon: <IconPhone size={sizeIcon} color={colorIcon} />,
      label: "Suporte",
      active: false,
    },
  ];

  const quaternaryItems: Array<{
    icon: ReactNode | string;
    label: string;
    active: boolean;
  }> = [
    {
      icon: <IconTrophyFilled size={sizeIcon} color={colorIcon} />,
      label: "Conquistas",
      active: false,
    },
  ];

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
              <IconX size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="flex flex-col gap-1">
              {primaryItems.map((item, index) => renderMenuItem(item, index))}
            </div>
            <div className="h-4" />
            <div className="flex flex-col gap-1">
              {secondaryItems.map((item, index) => renderMenuItem(item, index))}
            </div>
            <div className="h-4" />
            <div className="flex flex-col gap-1">
              {tertiaryItems.map((item, index) => renderMenuItem(item, index))}
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
    </>
  );
}
