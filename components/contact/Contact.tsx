"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactTerminal } from "@/components/contact/ContactTerminal";
import {
  Check,
  Copy,
  Mail,
  ArrowUpRight,
  Github,
  Linkedin,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

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

  return (
    <section
      id="contact"
      aria-label="Contact Nikhil Singh"
      className="pt-20 md:pt-24 pb-6 md:pb-8 w-full"
    >
      <div className="max-w-container mx-auto px-6 sm:px-8 space-y-12 text-left">
        <SectionHeading
          overline="--Contact Me--"
          title="Get in Touch"
          centered
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
                  Preferred channel for hiring inquiries, technical
                  conversations, and collaborations.
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
             <ContactTerminal />
          </div>
          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <div className="p-6 rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-sm">
              <div className="mb-10">
                <p className="font-mono text-m uppercase tracking-[0.18em] text-[#3DDC84]">
                  SEND A MESSAGE
                </p>

                <h3 className="mt-3 font-sans  text-sm text-[var(--text-primary)]">
                  Have an inquiry or role? Leave a note and i will get back to you promptly
                </h3>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;