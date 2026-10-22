"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BrandLogo } from "@/components/common/BrandLogo";
import { LogOut, UserCheck, GraduationCap } from "lucide-react";
import { useSubmissions } from "@/context/SubmissionContext";
import { toast } from "sonner";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentRole, setCurrentRole } = useSubmissions();

  const isMentor = pathname.startsWith("/mentor") || currentRole === "mentor";

  const handleRoleToggle = (newRole: "student" | "mentor") => {
    setCurrentRole(newRole);
    if (newRole === "mentor") {
      router.push("/mentor");
      toast.info("Switched to Mentor Workspace");
    } else {
      router.push("/");
      toast.info("Switched to Student Workspace");
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    router.push("/auth/signin");
  };

  const user = isMentor
    ? {
        name: "Avery Morgan",
        email: "admin@projecthub.com",
        role: "Mentor",
      }
    : {
        name: "Jordan Lee",
        email: "student@projecthub.com",
        role: "Student",
      };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-2xs">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <BrandLogo variant="dark" showSubtitle />

        {/* Right: Role Switcher & Profile info & Logout */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Quick Workspace Switcher */}
          <div className="hidden sm:flex items-center rounded-lg border border-slate-200 bg-slate-100/80 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => handleRoleToggle("student")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all cursor-pointer ${
                !isMentor
                  ? "bg-white text-indigo-600 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleToggle("mentor")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all cursor-pointer ${
                isMentor
                  ? "bg-white text-indigo-600 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              Mentor
            </button>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight">
                {user.name}
              </div>
              <div className="text-[11px] text-slate-500">{user.email}</div>
            </div>

            {/* Role Badge */}
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                isMentor
                  ? "border-purple-200 bg-purple-50 text-purple-700"
                  : "border-indigo-200 bg-indigo-50 text-indigo-700"
              }`}
            >
              {user.role}
            </span>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
