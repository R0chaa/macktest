"use client";

import { IconEdit, IconEyeShare, IconTrashXFilled } from "@tabler/icons-react";
import { ActionButton } from "@/components/ui/ActionButton";

interface ClassCardActionsProps {
  classId: string;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ClassCardActions({
  classId,
  onEdit,
  onView,
  onDelete,
}: ClassCardActionsProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-600 font-semibold">Ações</p>
        <div className="flex">
          <ActionButton
            icon={<IconEdit size={20} />}
            onClick={() => onEdit?.(classId)}
            variant="blue"
            title="Editar"
            ariaLabel="Editar turma"
          />
          <ActionButton
            icon={<IconEyeShare size={20} />}
            onClick={() => onView?.(classId)}
            variant="green"
            title="Visualizar"
            ariaLabel="Visualizar turma"
          />
          <ActionButton
            icon={<IconTrashXFilled size={20} />}
            onClick={() => onDelete?.(classId)}
            variant="red"
            title="Excluir"
            ariaLabel="Excluir turma"
            iconColor="text-red-600"
          />
        </div>
      </div>
    </div>
  );
}

