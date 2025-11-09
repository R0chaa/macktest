"use client";

import { ReactNode } from "react";
import { FieldWithAlert } from "@/components/ui/FieldWithAlert";

interface ClassFieldProps {
  title: string;
  content: ReactNode;
  issues?: Array<{ type: string; message: string }> | undefined;
  issueType: string;
  marginBottom?: string;
}

export function ClassField({
  title,
  content,
  issues,
  issueType,
  marginBottom = "mb-3",
}: ClassFieldProps) {
  const issue = issues?.find((i) => i.type === issueType);

  return (
    <div className={marginBottom}>
      <p className="text-xs text-gray-600 mb-1">{title}</p>
      <div className="text-sm font-bold">
        <FieldWithAlert issue={issue}>{content}</FieldWithAlert>
      </div>
    </div>
  );
}

