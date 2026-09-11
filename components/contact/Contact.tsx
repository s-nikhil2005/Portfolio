"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check, Copy, Mail, ArrowUpRight, Github, Linkedin, FileText, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = profileData.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Nikhil Singh"
      className="py-20 md:py-28 w-full"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 space-y-12 text-left">
        <SectionHeading
          overline="Get in Touch"
          title="Let's Build Something"
          description="I am actively open to opportunities involving backend engineering, full-stack development, and software systems. Whether you have a specific role or an interesting project, I'd like to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Prominent Direct Channels & Copy Email */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary Email Card */}
            <div className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] space-y-4 hover:border-[#3DDC84]/40 transition-all shadow-sm">
              <div className="flex items-center gap-2 text-[#3DDC84]">
                <Mail size={18} />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  DIRECT EMAIL
                </span>
              </div>

              <div className="space-y-1">
                <p className="font-sans text-xl sm:text-2xl font-bold text-[var(--text-primary)] break-all">
                  {profileData.email}
                </p>
                <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)]">
                  Preferred channel for hiring inquiries, technical conversations, and collaborations.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-control font-sans text-sm font-medium transition-all min-h-[44px] cursor-pointer",
                    copied
                      ? "bg-[#3DDC84] text-[#0B0C0E] font-semibold"
                      : "bg-[var(--bg)] border border-[var(--hairline)] hover:border-[#3DDC84] text-[var(--text-primary)]"
                  )}
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={16} strokeWidth={2.5} />
                      <span>Email Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} strokeWidth={1.75} />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-control text-sm font-sans text-[var(--text-secondary)] hover:text-[#3DDC84] transition-colors min-h-[44px]"
                >
                  <span>Open Mail App</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Verified Profiles Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* GitHub */}
              <div className="p-4 rounded-control border border-[var(--hairline)] bg-[var(--surface)] flex flex-col justify-between min-h-[90px]">
                <span className="font-mono text-xs text-[var(--text-secondary)] uppercase flex items-center gap-1.5">
                  <Github size={14} />
                  GitHub
                </span>
                {profileData.socials.github.startsWith("[ADD") ? (
                  <span className="font-mono text-xs text-[var(--text-secondary)] opacity-60">
                    {profileData.socials.github}
                  </span>
                ) : (
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm font-medium text-[var(--text-primary)] hover:text-[#3DDC84] flex items-center justify-between transition-colors min-h-[36px]"
                  >
                    <span>Repositories</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>

              {/* LinkedIn */}
              <div className="p-4 rounded-control border border-[var(--hairline)] bg-[var(--surface)] flex flex-col justify-between min-h-[90px]">
                <span className="font-mono text-xs text-[var(--text-secondary)] uppercase flex items-center gap-1.5">
                  <Linkedin size={14} />
                  LinkedIn
                </span>
                {profileData.socials.linkedin.startsWith("[ADD") ? (
                  <span className="font-mono text-xs text-[var(--text-secondary)] opacity-60">
                    {profileData.socials.linkedin}
                  </span>
                ) : (
                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm font-medium text-[var(--text-primary)] hover:text-[#3DDC84] flex items-center justify-between transition-colors min-h-[36px]"
                  >
                    <span>Connect</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>

              {/* Resume */}
              <div className="p-4 rounded-control border border-[var(--hairline)] bg-[var(--surface)] flex flex-col justify-between min-h-[90px]">
                <span className="font-mono text-xs text-[var(--text-secondary)] uppercase flex items-center gap-1.5">
                  <FileText size={14} />
                  Resume
                </span>
                {profileData.socials.resume.startsWith("[ADD") ? (
                  <span className="font-mono text-xs text-[var(--text-secondary)] opacity-60">
                    {profileData.socials.resume}
                  </span>
                ) : (
                  <a
                    href={profileData.socials.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm font-medium text-[var(--text-primary)] hover:text-[#3DDC84] flex items-center justify-between transition-colors min-h-[36px]"
                  >
                    <span>Download</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Quick Contact Form */}
          <div className="lg:col-span-6">
            <div className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-sm">
              <h3 className="font-sans font-bold text-lg text-[var(--text-primary)] mb-1">
                Send a Message
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] mb-5">
                Have an inquiry or role? Leave a note and I will get back to you promptly.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-control border border-[#3DDC84]/30 bg-[#3DDC84]/5 space-y-2">
                  <div className="flex items-center gap-2 text-[#3DDC84]">
                    <CheckCircle2 size={18} />
                    <span className="font-sans font-bold text-sm">Message Sent</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)]">
                    Thank you for reaching out! You can also contact directly via{" "}
                    <strong className="text-[var(--text-primary)]">{profileData.email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-form-name"
                      className="block font-sans text-xs font-medium text-[var(--text-secondary)]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-form-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-control font-sans text-sm bg-[var(--bg)] border border-[var(--hairline)] text-[var(--text-primary)] hover:border-[var(--hairline-hover)] focus-visible:border-[#3DDC84] transition-colors min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-form-email"
                      className="block font-sans text-xs font-medium text-[var(--text-secondary)]"
                    >
                      Your Email Address
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-control font-sans text-sm bg-[var(--bg)] border border-[var(--hairline)] text-[var(--text-primary)] hover:border-[var(--hairline-hover)] focus-visible:border-[#3DDC84] transition-colors min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-form-message"
                      className="block font-sans text-xs font-medium text-[var(--text-secondary)]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-form-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Details about your engineering team, project scope, or opportunity..."
                      className="w-full px-3.5 py-2.5 rounded-control font-sans text-sm bg-[var(--bg)] border border-[var(--hairline)] text-[var(--text-primary)] hover:border-[var(--hairline-hover)] focus-visible:border-[#3DDC84] transition-colors resize-y min-h-[100px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-control bg-[#3DDC84] text-[#0B0C0E] font-sans font-semibold text-sm hover:bg-[#34C776] transition-colors min-h-[44px] cursor-pointer"
                  >
                    <Send size={15} />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
