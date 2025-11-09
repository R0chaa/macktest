"use client";

import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { ReactNode, useState } from "react";

interface FieldWithAlertProps {
  children: ReactNode;
  issue?: { type: string; message: string } | undefined;
}

export function FieldWithAlert({
  children,
  issue,
}: FieldWithAlertProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  if (!issue) {
    return <>{children}</>;
  }

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div
      className="relative inline-flex items-center gap-1 cursor-help"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="inline-flex items-center gap-1">
        {children}
        <IconAlertTriangleFilled
          size={18}
          className="text-yellow-500"
        />
      </div>
      {tooltipVisible && issue && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50">
          <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 min-w-[200px] shadow-lg whitespace-normal">
            <div
              className="text-left text-sm font-thin"
              dangerouslySetInnerHTML={{ __html: issue.message }}
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-0">
              <div className="border-12 border-transparent border-b-gray-900"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
