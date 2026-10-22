"use client";

import React from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { cn } from "@/lib/utils";

export interface MyFormTextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  required?: boolean;
  rules?: RegisterOptions;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
  showCharCount?: boolean;
}

export const MyFormTextarea: React.FC<MyFormTextareaProps> = ({
  name,
  label,
  placeholder = "",
  rows = 4,
  maxLength,
  required = false,
  rules = {},
  disabled = false,
  className = "",
  labelClassName = "",
  textareaClassName = "",
  showCharCount = true,
}) => {
  const { control } = useFormContext();

  const validationRules: RegisterOptions = {
    ...rules,
    ...(required && !rules.required
      ? { required: `${label || "This field"} is required` }
      : {}),
  };

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <Controller
        name={name}
        control={control}
        rules={validationRules}
        render={({ field, fieldState: { error } }) => {
          const charCount = typeof field.value === "string" ? field.value.length : 0;

          return (
            <div>
              <div className="flex items-center justify-between">
                {label && (
                  <label
                    htmlFor={name}
                    className={cn(
                      "block text-xs font-medium text-slate-700",
                      labelClassName
                    )}
                  >
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                  </label>
                )}
                {showCharCount && maxLength && (
                  <span className="text-[11px] text-slate-400">
                    {charCount}/{maxLength}
                  </span>
                )}
              </div>

              <textarea
                {...field}
                id={name}
                rows={rows}
                maxLength={maxLength}
                placeholder={placeholder}
                disabled={disabled}
                value={field.value ?? ""}
                className={cn(
                  "mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all shadow-xs resize-none",
                  error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
                  disabled && "bg-slate-100 text-slate-400 cursor-not-allowed",
                  textareaClassName
                )}
              />

              {error && (
                <p className="mt-1 text-xs text-red-500 leading-tight">
                  {error.message}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default MyFormTextarea;
