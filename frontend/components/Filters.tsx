"use client";

import { Filters } from "@/types";

interface FiltersProps {
  filters: Filters | null;
  selectedSegment?: string;
  selectedYear?: string;
  selectedType?: string;
  onSegmentChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export function FiltersComponent({
  filters,
  selectedSegment,
  selectedYear,
  selectedType,
  onSegmentChange,
  onYearChange,
  onTypeChange,
}: FiltersProps) {
  if (!filters) {
    return null;
  }

  return (
    <>
      <div className="w-full md:flex-1 md:max-w-[200px]">
        <select
          value={selectedSegment || ""}
          onChange={(e) => onSegmentChange(e.target.value)}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-[#718096] font-light hover:cursor-pointer"
        >
          <option value="" disabled hidden>
            Segmento
          </option>
          <option value="">Todos segmentos</option>
          {filters.segments.map((segment) => (
            <option key={segment} value={segment}>
              {segment}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:flex-1 md:max-w-[150px]">
        <select
          value={selectedYear || ""}
          onChange={(e) => onYearChange(e.target.value)}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-[#718096] font-light hover:cursor-pointer"
        >
          <option value="" disabled hidden>
            Ano/Série
          </option>
          <option value="">Todos</option>
          {filters.years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:flex-1 md:max-w-[150px]">
        <select
          value={selectedType || ""}
          onChange={(e) => onTypeChange(e.target.value)}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-[#718096] font-light hover:cursor-pointer"
        >
          <option value="" disabled hidden>
            Tipo
          </option>
          <option value="">Todos os tipos</option>
          <option value="Regular">Regular</option>
          <option value="Mista">Mista</option>
          <option value="Trilha">Trilha</option>
          <option value="null">Sem tipo</option>
        </select>
      </div>
    </>
  );
}
