"use client";

import { ReactNode } from "react";
import Image from "next/image";

const ICON_SIZE = 22;

const Icon = ({ src, size = ICON_SIZE }: { src: string; size?: number }) => (
  <Image src={src} alt="" width={size} height={size} />
);

export interface MenuItem {
  icon: ReactNode | string;
  label: string;
  active: boolean;
}

const primaryMenuItemsData = [
  {
    iconSrc: "/IconAppWindow.svg",
    label: "Documentos",
    active: false,
  },
  {
    iconSrc: "/IconHomeFilled.svg",
    label: "Home",
    active: true,
  },
  {
    iconSrc: "/IconUserFilled.svg",
    label: "Usuários",
    active: false,
  },
  {
    iconSrc: "/IconFolderFilled.svg",
    label: "Arquivos",
    active: false,
  },
];

const secondaryMenuItemsData = [
  {
    iconSrc: "/IconCategoryFilled.svg",
    label: "Menus",
    active: false,
  },
  {
    iconSrc: "/IconList.svg",
    label: "Listas",
    active: false,
  },
  {
    iconSrc: "/IconCalendarWeek.svg",
    label: "Calendário",
    active: false,
  },
];

const tertiaryMenuItemsData = [
  {
    iconSrc: "/IconHelpCircleFilled.svg",
    label: "Ajuda",
    active: false,
  },
  {
    iconSrc: "/IconPhone.svg",
    label: "Suporte",
    active: false,
  },
];

const quaternaryMenuItemsData = [
  {
    iconSrc: "/IconTrophyFilled.svg",
    label: "Conquistas",
    active: false,
  },
];

export function getMenuItems(sizeIcon: number = ICON_SIZE): {
  primaryItems: MenuItem[];
  secondaryItems: MenuItem[];
  tertiaryItems: MenuItem[];
  quaternaryItems: MenuItem[];
} {
  const primaryItems: MenuItem[] = primaryMenuItemsData.map((item) => ({
    icon: <Icon src={item.iconSrc} size={sizeIcon} />,
    label: item.label,
    active: item.active,
  }));

  const secondaryItems: MenuItem[] = secondaryMenuItemsData.map((item) => ({
    icon: <Icon src={item.iconSrc} size={sizeIcon} />,
    label: item.label,
    active: item.active,
  }));

  const tertiaryItems: MenuItem[] = tertiaryMenuItemsData.map((item) => ({
    icon: <Icon src={item.iconSrc} size={sizeIcon} />,
    label: item.label,
    active: item.active,
  }));

  const quaternaryItems: MenuItem[] = quaternaryMenuItemsData.map((item) => ({
    icon: <Icon src={item.iconSrc} size={sizeIcon} />,
    label: item.label,
    active: item.active,
  }));

  return {
    primaryItems,
    secondaryItems,
    tertiaryItems,
    quaternaryItems,
  };
}
