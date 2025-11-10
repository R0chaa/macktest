import { Class, FilterOptions, ClassType } from "@/types";
import {
  getMockClasses,
  addMockClass,
  updateMockClass,
  deleteMockClass,
} from "@/repositories/mockData";
import { identifyClassIssues } from "@/utils/validation";

export interface IClassRepository {
  findAll(filters?: FilterOptions): Promise<Class[]>;
  findById(id: string): Promise<Class | null>;
  search(query: string): Promise<Class[]>;
  create(classData: Omit<Class, "issues" | "id">): Promise<Class>;
  update(id: string, updates: Partial<Omit<Class, "issues" | "id">>): Promise<Class | null>;
  delete(id: string): Promise<boolean>;
}

type ClassWithoutIssues = Omit<Class, "issues">;

const NULL_TYPE_FILTER = "null";

export class MockClassRepository implements IClassRepository {
  private addIssuesToClass(classItem: ClassWithoutIssues): Class {
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

  private addIssuesToClasses(classes: ClassWithoutIssues[]): Class[] {
    return classes.map((classItem) => this.addIssuesToClass(classItem));
  }

  private filterBySegment(classes: ClassWithoutIssues[], segment: string): ClassWithoutIssues[] {
    return classes.filter((classItem) => classItem.segment === segment);
  }

  private filterByYear(classes: ClassWithoutIssues[], year: string): ClassWithoutIssues[] {
    return classes.filter((classItem) => classItem.year === year);
  }

  private filterByType(classes: ClassWithoutIssues[], tipo: string): ClassWithoutIssues[] {
    if (tipo === NULL_TYPE_FILTER) {
      return classes.filter((classItem) => classItem.type === null);
    }
    return classes.filter((classItem) => classItem.type === (tipo as ClassType));
  }

  private filterByName(classes: ClassWithoutIssues[], searchTerm: string): ClassWithoutIssues[] {
    const normalizedSearch = searchTerm.toLowerCase();
    return classes.filter((classItem) =>
      classItem.name.toLowerCase().includes(normalizedSearch)
    );
  }

  private applyFilters(classes: ClassWithoutIssues[], filters: FilterOptions): ClassWithoutIssues[] {
    let filteredClasses = classes;

    if (filters.segmento) {
      filteredClasses = this.filterBySegment(filteredClasses, filters.segmento);
    }

    if (filters.ano) {
      filteredClasses = this.filterByYear(filteredClasses, filters.ano);
    }

    if (filters.tipo) {
      filteredClasses = this.filterByType(filteredClasses, filters.tipo);
    }

    if (filters.search) {
      filteredClasses = this.filterByName(filteredClasses, filters.search);
    }

    return filteredClasses;
  }

  async findAll(filters?: FilterOptions): Promise<Class[]> {
    const allClasses = getMockClasses();
    const filteredClasses = filters
      ? this.applyFilters(allClasses, filters)
      : allClasses;

    return this.addIssuesToClasses(filteredClasses);
  }

  async findById(id: string): Promise<Class | null> {
    const allClasses = getMockClasses();
    const foundClass = allClasses.find((classItem) => classItem.id === id);

    if (!foundClass) {
      return null;
    }

    return this.addIssuesToClass(foundClass);
  }

  async search(query: string): Promise<Class[]> {
    const allClasses = getMockClasses();
    const filters: FilterOptions = { search: query };
    const matchingClasses = this.applyFilters(allClasses, filters);

    return this.addIssuesToClasses(matchingClasses);
  }

  private generateNextId(): string {
    const allClasses = getMockClasses();
    const ids = allClasses.map((c) => parseInt(c.id, 10));
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return String(maxId + 1);
  }

  async create(classData: Omit<Class, "issues" | "id">): Promise<Class> {
    const newId = this.generateNextId();
    const newClass: ClassWithoutIssues = {
      id: newId,
      ...classData,
    };

    addMockClass(newClass);
    return this.addIssuesToClass(newClass);
  }

  async update(
    id: string,
    updates: Partial<Omit<Class, "issues" | "id">>
  ): Promise<Class | null> {
    const wasUpdated = updateMockClass(id, updates);
    if (!wasUpdated) {
      return null;
    }

    const allClasses = getMockClasses();
    const updatedClass = allClasses.find((c) => c.id === id);
    
    if (!updatedClass) {
      return null;
    }

    return this.addIssuesToClass(updatedClass);
  }

  async delete(id: string): Promise<boolean> {
    return deleteMockClass(id);
  }
}
