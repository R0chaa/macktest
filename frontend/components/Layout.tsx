"use client";

import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileMenu } from "./MobileMenu";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#EDF2F7] flex flex-col relative">
      <Header onMenuClick={handleMenuToggle} />
      <div className="flex flex-1 relative z-0">
        <Sidebar />
        <main className="flex-1 overflow-auto relative z-0">{children}</main>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
    </div>
  );
}
