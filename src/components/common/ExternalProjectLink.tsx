import React from "react";
import { ExternalLink } from "lucide-react";

interface ExternalProjectLinkProps {
  href: string;
  label?: string;
  showFullUrl?: boolean;
  className?: string;
}

export const ExternalProjectLink: React.FC<ExternalProjectLinkProps> = ({
  href,
  label,
  showFullUrl = false,
  className = "",
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors ${className}`}
    >
      <span className={showFullUrl ? "truncate max-w-xs" : ""}>
        {showFullUrl ? href : label || href}
      </span>
      <ExternalLink className="h-3 w-3 shrink-0" />
    </a>
  );
};
