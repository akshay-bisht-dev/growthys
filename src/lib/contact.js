// Shared by the contact form (client) and /api/contact (server) so both
// enforce identical rules. The server re-validates everything.
import services from "@/data/services";

export const SERVICE_OPTIONS = [...services.map((s) => s.title), "Not sure yet"];
export const BUDGET_OPTIONS = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-.\s\d]{6,30}$/;

export function validateContact(input) {
  const v = {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    company: String(input.company ?? "").trim(),
    service: String(input.service ?? "").trim(),
    budget: String(input.budget ?? "").trim(),
    message: String(input.message ?? "").trim(),
    consent: input.consent === true || input.consent === "true" || input.consent === "on",
  };
  const errors = {};
  if (v.name.length < 2 || v.name.length > 100) errors.name = "Please enter your full name.";
  if (!EMAIL.test(v.email) || v.email.length > 200) errors.email = "Please enter a valid email address.";
  if (v.phone && !PHONE.test(v.phone)) errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (v.company.length > 120) errors.company = "Company name is too long.";
  if (!SERVICE_OPTIONS.includes(v.service)) errors.service = "Please choose the service you need.";
  if (v.budget && !BUDGET_OPTIONS.includes(v.budget)) errors.budget = "Please choose a budget range.";
  if (v.message.length < 20) errors.message = "Please tell us a little more (at least 20 characters).";
  if (v.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";
  if (!v.consent) errors.consent = "Please confirm we may use these details to reply to you.";
  return { values: v, errors, valid: Object.keys(errors).length === 0 };
}
