"use client";

import { useState, useEffect, useCallback } from "react";
import { Class, ClassType } from "@/types";
import { apiClient } from "@/services/api";
import { Modal } from "@/components/modal/Modal";
import { ClassForm } from "@/components/forms/ClassForm";
import { ModalError } from "@/components/modal/ModalError";
import { Loading } from "@/components/ui/Loading";

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  classId?: string;
  initialData?: Class;
  onSuccess?: () => void;
}

export function ClassModal({
  isOpen,
  onClose,
  mode,
  classId,
  initialData,
  onSuccess,
}: ClassModalProps) {
  const [loading, setLoading] = useState(mode === "edit" && !initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    segment: "",
    year: "",
    type: "" as ClassType | "",
    teacherCount: 0,
    studentCount: 0,
  });

  const fetchClassData = useCallback(async () => {
    if (!classId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getClassById(classId);
      setFormData({
        name: data.name,
        segment: data.segment,
        year: data.year,
        type: data.type || "",
        teacherCount: data.teacherCount,
        studentCount: data.studentCount,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar dados da turma"
      );
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setSaving(false);
      return;
    }

    if (mode === "edit") {
      if (!initialData && classId) {
        fetchClassData();
      } else if (initialData) {
        setFormData({
          name: initialData.name,
          segment: initialData.segment,
          year: initialData.year,
          type: initialData.type || "",
          teacherCount: initialData.teacherCount,
          studentCount: initialData.studentCount,
        });
        setLoading(false);
      }
    } else {
      setFormData({
        name: "",
        segment: "",
        year: "",
        type: "",
        teacherCount: 0,
        studentCount: 0,
      });
      setLoading(false);
    }
  }, [isOpen, mode, classId, initialData, fetchClassData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "teacherCount" || name === "studentCount"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (mode === "create" && !formData.type) {
      setError("O tipo da turma é obrigatório");
      setSaving(false);
      return;
    }

    try {
      const classData: Omit<Class, "issues" | "id"> = {
        name: formData.name,
        segment: formData.segment,
        year: formData.year,
        type: formData.type || null,
        teacherCount: formData.teacherCount,
        studentCount: formData.studentCount,
      };

      if (mode === "create") {
        await apiClient.createClass(classData);
      } else if (classId) {
        await apiClient.updateClass(classId, classData);
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Erro ao ${mode === "create" ? "criar" : "atualizar"} turma`
      );
    } finally {
      setSaving(false);
    }
  };

  const title = mode === "create" ? "Criar Turma" : "Editar Turma";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {loading && (
        <div className="py-8">
          <Loading />
        </div>
      )}

      {error && !loading && (
        <ModalError
          message={error}
          onRetry={mode === "edit" ? fetchClassData : undefined}
        />
      )}

      {!loading && !error && (
        <ClassForm
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={onClose}
          saving={saving}
          mode={mode}
        />
      )}
    </Modal>
  );
}
