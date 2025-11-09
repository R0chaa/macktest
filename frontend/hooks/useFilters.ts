import { useState, useEffect, useCallback } from "react";
import { Filters } from "@/types";
import { apiClient } from "@/services/api";

interface UseFiltersReturn {
  filters: Filters | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFilters(): UseFiltersReturn {
  const [filters, setFilters] = useState<Filters | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getFilters();
      setFilters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar filtros");
      setFilters(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  return {
    filters,
    loading,
    error,
    refetch: fetchFilters,
  };
}
