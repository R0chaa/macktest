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

  async getClassById(id: string): Promise<Class> {
    return this.fetch<Class>(`/api/classes/${id}`);
  }

  async getFilters(): Promise<Filters> {
    return this.fetch<Filters>("/api/filters");
  }

  async getStats(): Promise<Stats> {
    return this.fetch<Stats>("/api/stats");
  }

  async createClass(classData: Omit<Class, "issues" | "id">): Promise<Class> {
    const response = await fetch(`${this.baseUrl}/api/classes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  async updateClass(
    id: string,
    updates: Partial<Omit<Class, "issues" | "id">>
  ): Promise<Class> {
    const response = await fetch(`${this.baseUrl}/api/classes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Turma não encontrada");
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  async deleteClass(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/classes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Turma não encontrada");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return;
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
