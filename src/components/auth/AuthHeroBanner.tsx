import React from "react";
import { BrandLogo } from "@/components/common/BrandLogo";
import { CheckCircle2 } from "lucide-react";

export const AuthHeroBanner: React.FC = () => {
  return (
    <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-[#181B38] p-12 text-white">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />

      {/* Top Header */}
      <div className="relative z-10">
        <BrandLogo variant="light" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 my-auto py-12 max-w-lg">
        <div className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-indigo-400">
          FROM IDEA TO IMPACT
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-[1.15]">
          Build boldly. Get reviewed.
          <br />
          Keep growing.
        </h1>

        <p className="mt-6 text-base text-indigo-200/80 leading-relaxed">
          One focused space for students to share their work and mentors to provide
          timely decisions.
        </p>

        {/* Feature Checkpoints */}
        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-indigo-100/90">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
            <span>Simple submissions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
            <span>Clear feedback</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
            <span>Fast decisions</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 text-xs text-indigo-300/50">
        A better review workflow for everyone.
      </div>
    </div>
  );
};
