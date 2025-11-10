"use client";

import { useState, useRef } from "react";

interface NumberInputProps {
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  required?: boolean;
}

export function NumberInput({
  name,
  value,
  onChange,
  min = 0,
  required,
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState<string>(
    value === 0 ? "" : String(value)
  );
  const [isEditing, setIsEditing] = useState(false);
  const lastExternalValueRef = useRef(value);

  const currentDisplayValue = isEditing
    ? displayValue
    : value === 0
    ? ""
    : String(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIsEditing(true);

    if (inputValue === "") {
      setDisplayValue("");
      return;
    }

    if (inputValue.match(/^[0-9]+$/)) {
      const numValue = parseInt(inputValue, 10);
      if (numValue >= min) {
        setDisplayValue(inputValue);
        onChange(e);
      }
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (displayValue === "" || displayValue === "-") {
      setDisplayValue("0");
      const syntheticEvent = {
        target: {
          name,
          value: "0",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    } else {
      lastExternalValueRef.current = value;
      const syncedValue = value === 0 ? "" : String(value);
      setDisplayValue(syncedValue);
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      name={name}
      value={currentDisplayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      pattern="[0-9]*"
    />
  );
}
