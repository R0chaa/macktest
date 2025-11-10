"use client";

import { ClassType } from "@/types";
import { FormField } from "@/components/forms/FormField";
import { TextInput } from "@/components/ui/TextInput";
import { NumberInput } from "@/components/ui/NumberInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { Button } from "@/components/ui/Button";

interface ClassFormData {
  name: string;
  segment: string;
  year: string;
  type: ClassType | "";
  teacherCount: number;
  studentCount: number;
}

interface ClassFormProps {
  formData: ClassFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  saving: boolean;
  mode?: "create" | "edit";
}

const allTypeOptions = [
  { value: "", label: "Sem tipo" },
  { value: "Regular", label: "Regular" },
  { value: "Mista", label: "Mista" },
  { value: "Trilha", label: "Trilha" },
];

export function ClassForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  saving,
  mode = "edit",
}: ClassFormProps) {
  const typeOptions =
    mode === "create"
      ? allTypeOptions.filter((opt) => opt.value !== "")
      : allTypeOptions;
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-gray-600">
      <FormField label="Nome da turma" required>
        <TextInput
          name="name"
          value={formData.name}
          onChange={onChange}
          required
        />
      </FormField>

      <FormField label="Segmento" required>
        <TextInput
          name="segment"
          value={formData.segment}
          onChange={onChange}
          required
        />
      </FormField>

      <FormField label="Ano/Série" required>
        <TextInput
          name="year"
          value={formData.year}
          onChange={onChange}
          required
        />
      </FormField>

      <FormField label="Tipo" required={mode === "create"}>
        <SelectInput
          name="type"
          value={formData.type || ""}
          onChange={onChange}
          options={typeOptions}
          required={mode === "create"}
        />
      </FormField>

      <FormField label="Nº de Professores" required>
        <NumberInput
          name="teacherCount"
          value={formData.teacherCount}
          onChange={onChange}
          min={0}
          required
        />
      </FormField>

      <FormField label="Nº de Alunos" required>
        <NumberInput
          name="studentCount"
          value={formData.studentCount}
          onChange={onChange}
          min={0}
          required
        />
      </FormField>

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}

