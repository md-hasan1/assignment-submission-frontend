"use client";

import React, { useState, useEffect } from "react";
import { ProjectSubmission } from "@/data/mockData";
import { BaseModal } from "@/components/common/Modal/BaseModal";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ExternalProjectLink } from "@/components/common/ExternalProjectLink";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormButton } from "@/components/form/FormButton";
import { toast } from "sonner";

interface MentorReviewModalProps {
  submission: ProjectSubmission | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string, comment?: string) => void;
  onReject: (id: string, comment: string) => void;
}

export const MentorReviewModal: React.FC<MentorReviewModalProps> = ({
  submission,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (submission) {
      setComment(submission.rejectionReason || submission.mentorFeedback || "");
    } else {
      setComment("");
    }
  }, [submission]);

  if (!submission) return null;

  const handleApprove = () => {
    onApprove(submission.id, comment.trim());
    toast.success(`Approved "${submission.projectName}" successfully!`);
    onClose();
  };

  const handleReject = () => {
    if (!comment.trim()) {
      toast.error("Please provide a comment explaining what needs to be fixed");
      return;
    }
    onReject(submission.id, comment.trim());
    toast.error(`Rejected "${submission.projectName}" with feedback`);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={submission.projectName}
      subtitle="Complete project submission details and review status."
      badge={<StatusBadge status={submission.status} />}
      footer={
        <div className="flex items-center justify-end gap-2.5">
          <FormButton variant="outline" size="sm" onClick={onClose}>
            Close
          </FormButton>
          <FormButton variant="approve" size="sm" onClick={handleApprove}>
            Approve
          </FormButton>
          <FormButton variant="reject" size="sm" onClick={handleReject}>
            Reject with comment
          </FormButton>
        </div>
      }
    >
      <div className="space-y-4 text-xs">
        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              STUDENT
            </span>
            <span className="mt-1 font-medium text-slate-900 block text-xs sm:text-sm">
              {submission.studentName}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              SUBMITTED
            </span>
            <span className="mt-1 font-medium text-slate-900 block text-xs sm:text-sm">
              {submission.submittedAt}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            DESCRIPTION
          </span>
          <p className="mt-1 text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3.5 border border-slate-100">
            {submission.description}
          </p>
        </div>

        {/* Comment for student */}
        <div className="pt-2">
          <FormTextarea
            id="mentorComment"
            label="Comment for the student"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Required when rejecting. Explain what needs to be fixed."
            showCharCount={false}
          />
        </div>
      </div>
    </BaseModal>
  );
};
