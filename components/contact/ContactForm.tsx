"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errs.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errs.email = "Enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      errs.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      errs.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to send message.");
      }

      setIsSubmitting(false);
      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setIsSubmitting(false);

      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-6 rounded-control border border-[#3DDC84]/30 bg-[var(--surface)] text-left space-y-3"
      >
        <div className="flex items-center gap-2 text-[#3DDC84]">
          <CheckCircle2 size={18} />

          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider">
            Message Dispatched
          </h3>
        </div>

        <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed">
          Thank you for reaching out. Your message has been received. You can
          also contact directly at{" "}
          <strong className="text-[var(--text-primary)] font-mono">
            nikhilsingh76666@gmail.com
          </strong>
          .
        </p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setErrors({});
            setFormData({
              name: "",
              email: "",
              subject: "",
              message: "",
            });
          }}
          className="font-mono text-xs text-[#3DDC84] hover:underline pt-2 inline-block min-h-[44px]"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 text-left"
    >
      {/* NAME + EMAIL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* NAME */}
        <div className="space-y-1.5">
          <label
            htmlFor="contact-name"
            className="block font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
          >
            NAME <span className="text-[#3DDC84]">*</span>
          </label>

          <input
            id="contact-name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your Name"
            className={cn(
              "w-full px-3.5 py-2.5 rounded-control font-mono text-sm bg-[var(--surface)] border text-[var(--text-primary)] transition-colors min-h-[44px] outline-none",
              errors.name
                ? "border-red-500/70"
                : "border-[var(--hairline)] hover:border-[var(--hairline-hover)] focus-visible:border-[#3DDC84]"
            )}
          />

          {errors.name && (
            <p
              id="name-error"
              className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
            >
              <AlertCircle size={12} />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="space-y-1.5">
          <label
            htmlFor="contact-email"
            className="block font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
          >
            EMAIL <span className="text-[#3DDC84]">*</span>
          </label>

          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@example.com"
            className={cn(
              "w-full px-3.5 py-2.5 rounded-control font-mono text-sm bg-[var(--surface)] border text-[var(--text-primary)] transition-colors min-h-[44px] outline-none",
              errors.email
                ? "border-red-500/70"
                : "border-[var(--hairline)] hover:border-[var(--hairline-hover)] focus-visible:border-[#3DDC84]"
            )}
          />

          {errors.email && (
            <p
              id="email-error"
              className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
            >
              <AlertCircle size={12} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* SUBJECT */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-subject"
          className="block font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
        >
          SUBJECT <span className="text-[#3DDC84]">*</span>
        </label>

        <input
          id="contact-subject"
          type="text"
          value={formData.subject}
          onChange={(e) =>
            setFormData({
              ...formData,
              subject: e.target.value,
            })
          }
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="Let's collaborate on a project"
          className={cn(
            "w-full px-3.5 py-2.5 rounded-control font-mono text-sm bg-[var(--surface)] border text-[var(--text-primary)] transition-colors min-h-[44px] outline-none",
            errors.subject
              ? "border-red-500/70"
              : "border-[var(--hairline)] hover:border-[var(--hairline-hover)] focus-visible:border-[#3DDC84]"
          )}
        />

        {errors.subject && (
          <p
            id="subject-error"
            className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
          >
            <AlertCircle size={12} />
            <span>{errors.subject}</span>
          </p>
        )}
      </div>

      {/* MESSAGE */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="block font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
        >
          MESSAGE <span className="text-[#3DDC84]">*</span>
        </label>

        <textarea
          id="contact-message"
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell me about your project or opportunity..."
          className={cn(
            "w-full px-3.5 py-2.5 rounded-control font-sans text-sm bg-[var(--surface)] border text-[var(--text-primary)] transition-colors resize-y min-h-[120px] outline-none",
            errors.message
              ? "border-red-500/70"
              : "border-[var(--hairline)] hover:border-[var(--hairline-hover)] focus-visible:border-[#3DDC84]"
          )}
        />

        {errors.message && (
          <p
            id="message-error"
            className="font-mono text-xs text-red-400 flex items-center gap-1 mt-1"
          >
            <AlertCircle size={12} />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* SUBMIT ERROR */}
      {errors.submit && (
        <p
          role="alert"
          className="font-mono text-xs text-red-400 flex items-center gap-1"
        >
          <AlertCircle size={12} />
          <span>{errors.submit}</span>
        </p>
      )}

      {/* SEND BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          font-mono
          text-xs
          sm:text-sm
          px-5
          py-2.5
          rounded-control
          border
          border-[var(--hairline)]
          bg-[var(--surface)]
          text-[var(--text-primary)]
          hover:border-[#3DDC84]
          hover:text-[#3DDC84]
          transition-colors
          min-h-[44px]
          cursor-pointer
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <Send size={14} />

        <span>
          {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}
        </span>
      </button>
    </form>
  );
};

export default ContactForm;