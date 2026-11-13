"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function BrandMark({
  monogram = "S",
  size = "md",
  inverted = false,
}: {
  monogram?: string;
  size?: "sm" | "md";
  inverted?: boolean;
}) {
  const dimensions = size === "sm" ? "w-6 h-6 text-[11px]" : "w-8 h-8 text-xs";
  const palette = inverted
    ? "bg-[#18120F] text-[#F9F6F2]"
    : "bg-white/15 border border-white/25 text-white";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg font-extrabold tracking-tight shrink-0 ${dimensions} ${palette}`}
      aria-hidden="true"
    >
      {monogram}
    </span>
  );
}

export function ArrowBadge({
  variant = "white-on-dark",
}: {
  variant?: "white-on-dark" | "dark-on-cream" | "white-on-orange";
}) {
  const styleMap = {
    "white-on-dark": "bg-white text-[#18120F]",
    "dark-on-cream": "bg-[#18120F] text-[#F9F6F2]",
    "white-on-orange": "bg-white text-[#EE4D18]",
  };

  return (
    <span
      className={`relative overflow-hidden w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-out group-hover:scale-110 ${styleMap[variant]}`}
    >
      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.25] transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" />
      <ArrowUpRight
        aria-hidden="true"
        className="w-3.5 h-3.5 stroke-[2.25] absolute -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </span>
  );
}

export function CountUpMetric({ value }: { value: string }) {
  const match = /^(\d+)(.*)$/.exec(value.trim());
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (target === null || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let rafId = 0;
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, suffix, value]);

  return <span>{display}</span>;
}

export function SectionPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#120906]/85 px-3.5 py-1.5 text-xs font-medium text-white/85">
      <ChevronDown className="w-3.5 h-3.5 text-[#EE4D18]" />
      <span>{label}</span>
    </div>
  );
}

export function ActionPillButton({
  href,
  label,
  variant = "hero-outline",
  arrowVariant = "white-on-dark",
  external = false,
  className = "",
}: {
  href: string;
  label: string;
  variant?: "hero-outline" | "orange-solid" | "dark-outline";
  arrowVariant?: "white-on-dark" | "dark-on-cream" | "white-on-orange";
  external?: boolean;
  className?: string;
}) {
  const variantClasses = {
    "hero-outline":
      "border border-white/25 bg-[#120906]/55 text-white hover:bg-[#120906]/80 hover:border-white/40",
    "orange-solid":
      "bg-[#C0390B] text-white hover:bg-[#A82F08] shadow-lg shadow-[#EE4D18]/25",
    "dark-outline":
      "border border-white/20 bg-[#120906]/85 text-white hover:border-[#EE4D18]/60",
  };

  const content = (
    <>
      <span className="pl-2 pr-1 text-xs sm:text-sm font-semibold tracking-tight min-w-0 truncate">
        {label}
      </span>
      <ArrowBadge variant={arrowVariant} />
    </>
  );

  const baseClasses = `group inline-flex items-center justify-between gap-3 rounded-full p-1.5 max-w-full min-w-0 transition-all duration-300 ease-out ${variantClasses[variant]} ${className}`;

  if (
    external ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  );
}

export function PortraitImage({
  src,
  alt,
  initials = "SN",
  className = "",
  imgClassName = "",
  loading = "eager",
}: {
  src: string;
  alt: string;
  initials?: string;
  className?: string;
  imgClassName?: string;
  loading?: "eager" | "lazy";
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-tr from-[#E8501B] to-[#1A0D07] text-white font-bold text-3xl tracking-tight ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover object-top portrait-studio-warm ${imgClassName}`}
      />
    </div>
  );
}

export function AvatarCluster({
  items = ["FN", "WP", "NX"],
}: {
  items?: string[];
}) {
  const bgPalette = [
    "bg-[#F9F6F2] text-[#18120F]",
    "bg-[#C0390B] text-white",
    "bg-[#2A1107] text-[#F9F6F2]",
  ];

  return (
    <div className="flex items-center -space-x-2 shrink-0">
      {items.map((label, idx) => (
        <span
          key={label}
          className={`w-8 h-8 rounded-full border-2 border-[#1A0D07] flex items-center justify-center text-[8.5px] font-bold tracking-tight ${
            bgPalette[idx % bgPalette.length]
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
