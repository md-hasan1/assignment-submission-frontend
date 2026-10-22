"use client";

import React, { useState, useMemo } from "react";
import { useSubmissions } from "@/context/SubmissionContext";
import { ProjectSubmission, SubmissionStatus } from "@/data/mockData";
import { MentorReviewModal } from "@/components/mentor/MentorReviewModal";
import { DataTable, ColumnDef } from "@/components/common/Table/DataTable";
import { TablePagination } from "@/components/common/Table/TablePagination";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ExternalProjectLink } from "@/components/common/ExternalProjectLink";
import { FormButton } from "@/components/form/FormButton";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

export const MentorDashboard: React.FC = () => {
  const { submissions, updateSubmissionStatus } = useSubmissions();

  const [activeTab, setActiveTab] = useState<"All" | SubmissionStatus>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Selected submission for review modal
  const [selectedSubmission, setSelectedSubmission] =
    useState<ProjectSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute stat counts
  const totalCount = submissions.length;
  const pendingCount = submissions.filter((s) => s.status === "Pending").length;
  const approvedCount = submissions.filter((s) => s.status === "Approved").length;
  const rejectedCount = submissions.filter((s) => s.status === "Rejected").length;

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesTab = activeTab === "All" || sub.status === activeTab;
      const matchesQuery =
        searchQuery.trim() === "" ||
        sub.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [submissions, activeTab, searchQuery]);

  // Paginated submissions
  const totalPages = Math.ceil(filteredSubmissions.length / pageSize) || 1;
  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSubmissions.slice(start, start + pageSize);
  }, [filteredSubmissions, currentPage, pageSize]);

  const handleOpenReview = (sub: ProjectSubmission) => {
    setSelectedSubmission(sub);
    setIsModalOpen(true);
  };

  const handleApprove = (id: string, comment?: string) => {
    updateSubmissionStatus(id, "Approved", comment);
  };

  const handleReject = (id: string, comment: string) => {
    updateSubmissionStatus(id, "Rejected", comment);
  };

  // Reusable columns definition for Mentor Submissions Table
  const columns: ColumnDef<ProjectSubmission>[] = [
    {
      key: "student",
      header: "STUDENT",
      render: (sub) => (
        <div>
          <div className="font-semibold text-slate-900">{sub.studentName}</div>
          <div className="text-[11px] text-slate-400">ID {sub.studentId}</div>
        </div>
      ),
    },
    {
      key: "projectName",
      header: "PROJECT",
      render: (sub) => (
        <span className="font-semibold text-slate-900 whitespace-nowrap">
          {sub.projectName}
        </span>
      ),
    },
    {
      key: "repositoryUrl",
      header: "REPOSITORY",
      render: (sub) => (
        <div className="whitespace-nowrap">
          <ExternalProjectLink href={sub.repositoryUrl} label="View repo" />
        </div>
      ),
    },
    {
      key: "liveProjectUrl",
      header: "LIVE LINK",
      render: (sub) => (
        <div className="whitespace-nowrap">
          <ExternalProjectLink href={sub.liveProjectUrl} label="Open live" />
        </div>
      ),
    },
    {
      key: "description",
      header: "DESCRIPTION",
      className: "max-w-[180px]",
      render: (sub) => (
        <p className="truncate text-slate-500" title={sub.description}>
          {sub.description}
        </p>
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
      render: (sub) => (
        <div className="whitespace-nowrap">
          <StatusBadge status={sub.status} />
        </div>
      ),
    },
    {
      key: "actions",
      header: "ACTIONS",
      align: "right",
      render: (sub) => (
        <div className="whitespace-nowrap">
          <FormButton
            variant="outline"
            size="sm"
            onClick={() => handleOpenReview(sub)}
          >
            View details
          </FormButton>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header section */}
      <div>
        <span className="text-xs font-semibold text-indigo-600 tracking-wider">
          Mentor workspace
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Review dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Review student work, make decisions, and keep submissions moving.
        </p>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total submissions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Total submissions
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">
            {totalCount}
          </div>
        </div>

        {/* Awaiting review */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Awaiting review
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">
            {pendingCount}
          </div>
        </div>

        {/* Approved */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Approved
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">
            {approvedCount}
          </div>
        </div>

        {/* Rejected */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Rejected
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <XCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">
            {rejectedCount}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter buttons */}
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100/80 p-1 text-xs font-medium self-start">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-slate-900 font-semibold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search students or projects..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Reusable Submissions Table & Pagination Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <DataTable
          columns={columns}
          data={paginatedSubmissions}
          keyExtractor={(sub) => sub.id}
          className="border-0 shadow-none rounded-none"
          emptyMessage="No submissions found matching criteria."
        />

        {/* Reusable Pagination */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={filteredSubmissions.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Reusable Review Modal */}
      <MentorReviewModal
        submission={selectedSubmission}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};
