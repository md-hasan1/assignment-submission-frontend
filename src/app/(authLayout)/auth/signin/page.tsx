"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeroBanner } from "@/components/auth/AuthHeroBanner";
import { BrandLogo } from "@/components/common/BrandLogo";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { MyFormInput } from "@/components/form/MyFormInput";
import { FormButton } from "@/components/form/FormButton";
import { Lock } from "lucide-react";
import { useSubmissions } from "@/context/SubmissionContext";
import { toast } from "sonner";

interface SignInFormData {
  email: string;
  password?: string;
}

export default function SignInPage() {
  const router = useRouter();
  const { setCurrentRole } = useSubmissions();
  const [defaultValues, setDefaultValues] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: SignInFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (data.email.includes("admin") || data.email.includes("mentor")) {
        setCurrentRole("mentor");
        toast.success("Welcome back, Avery Morgan!");
        router.push("/mentor");
      } else {
        setCurrentRole("student");
        toast.success("Welcome back, Jordan Lee!");
        router.push("/");
      }
    }, 400);
  };

  const handleQuickLogin = (role: "student" | "mentor") => {
    if (role === "student") {
      setDefaultValues({
        email: "student@projecthub.com",
        password: "password123",
      });
      setCurrentRole("student");
      toast.success("Signed in as Student (Jordan Lee)");
      router.push("/");
    } else {
      setDefaultValues({
        email: "admin@projecthub.com",
        password: "password123",
      });
      setCurrentRole("mentor");
      toast.success("Signed in as Mentor (Avery Morgan)");
      router.push("/mentor");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">
      {/* Left hero panel */}
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
              Welcome back
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter your details to continue to your workspace.
            </p>
          </div>

          {/* Form powered by react-hook-form */}
          <MyFormWrapper
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            className="space-y-4"
          >
            <MyFormInput
              name="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              required
            />

            <div>
              <MyFormInput
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                required
              />
              <div className="mt-2 text-right">
                <Link
                  href="/auth/reset-password"
                  className="text-xs text-slate-500 hover:text-indigo-600 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <FormButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              icon={<Lock className="h-4 w-4" />}
            >
              Sign in
            </FormButton>
          </MyFormWrapper>

          {/* Quick Demo Switcher */}
          <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 text-center">
            <span className="text-xs font-medium text-slate-500 block mb-2">
              Instant Demo Access:
            </span>
            <div className="flex gap-2 justify-center">
              <FormButton
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin("student")}
              >
                Student View
              </FormButton>
              <FormButton
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin("mentor")}
              >
                Mentor View
              </FormButton>
            </div>
          </div>

          {/* Footer Link */}
          <p className="mt-6 text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
