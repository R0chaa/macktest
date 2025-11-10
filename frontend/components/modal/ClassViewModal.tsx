"use client";

import { useState, useEffect, useCallback } from "react";
import { IconX } from "@tabler/icons-react";
import { Class } from "@/types";
import { apiClient } from "@/services/api";
import { TypeBadge } from "@/components/card/TypeBadge";
import { ClassField } from "@/components/ui/ClassField";
import { Loading } from "@/components/ui/Loading";

interface ClassViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  classId: string;
  initialData?: Class;
}

export function ClassViewModal({
  isOpen,
  onClose,
  classId,
  initialData,
}: ClassViewModalProps) {
  const [classData, setClassData] = useState<Class | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  const fetchClassData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getClassById(classId);
      setClassData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar dados da turma"
      );
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    if (isOpen && !initialData) {
      fetchClassData();
    } else if (isOpen && initialData) {
      setClassData(initialData);
      setLoading(false);
    }
  }, [isOpen, classId, initialData, fetchClassData]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const hasIssues = classData?.issues && classData.issues.length > 0;
  const borderColor = hasIssues ? "border-red-500" : "border-gray-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 cursor-default"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] border-2 ${borderColor} flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Detalhes da Turma
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <IconX size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {loading && (
              <div className="py-8">
                <Loading />
              </div>
            )}

            {error && (
              <div className="py-8 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchClassData}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!loading && !error && classData && (
              <div className="space-y-6">
                {classData.isNew && (
                  <div>
                    <span className="px-4 py-2 bg-blue-700 text-white text-[10px] font-semibold rounded-2xl">
                      Novo
                    </span>
                  </div>
                )}

                <div>
                  <p className="text-[20px] font-bold text-gray-900">
                    {classData.segment} - {classData.year}
                  </p>
                </div>

                <div>
                  <TypeBadge
                    type={classData.type}
                    issues={classData.issues}
                  />
                </div>

                <div className="space-y-4">
                  <ClassField
                    title="Nome da turma"
                    content={
                      <span className="text-gray-900 text-[18px]">{classData.name}</span>
                    }
                    issues={classData.issues}
                    issueType="invalid_name"
                  />

                  <ClassField
                    title="ID da turma"
                    content={
                      <span className="text-gray-900 text-[18px]">{classData.id}</span>
                    }
                    issueType=""
                  />

                  <ClassField
                    title="Nº de Professores"
                    content={
                      <span className="text-gray-900 text-[18px]">
                        {classData.teacherCount}
                      </span>
                    }
                    issues={classData.issues}
                    issueType="no_teachers"
                  />

                  <ClassField
                    title="Nº de Alunos"
                    content={
                      <span className="text-gray-900 text-[18px]">
                        {classData.studentCount}
                      </span>
                    }
                    issues={classData.issues}
                    issueType="no_students"
                  />
                </div>

                {classData.issues && classData.issues.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Problemas identificados
                    </h3>
                    <div className="space-y-3">
                      {classData.issues.map((issue, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg flex items-center gap-3 ${
                            issue.severity === "error"
                              ? "bg-red-50 border border-red-200"
                              : "bg-yellow-50 border border-yellow-200"
                          }`}
                        >
                          <span
                            className={`font-semibold whitespace-nowrap ${
                              issue.severity === "error"
                                ? "text-red-700"
                                : "text-yellow-700"
                            }`}
                          >
                            {issue.severity === "error" ? "Erro" : "Aviso"}:
                          </span>
                          <p
                            className="text-sm text-gray-700"
                            dangerouslySetInnerHTML={{ __html: issue.message }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(!classData.issues || classData.issues.length === 0) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-700 font-semibold">
                        Nenhum problema identificado nesta turma
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
