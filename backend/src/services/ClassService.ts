import { Class, FilterOptions } from "../types";
import {
  MockClassRepository,
  IClassRepository,
} from "../repositories/ClassRepository";

export class ClassService {
  private repository: IClassRepository;

  constructor(repository?: IClassRepository) {
    this.repository = repository || new MockClassRepository();
  }

  // Busca todas as turmas com os filtros opcionais
  async getClasses(filters?: FilterOptions): Promise<Class[]> {
    return this.repository.findAll(filters);
  }

  // Busca uma turma por ID
  async getClassById(id: string): Promise<Class | null> {
    return this.repository.findById(id);
  }

  // Busca turmas por termo de pesquisa
  async searchClasses(query: string): Promise<Class[]> {
    if (!query || query.trim().length === 0) {
      return this.repository.findAll();
    }
    return this.repository.search(query.trim());
  }
}
