"use client";

import React from "react";
import { motion } from "framer-motion";
import { Equal } from "lucide-react";
import { HeroBentoBlockData } from "@/types/cms";
import { GlobalNavbar } from "@/components/layout/GlobalNavbar";
import {
  ActionPillButton,
  AvatarCluster,
  BrandMark,
  CountUpMetric,
  PortraitImage,
} from "@/components/ui/Primitives";
import { siteConfig } from "@/data/siteConfig";

export function HeroBentoBlock({ data }: { data: HeroBentoBlockData }) {
  return (
    <section
      id={data.id}
      data-elementor-type="container"
      data-block-type="HeroBentoBlock"
      className="relative z-10 max-w-[1320px] mx-auto px-3 sm:px-6 pt-3 sm:pt-6"
    >
      <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden hero-gradient-surface border border-white/10 px-4 sm:px-8 lg:px-10 pt-4 sm:pt-5 pb-14 sm:pb-20 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
        {/* Atmospheric studio glow + smoothly masked blended portrait backdrop */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-24 right-[18%] w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-[#FF6E2E]/35 blur-[110px]" />
          <div className="absolute bottom-0 left-[20%] w-[300px] sm:w-[480px] h-[240px] sm:h-[340px] rounded-full bg-[#120905]/50 blur-[90px]" />

          {/* Centered background watermark portrait with radial + X/Y mask so edges fade with zero vertical lines */}
          <div className="hidden lg:block absolute inset-y-0 left-[18%] right-[16%] opacity-30 mix-blend-luminosity hero-portrait-mask">
            <PortraitImage
              src={data.profileCard.portraitUrl}
              alt=""
              className="w-full h-full"
              imgClassName="object-cover object-top scale-105 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1107] via-transparent to-[#E8501B]/45" />
          </div>

          {/* Giant subtle watermark behind bottom metric cards */}
          <div className="hidden sm:block absolute bottom-6 left-4 right-4 select-none text-[130px] lg:text-[168px] font-extrabold leading-none tracking-[-0.05em] text-white/[0.06] uppercase truncate">
            {data.watermarkText}
          </div>
        </div>

        {/* Global Navigation Bar Inside Hero Container */}
        <div className="relative z-20">
          <GlobalNavbar embeddedInHero />
        </div>

        {/* Hero 2-Column Flexbox/Grid Container (Mobile: Picture/Profile on top, Text beneath) */}
        <div className="relative z-10 mt-6 sm:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-6 items-end">
          {/* LEFT COLUMN (Desktop Left / Mobile Below Picture): Value Proposition + Bottom 2 Bento Stat Cards */}
          <motion.div
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-2 lg:order-1 lg:col-span-7 min-w-0 flex flex-col justify-between gap-7 sm:gap-10 lg:gap-14"
          >
            <div className="max-w-[600px]">
              {/* Inline Micro-Label + Main H1 */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium text-white mb-4 sm:mb-5 backdrop-blur-sm">
                <Equal className="w-3.5 h-3.5 text-[#F9F6F2] shrink-0" />
                <span>{data.microLabel}</span>
              </div>

              <h1 className="heading-tight text-[36px] sm:text-[56px] lg:text-[66px] font-semibold leading-[0.98] text-white">
                {data.headline}
              </h1>

              <p className="mt-4 sm:mt-5 max-w-[500px] text-[13px] sm:text-[15px] leading-relaxed text-white font-normal">
                {data.subheadline}
              </p>

              <div className="mt-6 sm:mt-7">
                <ActionPillButton
                  href={data.ctaHref}
                  label={data.ctaLabel}
                  variant="hero-outline"
                  arrowVariant="white-on-dark"
                  className="min-w-[172px]"
                />
              </div>
            </div>

            {/* Bottom-Left 2-Column Bento Stat Cards (side-by-side even on mobile) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[560px]">
              {data.statCards.map((card) => {
                const isCream = card.variant === "cream";
                return (
                  <div
                    key={card.title}
                    className={`group rounded-[16px] sm:rounded-[20px] p-3.5 sm:p-5 flex flex-col justify-between min-h-[144px] sm:min-h-[168px] transition-all duration-300 ease-out hover:-translate-y-1.5 ${
                      isCream
                        ? "bg-[#F9F6F2] text-[#18120F] shadow-xl border border-white/60 hover:shadow-[0_22px_50px_rgba(249,246,242,0.2)]"
                        : "glass-surface text-white hover:border-white/35 hover:shadow-[0_22px_50px_rgba(0,0,0,0.35)]"
                    }`}
                  >
                    <div>
                      <div className="heading-tight text-2xl sm:text-[34px] font-bold leading-none">
                        <CountUpMetric value={card.metric} />
                      </div>
                      <div
                        className={`mt-1.5 sm:mt-2 text-[11px] sm:text-xs font-semibold leading-snug ${
                          isCream ? "text-[#18120F]/80" : "text-white"
                        }`}
                      >
                        {card.title}
                      </div>
                    </div>

                    <p
                      className={`mt-4 sm:mt-6 text-[10px] sm:text-[11px] leading-relaxed ${
                        isCream ? "text-[#18120F]/70" : "text-white"
                      }`}
                    >
                      {card.footerCopy}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT COLUMN (Desktop Right / Mobile Top): Floating Cream Profile Card + Social Proof */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="order-1 lg:order-2 lg:col-span-5 min-w-0 flex flex-col-reverse lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-4 sm:gap-6"
          >
            {/* Top Social Proof Cluster */}
            <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-center lg:self-end bg-[#120906]/55 border border-white/15 rounded-full px-3 sm:px-3.5 py-2 backdrop-blur-md max-w-full">
              <AvatarCluster items={["JU", "CMA", "WP"]} />
              <span className="text-[11px] sm:text-xs font-medium text-white/90 leading-tight sm:max-w-[190px]">
                {data.socialProofText}
              </span>
            </div>

            {/* Floating Profile Card */}
            <div className="group w-full sm:max-w-[380px] sm:mx-auto lg:mx-0 lg:max-w-[330px] lg:ml-auto bg-[#F9F6F2] text-[#18120F] p-4 sm:p-5 rounded-[20px] sm:rounded-[22px] shadow-[0_24px_60px_rgba(11,5,3,0.48)] border border-white/50 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(11,5,3,0.6)]">
              {/* Card Top Row */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <BrandMark
                  monogram={siteConfig.brand.monogram}
                  size="sm"
                  inverted
                />
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#18120F]/[0.06] px-2.5 py-1 text-[10px] font-semibold text-[#18120F]/80">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                  </span>
                  <span className="leading-tight">
                    {data.profileCard.availabilityText}
                  </span>
                </div>
              </div>

              {/* Portrait Box */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-[#E8501B] to-[#1A0D07]">
                <PortraitImage
                  src={data.profileCard.portraitUrl}
                  alt={`${data.profileCard.fullName} — ${data.profileCard.role}`}
                  initials={data.profileCard.initials}
                  loading="eager"
                  className="w-full h-full"
                  imgClassName="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0D07]/45 via-transparent to-[#EE4D18]/20 mix-blend-multiply"
                  aria-hidden="true"
                />
              </div>

              {/* Identity & Credentials */}
              <div className="mt-4 text-center">
                <a
                  href={`mailto:${data.profileCard.email}`}
                  className="text-[11px] font-medium text-[#6B574C] hover:text-[#B83209] transition-colors break-words [overflow-wrap:anywhere]"
                >
                  {data.profileCard.email}
                </a>
                <h2 className="mt-1 text-base font-bold tracking-tight text-[#18120F]">
                  {data.profileCard.fullName}
                </h2>
                <p className="text-xs font-semibold text-[#B83209]">
                  {data.profileCard.role}
                </p>
                <p className="mt-2.5 text-[11px] leading-relaxed text-[#18120F]/70">
                  {data.profileCard.bioSnippet}
                </p>
              </div>

              {/* Full-Width Bright Orange Pill CTA */}
              <div className="mt-4">
                <ActionPillButton
                  href={data.profileCard.ctaHref}
                  label={data.profileCard.ctaLabel}
                  variant="orange-solid"
                  arrowVariant="white-on-orange"
                  external
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
