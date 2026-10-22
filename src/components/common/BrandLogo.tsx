import React from "react";
import Link from "next/link";
import { FolderGit2 } from "lucide-react";

interface BrandLogoProps {
  variant?: "light" | "dark";
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "dark",
  showSubtitle = false,
  className = "",
}) => {
  const isLight = variant === "light";

  return (
    <Link href="/" className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#4338CA] to-[#6366F1] text-white shadow-md shadow-indigo-500/20">
        <FolderGit2 className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span
          className={`font-semibold tracking-tight text-base leading-tight ${
            isLight ? "text-white" : "text-slate-900"
          }`}
        >
          ProjectHub
        </span>
        {showSubtitle && (
          <span
            className={`text-xs ${
              isLight ? "text-indigo-200/70" : "text-slate-500"
            }`}
          >
            Submission & review workspace
          </span>
        )}
      </div>
    </Link>
  );
};
