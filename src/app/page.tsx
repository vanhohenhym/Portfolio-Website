import React from "react";
import { Metadata } from "next";
import { getPageBySlug } from "@/lib/wordpress";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { siteConfig } from "@/data/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home");
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: siteConfig.siteUrl,
      images: ["/opengraph-image"],
    },
  };
}

export default async function HomePage() {
  const page = await getPageBySlug("home");

  if (!page) {
    return null;
  }

  return <BlockRenderer blocks={page.blocks} />;
}
