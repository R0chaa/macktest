import { Stats } from "@/types";
import { MockClassRepository } from "@/repositories/ClassRepository";
import { identifyClassIssues } from "@/utils/validation";

export class StatsService {
  private repository: MockClassRepository;

  constructor(repository?: MockClassRepository) {
    this.repository = repository || new MockClassRepository();
  }

  async getStats(): Promise<Stats> {
    const allClasses = await this.repository.findAll();
    const classesWithoutIssues = allClasses.map(({ issues, ...rest }) => rest);

    const classesWithIssues = classesWithoutIssues.filter((classItem) => {
      const classIssues = identifyClassIssues({
        name: classItem.name,
        type: classItem.type,
        teacherCount: classItem.teacherCount,
        studentCount: classItem.studentCount,
      });
      return classIssues.length > 0;
    }).length;

    const studentsWithoutClass = 236;

    return {
      studentsWithoutClass,
      classesWithIssues,
    };
  }
}
