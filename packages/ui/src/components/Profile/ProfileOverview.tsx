import * as React from "react";
import { Button } from "../Button/Button";

export interface ProfileOverviewProps {
  onDownloadResume?: () => void;
}

export const ProfileOverview = ({ onDownloadResume }: ProfileOverviewProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        padding: "40px",
        boxSizing: "border-box",
        gap: "40px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left Column - Info & Action */}
      <div
        style={{
          flex: 1.2,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          {/* Status Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0, 255, 102, 0.08)",
              border: "1px solid rgba(0, 255, 102, 0.2)",
              borderRadius: "20px",
              padding: "4px 12px",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00ff66",
                boxShadow: "0 0 8px #00ff66",
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                color: "#00ff66",
                letterSpacing: "1px",
              }}
            >
              STATUS: ACTIVE_NODE
            </span>
          </div>

          <h1
            style={{
              fontSize: "3.2rem",
              fontWeight: "900",
              color: "#fff",
              lineHeight: "1.1",
              margin: 0,
              fontFamily: "var(--font-mono)",
              textShadow: "0 0 20px rgba(255,255,255,0.1)",
            }}
          >
            Nikhil Singh
          </h1>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "var(--glow-cyan)",
              marginTop: "8px",
              fontFamily: "var(--font-mono)",
            }}
          >
            Full-Stack Engineer & Creative Developer
          </h2>
        </div>

        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            lineHeight: "1.6",
            margin: 0,
          }}
        >
          Building high-performance backend pipelines and immersive 3D
          interfaces. Specialized in bridging complex system architectures with
          intuitive, interactive front-ends.
        </p>

        {/* Technical stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginTop: "8px",
          }}
        >
          {[
            { label: "EXP LEVEL", value: "3+ YRS" },
            { label: "TECH STACK", value: "20+ LABS" },
            { label: "PROJECTS", value: "12+ DEPLOY" },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "850",
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "1px",
                  marginTop: "4px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "12px",
            alignItems: "center",
          }}
        >
          <Button variant="primary" size="md" onClick={onDownloadResume}>
            Download Resume
          </Button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button variant="secondary" size="md">
              GitHub
            </Button>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button variant="secondary" size="md">
              LinkedIn
            </Button>
          </a>
        </div>
      </div>

      {/* Right Column - Styled Floating Avatar Card */}
      <div
        style={{
          flex: 0.8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 70%)",
            position: "absolute",
            zIndex: 1,
            animation: "pulse 4s infinite alternate",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "220px",
            height: "220px",
            borderRadius: "20px",
            background: "rgba(10, 11, 14, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            padding: "12px",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            overflow: "hidden",
          }}
        >
          {/* Avatar graphic projection */}
          <img
            src="/avatar.jpg"
            alt="Nikhil Singh 3D representation"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "12px",
              opacity: 0.9,
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          />

          {/* Cybernetic grid overlay overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%)",
              backgroundSize: "100% 4px",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Orbit ring indicators */}
        <div
          style={{
            width: "280px",
            height: "280px",
            border: "1px dashed rgba(0, 240, 255, 0.2)",
            borderRadius: "50%",
            position: "absolute",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
};
