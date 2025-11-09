"use client";

import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { SearchBar } from "@/components/SearchBar";
import { FiltersComponent } from "@/components/Filters";
import { AlertBanner } from "@/components/AlertBanner";
import { ClassCard } from "@/components/ClassCard";
import { Button } from "@/components/ui/Button";
import { useClasses } from "@/hooks/useClasses";
import { useFilters } from "@/hooks/useFilters";
import { useSearch } from "@/hooks/useSearch";
import { useStats } from "@/hooks/useStats";
import { FilterOptions } from "@/types";
import {
  IconUserPlus,
  IconCaretDownFilled,
  IconArrowLeft,
} from "@tabler/icons-react";

export default function Home() {
  const [selectedSegment, setSelectedSegment] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<string>(
    "Centro Educacional Tamanduá Místico"
  );

  const { searchTerm, setSearchTerm, debouncedSearch } = useSearch(300);
  const { filters } = useFilters();
  const { stats } = useStats();

  const filterOptions: FilterOptions = useMemo(() => {
    const options: FilterOptions = {};
    if (selectedSegment) options.segmento = selectedSegment;
    if (selectedYear) options.ano = selectedYear;
    if (selectedType) options.tipo = selectedType;
    if (debouncedSearch) options.search = debouncedSearch;
    return options;
  }, [selectedSegment, selectedYear, selectedType, debouncedSearch]);

  const { classes, loading, total } = useClasses(filterOptions);

  const handleEdit = (id: string) => {
    console.log("Editar turma:", id);
  };

  const handleView = (id: string) => {
    console.log("Visualizar turmaa:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Excluir turma:", id);
  };

  const handleResolvePending = () => {
    console.log("click resolver pendências");
  };

  return (
    <Layout>
      <div className="p-6 max-w-[90%] mx-auto w-full">
        <div className="mb-4">
          <Button
            variant="outline"
            className="text-sm text-gray-600 border-2 border-gray-300 hover:bg-gray-100"
          >
            <IconArrowLeft size={20} />
            <span>Voltar ao Gestor Escolar</span>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <h1 className="text-2xl font-extrabold text-gray-900">
              Todos os Usuários
            </h1>
            <div className="relative w-full lg:w-auto">
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
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
          <Button variant="primary" className="self-start lg:self-auto">
            <IconUserPlus size={20} color="#FFFFFF" />
            Criar nova turma
          </Button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row md:flex-wrap md:items-end gap-4 bg-gray-200 p-2 border-t border-gray-400">
          <div className="flex-1 min-w-[200px] w-full md:w-auto">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Pesquisar turmas"
            />
          </div>

          <FiltersComponent
            filters={filters}
            selectedSegment={selectedSegment}
            selectedYear={selectedYear}
            selectedType={selectedType}
            onSegmentChange={setSelectedSegment}
            onYearChange={setSelectedYear}
            onTypeChange={setSelectedType}
          />

          {stats && stats.studentsWithoutClass > 0 && (
            <div className="w-full md:flex-1 md:min-w-[200px] alert-banner-container">
              <AlertBanner
                message={
                  <>
                    Existem {stats.studentsWithoutClass} alunos{" "}
                    <span className="font-bold text-black">sem turma.</span>
                  </>
                }
                onResolve={handleResolvePending}
              />
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-600">Carregando turmas...</div>
          </div>
        )}

        {/* Grid de turmas */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {classes.map((classData) => (
              <ClassCard
                key={classData.id}
                classData={classData}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && classes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhuma turma encontrada.</p>
          </div>
        )}

        {/* Total de resultados */}
        {!loading && classes.length > 0 && (
          <div className="mt-6 text-sm text-gray-600">
            Total: {total} turma{total !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </Layout>
  );
}
