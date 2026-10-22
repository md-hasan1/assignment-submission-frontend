"use client";

import React, { useState } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MyFormInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  rules?: RegisterOptions;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  rightElement?: React.ReactNode;
}

export const MyFormInput: React.FC<MyFormInputProps> = ({
  name,
  label,
  type = "text",
  placeholder = "",
  required = false,
  rules = {},
  disabled = false,
  className = "",
  labelClassName = "",
  inputClassName = "",
  rightElement,
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  // Build validation rules
  const validationRules: RegisterOptions = {
    ...rules,
    ...(required && !rules.required
      ? { required: `${label || "This field"} is required` }
      : {}),
  };

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn("block text-xs font-medium text-slate-700", labelClassName)}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={validationRules}
        render={({ field, fieldState: { error } }) => (
          <div className="relative mt-0.5">
            <input
              {...field}
              id={name}
              type={inputType}
              placeholder={placeholder}
              disabled={disabled}
              value={field.value ?? ""}
              className={cn(
                "block w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all shadow-xs",
                (isPassword || rightElement) && "pr-10",
                error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
                disabled && "bg-slate-100 text-slate-400 cursor-not-allowed",
                inputClassName
              )}
            />

            {isPassword && !rightElement && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}

            {rightElement && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {rightElement}
              </div>
            )}

            {error && (
              <p className="mt-1 text-xs text-red-500 leading-tight">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MyFormInput;
