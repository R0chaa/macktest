"use client";

interface LoadingProps {
  message?: string;
}

export function Loading({ message = "Carregando turmas..." }: LoadingProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-gray-600">{message}</div>
    </div>
  );
}

