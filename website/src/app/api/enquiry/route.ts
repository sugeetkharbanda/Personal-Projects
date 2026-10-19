import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  validateEnquiry,
  type EnquiryPayload,
} from "@/lib/enquiry";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function isEnquiryPayload(body: unknown): body is EnquiryPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.fullName === "string" &&
    typeof b.mobile === "string" &&
    typeof b.email === "string" &&
    typeof b.preferredBrand === "string" &&
    typeof b.modelVariant === "string" &&
    typeof b.city === "string" &&
    typeof b.serviceRequired === "string" &&
    (b.additionalRequirements === undefined ||
      typeof b.additionalRequirements === "string")
  );
}

function buildEmailHtml(data: EnquiryPayload): string {
  const rows: Array<[string, string]> = [
    ["Full Name", data.fullName],
    ["Mobile", data.mobile],
    ["Email", data.email],
    ["Preferred Brand", data.preferredBrand],
    ["Model / Variant", data.modelVariant],
    ["City", data.city],
    ["Service Required", data.serviceRequired],
    [
      "Additional Requirements",
      data.additionalRequirements?.trim() || "—",
    ],
  ];

  return `
    <div style="font-family: Georgia, serif; color: #0B1426;">
      <h1 style="font-size: 20px;">New enquiry — ${site.name}</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #D5DAE3; font-weight: 600; width: 40%;">${label}</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #D5DAE3;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!isEnquiryPayload(json)) {
    return NextResponse.json(
      { error: "Invalid enquiry payload." },
      { status: 400 },
    );
  }

  const errors = validateEnquiry(json);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "Validation failed.", fields: errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL;
  const fromEmail =
    process.env.ENQUIRY_FROM_EMAIL || "Auto Traders <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      {
        error: "Enquiry delivery is not configured.",
        message:
          "Enquiry email is not configured yet. Please set RESEND_API_KEY and ENQUIRY_TO_EMAIL, or contact us by phone or WhatsApp.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: json.email,
      subject: `[ASI Enquiry] ${json.preferredBrand} ${json.modelVariant} — ${json.fullName}`,
      html: buildEmailHtml(json),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          error: "Failed to send enquiry.",
          message:
            "We could not deliver your enquiry email. Please try again later or reach us by phone.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enquiry send failed:", err);
    return NextResponse.json(
      {
        error: "Failed to send enquiry.",
        message:
          "We could not deliver your enquiry email. Please try again later or reach us by phone.",
      },
      { status: 502 },
    );
  }
}
