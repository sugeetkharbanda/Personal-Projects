"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  submitEnquiry,
  validateEnquiry,
  type EnquiryFieldErrors,
  type EnquiryPayload,
} from "@/lib/enquiry";
import { site } from "@/lib/site";

const initial: EnquiryPayload = {
  fullName: "",
  mobile: "",
  email: "",
  preferredBrand: "",
  modelVariant: "",
  city: "",
  serviceRequired: "",
  additionalRequirements: "",
};

export function ContactForm() {
  const [values, setValues] = useState<EnquiryPayload>(initial);
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  function update<K extends keyof EnquiryPayload>(key: K, value: EnquiryPayload[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerMessage("");
    const fieldErrors = validateEnquiry(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const result = await submitEnquiry(values);
    if (!result.ok) {
      setStatus("error");
      setServerMessage(result.message);
      return;
    }

    setStatus("success");
    setValues(initial);
    setErrors({});
  }

  const fieldClass =
    "mt-1.5 w-full rounded-sm border border-chrome/40 bg-white/90 px-3.5 py-3 text-sm text-ink placeholder:text-muted/70 transition duration-300 focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/25";

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-surface py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Contact / Find Your Car"
              title="Tell us what you are looking for"
              description="Share your preferences. We will pursue matches through our nationwide sourcing network and follow up with clear next steps."
            />
            <ul className="mt-10 space-y-5">
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="group flex items-start gap-3 text-ink"
                >
                  <span className="mt-0.5 text-crimson">
                    <Phone size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      Phone
                    </span>
                    <span className="mt-1 block text-base group-hover:text-crimson">
                      {site.contact.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="group flex items-start gap-3 text-ink"
                >
                  <span className="mt-0.5 text-crimson">
                    <Mail size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      Email
                    </span>
                    <span className="mt-1 block text-base group-hover:text-crimson">
                      {site.contact.email}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.whatsappHref}
                  className="group flex items-start gap-3 text-ink"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="mt-0.5 text-crimson">
                    <MessageCircle size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      WhatsApp
                    </span>
                    <span className="mt-1 block text-base group-hover:text-crimson">
                      {site.contact.whatsapp}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
            <p className="mt-8 text-sm text-muted">
              {site.contact.address} · {site.contact.hours}
            </p>
            <p className="mt-3 text-xs text-muted/80">
              Contact details above are placeholders until official numbers and
              addresses are provided.
            </p>
          </Reveal>

          <Reveal delay={1}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="glass rounded-sm border-chrome/30 bg-white/80 p-6 sm:p-9"
              aria-describedby="form-status"
            >
              <h3 id="contact-heading" className="sr-only">
                Enquiry form
              </h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  id="fullName"
                  error={errors.fullName}
                  required
                >
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    className={fieldClass}
                    value={values.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                  />
                </Field>
                <Field
                  label="Mobile"
                  id="mobile"
                  error={errors.mobile}
                  required
                >
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass}
                    value={values.mobile}
                    onChange={(e) => update("mobile", e.target.value)}
                  />
                </Field>
                <Field
                  label="Email"
                  id="email"
                  error={errors.email}
                  required
                  className="sm:col-span-2"
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={fieldClass}
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </Field>
                <Field
                  label="Preferred Brand"
                  id="preferredBrand"
                  error={errors.preferredBrand}
                  required
                >
                  <input
                    id="preferredBrand"
                    name="preferredBrand"
                    className={fieldClass}
                    value={values.preferredBrand}
                    onChange={(e) => update("preferredBrand", e.target.value)}
                    placeholder="e.g. Toyota"
                  />
                </Field>
                <Field
                  label="Model / Variant"
                  id="modelVariant"
                  error={errors.modelVariant}
                  required
                >
                  <input
                    id="modelVariant"
                    name="modelVariant"
                    className={fieldClass}
                    value={values.modelVariant}
                    onChange={(e) => update("modelVariant", e.target.value)}
                    placeholder="e.g. Innova Hycross VX"
                  />
                </Field>
                <Field label="City" id="city" error={errors.city} required>
                  <input
                    id="city"
                    name="city"
                    className={fieldClass}
                    value={values.city}
                    onChange={(e) => update("city", e.target.value)}
                  />
                </Field>
                <Field
                  label="Service Required"
                  id="serviceRequired"
                  error={errors.serviceRequired}
                  required
                >
                  <select
                    id="serviceRequired"
                    name="serviceRequired"
                    className={fieldClass}
                    value={values.serviceRequired}
                    onChange={(e) =>
                      update(
                        "serviceRequired",
                        e.target.value as EnquiryPayload["serviceRequired"],
                      )
                    }
                  >
                    <option value="">Select a service</option>
                    {site.serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Additional Requirements"
                  id="additionalRequirements"
                  className="sm:col-span-2"
                >
                  <textarea
                    id="additionalRequirements"
                    name="additionalRequirements"
                    rows={4}
                    className={fieldClass}
                    value={values.additionalRequirements}
                    onChange={(e) =>
                      update("additionalRequirements", e.target.value)
                    }
                    placeholder="Colour, transmission, timeline preferences, or anything else we should know"
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Submit enquiry"}
                </Button>
                <p className="text-xs text-muted">
                  We never invent availability, prices, or delivery dates.
                </p>
              </div>

              <div
                id="form-status"
                className="mt-4 min-h-[1.5rem] text-sm"
                role="status"
                aria-live="polite"
              >
                {status === "success" ? (
                  <p className="text-success">
                    Enquiry sent. We will review your brief and respond shortly.
                  </p>
                ) : null}
                {status === "error" && serverMessage ? (
                  <p className="text-danger">{serverMessage}</p>
                ) : null}
                {status === "error" &&
                !serverMessage &&
                Object.keys(errors).length > 0 ? (
                  <p className="text-danger">
                    Please correct the highlighted fields and try again.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  id,
  error,
  required,
  className = "",
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="text-crimson" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
