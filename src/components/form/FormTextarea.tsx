import React from "react";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  maxLength?: number;
  showCharCount?: boolean;
  containerClassName?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  id,
  error,
  maxLength,
  showCharCount = true,
  containerClassName = "",
  className = "",
  value,
  ...props
}) => {
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div className={containerClassName}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-medium text-slate-700">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {showCharCount && maxLength && (
          <span className="text-[11px] text-slate-400">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        className={`mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all shadow-xs resize-none ${
          error ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
