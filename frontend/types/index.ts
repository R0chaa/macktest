export type ClassType = "Regular" | "Mista" | "Trilha" | null;

export interface ClassIssue {
  type:
    | "no_teachers"
    | "no_type"
    | "invalid_name"
    | "no_students"
    | "invalid_type";
  message: string;
  severity: "warning" | "error";
}

export interface Class {
  id: string;
  name: string;
  segment: string;
  year: string;
  type: ClassType;
  teacherCount: number;
  studentCount: number;
  isNew?: boolean;
  issues?: ClassIssue[];
}

export interface Filters {
  segments: string[];
  years: string[];
  types: string[];
}

export interface Stats {
  studentsWithoutClass: number;
  classesWithIssues: number;
}

export interface ClassesResponse {
  classes: Class[];
  total: number;
  filters: Filters;
}

export interface FilterOptions {
  segmento?: string;
  ano?: string;
  tipo?: string;
  search?: string;
}
