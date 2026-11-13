import React from "react";
import { GlobalNavbar } from "@/components/layout/GlobalNavbar";
import { ActionPillButton, SectionPill } from "@/components/ui/Primitives";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col">
      <GlobalNavbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-[640px] w-full rounded-[28px] hero-gradient-surface border border-white/15 p-8 sm:p-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
          <div className="flex justify-center">
            <SectionPill label="404 • Page Not Found" />
          </div>
          <h1 className="mt-6 heading-tight text-4xl sm:text-5xl font-semibold leading-tight text-white">
            This route does not exist yet
          </h1>
          <p className="mt-4 text-sm text-white leading-relaxed max-w-[440px] mx-auto">
            The page you requested could not be found in local definitions or
            connected WordPress routes.
          </p>
          <div className="mt-8 flex justify-center">
            <ActionPillButton
              href="/"
              label="Back to Home"
              variant="hero-outline"
              arrowVariant="white-on-dark"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

