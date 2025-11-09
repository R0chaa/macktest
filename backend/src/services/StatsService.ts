import { Stats } from '../types';
import { getMockClasses } from '../repositories/mockData';
import { identifyClassIssues } from '../utils/validation';

export class StatsService {
  getStats(): Stats {
    const allClasses = getMockClasses();

    // Conta turmas com pendências
    const classesWithIssues = allClasses.filter((classItem) => {
      const classIssues = identifyClassIssues({
        name: classItem.name,
        type: classItem.type,
        teacherCount: classItem.teacherCount,
        studentCount: classItem.studentCount,
      });
      return classIssues.length > 0;
    }).length;

    // Número de alunos sem turma (mockado)
    const studentsWithoutClass = 236;

    return {
      studentsWithoutClass,
      classesWithIssues,
    };
  }
}

