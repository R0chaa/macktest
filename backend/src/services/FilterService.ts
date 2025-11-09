import { Filters, ClassType } from "../types";
import { getMockClasses } from "../repositories/mockData";

export class FilterService {
  // Retorna todas as opções disponíveis para filtros
  getAvailableFilters(): Filters {
    const allClasses = getMockClasses();

    // Valores únicos de segmentos
    const uniqueSegments = Array.from(
      new Set(allClasses.map((classItem) => classItem.segment))
    ).sort();

    // Valores únicos de anos/séries
    const uniqueYears = Array.from(
      new Set(allClasses.map((classItem) => classItem.year))
    ).sort((yearA, yearB) => {
      // Ordena anos numericamente quando possível
      const yearANumber = parseInt(yearA);
      const yearBNumber = parseInt(yearB);
      if (!isNaN(yearANumber) && !isNaN(yearBNumber)) {
        return yearANumber - yearBNumber;
      }
      return yearA.localeCompare(yearB);
    });

    // Extrai valores únicos de tipos (excluindo null)
    const allClassTypes = allClasses.map((classItem) => classItem.type);
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
