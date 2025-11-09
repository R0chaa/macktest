import { Class, FilterOptions } from "../types";
import { getMockClasses } from "./mockData";
import { identifyClassIssues } from "../utils/validation";

export interface IClassRepository {
  findAll(filters?: FilterOptions): Promise<Class[]>;
  findById(id: string): Promise<Class | null>;
  search(query: string): Promise<Class[]>;
}

export class MockClassRepository implements IClassRepository {
  // Adiciona issues de validação a uma turma
  private addIssuesToClass(classItem: Omit<Class, "issues">): Class {
    const classIssues = identifyClassIssues({
      name: classItem.name,
      type: classItem.type,
      teacherCount: classItem.teacherCount,
      studentCount: classItem.studentCount,
    });

    return {
      ...classItem,
      issues: classIssues.length > 0 ? classIssues : undefined,
    };
  }

  // Busca todas as turmas, aplicando filtros opcionais
  async findAll(filters?: FilterOptions): Promise<Class[]> {
    let filteredClasses = getMockClasses();

    if (filters?.segmento) {
      filteredClasses = filteredClasses.filter(
        (classItem) => classItem.segment === filters.segmento
      );
    }

    if (filters?.ano) {
      filteredClasses = filteredClasses.filter(
        (classItem) => classItem.year === filters.ano
      );
    }

    if (filters?.tipo) {
      if (filters.tipo === "null") {
        filteredClasses = filteredClasses.filter(
          (classItem) => classItem.type === null
        );
      } else {
        filteredClasses = filteredClasses.filter(
          (classItem) => classItem.type === filters.tipo
        );
      }
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredClasses = filteredClasses.filter((classItem) =>
        classItem.name.toLowerCase().includes(searchTerm)
      );
    }

    // Adiciona validações e issues a cada turma
    return filteredClasses.map((classItem) =>
      this.addIssuesToClass(classItem)
    );
  }

  // Busca uma turma por ID
  async findById(id: string): Promise<Class | null> {
    const allClasses = getMockClasses();
    const foundClass = allClasses.find((classItem) => classItem.id === id);

    if (!foundClass) {
      return null;
    }

    return this.addIssuesToClass(foundClass);
  }

  // Busca turmas por nome
  async search(query: string): Promise<Class[]> {
    const searchTerm = query.toLowerCase();
    const allClasses = getMockClasses();

    const matchingClasses = allClasses.filter((classItem) =>
      classItem.name.toLowerCase().includes(searchTerm)
    );

    return matchingClasses.map((classItem) =>
      this.addIssuesToClass(classItem)
    );
  }
}
