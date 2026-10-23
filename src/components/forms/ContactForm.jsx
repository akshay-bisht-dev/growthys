"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { BUDGET_OPTIONS, SERVICE_OPTIONS, validateContact } from "@/lib/contact";

const initial = { name: "", email: "", phone: "", company: "", service: "", budget: "", message: "", consent: false };

export default function ContactForm({ defaultService = "" }) {
  const [values, setValues] = useState({ ...initial, service: defaultService });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const startedAt = useRef(0);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const update = (e) => {
    const { name, type, checked, value } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };

  const focusFirstError = (errs) => {
    const first = Object.keys(errs)[0];
    formRef.current?.querySelector(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { errors: errs, valid } = validateContact(values);
    if (!valid) {
      setErrors(errs);
      focusFirstError(errs);
      return;
    }
    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: formRef.current.elements.website.value,
          startedAt: startedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({
          state: "success",
          message: "Thank you — your message has been sent. We'll reply to you by email soon.",
        });
        setValues({ ...initial });
        setErrors({});
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus({ state: "error", message: "Please check the highlighted fields." });
        focusFirstError(data.errors);
      } else {
        setStatus({ state: "error", message: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const field = (name) => ({
    id: `cf-${name}`,
    name,
    value: values[name],
    onChange: update,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `cf-${name}-error` : undefined,
    className: "field__control",
  });

  const errorFor = (name) =>
    errors[name] ? (
      <p id={`cf-${name}-error`} className="field__error">
        {errors[name]}
      </p>
    ) : null;

  const loading = status.state === "loading";

  return (
    <form
      ref={formRef}
      id="project-form"
      className="form"
      onSubmit={onSubmit}
      noValidate
      aria-describedby="cf-required-note"
    >
      <p id="cf-required-note" className="small muted">
        Fields marked optional can be left blank. Everything else is required.
      </p>

      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-name" className="field__label">
            Full name
          </label>
          <input {...field("name")} type="text" autoComplete="name" required />
          {errorFor("name")}
        </div>
        <div className="field">
          <label htmlFor="cf-email" className="field__label">
            Business email
          </label>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" required />
          {errorFor("email")}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-phone" className="field__label">
            Phone number <span className="field__optional">(optional)</span>
          </label>
          <input {...field("phone")} type="tel" autoComplete="tel" />
          {errorFor("phone")}
        </div>
        <div className="field">
          <label htmlFor="cf-company" className="field__label">
            Company name <span className="field__optional">(optional)</span>
          </label>
          <input {...field("company")} type="text" autoComplete="organization" />
          {errorFor("company")}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="cf-service" className="field__label">
            Service required
          </label>
          <select {...field("service")} required>
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errorFor("service")}
        </div>
        <div className="field">
          <label htmlFor="cf-budget" className="field__label">
            Estimated budget <span className="field__optional">(optional)</span>
          </label>
          <select {...field("budget")}>
            <option value="">Prefer not to say</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errorFor("budget")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message" className="field__label">
          Project details
        </label>
        <textarea {...field("message")} rows={6} required placeholder="What are you trying to achieve, and by when?" />
        {errorFor("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label className="checkbox">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={update}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "cf-consent-error" : undefined}
          />
          <span>
            I agree that Growthys may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy-policy" className="inline-link">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errorFor("consent")}
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" role="status">
        {status.state === "success" && (
          <p className="form__status form__status--success">
            <CircleCheck size={20} aria-hidden="true" />
            {status.message}
          </p>
        )}
        {status.state === "error" && (
          <p className="form__status form__status--error">
            <CircleAlert size={20} aria-hidden="true" />
            {status.message}
          </p>
        )}
      </div>

      <div>
        <button type="submit" className="btn btn--primary btn--lg" disabled={loading} aria-disabled={loading}>
          <span className="btn__label">{loading ? "Sending…" : "Send message"}</span>
          {loading && <LoaderCircle size={18} className="spin" aria-hidden="true" />}
        </button>
      </div>
    </form>
  );
}
