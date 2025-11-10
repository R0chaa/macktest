import { Class } from "@/types";

let mockClasses: Omit<Class, "issues">[] = [
  {
    id: "1",
    name: "Turma A",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "Regular",
    teacherCount: 7,
    studentCount: 26,
    isNew: true,
  },
  {
    id: "2",
    name: "Turma B",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "Mista",
    teacherCount: 7,
    studentCount: 26,
    isNew: true,
  },
  {
    id: "3",
    name: "Turma C",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "",
    teacherCount: 7,
    studentCount: 26,
    isNew: false,
  },
  {
    id: "4",
    name: "Turma D",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "Trilha",
    teacherCount: 7,
    studentCount: 26,
    isNew: true,
  },
  {
    id: "5",
    name: "Turma E",
    segment: "Ensino Médio",
    year: "2ª Série",
    type: "Mista",
    teacherCount: 6,
    studentCount: 24,
    isNew: true,
  },
  {
    id: "6",
    name: "Turma F",
    segment: "Ensino Médio",
    year: "2ª Série",
    type: "Regular",
    teacherCount: 5,
    studentCount: 22,
    isNew: false,
  },
  {
    id: "7",
    name: "Turma G",
    segment: "Ensino Médio",
    year: "3ª Série",
    type: "Trilha",
    teacherCount: 8,
    studentCount: 28,
    isNew: true,
  },
  {
    id: "8",
    name: "Turma H",
    segment: "Ensino Médio",
    year: "3ª Série",
    type: "Regular",
    teacherCount: 7,
    studentCount: 25,
    isNew: false,
  },
  {
    id: "9",
    name: "Turma I",
    segment: "Ensino Fund.",
    year: "7º ano",
    type: "Regular",
    teacherCount: 5,
    studentCount: 0,
    isNew: true,
  },
  {
    id: "10",
    name: "Turma J",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "Mista",
    teacherCount: 6,
    studentCount: 23,
    isNew: false,
  },
  {
    id: "11",
    name: "&Åbcdef 78/",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "Regular",
    teacherCount: 7,
    studentCount: 26,
    isNew: true,
  },
  {
    id: "12",
    name: "Turma L",
    segment: "Ensino Fund.",
    year: "9º ano",
    type: "Trilha",
    teacherCount: 7,
    studentCount: 26,
    isNew: false,
  },
  {
    id: "13",
    name: "Turma M",
    segment: "Ensino Médio",
    year: "2ª Série",
    type: "Regular",
    teacherCount: 0,
    studentCount: 26,
    isNew: true,
  },
  {
    id: "14",
    name: "Turma N",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "Mista",
    teacherCount: 7,
    studentCount: 26,
    isNew: true,
  },
  {
    id: "15",
    name: "Turma O",
    segment: "Ensino Médio",
    year: "3ª Série",
    type: "Regular",
    teacherCount: 7,
    studentCount: 25,
    isNew: false,
  },
  {
    id: "16",
    name: "Turma P",
    segment: "Ensino Fund.",
    year: "7º ano",
    type: "Regular",
    teacherCount: 5,
    studentCount: 0,
    isNew: true,
  },
  {
    id: "17",
    name: "Turma Q",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "Mista",
    teacherCount: 6,
    studentCount: 23,
    isNew: false,
  },

  {
    id: "18",
    name: "Turma R",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "Regular",
    teacherCount: 7,
    studentCount: 26,
    isNew: true,
  },
  {
    id: "19",
    name: "Turma S",
    segment: "Ensino Fund.",
    year: "9º ano",
    type: "Trilha",
    teacherCount: 7,
    studentCount: 26,
    isNew: false,
  },
  {
    id: "20",
    name: "Turma T",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "",
    teacherCount: 7,
    studentCount: 26,
    isNew: false,
  },
  {
    id: "21",
    name: "Turma U",
    segment: "Ensino Médio",
    year: "1ª Série",
    type: "Trilha",
    teacherCount: 7,
    studentCount: 26,
    isNew: true,
  },
];

export function getMockClasses(): Omit<Class, "issues">[] {
  return [...mockClasses];
}

export function addMockClass(classData: Omit<Class, "issues">): void {
  mockClasses.push(classData);
}

export function updateMockClass(
  id: string,
  updates: Partial<Omit<Class, "issues">>
): boolean {
  const index = mockClasses.findIndex((c) => c.id === id);
  if (index === -1) return false;
  mockClasses[index] = { ...mockClasses[index], ...updates };
  return true;
}

export function deleteMockClass(id: string): boolean {
  const index = mockClasses.findIndex((c) => c.id === id);
  if (index === -1) return false;
  mockClasses.splice(index, 1);
  return true;
}
