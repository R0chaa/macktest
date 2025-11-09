"use client";

interface NewBadgeProps {
  isNew?: boolean;
}

export function NewBadge({ isNew }: NewBadgeProps) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        {isNew ? (
          <span className="px-2 py-1 bg-blue-700 text-white text-xs sm:text-[7px] font-semibold rounded-2xl">
            Novo
          </span>
        ) : (
          <span className="px-2 py-1 text-[7px] invisible">Novo</span>
        )}
      </div>
    </div>
  );
}
