import { FilterOptions } from "@/types";

interface QueryParams {
  segmento?: string;
  ano?: string;
  tipo?: string;
  search?: string;
}

export function buildFiltersFromQuery(query: QueryParams): FilterOptions {
  const filters: FilterOptions = {};

  if (query.segmento) filters.segmento = query.segmento;
  if (query.ano) filters.ano = query.ano;
  if (query.tipo) filters.tipo = query.tipo;
  if (query.search) filters.search = query.search;

  return filters;
}
