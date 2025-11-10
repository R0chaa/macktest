"use client";

import { Button } from "@/components/ui/Button";
import { IconArrowLeft } from "@tabler/icons-react";

interface BreadcrumbProps {
  label?: string;
  onClick?: () => void;
}

export function Breadcrumb({
  label = "Voltar ao Gestor Escolar",
  onClick,
}: BreadcrumbProps) {
  return (
    <div className="mb-4">
      <Button
        variant="outline"
        className="text-sm text-gray-600 border-2 border-gray-300 hover:bg-gray-100"
        onClick={onClick}
      >
        <IconArrowLeft size={20} />
        <span>{label}</span>
      </Button>
    </div>
  );
}

