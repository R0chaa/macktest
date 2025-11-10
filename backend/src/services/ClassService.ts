import { Class, FilterOptions } from "@/types";
import { IClassRepository, MockClassRepository } from "@/repositories/ClassRepository";

export class ClassService {
  private repository: IClassRepository;

  constructor(repository?: IClassRepository) {
    this.repository = repository || new MockClassRepository();
  }

  async getClasses(filters?: FilterOptions): Promise<Class[]> {
    return this.repository.findAll(filters);
  }

  async getClassById(id: string): Promise<Class | null> {
    return this.repository.findById(id);
  }

  async searchClasses(query: string): Promise<Class[]> {
    if (!query || query.trim().length === 0) {
      return this.repository.findAll();
    }
    return this.repository.search(query.trim());
  }

  async createClass(classData: Omit<Class, "issues" | "id">): Promise<Class> {
    return this.repository.create(classData);
  }

  async updateClass(
    id: string,
    updates: Partial<Omit<Class, "issues" | "id">>
  ): Promise<Class | null> {
    return this.repository.update(id, updates);
  }

  async deleteClass(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
