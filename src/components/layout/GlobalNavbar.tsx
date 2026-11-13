"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { BrandMark } from "@/components/ui/Primitives";

const SECTION_TO_HREF: Record<string, string> = {
  hero: "/",
  about: "/about",
  services: "/services",
  work: "/work",
  contact: "/contact",
};

const HREF_TO_SECTION: Record<string, string> = {
  "/": "hero",
  "/about": "about",
  "/services": "services",
  "/work": "work",
  "/contact": "contact",
};

function SocialCircleIcon({
  id,
}: {
  id: "whatsapp" | "telegram" | "facebook";
}) {
  if (id === "whatsapp") {
    return <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />;
  }
  if (id === "telegram") {
    return (
      <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2] -translate-x-0.5" />
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.8h2.6l.4-3h-3V8.3c0-.9.3-1.5 1.5-1.5h1.6V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.1H7.6v3h2.6V21h3.3z" />
    </svg>
  );
}

function MobileMenuDrawer({
  id,
  isOpen,
  isActiveRoute,
  onNavClick,
}: {
  id: string;
  isOpen: boolean;
  isActiveRoute: (href: string) => boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      id={id}
      className="md:hidden mt-2.5 rounded-2xl bg-[#120906]/95 border border-white/10 p-3 backdrop-blur-xl shadow-2xl"
    >
      <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
        {siteConfig.navigation.map((item) => {
          const active = isActiveRoute(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                active
                  ? "bg-white text-[#18120F]"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function DesktopNavLinks({
  isActiveRoute,
  onNavClick,
  compact = false,
}: {
  isActiveRoute: (href: string) => boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  compact?: boolean;
}) {
  return (
    <nav
      aria-label="Primary Navigation"
      className={
        compact
          ? "hidden md:flex items-center gap-1"
          : "hidden md:flex items-center gap-1 bg-[#120906]/85 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-xl"
      }
    >
      {siteConfig.navigation.map((item) => {
        const active = isActiveRoute(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(e) => onNavClick(e, item.href)}
            className={`${
              compact ? "px-3.5 py-1" : "px-4 py-1.5"
            } rounded-full text-xs font-semibold transition-all duration-200 ${
              active
                ? "bg-white text-[#18120F] shadow-sm"
                : "text-white/85 hover:text-white hover:bg-white/10"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function GlobalNavbar({
  embeddedInHero = false,
}: {
  embeddedInHero?: boolean;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stickyMenuOpen, setStickyMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("/");

  useEffect(() => {
    setMobileMenuOpen(false);
    setStickyMenuOpen(false);
    setActiveHref(pathname === "/" ? "/" : pathname);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      setStickyMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setStickyMenuOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-Spy IntersectionObserver on the landing page ("/")
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["hero", "about", "services", "work", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const mapped = SECTION_TO_HREF[visible[0].target.id];
          if (mapped) {
            setActiveHref(mapped);
          }
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileMenuOpen(false);
    setStickyMenuOpen(false);

    if (pathname === "/") {
      if (href === "/") {
        e.preventDefault();
        setActiveHref("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetId = HREF_TO_SECTION[href];
      const targetEl = targetId
        ? document.getElementById(targetId) ||
          (targetId === "hero" ? document.getElementById("home") : null)
        : null;

      if (targetEl) {
        e.preventDefault();
        setActiveHref(href);
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const isActiveRoute = (href: string) => {
    if (pathname === "/") {
      return activeHref === href;
    }
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`w-full transition-all duration-300 z-40 ${
          embeddedInHero
            ? "relative"
            : "sticky top-3 sm:top-4 max-w-[1320px] mx-auto px-3 sm:px-6 pt-3 sm:pt-4"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-2 sm:gap-3 transition-all duration-300 ${
            !embeddedInHero
              ? "rounded-full bg-[#120906]/85 backdrop-blur-xl border border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 shadow-2xl"
              : "px-0.5 sm:px-1 py-1"
          }`}
        >
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity min-w-0 shrink-0"
          >
            <BrandMark monogram={siteConfig.brand.monogram} size="sm" />
            <span className="text-[13px] sm:text-base font-semibold tracking-tight text-white whitespace-nowrap">
              {siteConfig.brand.displayName}
            </span>
          </Link>

          <DesktopNavLinks
            isActiveRoute={isActiveRoute}
            onNavClick={handleNavClick}
          />

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center gap-1 sm:gap-2">
              {siteConfig.socialActions.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#F9F6F2] text-[#18120F] flex items-center justify-center hover:bg-[#EE4D18] hover:text-white hover:scale-105 transition-all duration-200 shadow-sm"
                >
                  <SocialCircleIcon id={social.id} />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="md:hidden w-8 h-8 rounded-full bg-[#120906]/85 border border-white/15 text-white flex items-center justify-center shrink-0"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <MobileMenuDrawer
          id="mobile-nav-drawer"
          isOpen={mobileMenuOpen}
          isActiveRoute={isActiveRoute}
          onNavClick={handleNavClick}
        />
      </header>

      {embeddedInHero && isScrolled && (
        <div className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-4 pointer-events-none">
          <div className="max-w-[1260px] mx-auto pointer-events-auto">
            <div className="flex items-center justify-between gap-2 sm:gap-3 rounded-full bg-[#120906]/85 backdrop-blur-xl border border-white/10 px-3 sm:px-4 py-2 shadow-2xl">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
                className="flex items-center gap-2 text-white hover:opacity-90 shrink-0"
              >
                <BrandMark monogram={siteConfig.brand.monogram} size="sm" />
                <span className="text-[13px] sm:text-sm font-semibold tracking-tight whitespace-nowrap text-white">
                  {siteConfig.brand.displayName}
                </span>
              </Link>

              <DesktopNavLinks
                isActiveRoute={isActiveRoute}
                onNavClick={handleNavClick}
                compact
              />

              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {siteConfig.socialActions.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-7 h-7 rounded-full bg-[#F9F6F2] text-[#18120F] flex items-center justify-center hover:bg-[#EE4D18] hover:text-white hover:scale-105 transition-all"
                  >
                    <SocialCircleIcon id={social.id} />
                  </a>
                ))}

                <button
                  type="button"
                  onClick={() => setStickyMenuOpen((prev) => !prev)}
                  aria-label="Toggle Sticky Menu"
                  aria-expanded={stickyMenuOpen}
                  aria-controls="sticky-nav-drawer"
                  className="md:hidden w-7 h-7 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center ml-0.5"
                >
                  {stickyMenuOpen ? (
                    <X className="w-3.5 h-3.5" />
                  ) : (
                    <Menu className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <MobileMenuDrawer
              id="sticky-nav-drawer"
              isOpen={stickyMenuOpen}
              isActiveRoute={isActiveRoute}
              onNavClick={handleNavClick}
            />
          </div>
        </div>
      )}
    </>
  );
}
