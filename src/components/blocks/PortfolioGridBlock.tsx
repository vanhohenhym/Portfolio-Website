"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { CaseStudyItem, PortfolioGridBlockData } from "@/types/cms";
import { ArrowBadge, SectionPill } from "@/components/ui/Primitives";

function CaseCardWrapper({
  item,
  className,
  children,
}: {
  item: CaseStudyItem;
  className: string;
  children: React.ReactNode;
}) {
  if (item.external || item.href.startsWith("http")) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  );
}

export function PortfolioGridBlock({
  data,
  isPrimaryHeading = false,
}: {
  data: PortfolioGridBlockData;
  isPrimaryHeading?: boolean;
}) {
  const HeadingTag = isPrimaryHeading ? "h1" : "h2";
  const ItemHeading = isPrimaryHeading ? "h2" : "h3";

  return (
    <section
      id={data.id}
      data-elementor-type="container"
      data-block-type="PortfolioGridBlock"
      className="relative z-10 bg-transparent scroll-mt-20 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
        <div>
          <SectionPill label={data.badgeLabel} />
          <motion.div
            initial={{ y: 22 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-5 sm:mt-6"
          >
            <HeadingTag className="heading-tight text-[31px] sm:text-[46px] lg:text-[54px] font-semibold leading-[1.03]">
              <span className="text-white block">{data.headlinePrimary}</span>
              <span className="text-[#8C7A70] block">{data.headlineMuted}</span>
            </HeadingTag>
          </motion.div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-[#8C7A70] max-w-[380px]">
          {data.subtext}
        </p>
      </div>

      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((item, idx) => {
          const isCream = item.variant === "cream";
          const isOrange = item.variant === "orange";

          const cardClass = isCream
            ? "bg-[#F9F6F2] text-[#18120F] border border-white/60 hover:shadow-[0_22px_50px_rgba(249,246,242,0.16)]"
            : isOrange
            ? "bg-[#C0390B] text-white border border-orange-400/30 hover:border-orange-300/60 hover:shadow-[0_22px_50px_rgba(238,77,24,0.34)]"
            : "glass-surface text-white hover:border-[#EE4D18]/45 hover:shadow-[0_22px_50px_rgba(238,77,24,0.18)]";

          return (
            <motion.div
              key={item.id}
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.48,
                delay: idx * 0.08,
                ease: "easeOut",
              }}
              className={`min-w-0 ${
                idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <CaseCardWrapper
                item={item}
                className={`group h-full rounded-[20px] p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 ${cardClass}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${
                        isCream ? "text-[#6B574C]" : "text-white"
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowBadge
                      variant={
                        isCream
                          ? "dark-on-cream"
                          : isOrange
                          ? "white-on-orange"
                          : "white-on-dark"
                      }
                    />
                  </div>

                  {/* Website Screenshot Preview */}
                  {item.imageUrl && (
                    <div
                      className={`mt-3.5 sm:mt-4 relative aspect-[16/10] w-full rounded-xl overflow-hidden border ${
                        isCream
                          ? "border-[#18120F]/10 bg-[#18120F]/5"
                          : "border-white/20 bg-black/25"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={`${item.title} (${item.category}) live website screenshot`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div
                    className={`mt-3.5 sm:mt-4 inline-flex items-center gap-1.5 text-xs font-semibold max-w-full ${
                      isCream ? "text-[#B83209]" : "text-white"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.metric}</span>
                  </div>

                  <ItemHeading className="mt-1.5 heading-tight text-lg sm:text-xl font-bold tracking-tight">
                    {item.title}
                  </ItemHeading>
                  <p
                    className={`mt-2 sm:mt-2.5 text-xs leading-relaxed ${
                      isCream ? "text-[#18120F]/75" : "text-white"
                    }`}
                  >
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        isCream
                          ? "bg-[#18120F]/[0.07] text-[#18120F]"
                          : "bg-[#120906]/25 text-white"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CaseCardWrapper>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
