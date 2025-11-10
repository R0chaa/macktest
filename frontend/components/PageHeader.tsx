"use client";

import { Button } from "@/components/ui/Button";
import { IconUserPlus, IconCaretDownFilled } from "@tabler/icons-react";

interface PageHeaderProps {
  selectedSchool: string;
  onSchoolChange: (school: string) => void;
  onCreateClass?: () => void;
}

export function PageHeader({
  selectedSchool,
  onSchoolChange,
  onCreateClass,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Todos os Usuários
        </h1>
        <div className="relative w-full lg:w-auto">
          <select
            value={selectedSchool}
            onChange={(e) => onSchoolChange(e.target.value)}
            className="w-full lg:w-auto appearance-none bg-transparent px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
          >
            <option value="Centro Educacional Tamanduá Místico">
              Centro Educacional Tamanduá Místico
            </option>
            <option value="Centro Educacional Exemplo 1">
              Centro Educacional Exemplo 1
            </option>
            <option value="Centro Educacional Exemplo 2">
              Centro Educacional Exemplo 2
            </option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <IconCaretDownFilled size={20} color="#718096" />
          </div>
        </div>
      </div>
      <Button
        variant="primary"
        className="self-start lg:self-auto"
        onClick={onCreateClass}
      >
        <IconUserPlus size={20} color="#FFFFFF" />
        Criar nova turma
      </Button>
    </div>
  );
}

