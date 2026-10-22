import React from "react";
import { Loader2 } from "lucide-react";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "approve" | "reject" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary:
      "bg-[#4F46E5] text-white hover:bg-[#4338CA] focus:ring-indigo-500/40 shadow-xs",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs",
    approve:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500/40 shadow-2xs",
    reject:
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500/40 shadow-2xs",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  }[variant];

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-medium rounded-lg",
    md: "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg",
    lg: "px-5 py-2.5 text-sm font-semibold rounded-lg",
  }[size];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none cursor-pointer focus:outline-none focus:ring-2 ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin shrink-0" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
