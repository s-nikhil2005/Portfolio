import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-container mx-auto px-6 py-32 w-full text-center flex flex-col items-center justify-center space-y-6">
      <div className="inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#3DDC84]" />
        <span className="font-mono text-xs text-[#3DDC84] uppercase tracking-widest font-semibold">
          404 ERROR
        </span>
      </div>

      <h1 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
        Page Not Found
      </h1>

      <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-control bg-[#3DDC84] text-[#0B0C0E] font-sans font-medium text-sm hover:bg-[#34C776] transition-colors min-h-[44px]"
        >
          <ArrowLeft size={16} />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
