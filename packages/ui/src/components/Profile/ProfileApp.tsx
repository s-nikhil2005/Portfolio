"use client";

import * as React from "react";
import { ProfileOverview } from "./ProfileOverview";
import { SystemInfo } from "./SystemInfo";
import { JourneyTimeline } from "./JourneyTimeline";
import { TechStack } from "./TechStack";
import { ProfileCanvas } from "./ProfileCanvas";

export interface ProfileAppProps {
  onDownloadResume?: () => void;
}

export const ProfileApp = ({ onDownloadResume }: ProfileAppProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const isScrolling = React.useRef(false);
  const totalPages = 4;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isScrolling.current) return;

    if (e.deltaY > 15) {
      if (currentPage < totalPages - 1) {
        isScrolling.current = true;
        setCurrentPage((prev) => prev + 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 850);
      }
    } else if (e.deltaY < -15) {
      if (currentPage > 0) {
        isScrolling.current = true;
        setCurrentPage((prev) => prev - 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 850);
      }
    }
  };

  // Touch swipe support
  const touchStart = React.useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart.current - touchEnd;

    if (isScrolling.current) return;

    if (diff > 50) {
      // Swipe up (scroll down)
      if (currentPage < totalPages - 1) {
        isScrolling.current = true;
        setCurrentPage((prev) => prev + 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 850);
      }
    } else if (diff < -50) {
      // Swipe down (scroll up)
      if (currentPage > 0) {
        isScrolling.current = true;
        setCurrentPage((prev) => prev - 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 850);
      }
    }
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: "rgba(10, 11, 14, 0.2)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* 3D Background Canvas Layer */}
      <ProfileCanvas activePage={currentPage} />

      {/* Slide Carousel perspective container */}
      <div
        style={{
          flex: 1,
          width: "100%",
          perspective: "1200px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "400%",
            height: "100%",
            transform: `translateX(-${currentPage * 25}%)`,
            transition: "transform 0.85s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {/* Page 1: Profile Overview */}
          <div style={{ width: "25%", height: "100%" }}>
            <ProfileOverview onDownloadResume={onDownloadResume} />
          </div>

          {/* Page 2: System Information */}
          <div style={{ width: "25%", height: "100%" }}>
            <SystemInfo />
          </div>

          {/* Page 3: Journey Timeline */}
          <div style={{ width: "25%", height: "100%" }}>
            <JourneyTimeline />
          </div>

          {/* Page 4: Tech Stack */}
          <div style={{ width: "25%", height: "100%" }}>
            <TechStack />
          </div>
        </div>
      </div>

      {/* Pagination controller bar */}
      <div
        style={{
          height: "44px",
          borderTop: "1px solid rgba(255, 255, 255, 0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          zIndex: 2,
          background: "rgba(10, 11, 14, 0.4)",
        }}
      >
        {/* Navigation Indicator */}
        <span
          style={{
            fontSize: "0.68rem",
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            letterSpacing: "1px",
          }}
        >
          &gt; SCROLL TO NAVIGATE (PAGE {currentPage + 1} OF 4)
        </span>

        {/* Pagination Dots */}
        <div style={{ display: "flex", gap: "8px" }}>
          {[0, 1, 2, 3].map((pageIdx) => {
            const isActive = currentPage === pageIdx;
            return (
              <button
                key={pageIdx}
                onClick={() => setCurrentPage(pageIdx)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: `2px solid ${isActive ? "var(--glow-cyan)" : "rgba(255,255,255,0.15)"}`,
                  background: isActive ? "var(--glow-cyan)" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? "0 0 8px var(--glow-cyan)" : "none",
                  padding: 0,
                }}
                title={`Go to page ${pageIdx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
