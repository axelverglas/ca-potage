"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  error?: string;
}

export default function datepicker({
  label,
  value,
  onChange,
  error,
}: CustomDatePickerProps) {
  const handleChange = (value: any) => {
    if (Array.isArray(value)) {
      onChange(value[0] || null);
    } else if (value instanceof Date) {
      onChange(value);
    } else {
      onChange(null);
    }
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block">{label}</label>
      <DatePicker
        onChange={handleChange}
        selected={value}
        className={`w-full rounded-lg border ${
          error ? "border-red-500" : "border-primary"
        } bg-transparent px-2 py-2 outline-none`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
