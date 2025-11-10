"use client";
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
} from "@tabler/icons-react";
import { Activity, ReactNode, useState } from "react";

export function Sidebar() {
  const sizeIcon = 22;
  const colorIcon = "#718096";
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);

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
      label: "Menus",
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

  const renderButton = (
    item: { icon: ReactNode | string; label: string; active: boolean },
    index: number
  ) => (
    <button
      key={index}
      onMouseDown={() => setPressedIndex(index)}
      onMouseUp={() => setPressedIndex(null)}
      onMouseLeave={() => setPressedIndex(null)}
      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-150 cursor-pointer ${
        item.active
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
      } ${pressedIndex === index ? "brightness-90" : ""}`}
      aria-label={item.label}
      title={item.label}
    >
      {typeof item.icon === "string" ? (
        <span className="text-xl">{item.icon}</span>
      ) : (
        item.icon
      )}
    </button>
  );

  return (
    <aside className="hidden md:flex w-20 bg-gray-50 border-r border-gray-200 flex-col items-center py-4 gap-2">
      <Activity mode="visible">
        {primaryItems.map((item, index) => renderButton(item, index))}
        <div className="h-4" />
        {secondaryItems.map((item, index) => renderButton(item, index))}
        <div className="h-4" />
        {tertiaryItems.map((item, index) => renderButton(item, index))}
        <hr className="w-[20%] border-gray-400 mt-4 mb-4" />
        {quaternaryItems.map((item, index) => renderButton(item, index))}
      </Activity>
    </aside>
  );
}
