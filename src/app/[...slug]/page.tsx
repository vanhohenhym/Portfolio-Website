import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllLocalSlugs, getPageBySlug } from "@/lib/wordpress";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { GlobalNavbar } from "@/components/layout/GlobalNavbar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/data/siteConfig";

interface DynamicPageProps {
  params: Promise<{ slug: string[] }>;
}

const SLUG_LABELS: Record<string, string> = {
  about: "About",
  services: "Services",
  work: "Recent Work",
  contact: "Contact",
};

export async function generateStaticParams() {
  return getAllLocalSlugs().map((slug) => ({
    slug: slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const joinedSlug = slug.join("/");
  const page = await getPageBySlug(joinedSlug);

  if (!page) {
    return { title: "Page Not Found" };
  }

  const canonicalPath = `/${joinedSlug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${siteConfig.siteUrl}${canonicalPath}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.siteUrl}${canonicalPath}`,
      images: [`${siteConfig.siteUrl}/opengraph-image.png`],
    },
  };
}

export default async function DynamicCmsPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const joinedSlug = slug.join("/");
  const page = await getPageBySlug(joinedSlug);

  if (!page) {
    notFound();
  }

  const hasHeroBlock = page.blocks.some(
    (block) => block.type === "HeroBentoBlock"
  );

  const label =
    SLUG_LABELS[joinedSlug] ||
    joinedSlug.charAt(0).toUpperCase() + joinedSlug.slice(1);

  return (
    <div className="min-h-screen bg-transparent text-white">
      {!hasHeroBlock && (
        <>
          <GlobalNavbar />
          <Breadcrumbs items={[{ label, href: `/${joinedSlug}` }]} />
        </>
      )}
      <BlockRenderer blocks={page.blocks} />
    </div>
  );
}
