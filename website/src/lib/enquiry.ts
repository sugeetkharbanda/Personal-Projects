import { site, type ServiceOption } from "./site";

export type EnquiryPayload = {
  fullName: string;
  mobile: string;
  email: string;
  preferredBrand: string;
  modelVariant: string;
  city: string;
  serviceRequired: ServiceOption | "";
  additionalRequirements?: string;
};

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRe = /^[+]?[\d\s()-]{8,18}$/;

export function validateEnquiry(data: EnquiryPayload): EnquiryFieldErrors {
  const errors: EnquiryFieldErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!data.mobile.trim() || !mobileRe.test(data.mobile.trim())) {
    errors.mobile = "Please enter a valid mobile number.";
  }
  if (!data.email.trim() || !emailRe.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.preferredBrand.trim()) {
    errors.preferredBrand = "Preferred brand is required.";
  }
  if (!data.modelVariant.trim()) {
    errors.modelVariant = "Model or variant is required.";
  }
  if (!data.city.trim()) {
    errors.city = "City is required.";
  }
  if (
    !data.serviceRequired ||
    !site.serviceOptions.includes(data.serviceRequired as ServiceOption)
  ) {
    errors.serviceRequired = "Please select a service.";
  }

  return errors;
}

export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<{ ok: true } | { ok: false; message: string; status: number }> {
  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = (await res.json().catch(() => ({}))) as {
    error?: string;
    message?: string;
  };

  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      message:
        body.message ||
        body.error ||
        "Unable to send your enquiry right now. Please try again later.",
    };
  }

  return { ok: true };
}
