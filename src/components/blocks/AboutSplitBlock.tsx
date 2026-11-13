"use client";

import React from "react";
import { motion } from "framer-motion";
import { AboutSplitBlockData } from "@/types/cms";
import {
  ActionPillButton,
  AvatarCluster,
  BrandMark,
  PortraitImage,
  SectionPill,
} from "@/components/ui/Primitives";
import { siteConfig } from "@/data/siteConfig";

export function AboutSplitBlock({
  data,
  isPrimaryHeading = false,
  overlapHero = false,
}: {
  data: AboutSplitBlockData;
  isPrimaryHeading?: boolean;
  overlapHero?: boolean;
}) {
  const HeadingTag = isPrimaryHeading ? "h1" : "h2";

  return (
    <section
      id={data.id}
      data-elementor-type="container"
      data-block-type="AboutSplitBlock"
      className={`scroll-mt-20 relative z-10 ${
        overlapHero
          ? "z-20 -mt-8 sm:-mt-12 rounded-t-[32px] sm:rounded-t-[40px] bg-[#120906]/40 backdrop-blur-md border-t border-white/10 shadow-[0_-24px_70px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-24">
        {/* Top Meta Row */}
        <div className="flex items-center justify-between gap-4">
          <SectionPill label={data.badgeLabel} />
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/50">
            <BrandMark monogram={siteConfig.brand.monogram} size="sm" />
            <span>{data.watermarkLabel}</span>
          </div>
        </div>

        {/* Section H1/H2 Dual-Tone */}
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-6 sm:mt-10 lg:pl-[8%]"
        >
          <HeadingTag className="heading-tight text-[31px] sm:text-[48px] lg:text-[58px] font-semibold leading-[1.04]">
            <span className="text-white block">{data.headlinePrimary}</span>
            <span className="text-[#8C7A70] block">{data.headlineMuted}</span>
          </HeadingTag>
        </motion.div>

        {/* Asymmetric 2-Column Bento Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: Tall Portrait Card with Warm Sunset-Orange Duotone Grading */}
          <motion.div
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group lg:col-span-5 w-full max-w-[460px] mx-auto lg:max-w-none min-w-0 relative rounded-[20px] sm:rounded-[24px] overflow-hidden aspect-[4/4.5] lg:aspect-auto min-h-[340px] sm:min-h-[480px] lg:min-h-[500px] bg-gradient-to-br from-[#EE4D18] via-[#B83209] to-[#120905] border border-orange-500/20 shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-orange-500/45"
          >
            {/* Warm orange radial studio backdrop */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[#FF7438]/45 blur-[70px]"
              aria-hidden="true"
            />
            <PortraitImage
              src={data.portraitUrl}
              alt={`${siteConfig.brand.fullName} — Web Architect & Digital Growth Partner`}
              initials="SN"
              loading="lazy"
              className="w-full h-full min-h-[340px] sm:min-h-[500px]"
              imgClassName="object-cover object-top portrait-duotone-amber transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            {/* Sunset-orange duotone color & contrast layers */}
            <div
              className="pointer-events-none absolute inset-0 bg-[#EE4D18]/28 mix-blend-color"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B0503]/90 via-[#B83209]/30 to-[#FF6A2B]/35 mix-blend-multiply"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0503]/90 via-transparent to-transparent"
              aria-hidden="true"
            />

            {/* Bottom Frosted Glass Badge */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 glass-surface rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-[11px] sm:text-xs font-medium text-white/95 leading-snug">
              {data.portraitBadge}
            </div>
          </motion.div>

          {/* Right Column: Story + 2 Bento Sub-Cards */}
          <motion.div
            initial={{ y: 24 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="lg:col-span-7 min-w-0 flex flex-col justify-between gap-6"
          >
            {/* Editorial Lead Narrative Paragraph */}
            <div className="space-y-5 sm:space-y-6">
              <p className="text-[15px] sm:text-[19px] font-medium leading-[1.5] text-white sm:indent-14">
                {data.leadParagraph}
              </p>

              {/* Secondary Row: Left muted copy + Right avatar group & orange pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-4 sm:pt-5">
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#8C7A70] max-w-[360px]">
                  {data.secondaryCopy}
                </p>

                <div className="inline-flex items-center gap-2.5 shrink-0">
                  <AvatarCluster items={["UX", "WP", "SEO"]} />
                  <span className="rounded-full bg-[#C0390B] px-3 py-1 text-[11px] font-semibold text-white">
                    {data.partnerPillLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom 2-Column Sub-Card Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              {/* Sub-Card A: Cream Stack Card */}
              <div className="group rounded-[20px] bg-[#F9F6F2] text-[#18120F] p-5 sm:p-6 flex flex-col justify-between border border-white/50 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(249,246,242,0.16)]">
                <div>
                  <div className="heading-tight text-[28px] sm:text-[34px] font-bold leading-none text-[#18120F]">
                    {data.stackCard.metric}
                  </div>
                  <div className="mt-1.5 text-xs font-bold text-[#18120F]/85">
                    {data.stackCard.subtitle}
                  </div>
                  <p className="mt-1 text-[11px] text-[#6B574C]">
                    {data.stackCard.description}
                  </p>

                  {/* 2x3 Skill Cloud Badge Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {data.stackCard.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-[#18120F]/10 bg-white px-2 py-2 text-[11px] leading-tight font-semibold text-[#18120F] text-center flex items-center justify-center"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <ActionPillButton
                    href={data.stackCard.ctaHref}
                    label={data.stackCard.ctaLabel}
                    variant="orange-solid"
                    arrowVariant="white-on-orange"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Sub-Card B: Warm Orange Duotone Visual Card */}
              <div className="group relative rounded-[20px] overflow-hidden min-h-[210px] sm:min-h-[260px] bg-gradient-to-br from-[#C0390B] via-[#A82F08] to-[#2A1107] border border-orange-500/20 p-5 sm:p-6 flex flex-col justify-end text-white transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-orange-400/50 hover:shadow-[0_22px_50px_rgba(238,77,24,0.28)]">
                {/* Duotone background portrait silhouette */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 mix-blend-luminosity"
                  aria-hidden="true"
                >
                  <PortraitImage
                    src={data.retainerCard.visualUrl}
                    alt=""
                    loading="lazy"
                    className="w-full h-full"
                    imgClassName="object-cover object-center scale-125 transition-transform duration-500 ease-out group-hover:scale-[1.32]"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0503]/90 via-[#B83209]/45 to-[#EE4D18]/40"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="heading-tight text-[28px] sm:text-[36px] font-bold leading-none">
                    {data.retainerCard.metric}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm font-semibold text-white">
                    {data.retainerCard.title}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-white">
                    {data.retainerCard.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
