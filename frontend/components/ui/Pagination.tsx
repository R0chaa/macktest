"use client";

import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Itens por página:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1);
          }}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {startItem}-{endItem} de {totalItems}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-all duration-150 ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            }`}
            aria-label="Página anterior"
          >
            <Image
              src="/IconChevronLeft.svg"
              alt=""
              width={20}
              height={20}
              className={currentPage === 1 ? "opacity-50" : ""}
            />
          </button>

          <span className="text-sm text-gray-600 min-w-[80px] text-center">
            Página {currentPage} de {totalPages || 1}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className={`p-2 rounded-lg transition-all duration-150 ${
              currentPage >= totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
            }`}
            aria-label="Próxima página"
          >
            <Image
              src="/IconChevronRight.svg"
              alt=""
              width={20}
              height={20}
              className={currentPage >= totalPages ? "opacity-50" : ""}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

