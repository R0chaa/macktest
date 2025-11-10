"use client";

import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { useState } from "react";
import { Stats } from "@/types";

interface AlertBannerProps {
  stats: Stats | null;
  onResolve?: () => void;
}

export function AlertBanner({ stats, onResolve }: AlertBannerProps) {
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

  if (!stats || stats.studentsWithoutClass <= 0) {
    return null;
  }

  return (
    <div className="w-full md:flex-1 md:min-w-[200px] alert-banner-container">
      <div className="bg-red-100 border-1 border-red-500 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:max-h-[40px]">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <IconAlertTriangleFilled
            size={20}
            color="#D92D20"
            className="flex-shrink-0"
          />
          <p className="text-sm font-medium text-gray-900 break-words">
            Existem {stats.studentsWithoutClass} alunos{" "}
            <span className="font-bold text-black">sem turma.</span>
          </p>
        </div>
        {onResolve && (
          <button
            onClick={onResolve}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-all duration-150 hover:cursor-pointer whitespace-nowrap flex-shrink-0 self-start sm:self-auto ${
              isPressed ? "brightness-90" : ""
            }`}
          >
            Resolver pendência
          </button>
        )}
      </div>
    </div>
  );
}
