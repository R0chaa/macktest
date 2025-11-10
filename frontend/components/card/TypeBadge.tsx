"use client";

import { ClassType } from "@/types";
import {
  IconCirclesFilled,
  IconTriangleSquareCircleFilled,
  IconRouteSquare2,
  IconBug,
  IconAlertTriangleFilled,
} from "@tabler/icons-react";

interface TypeBadgeProps {
  type: ClassType;
  onShowTooltip?: (message: string) => void;
  onHideTooltip?: () => void;
  tooltipVisible?: boolean;
  tooltipMessage?: string;
  issues?: Array<{ type: string; message: string }> | undefined;
}

export function TypeBadge({
  type,
  onShowTooltip,
  onHideTooltip,
  tooltipVisible,
  tooltipMessage,
  issues,
}: TypeBadgeProps) {
  // Buscar issue relacionada ao tipo
  const issue = issues?.find(
    (i) => i.type === "no_type" || i.type === "invalid_type"
  );
  const typeConfig = {
    Regular: {
      icon: IconCirclesFilled,
      borderColor: "border-yellow-700",
      bgColor: "bg-yellow-100",
      label: "Regular",
      iconSize: 10,
    },
    Mista: {
      icon: IconTriangleSquareCircleFilled,
      borderColor: "border-green-700",
      bgColor: "bg-green-100",
      label: "Mista",
      iconSize: 10,
    },
    Trilha: {
      icon: IconRouteSquare2,
      borderColor: "border-blue-700",
      bgColor: "bg-blue-100",
      label: "Trilha",
      iconSize: 10,
    },
    default: {
      icon: IconBug,
      borderColor: "border-gray-700",
      bgColor: "bg-gray-100",
      label: "Sem tipo",
      iconSize: 14,
    },
  };

  // Caso: Sem tipo (null)
  if (!type) {
    const handleMouseEnter = () => {
      if (issue && onShowTooltip) {
        onShowTooltip(issue.message);
      }
    };

    return (
      <div className="mb-3">
        <div className="text-sm">
          <div
            className="relative inline-flex items-center gap-1 cursor-help"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onHideTooltip}
          >
            <div className="inline-flex items-center gap-1">
              <div
                className={`inline-flex items-center gap-1 border ${typeConfig.default.borderColor} ${typeConfig.default.bgColor} px-2 py-1 rounded`}
              >
                {typeConfig.default.icon && (
                  <typeConfig.default.icon
                    size={typeConfig.default.iconSize}
                    className="text-black"
                  />
                )}
                <span className="text-black">{typeConfig.default.label}</span>
              </div>
              <IconAlertTriangleFilled
                size={16}
                className="text-yellow-500 cursor-help"
              />
            </div>
            {tooltipVisible && tooltipMessage && issue && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50">
                <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 min-w-[200px] shadow-lg whitespace-normal">
                  <div
                    className="text-left text-sm font-light"
                    dangerouslySetInnerHTML={{ __html: tooltipMessage }}
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-0">
                    <div className="border-12 border-transparent border-b-gray-900"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isMappedType = type && typeConfig[type as keyof typeof typeConfig];
  const config = isMappedType || typeConfig.default;
  const IconComponent = config.icon;

  // Caso: Tipo válido (Regular, Mista ou Trilha)
  return (
    <div className="mb-3">
      <div className="text-sm">
        <div
          className={`inline-flex items-center gap-1 border ${config.borderColor} ${config.bgColor} px-2 py-1 rounded`}
        >
          <IconComponent size={config.iconSize} className="text-black" />
          <span className="text-black">{config.label}</span>
        </div>
      </div>
    </div>
  );
}
