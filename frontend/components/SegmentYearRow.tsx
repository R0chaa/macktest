"use client";

interface SegmentYearRowProps {
  segment: string;
  year: string;
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function SegmentYearRow({
  segment,
  year,
  className,
  checked = false,
  onChange,
}: SegmentYearRowProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className="mb-2 flex items-center justify-between">
      <p className="text-xs font-bold text-gray-900">
        {segment} - {year}
      </p>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        aria-label={`Selecionar ${className || "turma"}`}
      />
    </div>
  );
}
