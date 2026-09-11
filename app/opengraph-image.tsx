import { ImageResponse } from "next/og";

export const alt = "Nikhil Singh — Backend / Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0C0E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          border: "2px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "rgba(61, 220, 132, 0.15)",
              color: "#3DDC84",
              border: "1px solid rgba(61, 220, 132, 0.3)",
              padding: "6px 16px",
              borderRadius: "4px",
              fontSize: "18px",
              fontFamily: "monospace",
              letterSpacing: "1.5px",
            }}
          >
            SOFTWARE DEVELOPER PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: "bold",
              color: "#EDEDEF",
              letterSpacing: "-1.5px",
            }}
          >
            Nikhil Singh
          </div>
          <div
            style={{
              fontSize: "30px",
              color: "#3DDC84",
              fontWeight: "600",
            }}
          >
            Backend & Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#8A8D93",
              maxWidth: "900px",
              lineHeight: "1.4",
            }}
          >
            Building scalable backend architectures, real-time distributed applications, and full-stack systems — bridging into AI/ML.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            color: "#8A8D93",
            fontSize: "18px",
            fontFamily: "monospace",
          }}
        >
          <div>nikhilsingh.dev</div>
          <div>B.Sc. IT · Mumbai University (CGPA 8.7)</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
