"use client";

import React from "react";
import { profileData } from "@/data/profile";

interface ContactTerminalProps {
  email?: string;
  location?: string;
  status?: string;
  responseTime?: string;
  availability?: string;
  username?: string;
}

export const ContactTerminal: React.FC<ContactTerminalProps> = ({
  email = profileData.email,
  location = "Mumbai, India",
  status = "Open to opportunities",
  responseTime = "Usually within 24 hours",
  availability = "Remote / On-site Mumbai",
  username = "nikhil@contact",
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#08090A] shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
      {/* Terminal Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-[#FF6B35]" />
          <span className="h-3.5 w-3.5 rounded-full border border-white/10 bg-[#151924]" />
          <span className="h-3.5 w-3.5 rounded-full bg-[#20C978]" />
        </div>

        <span className="ml-2 font-mono text-xs text-white/50">
          {username} ~
        </span>
      </div>

      {/* Terminal Content */}
      <div className="px-5 py-5 font-mono text-xs leading-relaxed sm:text-sm">
        <div className="text-[#3DDC84]">
          $ cat contact.txt
        </div>

        <div className="mt-3 space-y-1.5 text-white/80">
          <p>
            <span className="text-white">email</span>
            <span className="text-white/40"> → </span>
            <span>{email}</span>
          </p>

          <p>
            <span className="text-white">location</span>
            <span className="text-white/40"> → </span>
            <span>{location}</span>
          </p>

          <p>
            <span className="text-white">status</span>
            <span className="text-white/40"> → </span>
            <span>{status}</span>
          </p>
        </div>

        <div className="mt-4 text-[#3DDC84]">
          $ echo $RESPONSE_TIME
        </div>

        <div className="mt-1 text-white/80">
          {responseTime}
        </div>

        <div className="mt-4 text-[#3DDC84]">
          $ echo $AVAILABILITY
        </div>

        <div className="mt-1 text-white/80">
          {availability}
        </div>
      </div>
    </div>
  );
};

export default ContactTerminal;