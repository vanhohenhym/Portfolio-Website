import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: `${siteConfig.siteUrl}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 pt-5"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#8C7A70]">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#8C7A70]/70" />
              )}
              {isLast ? (
                <span className="text-white/90 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#EE4D18] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

