import { Filters, ClassType } from "@/types";
import { MockClassRepository } from "@/repositories/ClassRepository";

export class FilterService {
  private repository: MockClassRepository;

  constructor(repository?: MockClassRepository) {
    this.repository = repository || new MockClassRepository();
  }

  async getAvailableFilters(): Promise<Filters> {
    const allClasses = await this.repository.findAll();
    const classesWithoutIssues = allClasses.map(({ issues, ...rest }) => rest);

    const uniqueSegments = Array.from(
      new Set(classesWithoutIssues.map((classItem) => classItem.segment))
    ).sort();

    const uniqueYears = Array.from(
      new Set(classesWithoutIssues.map((classItem) => classItem.year))
    ).sort((yearA, yearB) => {
      const yearANumber = parseInt(yearA);
      const yearBNumber = parseInt(yearB);
      if (!isNaN(yearANumber) && !isNaN(yearBNumber)) {
        return yearANumber - yearBNumber;
      }
      return yearA.localeCompare(yearB);
    });

    const allClassTypes = classesWithoutIssues.map((classItem) => classItem.type);
    const validClassTypes = allClassTypes.filter(
      (classType): classType is NonNullable<ClassType> => classType !== null
    );
    const uniqueTypes = Array.from(new Set(validClassTypes)).sort() as string[];

    return {
      segments: uniqueSegments,
      years: uniqueYears,
      types: uniqueTypes,
    };
  }
}
