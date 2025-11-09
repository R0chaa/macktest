import { ClassesResponse, Filters, Stats, Class } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Busca todas as turmas com filtros opcionais
  async getClasses(filters?: {
    segmento?: string;
    ano?: string;
    tipo?: string;
    search?: string;
  }): Promise<ClassesResponse> {
    const params = new URLSearchParams();
    if (filters?.segmento) params.append("segmento", filters.segmento);
    if (filters?.ano) params.append("ano", filters.ano);
    if (filters?.tipo) params.append("tipo", filters.tipo);
    if (filters?.search) params.append("search", filters.search);

    const queryString = params.toString();
    return this.fetch<ClassesResponse>(
      `/api/classes${queryString ? `?${queryString}` : ""}`
    );
  }

  // Busca uma turma por ID
  async getClassById(id: string): Promise<Class> {
    return this.fetch<Class>(`/api/classes/${id}`);
  }

  // Busca opções disponíveis para filtros
  async getFilters(): Promise<Filters> {
    return this.fetch<Filters>("/api/filters");
  }

  // Busca estatísticas do sistema
  async getStats(): Promise<Stats> {
    return this.fetch<Stats>("/api/stats");
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
