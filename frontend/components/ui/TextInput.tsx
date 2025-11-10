"use client";

interface TextInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export function TextInput({
  name,
  value,
  onChange,
  required,
  placeholder,
}: TextInputProps) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    />
  );
}

