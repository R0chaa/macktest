import { useState, useEffect, useCallback } from "react";
import { Class, FilterOptions } from "@/types";
import { apiClient } from "@/services/api";

interface UseClassesReturn {
  classes: Class[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  total: number;
}

export function useClasses(filters?: FilterOptions): UseClassesReturn {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getClasses(filters);
      setClasses(response.classes);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar turmas");
      setClasses([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return {
    classes,
    loading,
    error,
    refetch: fetchClasses,
    total,
  };
}
