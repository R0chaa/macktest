"use client";

import { Class } from "@/types";
import { useState } from "react";

import { NewBadge } from "@/components/ui/NewBadge";
import { SegmentYearRow } from "@/components/SegmentYearRow";
import { TypeBadge } from "@/components/TypeBadge";
import { ClassField } from "@/components/ui/ClassField";
import { ClassCardActions } from "@/components/ClassCardActions";

interface ClassCardProps {
  classData: Class;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ClassCard({
  classData,
  onEdit,
  onView,
  onDelete,
}: ClassCardProps) {
  const [tooltip, setTooltip] = useState<{ message: string; visible: boolean }>(
    {
      message: "",
      visible: false,
    }
  );
  const [isChecked, setIsChecked] = useState(false);

  const hasIssues = classData.issues && classData.issues.length > 0;
  const borderColor = hasIssues ? "border-red-500" : "border-gray-200";

  const showTooltip = (message: string) => {
    setTooltip({ message, visible: true });
  };

  const hideTooltip = () => {
    setTooltip({ message: "", visible: false });
  };


  const handleCardClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={`relative bg-white rounded-lg border-2 ${borderColor} p-4 hover:shadow-xl transition-shadow cursor-pointer`}
      onClick={handleCardClick}
    >
      {/* Header do card */}
      <NewBadge isNew={classData.isNew} />

      {/* Segmento e Ano */}
      <SegmentYearRow
        segment={classData.segment}
        year={classData.year}
        className={classData.name}
        checked={isChecked}
        onChange={setIsChecked}
      />

      {/* Tipo */}
      <TypeBadge
        type={classData.type}
        onShowTooltip={showTooltip}
        onHideTooltip={hideTooltip}
        tooltipVisible={tooltip.visible}
        tooltipMessage={tooltip.message}
        issues={classData.issues}
      />

      {/* Nome da turma */}
      <ClassField
        title="Nome da turma"
        content={<span className="text-gray-900">{classData.name}</span>}
        issues={classData.issues}
        issueType="invalid_name"
      />

      {/* Número de professores */}
      <ClassField
        title="Nº de Professores"
        content={<span className="text-gray-900">{classData.teacherCount}</span>}
        issues={classData.issues}
        issueType="no_teachers"
      />

      {/* Número de alunos */}
      <ClassField
        title="Nº de Alunos"
        content={<span className="text-gray-900">{classData.studentCount}</span>}
        issues={classData.issues}
        issueType="no_students"
        marginBottom="mb-4"
      />

      {/* Ações */}
      <ClassCardActions
        classId={classData.id}
        onEdit={onEdit}
        onView={onView}
        onDelete={onDelete}
      />
    </div>
  );
}
