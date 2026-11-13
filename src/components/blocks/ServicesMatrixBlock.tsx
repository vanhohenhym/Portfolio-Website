"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceItem, ServicesMatrixBlockData } from "@/types/cms";
import {
  ActionPillButton,
  ArrowBadge,
  SectionPill,
} from "@/components/ui/Primitives";

function ServiceBentoCard({
  item,
  headingLevel,
  delay = 0,
  className = "",
}: {
  item: ServiceItem;
  headingLevel: "h2" | "h3";
  delay?: number;
  className?: string;
}) {
  const isCream = item.variant === "cream";
  const CardHeading = headingLevel;

  return (
    <motion.div
      initial={{ y: 22 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={className}
    >
      <Link
        href={item.href}
        className={`group h-full rounded-[20px] p-5 sm:p-6 min-h-[180px] sm:min-h-[210px] lg:min-h-[250px] flex flex-col justify-between border transition-all duration-300 ease-out hover:-translate-y-1.5 ${
          isCream
            ? "bg-[#F9F6F2] text-[#18120F] border-white/60 hover:shadow-[0_22px_50px_rgba(249,246,242,0.16)]"
            : "bg-[#C0390B] text-white border-orange-400/30 hover:border-orange-300/60 hover:shadow-[0_22px_50px_rgba(238,77,24,0.34)]"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span
              className={`inline-block text-[10px] font-semibold uppercase tracking-wider mb-1.5 sm:mb-2 ${
                isCream ? "text-[#6B574C]" : "text-white"
              }`}
            >
              {item.tag}
            </span>
            <CardHeading className="heading-tight text-[19px] sm:text-[22px] font-semibold leading-[1.12]">
              {item.title}
            </CardHeading>
          </div>
          <ArrowBadge
            variant={isCream ? "dark-on-cream" : "white-on-orange"}
          />
        </div>

        <p
          className={`mt-5 sm:mt-8 text-xs leading-relaxed ${
            isCream ? "text-[#18120F]/75" : "text-white"
          }`}
        >
          {item.description}
        </p>
      </Link>
    </motion.div>
  );
}

export function ServicesMatrixBlock({
  data,
  isPrimaryHeading = false,
}: {
  data: ServicesMatrixBlockData;
  isPrimaryHeading?: boolean;
}) {
  const [service1, service2, service3, service4, service5] = data.services;
  const HeadingTag = isPrimaryHeading ? "h1" : "h2";
  const cardHeading = isPrimaryHeading ? "h2" : "h3";

  return (
    <section
      id={data.id}
      data-elementor-type="container"
      data-block-type="ServicesMatrixBlock"
      className="relative z-10 bg-transparent scroll-mt-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20"
    >
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
        <div>
          <SectionPill label={data.badgeLabel} />
        </div>

        <motion.div
          initial={{ y: 22 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <HeadingTag className="heading-tight text-[31px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.03] md:text-right max-w-[680px]">
            <span className="text-[#8C7A70]">{data.headlineMuted} </span>
            <span className="text-white">{data.headlinePrimary}</span>
          </HeadingTag>
        </motion.div>
      </div>

      {/* Exact 4-Column, 2-Row Staggered Bento Geometry on Desktop; balanced 2-col on Tablet; clean flow on Mobile */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* ROW 1 - Col 1 (Cream) */}
        <ServiceBentoCard
          item={service1}
          headingLevel={cardHeading}
          delay={0}
        />

        {/* ROW 1 - Col 2 (Orange) */}
        <ServiceBentoCard
          item={service2}
          headingLevel={cardHeading}
          delay={0.06}
        />

        {/* ROW 1 - Col 3 (Open Dark Cell with Centered Micro-Quote) */}
        <div className="md:col-span-2 lg:col-span-1 py-4 lg:py-6 lg:min-h-[250px] rounded-[20px] flex items-center justify-center px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-[#8C7A70] max-w-[260px] lg:max-w-[200px]">
            {data.microQuote}
          </p>
        </div>

        {/* ROW 1 - Col 4 (Cream) */}
        <ServiceBentoCard
          item={service3}
          headingLevel={cardHeading}
          delay={0.12}
        />

        {/* ROW 2 - Cols 1 & 2 (Open Dark Cell: Bottom-Left Summary & CTA; moves to bottom on mobile & tablet) */}
        <div className="order-last lg:order-none md:col-span-2 flex flex-col justify-end pt-3 pb-1 sm:p-4 lg:pr-10 lg:min-h-[250px]">
          <p className="text-xs sm:text-[13px] leading-relaxed text-white/75 max-w-[380px]">
            {data.bottomSummary}
          </p>
          <div className="mt-4 sm:mt-5">
            <ActionPillButton
              href={data.bottomCtaHref}
              label={data.bottomCtaLabel}
              variant="dark-outline"
              arrowVariant="white-on-dark"
              className="min-w-[165px]"
            />
          </div>
        </div>

        {/* ROW 2 - Col 3 (Cream) */}
        <ServiceBentoCard
          item={service4}
          headingLevel={cardHeading}
          delay={0.16}
        />

        {/* ROW 2 - Col 4 (Orange) */}
        <ServiceBentoCard
          item={service5}
          headingLevel={cardHeading}
          delay={0.22}
          className="md:col-span-2 lg:col-span-1"
        />
      </div>
    </section>
  );
}
