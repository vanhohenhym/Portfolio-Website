import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";

interface ContactPayload {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_SERVICE = 120;
const MAX_MESSAGE = 5000;
const MAX_BODY_BYTES = 20_000;

const FALLBACK_HINT = `Please email ${siteConfig.contact.email} or message me on WhatsApp instead.`;

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "That message is too large. Please email me directly." },
      { status: 413 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Please try again." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request body. Please try again." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service =
    (typeof body.service === "string" && body.service.trim()) || "General Inquiry";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > MAX_NAME) {
    return NextResponse.json(
      { error: "Please enter your name (2–120 characters)." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email) || email.length > MAX_EMAIL) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (message.length < 10 || message.length > MAX_MESSAGE) {
    return NextResponse.json(
      {
        error:
          "Please share a short project brief (10–5000 characters).",
      },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  // Without a delivery target the request cannot succeed. Returning ok:true
  // here would silently drop a real client lead.
  if (!webhookUrl) {
    console.warn(
      "[contact] CONTACT_WEBHOOK_URL is not configured; submission was not delivered."
    );
    return NextResponse.json(
      {
        error: `The contact form is not connected to a delivery service yet — your message was not sent. ${FALLBACK_HINT}`,
      },
      { status: 503 }
    );
  }

  const submission = {
    id: `inq_${Date.now()}`,
    name,
    email,
    service: service.slice(0, MAX_SERVICE),
    message,
    receivedAt: new Date().toISOString(),
  };

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Ask JSON-aware endpoints (e.g. Formspree) for a real status code
        // instead of an HTML redirect page.
        Accept: "application/json",
      },
      body: JSON.stringify(submission),
    });

    if (!webhookResponse.ok) {
      console.error(
        `[contact] webhook responded with ${webhookResponse.status}`
      );
      return NextResponse.json(
        { error: `Your message could not be delivered right now. ${FALLBACK_HINT}` },
        { status: 502 }
      );
    }
  } catch {
    console.error("[contact] webhook request failed");
    return NextResponse.json(
      { error: `Your message could not be delivered right now. ${FALLBACK_HINT}` },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    id: submission.id,
    message: "Inquiry received! I will reply within 24 hours.",
  });
}
