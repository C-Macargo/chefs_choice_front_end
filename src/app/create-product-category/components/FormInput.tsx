import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, value, onChange, type = "text" }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm text-gray-700 dark:text-gray-200 mr-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};

export default FormInput;
