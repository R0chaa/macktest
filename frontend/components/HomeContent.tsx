"use client";

import { useState, useMemo, useEffect, useRef, startTransition } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { FiltersComponent } from "@/components/Filters";
import { AlertBanner } from "@/components/AlertBanner";
import { ClassCard } from "@/components/card/ClassCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Loading } from "@/components/ui/Loading";
import { ClassModal } from "@/components/modal/ClassModal";
import { Pagination } from "@/components/ui/Pagination";
import { Toast } from "@/components/ui/Toast";
import { useClasses } from "@/hooks/useClasses";
import { useFilters } from "@/hooks/useFilters";
import { useSearch } from "@/hooks/useSearch";
import { useStats } from "@/hooks/useStats";
import { FilterOptions } from "@/types";
import { apiClient } from "@/services/api";

export function HomeContent() {
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

  const { classes, loading, refetch } = useClasses(filterOptions);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEdit = async (id: string) => {
    await refetch();
    setToastMessage("Turma editada com sucesso!");
    setShowToast(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.deleteClass(id);
      await refetch();
      setToastMessage("Turma excluída com sucesso!");
      setShowToast(true);
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao excluir turma. Tente novamente."
      );
    }
  };

  const handleResolvePending = () => {
    console.log("click resolver pendências");
  };

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const prevFiltersRef = useRef({
    selectedSegment,
    selectedYear,
    selectedType,
    debouncedSearch,
  });

  const handleCreateClass = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateSuccess = async () => {
    setShowCreateModal(false);
    await refetch();
    setToastMessage("Turma criada com sucesso!");
    setShowToast(true);
  };

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const filtersChanged =
      prevFilters.selectedSegment !== selectedSegment ||
      prevFilters.selectedYear !== selectedYear ||
      prevFilters.selectedType !== selectedType ||
      prevFilters.debouncedSearch !== debouncedSearch;

    if (filtersChanged) {
      startTransition(() => {
        setCurrentPage(1);
      });
      prevFiltersRef.current = {
        selectedSegment,
        selectedYear,
        selectedType,
        debouncedSearch,
      };
    }
  }, [selectedSegment, selectedYear, selectedType, debouncedSearch]);

  const paginatedClasses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return classes.slice(startIndex, endIndex);
  }, [classes, currentPage, itemsPerPage]);

  return (
    <Layout>
      <div className="p-6 max-w-[90%] mx-auto w-full">
        <Breadcrumb />

        <PageHeader
          selectedSchool={selectedSchool}
          onSchoolChange={setSelectedSchool}
          onCreateClass={handleCreateClass}
        />

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

          <AlertBanner stats={stats} onResolve={handleResolvePending} />
        </div>

        {loading && <Loading />}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 grid-cols-7-custom gap-4">
            {paginatedClasses.map((classData) => (
              <ClassCard
                key={classData.id}
                classData={classData}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {!loading && classes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhuma turma encontrada.</p>
          </div>
        )}

        {!loading && classes.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={classes.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        )}

        <ClassModal
          isOpen={showCreateModal}
          onClose={handleCloseCreateModal}
          mode="create"
          onSuccess={handleCreateSuccess}
        />

        <Toast
          message={toastMessage}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </Layout>
  );
}

