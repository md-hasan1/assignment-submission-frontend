import React from "react";
import { SubmissionStatus } from "@/data/mockData";

interface StatusBadgeProps {
  status: SubmissionStatus | string;
  className?: string;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
  size = "sm",
}) => {
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm";

  switch (status) {
    case "Rejected":
      return (
        <span
          className={`inline-flex items-center rounded-full bg-red-50 font-medium text-red-600 border border-red-200 ${sizeClasses} ${className}`}
        >
          Rejected
        </span>
      );
    case "Approved":
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-50 font-medium text-emerald-600 border border-emerald-200 ${sizeClasses} ${className}`}
        >
          Approved
        </span>
      );
    case "Pending":
    default:
      return (
        <span
          className={`inline-flex items-center rounded-full bg-amber-50 font-medium text-amber-600 border border-amber-200 ${sizeClasses} ${className}`}
        >
          Pending
        </span>
      );
  }
};
