export function isValidClassName(name: string): boolean {
  const regex = /^[a-zA-Z0-9\s\-]+$/;
  return regex.test(name);
}

export function identifyClassIssues(classData: {
  name: string;
  type: string | null;
  teacherCount: number;
  studentCount: number;
}): Array<{
  type:
    | "no_teachers"
    | "no_type"
    | "invalid_name"
    | "no_students"
    | "invalid_type";
  message: string;
  severity: "warning" | "error";
}> {
  const issues: Array<{
    type:
      | "no_teachers"
      | "no_type"
      | "invalid_name"
      | "no_students"
      | "invalid_type";
    message: string;
    severity: "warning" | "error";
  }> = [];

  // Validação de nome
  if (!isValidClassName(classData.name)) {
    issues.push({
      type: "invalid_name",
      message:
        "Não são permitidos <strong>caracteres especiais</strong> para nomear turmas.",
      severity: "error",
    });
  }

  // Validação de professores
  if (classData.teacherCount === 0) {
    issues.push({
      type: "no_teachers",
      message:
        "Você precisa atribuir, pelo menos, <strong>1 professor</strong> para cada turma.",
      severity: "error",
    });
  }

  // Validação de tipo
  const validTypes = ["Regular", "Mista", "Trilha"];

  if (!classData.type) {
    issues.push({
      type: "no_type",
      message: "É necessário definir o <strong>tipo de turma.</strong>",
      severity: "error",
    });
  } else if (!validTypes.includes(classData.type)) {
    issues.push({
      type: "invalid_type",
      message: "O tipo informado <strong>não é válido.</strong>",
      severity: "error",
    });
  }

  // Validação de alunos
  if (classData.studentCount === 0) {
    issues.push({
      type: "no_students",
      message: "Esta turma não possui <strong>alunos</strong> cadastrados.",
      severity: "warning",
    });
  }

  return issues;
}
