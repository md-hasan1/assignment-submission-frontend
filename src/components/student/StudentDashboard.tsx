"use client";

import React, { useState } from "react";
import { useSubmissions } from "@/context/SubmissionContext";
import { ProjectSubmission } from "@/data/mockData";
import { SubmissionDetailsModal } from "@/components/student/SubmissionDetailsModal";
import { DataTable, ColumnDef } from "@/components/common/Table/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ExternalProjectLink } from "@/components/common/ExternalProjectLink";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { MyFormInput } from "@/components/form/MyFormInput";
import { MyFormTextarea } from "@/components/form/MyFormTextarea";
import { FormButton } from "@/components/form/FormButton";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface SubmissionFormData {
  projectName: string;
  repositoryUrl: string;
  liveProjectUrl: string;
  description: string;
}

export const StudentDashboard: React.FC = () => {
  const { studentSubmissions, addSubmission } = useSubmissions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal states
  const [selectedSubmission, setSelectedSubmission] =
    useState<ProjectSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data: SubmissionFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      addSubmission({
        projectName: data.projectName.trim(),
        repositoryUrl: data.repositoryUrl.trim(),
        liveProjectUrl: data.liveProjectUrl.trim(),
        description: data.description.trim(),
      });

      toast.success("Project submitted successfully! Status is now Pending review.");
      setIsSubmitting(false);
    }, 400);
  };

  const handleOpenDetails = (sub: ProjectSubmission) => {
    setSelectedSubmission(sub);
    setIsModalOpen(true);
  };

  // Reusable column definitions for Student Submissions Table
  const columns: ColumnDef<ProjectSubmission>[] = [
    {
      key: "projectName",
      header: "PROJECT",
      render: (sub) => (
        <span className="font-semibold text-slate-900">{sub.projectName}</span>
      ),
    },
    {
      key: "links",
      header: "LINKS",
      render: (sub) => (
        <div className="flex items-center gap-3 font-medium">
          <ExternalProjectLink href={sub.repositoryUrl} label="Repo" />
          <ExternalProjectLink href={sub.liveProjectUrl} label="Live" />
        </div>
      ),
    },
    {
      key: "submittedAt",
      header: "SUBMITTED",
      render: (sub) => (
        <span className="text-slate-500 whitespace-nowrap">{sub.submittedAt}</span>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      render: (sub) => <StatusBadge status={sub.status} />,
    },
    {
      key: "actions",
      header: "DETAILS",
      align: "right",
      render: (sub) => (
        <FormButton
          variant="outline"
          size="sm"
          onClick={() => handleOpenDetails(sub)}
        >
          {sub.status === "Rejected" ? "See feedback" : "View"}
        </FormButton>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Header section */}
      <div>
        <span className="text-xs font-semibold text-indigo-600 tracking-wider">
          Student workspace
        </span>
        <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Share what you&apos;ve built
          </h1>
          <span className="text-xs font-medium text-slate-500">
            {studentSubmissions.length}{" "}
            {studentSubmissions.length === 1 ? "submission" : "submissions"}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Submit your project links and give your mentor the context they need.
        </p>
      </div>

      {/* New project submission form card powered by react-hook-form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-slate-900">
            New project submission
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            All fields are required. You can track the review status below.
          </p>
        </div>

        <MyFormWrapper
          onSubmit={onSubmit}
          resetOnSubmit={true}
          defaultValues={{
            projectName: "",
            repositoryUrl: "",
            liveProjectUrl: "",
            description: "",
          }}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <MyFormInput
              name="projectName"
              label="Project name"
              placeholder="e.g. Campus Compass"
              required
            />
            <MyFormInput
              name="repositoryUrl"
              type="url"
              label="GitHub repository"
              placeholder="https://github.com/username/project"
              required
            />
          </div>

          <MyFormInput
            name="liveProjectUrl"
            type="url"
            label="Live project link"
            placeholder="https://your-project.com"
            required
          />

          <MyFormTextarea
            name="description"
            label="Description"
            rows={4}
            maxLength={500}
            placeholder="Describe the problem, your approach, and the technologies you used..."
            required
          />

          <div>
            <FormButton
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              icon={<Send className="h-3.5 w-3.5" />}
            >
              Submit project
            </FormButton>
          </div>
        </MyFormWrapper>
      </div>

      {/* My submissions section */}
      <div>
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900">
            My submissions
          </h2>
          <p className="text-xs text-slate-500">
            Your complete submission and review history.
          </p>
        </div>

        {/* Reusable Data Table */}
        <DataTable
          columns={columns}
          data={studentSubmissions}
          keyExtractor={(sub) => sub.id}
          emptyMessage="You have not submitted any projects yet."
        />
      </div>

      {/* Reusable Details modal */}
      <SubmissionDetailsModal
        submission={selectedSubmission}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
