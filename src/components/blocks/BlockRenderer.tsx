import React from "react";
import { PageBlock } from "@/types/cms";
import { HeroBentoBlock } from "./HeroBentoBlock";
import { AboutSplitBlock } from "./AboutSplitBlock";
import { ServicesMatrixBlock } from "./ServicesMatrixBlock";
import { PortfolioGridBlock } from "./PortfolioGridBlock";
import { ContactFooterBlock } from "./ContactFooterBlock";

export function BlockRenderer({ blocks }: { blocks: PageBlock[] }) {
  const hasHeroBlock = blocks.some((b) => b.type === "HeroBentoBlock");

  return (
    <main className="relative z-10 min-h-screen bg-transparent text-white">
      {blocks.map((block, index) => {
        const isPrimaryHeading = !hasHeroBlock && index === 0;
        const hasHeroAbove =
          index > 0 && blocks[index - 1]?.type === "HeroBentoBlock";

        switch (block.type) {
          case "HeroBentoBlock":
            return <HeroBentoBlock key={block.id} data={block} />;
          case "AboutSplitBlock":
            return (
              <AboutSplitBlock
                key={block.id}
                data={block}
                isPrimaryHeading={isPrimaryHeading}
                overlapHero={hasHeroAbove}
              />
            );
          case "ServicesMatrixBlock":
            return (
              <ServicesMatrixBlock
                key={block.id}
                data={block}
                isPrimaryHeading={isPrimaryHeading}
              />
            );
          case "PortfolioGridBlock":
            return (
              <PortfolioGridBlock
                key={block.id}
                data={block}
                isPrimaryHeading={isPrimaryHeading}
              />
            );
          case "ContactFooterBlock":
            return (
              <ContactFooterBlock
                key={block.id}
                data={block}
                isPrimaryHeading={isPrimaryHeading}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}
