"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface FieldWithAlertProps {
  children: ReactNode;
  issue?: { type: string; message: string } | undefined;
}

export function FieldWithAlert({
  children,
  issue,
}: FieldWithAlertProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (!tooltipVisible) {
      return;
    }

    if (!fieldRef.current) return;

    const updatePosition = () => {
      if (fieldRef.current) {
        const rect = fieldRef.current.getBoundingClientRect();
        setTooltipPosition({
          top: rect.bottom + 16,
          left: rect.left + rect.width / 2,
        });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
      setTooltipPosition(null);
    };
  }, [tooltipVisible]);

  if (!issue) {
    return <>{children}</>;
  }

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const renderTooltip = () => {
    if (!tooltipVisible || !issue || !tooltipPosition) return null;

    return createPortal(
      <div
        className="fixed z-[100] pointer-events-none"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 max-w-[250px] shadow-lg whitespace-normal">
          <div
            className="text-left text-sm font-light"
            dangerouslySetInnerHTML={{ __html: issue.message }}
          />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-0">
            <div className="border-12 border-transparent border-b-gray-900"></div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div
        ref={fieldRef}
        className="relative inline-flex items-center gap-1 cursor-help"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="inline-flex items-center gap-1">
          {children}
          <Image 
            src="/IconAlertTriangleFilled.svg" 
            alt="" 
            width={18} 
            height={18}
          />
        </div>
      </div>
      {renderTooltip()}
    </>
  );
}
