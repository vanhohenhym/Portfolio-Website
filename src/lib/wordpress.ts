import { pagesData } from "@/data/pagesData";
import { PageBlock, PageDefinition } from "@/types/cms";

const WP_REST_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const WP_GRAPHQL_ENDPOINT = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

interface WPRestPage {
  slug: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  acf?: {
    page_blocks?: PageBlock[];
  };
}

interface WPGraphQLResponse {
  data?: {
    page?: {
      slug?: string;
      title?: string;
      portfolioBlocks?: {
        blocks?: PageBlock[];
      };
    };
  };
}

/**
 * Fetches a page from Headless WordPress (WPGraphQL first, then WP REST API)
 * and falls back seamlessly to local modular `pagesData.ts` definitions.
 */
export async function getPageBySlug(
  rawSlug: string
): Promise<PageDefinition | null> {
  const normalizedSlug = rawSlug.replace(/^\/+|\/+$/g, "") || "home";

  // 1. Try WPGraphQL if configured
  if (WP_GRAPHQL_ENDPOINT) {
    try {
      const response = await fetch(WP_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query GetPageByUri($uri: ID!) {
              page(id: $uri, idType: URI) {
                slug
                title
                portfolioBlocks {
                  blocks
                }
              }
            }
          `,
          variables: { uri: `/${normalizedSlug === "home" ? "" : normalizedSlug}` },
        }),
        next: { revalidate: 60 },
      });

      if (response.ok) {
        const json = (await response.json()) as WPGraphQLResponse;
        const wpPage = json.data?.page;
        if (wpPage?.portfolioBlocks?.blocks?.length) {
          return {
            slug: normalizedSlug,
            title: wpPage.title || pagesData[normalizedSlug]?.title || normalizedSlug,
            description: pagesData[normalizedSlug]?.description || "",
            blocks: wpPage.portfolioBlocks.blocks,
          };
        }
      }
    } catch {
      // Automatic fallback to local pagesData.ts
    }
  }

  // 2. Try WordPress REST API if configured
  if (WP_REST_BASE) {
    try {
      const restUrl = `${WP_REST_BASE.replace(/\/$/, "")}/wp-json/wp/v2/pages?slug=${encodeURIComponent(
        normalizedSlug
      )}&_fields=slug,title,excerpt,acf`;
      const response = await fetch(restUrl, {
        next: { revalidate: 60 },
      });

      if (response.ok) {
        const items = (await response.json()) as WPRestPage[];
        const wpPage = items?.[0];
        if (wpPage?.acf?.page_blocks?.length) {
          return {
            slug: wpPage.slug,
            title: wpPage.title?.rendered || normalizedSlug,
            description:
              wpPage.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "",
            blocks: wpPage.acf.page_blocks,
          };
        }
      }
    } catch {
      // Automatic fallback to local pagesData.ts
    }
  }

  // 3. Local JSON/TS modular page fallback
  return pagesData[normalizedSlug] ?? null;
}

export function getAllLocalSlugs(): string[] {
  return Object.keys(pagesData).filter((slug) => slug !== "home");
}

