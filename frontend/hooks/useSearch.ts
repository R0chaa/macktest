import { useState, useEffect, useMemo } from "react";
import { debounce } from "@/lib/utils";

interface UseSearchReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  debouncedSearch: string;
}

export function useSearch(debounceMs: number = 300): UseSearchReturn {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, debounceMs),
    [debounceMs]
  );

  useEffect(() => {
    debouncedSetSearch(searchTerm);
  }, [searchTerm, debouncedSetSearch]);

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearch,
  };
}
