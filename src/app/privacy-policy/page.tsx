import React from "react";
import { Metadata } from "next";
import { GlobalNavbar } from "@/components/layout/GlobalNavbar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionPill } from "@/components/ui/Primitives";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteConfig.brand.fullName}`,
  description:
    "Privacy Policy for Md. Shahriar Rahman Nadim's portfolio and digital agency website covering contact inquiries, analytics, and third-party links.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy — ${siteConfig.brand.fullName}`,
    description:
      "How inquiry data and optional analytics are handled on this portfolio website.",
    url: `${siteConfig.siteUrl}/privacy-policy`,
    images: [`${siteConfig.siteUrl}/opengraph-image.png`],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-transparent text-white">
      <GlobalNavbar />
      <Breadcrumbs
        items={[{ label: "Privacy Policy", href: "/privacy-policy" }]}
      />

      <main className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <SectionPill label="Legal & Privacy" />

        <h1 className="mt-6 heading-tight text-[34px] sm:text-[48px] font-semibold leading-[1.04]">
          <span className="text-white">Privacy </span>
          <span className="text-[#8C7A70]">Policy</span>
        </h1>

        <p className="mt-3 text-xs text-[#8C7A70]">
          Last updated: November 2026 • {siteConfig.brand.fullName}
        </p>

        <div className="mt-8 space-y-5 rounded-[24px] glass-surface p-6 sm:p-8 text-sm leading-relaxed text-white/85">
          <section>
            <h2 className="text-base font-semibold text-white">
              1. Information Collected
            </h2>
            <p className="mt-2">
              When you submit the contact form on this website, we collect only
              the details you voluntarily provide: your name, email address,
              selected service scope, and project message.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              2. How Information Is Used
            </h2>
            <p className="mt-2">
              Inquiry details are used solely to respond to your project
              request, prepare proposals, or manage ongoing client retainers.
              Your data is never sold, rented, or shared with third-party
              marketers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              3. Analytics & Cookies
            </h2>
            <p className="mt-2">
              When Google Analytics 4 is enabled via site configuration,
              aggregated traffic metrics (such as page views and device types)
              are used to improve site performance and user experience.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white">
              4. External Links & Contact
            </h2>
            <p className="mt-2">
              This portfolio links to live client websites and external
              messaging channels (WhatsApp, Telegram, Facebook). For privacy or
              data removal requests, email{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[#FF9B73] underline hover:text-white transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

