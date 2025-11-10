"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const [menuPressed, setMenuPressed] = useState(false);
  const [bellPressed, setBellPressed] = useState(false);
  const [userPressed, setUserPressed] = useState(false);

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          onMouseDown={() => setMenuPressed(true)}
          onMouseUp={() => setMenuPressed(false)}
          onMouseLeave={() => setMenuPressed(false)}
          className={`md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-150 ${
            menuPressed ? "brightness-90" : ""
          }`}
          aria-label="Abrir menu"
        >
          <Image 
            src="/IconMenu2.svg" 
            alt="" 
            width={24} 
            height={24}
          />
        </button>
        <h1
          onClick={handleLogoClick}
          className="text-xl text-gray-900 md:ml-40 cursor-pointer hover:text-gray-700 transition-colors"
        >
          <span className="font-semibold">Mack</span>Test
        </h1>
      </div>
      <div className="flex items-center gap-4 md:mr-20">
        <button
          onMouseDown={() => setBellPressed(true)}
          onMouseUp={() => setBellPressed(false)}
          onMouseLeave={() => setBellPressed(false)}
          className={`p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-150 hover:cursor-pointer ${
            bellPressed ? "brightness-90" : ""
          }`}
          aria-label="Favoritos"
        >
          <Image 
            src="/IconBellFilled.svg" 
            alt="" 
            width={24} 
            height={24}
          />
        </button>
        <button
          onMouseDown={() => setUserPressed(true)}
          onMouseUp={() => setUserPressed(false)}
          onMouseLeave={() => setUserPressed(false)}
          className={`p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-150 hover:cursor-pointer ${
            userPressed ? "brightness-90" : ""
          }`}
          aria-label="Perfil"
        >
          <Image 
            src="/IconUser.svg" 
            alt="" 
            width={24} 
            height={24}
          />
        </button>
      </div>
    </header>
  );
}
