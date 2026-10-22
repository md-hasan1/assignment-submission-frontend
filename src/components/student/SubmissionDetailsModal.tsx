"use client";

import React from "react";
import { ProjectSubmission } from "@/data/mockData";
import { BaseModal } from "@/components/common/Modal/BaseModal";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ExternalProjectLink } from "@/components/common/ExternalProjectLink";
import { FormButton } from "@/components/form/FormButton";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface SubmissionDetailsModalProps {
  submission: ProjectSubmission | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionDetailsModal: React.FC<SubmissionDetailsModalProps> = ({
  submission,
  isOpen,
  onClose,
}) => {
  if (!submission) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={submission.projectName}
      subtitle="Complete project submission details and review status."
      badge={<StatusBadge status={submission.status} />}
      footer={
        <div className="flex justify-end">
          <FormButton variant="outline" size="sm" onClick={onClose}>
            Close
          </FormButton>
        </div>
      }
    >
      <div className="space-y-5 text-sm">
        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              SUBMITTED
            </span>
            <span className="mt-1 font-medium text-slate-900 block text-xs md:text-sm">
              {submission.submittedAt}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              REPOSITORY
            </span>
            <div className="mt-1">
              <ExternalProjectLink
                href={submission.repositoryUrl}
                showFullUrl
              />
            </div>
          </div>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            LIVE PROJECT
          </span>
          <div className="mt-1">
            <ExternalProjectLink
              href={submission.liveProjectUrl}
              showFullUrl
            />
          </div>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            DESCRIPTION
          </span>
          <p className="mt-1 text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3.5 border border-slate-100">
            {submission.description}
          </p>
        </div>

        {/* Status specific feedback box */}
        {submission.status === "Rejected" && (
          <div className="rounded-xl border border-red-200 bg-red-50/70 p-4">
            <div className="flex items-center gap-2 text-red-700 font-semibold text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>Why it was rejected</span>
            </div>
            <p className="mt-2 text-xs text-red-600 leading-relaxed">
              {submission.rejectionReason ||
                "The README is missing setup steps, and the live link shows a blank page on first load. Please fix both and submit again."}
            </p>
          </div>
        )}

        {submission.status === "Approved" && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>Approved by mentor</span>
            </div>
            <p className="mt-2 text-xs text-emerald-700 leading-relaxed">
              {submission.mentorFeedback ||
                "Great work! Your project meets all acceptance criteria and standards."}
            </p>
          </div>
        )}

        {submission.status === "Pending" && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
              <Clock className="h-4 w-4 shrink-0 text-amber-600" />
              <span>Awaiting review</span>
            </div>
            <p className="mt-2 text-xs text-amber-700 leading-relaxed">
              Your submission is currently in the mentor review queue. You will see updated feedback here once reviewed.
            </p>
          </div>
        )}
      </div>
    </BaseModal>
  );
};
