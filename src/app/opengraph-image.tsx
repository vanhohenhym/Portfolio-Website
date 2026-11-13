import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/siteConfig";

export const alt = `${siteConfig.brand.fullName} — ${siteConfig.brand.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(135deg, #D1450F 0%, #A02C07 55%, #120905 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#F9F6F2",
              color: "#18120F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 800,
            }}
          >
            {siteConfig.brand.monogram}
          </div>
          <span style={{ fontSize: "24px", fontWeight: 700 }}>
            {siteConfig.brand.displayName}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: "960px",
            }}
          >
            Build brands that scale & convert
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.86)",
            }}
          >
            Figma UI/UX • WordPress & Elementor Pro • Next.js • Technical SEO
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.22)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#F9F6F2",
          }}
        >
          <span>{siteConfig.brand.fullName}</span>
          <span>{siteConfig.contact.email}</span>
        </div>
      </div>
    ),
    size
  );
}

