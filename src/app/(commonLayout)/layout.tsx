import { Navbar } from "@/components/common/Navbar/Navbar";
import React from "react";

export default function CommonLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

