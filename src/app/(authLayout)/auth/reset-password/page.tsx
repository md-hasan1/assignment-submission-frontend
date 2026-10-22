"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuthHeroBanner } from "@/components/auth/AuthHeroBanner";
import { BrandLogo } from "@/components/common/BrandLogo";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { MyFormInput } from "@/components/form/MyFormInput";
import { FormButton } from "@/components/form/FormButton";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";

interface ResetFormData {
  email: string;
}

export default function ResetPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: ResetFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success("Reset link sent! Please check your inbox.");
    }, 600);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">
      {/* Left hero banner */}
      <AuthHeroBanner />

      {/* Right form panel */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        {/* Mobile Logo */}
        <div className="mb-8 lg:hidden">
          <BrandLogo variant="dark" />
        </div>

        <div className="mx-auto w-full max-w-md">
          {/* Back link */}
          <Link
            href="/auth/signin"
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </Link>

          {!isSubmitted ? (
            /* Step 1: Request Reset */
            <div>
              <div className="mb-8">
                <span className="text-xs font-semibold text-indigo-600">
                  Account recovery
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Reset your password
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Enter your account email and we&apos;ll send you a secure reset link.
                </p>
              </div>

              {/* Form powered by react-hook-form */}
              <MyFormWrapper
                onSubmit={onSubmit}
                defaultValues={{ email: "" }}
                className="space-y-5"
              >
                <MyFormInput
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="you@example.com"
                  required
                />

                <FormButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                  icon={<Mail className="h-4 w-4" />}
                >
                  Send reset link
                </FormButton>
              </MyFormWrapper>
            </div>
          ) : (
            /* Step 2: Check your inbox */
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm">
                <CheckCircle2 className="h-8 w-8 text-indigo-600" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Check your inbox
              </h2>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                We sent a password reset link to{" "}
                <span className="font-semibold text-slate-800">{submittedEmail}</span>.
                Follow the link inside to set a new password.
              </p>

              <div className="mt-8 space-y-3">
                <Link href="/auth/signin">
                  <FormButton variant="primary" size="lg" className="w-full">
                    Return to sign in
                  </FormButton>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    toast.success("A new reset link has been dispatched.");
                  }}
                  className="text-xs text-slate-500 hover:text-indigo-600 hover:underline transition-colors cursor-pointer"
                >
                  Didn&apos;t receive an email? Resend link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
