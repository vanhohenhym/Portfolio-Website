import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";
import { AmbientVideoBackground } from "@/components/ui/AmbientVideoBackground";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteOrigin),
  title: `${siteConfig.brand.fullName} — Web Architect & Digital Growth Partner`,
  description:
    "Portfolio & digital agency of Md. Shahriar Rahman Nadim. High-converting Figma UI/UX, WordPress & Elementor Pro builds, Next.js apps, SEO, and client retainers.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.brand.fullName,
    title: `${siteConfig.brand.fullName} — Web Architect & Digital Growth Partner`,
    description:
      "High-converting Figma UI/UX, WordPress & Elementor Pro builds, Next.js apps, Technical SEO, and monthly client retainers.",
    images: [
      {
        url: `${siteConfig.siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand.fullName} — ${siteConfig.brand.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand.fullName} — Web Architect & Digital Growth Partner`,
    description:
      "High-converting Figma UI/UX, WordPress & Elementor Pro builds, Next.js apps, Technical SEO, and monthly client retainers.",
    images: [`${siteConfig.siteUrl}/opengraph-image.png`],
  },
  verification: googleVerification ? { google: googleVerification } : undefined,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.brand.fullName,
  alternateName: siteConfig.brand.displayName,
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/icon.svg`,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phoneInternational,
  founder: {
    "@type": "Person",
    name: siteConfig.brand.fullName,
    jobTitle: siteConfig.brand.role,
  },
  sameAs: [siteConfig.contact.facebookHref],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={plusJakarta.variable}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="font-sans bg-transparent text-white antialiased selection:bg-[#EE4D18] selection:text-white relative"
      >
        <AmbientVideoBackground />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
        )}

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
