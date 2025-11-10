"use client";

import { useState } from "react";
import { IconEdit, IconEyeShare, IconTrashXFilled } from "@tabler/icons-react";
import { ActionButton } from "@/components/ui/ActionButton";
import { ConfirmDialog } from "@/components/modal/ConfirmDialog";
import { ClassViewModal } from "@/components/modal/ClassViewModal";
import { ClassModal } from "@/components/modal/ClassModal";
import { Class } from "@/types";

interface ClassCardActionsProps {
  classId: string;
  classData?: Class;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ClassCardActions({
  classId,
  classData,
  onEdit,
  onView,
  onDelete,
}: ClassCardActionsProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleConfirmDelete = () => {
    onDelete?.(classId);
    setShowConfirmDialog(false);
  };

  const handleViewClick = () => {
    setShowViewModal(true);
    onView?.(classId);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    onEdit?.(classId);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-600 font-semibold">Ações</p>
          <div className="flex">
            <ActionButton
              icon={<IconEdit size={20} />}
              onClick={() => setShowEditModal(true)}
              variant="blue"
              title="Editar"
              ariaLabel="Editar turma"
            />
            <ActionButton
              icon={<IconEyeShare size={20} />}
              onClick={handleViewClick}
              variant="green"
              title="Visualizar"
              ariaLabel="Visualizar turma"
            />
            <ActionButton
              icon={<IconTrashXFilled size={20} />}
              onClick={() => setShowConfirmDialog(true)}
              variant="red"
              title="Excluir"
              ariaLabel="Excluir turma"
              iconColor="text-red-600"
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta turma? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        confirmVariant="danger"
      />

      <ClassViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        classId={classId}
        initialData={classData}
      />

      <ClassModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        mode="edit"
        classId={classId}
        initialData={classData}
        onSuccess={handleEditSuccess}
      />
    </>
  );
}
