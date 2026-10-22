"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  INITIAL_MENTOR_SUBMISSIONS,
  INITIAL_STUDENT_SUBMISSIONS,
  ProjectSubmission,
  SubmissionStatus,
} from "@/data/mockData";

interface SubmissionContextType {
  submissions: ProjectSubmission[];
  studentSubmissions: ProjectSubmission[];
  addSubmission: (submission: Omit<ProjectSubmission, "id" | "submittedAt" | "status" | "studentId" | "studentName" | "studentEmail">) => void;
  updateSubmissionStatus: (id: string, status: SubmissionStatus, feedback?: string) => void;
  currentRole: "student" | "mentor";
  setCurrentRole: (role: "student" | "mentor") => void;
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(INITIAL_MENTOR_SUBMISSIONS);
  const [currentRole, setCurrentRole] = useState<"student" | "mentor">("student");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("projecthub_submissions");
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
      const savedRole = localStorage.getItem("projecthub_role");
      if (savedRole === "student" || savedRole === "mentor") {
        setCurrentRole(savedRole);
      }
    } catch {
      // ignore
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("projecthub_submissions", JSON.stringify(submissions));
      localStorage.setItem("projecthub_role", currentRole);
    } catch {
      // ignore
    }
  }, [submissions, currentRole, isInitialized]);

  const addSubmission = (newSub: Omit<ProjectSubmission, "id" | "submittedAt" | "status" | "studentId" | "studentName" | "studentEmail">) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const created: ProjectSubmission = {
      ...newSub,
      id: `sub-${Date.now()}`,
      studentId: "#1",
      studentName: "Jordan Lee",
      studentEmail: "student@projecthub.com",
      submittedAt: formattedDate,
      status: "Pending",
    };

    setSubmissions((prev) => [created, ...prev]);
  };

  const updateSubmissionStatus = (id: string, status: SubmissionStatus, feedback?: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          return {
            ...sub,
            status,
            rejectionReason: status === "Rejected" ? feedback : undefined,
            mentorFeedback: status === "Approved" ? feedback : undefined,
          };
        }
        return sub;
      })
    );
  };

  // Submissions filtered for Jordan Lee (Student ID #1)
  const studentSubmissions = submissions.filter(
    (s) =>
      (s.studentName === "Jordan Lee" && s.studentId === "#1") ||
      s.id.startsWith("sub-")
  );


  return (
    <SubmissionContext.Provider
      value={{
        submissions,
        studentSubmissions,
        addSubmission,
        updateSubmissionStatus,
        currentRole,
        setCurrentRole,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmissions = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error("useSubmissions must be used within a SubmissionProvider");
  }
  return context;
};
