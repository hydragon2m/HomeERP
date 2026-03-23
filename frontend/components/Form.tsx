'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'select';
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
  rows?: number;
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  options,
  rows = 4,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`
            px-4 py-2 rounded-lg border-2 bg-white dark:bg-gray-800
            text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
            transition-colors focus:outline-none focus:border-blue-500
            ${
              error
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-600'
            }
          `}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`
            px-4 py-2 rounded-lg border-2 bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            transition-colors focus:outline-none focus:border-blue-500
            ${
              error
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-600'
            }
          `}
        >
          <option value="">Chọn một tùy chọn</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            px-4 py-2 rounded-lg border-2 bg-white dark:bg-gray-800
            text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
            transition-colors focus:outline-none focus:border-blue-500
            ${
              error
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-600'
            }
          `}
        />
      )}

      {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}

interface FormProps {
  fields: FormFieldProps[];
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  loading?: boolean;
}

export function Form({
  fields,
  onSubmit,
  submitLabel = 'Lưu',
  cancelLabel = 'Hủy',
  onCancel,
  loading = false,
}: FormProps) {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={formData[field.name] || ''}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}

      <div className="flex gap-3 justify-end pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {cancelLabel}
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Đang xử lý...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default Form;
