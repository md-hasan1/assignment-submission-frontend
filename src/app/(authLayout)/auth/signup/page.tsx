"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeroBanner } from "@/components/auth/AuthHeroBanner";
import { BrandLogo } from "@/components/common/BrandLogo";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { MyFormInput } from "@/components/form/MyFormInput";
import { FormButton } from "@/components/form/FormButton";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useSubmissions } from "@/context/SubmissionContext";

interface SignUpFormData {
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const { setCurrentRole } = useSubmissions();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentRole("student");
      toast.success("Account created successfully! Welcome to ProjectHub.");
      router.push("/");
    }, 500);
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
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-semibold text-indigo-600">
              Student registration
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Start submitting projects and tracking mentor decisions.
            </p>
          </div>

          {/* Form powered by react-hook-form */}
          <MyFormWrapper
            onSubmit={onSubmit}
            defaultValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            className="space-y-4"
          >
            <MyFormInput
              name="fullName"
              label="Full name"
              placeholder="Jordan Lee"
              required
            />

            <MyFormInput
              name="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              required
            />

            <MyFormInput
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
            />

            <MyFormInput
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="••••••••"
              required
            />

            <FormButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={<UserPlus className="h-4 w-4" />}
            >
              Create student account
            </FormButton>
          </MyFormWrapper>

          {/* Footer Link */}
          <p className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
