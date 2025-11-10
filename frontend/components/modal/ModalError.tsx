"use client";

interface ModalErrorProps {
  message: string;
  onRetry?: () => void;
}

export function ModalError({ message, onRetry }: ModalErrorProps) {
  return (
    <div className="py-8 text-center">
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-blue-600 hover:text-blue-700 underline"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

