"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { ContactFooterBlockData } from "@/types/cms";
import {
  ActionPillButton,
  ArrowBadge,
  BrandMark,
  SectionPill,
} from "@/components/ui/Primitives";
import { siteConfig } from "@/data/siteConfig";

export function ContactFooterBlock({
  data,
  isPrimaryHeading = false,
}: {
  data: ContactFooterBlockData;
  isPrimaryHeading?: boolean;
}) {
  const HeadingTag = isPrimaryHeading ? "h1" : "h2";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Figma UI/UX & Web Design");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(siteConfig.contact.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          email,
          service,
          message,
          _replyto: email,
          _subject: `New project inquiry — ${service}`,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Array<{ message?: string }>;
      };

      if (!response.ok || result.ok === false) {
        setStatus("error");
        setFeedback(
          result.errors?.[0]?.message ||
            "Your message could not be delivered. Please email or message me on WhatsApp directly."
        );
        return;
      }

      setStatus("success");
      setFeedback("Inquiry received! I will reply within 24 hours.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      const timedOut =
        error instanceof DOMException && error.name === "AbortError";
      setStatus("error");
      setFeedback(
        timedOut
          ? "The request timed out. Please email or message via WhatsApp directly."
          : "Network error. Please email or message via WhatsApp directly."
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return (
    <footer
      id={data.id}
      data-elementor-type="container"
      data-block-type="ContactFooterBlock"
      className="relative z-10 bg-transparent scroll-mt-20 max-w-[1320px] mx-auto px-3 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-10 sm:pb-16"
    >
      <div className="mb-5 sm:mb-6 px-1 sm:px-0">
        <SectionPill label={data.badgeLabel} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Big CTA + Working Contact Form Card (Orange Gradient) */}
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.48, ease: "easeOut" }}
          className="lg:col-span-6 min-w-0 rounded-[24px] sm:rounded-[28px] hero-gradient-surface border border-white/15 p-5 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 ease-out hover:border-white/30"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-white mb-4">
              <BrandMark monogram={siteConfig.brand.monogram} size="sm" />
              <span>{siteConfig.brand.displayName}</span>
            </div>

            <HeadingTag className="heading-tight text-[28px] sm:text-[38px] lg:text-[42px] font-semibold leading-[1.03] text-white max-w-[460px]">
              {data.headline}
            </HeadingTag>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white max-w-[440px]">
              {data.subtext}
            </p>
          </div>

          {/* Working Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full rounded-xl bg-[#120906]/65 border border-white/20 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/55 focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-white/70"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full rounded-xl bg-[#120906]/65 border border-white/20 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/55 focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-white/70"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-service" className="sr-only">
                Service Needed
              </label>
              <select
                id="contact-service"
                aria-label="Select Service Needed"
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{ colorScheme: "dark" }}
                className="w-full rounded-xl bg-[#120906]/80 border border-white/20 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <option className="bg-[#120906] text-white" value="Figma UI/UX & Web Design">
                  Figma UI/UX & Web Design
                </option>
                <option className="bg-[#120906] text-white" value="WordPress, Elementor & Next.js">
                  WordPress, Elementor & Next.js
                </option>
                <option className="bg-[#120906] text-white" value="SEO & Search Visibility">
                  SEO & Search Visibility
                </option>
                <option className="bg-[#120906] text-white" value="Social Media Management">
                  Social Media Management
                </option>
                <option className="bg-[#120906] text-white" value="Client Retainers & Care">
                  Client Retainers & Care
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">
                Project Brief
              </label>
              <textarea
                id="contact-message"
                rows={3}
                required
                minLength={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, timeline, or retainer goals..."
                className="w-full rounded-xl bg-[#120906]/65 border border-white/20 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/55 focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-white/70 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-[#F9F6F2] text-[#18120F] hover:bg-white p-1.5 pl-4 text-xs sm:text-sm font-semibold transition-all duration-300 ease-out disabled:opacity-60"
              >
                <span>
                  {status === "submitting" ? "Sending..." : "Send Project Brief"}
                </span>
                <ArrowBadge variant="dark-on-cream" />
              </button>

              <ActionPillButton
                href={`mailto:${data.primaryEmail}`}
                label={data.primaryEmail}
                variant="hero-outline"
                arrowVariant="white-on-dark"
                external
                className="w-full sm:w-auto max-w-full"
              />
            </div>

            {feedback && (
              <div
                role="status"
                className={`rounded-xl px-3.5 py-2.5 text-xs font-medium flex items-center gap-2 ${
                  status === "success"
                    ? "bg-emerald-950/70 border border-emerald-400/30 text-emerald-200"
                    : "bg-red-950/70 border border-red-400/30 text-red-200"
                }`}
              >
                {status === "success" && (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                )}
                <span>{feedback}</span>
              </div>
            )}
          </form>
        </motion.div>

        {/* Right Contact Bento Grid (Cream & Glass Cards) */}
        <div className="lg:col-span-6 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Card 1: Direct Phone Call (Cream) */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, delay: 0.04, ease: "easeOut" }}
          >
            <a
              href={data.phoneHref}
              className="group h-full rounded-[20px] bg-[#F9F6F2] text-[#18120F] p-5 sm:p-6 flex flex-col justify-between min-h-[136px] sm:min-h-[160px] border border-white/60 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(249,246,242,0.16)]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#6B574C]">
                  <Phone className="w-3.5 h-3.5 text-[#B83209]" />
                  Direct Call
                </span>
                <ArrowBadge variant="dark-on-cream" />
              </div>

              <div className="mt-4 sm:mt-6">
                <div className="heading-tight text-2xl sm:text-[26px] font-bold">
                  {data.phoneDisplay}
                </div>
                <p className="mt-1 text-[11px] text-[#18120F]/70">
                  Tap to call directly for urgent builds or consultations.
                </p>
              </div>
            </a>
          </motion.div>

          {/* Card 2: WhatsApp & Telegram (Glass) */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="group rounded-[20px] glass-surface text-white p-5 sm:p-6 flex flex-col justify-between min-h-[136px] sm:min-h-[160px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#EE4D18]/45 hover:shadow-[0_22px_50px_rgba(238,77,24,0.18)]"
          >
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A99A90]">
                Instant Messaging
              </span>
              <div className="mt-1.5 sm:mt-2 heading-tight text-lg sm:text-xl font-bold">
                WhatsApp &amp; Telegram
              </div>
            </div>

            <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2">
              <a
                href={data.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#C0390B] hover:bg-[#A82F08] px-3 py-2 text-xs font-semibold text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href={data.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-[#18120F] hover:bg-[#F9F6F2]/90 px-3 py-2 text-xs font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Telegram
              </a>
            </div>
          </motion.div>

          {/* Card 3: Facebook (Glass) */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
          >
            <a
              href={data.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group h-full rounded-[20px] glass-surface text-white p-5 sm:p-6 flex flex-col justify-between min-h-[130px] sm:min-h-[145px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#EE4D18]/45 hover:shadow-[0_22px_50px_rgba(238,77,24,0.18)]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A99A90]">
                  Facebook
                </span>
                <ArrowBadge variant="white-on-dark" />
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-white break-words [overflow-wrap:anywhere]">
                  {data.facebookLabel}
                </div>
                <p className="mt-1 text-[11px] text-white/65">
                  Connect for social campaigns & direct updates.
                </p>
              </div>
            </a>
          </motion.div>

          {/* Card 4: Direct Email Quick Link (Cream) */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
          >
            <a
              href={`mailto:${data.primaryEmail}`}
              className="group h-full rounded-[20px] bg-[#F9F6F2] text-[#18120F] p-5 sm:p-6 flex flex-col justify-between min-h-[130px] sm:min-h-[145px] border border-white/60 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(249,246,242,0.16)]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#6B574C]">
                  <Mail className="w-3.5 h-3.5 text-[#B83209]" />
                  Email Brief
                </span>
                <ArrowBadge variant="dark-on-cream" />
              </div>

              <div className="mt-4">
                <div className="text-sm font-bold text-[#18120F] break-words [overflow-wrap:anywhere]">
                  {data.primaryEmail}
                </div>
                <p className="mt-1 text-[11px] text-[#18120F]/70">
                  Retainer inquiries & Figma/WordPress/Next.js scopes.
                </p>
              </div>
            </a>
          </motion.div>

          {/* Credentials & Internal Links Bar */}
          <div className="sm:col-span-2 rounded-[20px] border border-white/10 bg-[#120906]/85 px-4 sm:px-5 py-4 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-start sm:items-center gap-2.5 text-[11px] sm:text-xs text-white/85 leading-relaxed">
                <GraduationCap className="w-4 h-4 text-[#EE4D18] shrink-0 mt-0.5 sm:mt-0" />
                <span>{data.credentialsLine}</span>
              </div>
              <span className="text-[11px] text-[#8C7A70] shrink-0">
                © {siteConfig.brand.copyrightYear} {siteConfig.brand.displayName}
              </span>
            </div>

            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/10 pt-2.5 text-[11px] font-medium text-[#8C7A70]"
            >
              {siteConfig.footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-[#EE4D18] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
