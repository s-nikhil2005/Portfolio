"use client";

import * as React from "react";
import { Button } from "@portfolio/ui";

interface AnalyticsData {
  visitorHits: number;
  resumeDownloads: number;
  recentContacts: number;
  byDate: Array<{ date: string; hits: number }>;
}

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = React.useState<AnalyticsData | null>(null);
  const [contacts, setContacts] = React.useState<ContactMessage[]>([]);
  const [loading, setLoading] = React.useState(true);

  // New Project Form State
  const [pTitle, setPTitle] = React.useState("");
  const [pDesc, setPDesc] = React.useState("");
  const [pStack, setPStack] = React.useState("");
  const [pStatus, setPStatus] = React.useState("");

  // Fetch admin states
  const fetchData = async () => {
    try {
      // Fetch analytics
      const anaRes = await fetch("http://localhost:3001/api/admin/analytics");
      const anaData = await anaRes.json();
      setAnalytics(anaData);

      // Fetch contact logs
      const conRes = await fetch("http://localhost:3001/api/contact");
      const conData = await conRes.json();
      setContacts(conData);
    } catch (e) {
      console.error(
        "Failed to load admin stats. Falling back to memory states.",
        e,
      );
      // Recruiter fallback to show a working demo without API boot running
      setAnalytics({
        visitorHits: 148,
        resumeDownloads: 32,
        recentContacts: 3,
        byDate: [
          { date: "06-28", hits: 24 },
          { date: "06-29", hits: 36 },
          { date: "06-30", hits: 45 },
          { date: "07-01", hits: 28 },
          { date: "07-02", hits: 15 },
        ],
      } as any);
      setContacts([
        {
          name: "Alice Vance",
          email: "alice@vance.io",
          message:
            "Loved the operating system narrative! Let's arrange a chat about open roles next Tuesday.",
          createdAt: new Date().toISOString(),
        },
        {
          name: "Bob Builder",
          email: "bob@builder.org",
          message:
            "Excellent R3F laptop mechanics. Do you have experience with custom shader material passes?",
          createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pDesc) return;

    const newProj = {
      id: pTitle.toLowerCase().replace(/\s+/g, "-"),
      title: pTitle,
      description: pDesc,
      techStack: pStack.split(",").map((s) => s.trim()),
    };

    try {
      await fetch("http://localhost:3001/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProj),
      });
      setPStatus("Project registered successfully!");
      setPTitle("");
      setPDesc("");
      setPStack("");
      fetchData();
      setTimeout(() => setPStatus(""), 3000);
    } catch (err) {
      console.error(err);
      setPStatus("Error: Failed to register project backend entry.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b0e",
          color: "var(--glow-cyan)",
          fontFamily: "var(--font-mono)",
          fontSize: "1rem",
        }}
      >
        [ INITIALIZING CORE ADMIN CONTROL... ]
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#0a0b0e",
        color: "#f8f9fa",
        fontFamily: "var(--font-sans)",
        padding: "40px 20px",
        overflowY: "auto",
      }}
    >
      {/* Admin Header */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto 32px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingBottom: "20px",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--glow-purple)",
              letterSpacing: "1px",
            }}
          >
            [ HOST: NIKHIL_OS // ADMIN_PANEL ]
          </span>
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "800",
              margin: "4px 0 0 0",
            }}
          >
            System Command Console
          </h1>
        </div>
        <a href="/">
          <Button variant="secondary" size="md">
            &lt; Return to OS
          </Button>
        </a>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Row 1: Quick Stats Indicator Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              TOTAL VISITOR HITS
            </span>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                color: "var(--glow-cyan)",
                textShadow: "0 0 10px rgba(0, 240, 255, 0.2)",
              }}
            >
              {analytics?.visitorHits}
            </div>
            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                display: "block",
                marginTop: "4px",
              }}
            >
              Active tracking counter nodes.
            </span>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              RESUME DOWNLOAD CLICKS
            </span>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                color: "var(--glow-green)",
                textShadow: "0 0 10px rgba(0, 255, 102, 0.2)",
              }}
            >
              {analytics?.resumeDownloads}
            </div>
            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                display: "block",
                marginTop: "4px",
              }}
            >
              Increments on about_me download.
            </span>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                display: "block",
                marginBottom: "4px",
              }}
            >
              INCOMING MESSAGES INBOX
            </span>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                color: "var(--glow-purple)",
                textShadow: "0 0 10px rgba(157, 78, 221, 0.2)",
              }}
            >
              {contacts.length}
            </div>
            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                display: "block",
                marginTop: "4px",
              }}
            >
              Total guest inquiries stored.
            </span>
          </div>
        </div>

        {/* Row 2: Charts and Form submissions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "32px",
            alignItems: "flex-start",
          }}
        >
          {/* Left panel: Contacts Inbox */}
          <div
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                marginBottom: "16px",
                color: "var(--glow-cyan)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                paddingBottom: "8px",
              }}
            >
              // SECURE_MESSAGES_INBOX
            </h3>

            {contacts.length === 0 ? (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                Inbox is clean. No contact messages recorded.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {contacts.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      padding: "14px",
                      borderRadius: "6px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      <strong style={{ fontSize: "0.88rem", color: "#fff" }}>
                        {msg.name}
                      </strong>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--glow-green)",
                        fontFamily: "var(--font-mono)",
                        marginBottom: "8px",
                      }}
                    >
                      &lt;{msg.email}&gt;
                    </div>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        lineHeight: "1.5",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right panel: Project creation manager form */}
          <div
            style={{
              background: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                marginBottom: "16px",
                color: "var(--glow-cyan)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                paddingBottom: "8px",
              }}
            >
              // ADD_PROJECT_ENTRY
            </h3>

            <form
              onSubmit={handleAddProject}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    marginBottom: "4px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  PROJECT TITLE
                </label>
                <input
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  placeholder="e.g. Server Core API"
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#050608",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "4px",
                    color: "#fff",
                    font: "inherit",
                    fontSize: "0.8rem",
                  }}
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    marginBottom: "4px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  SUMMARY DESCRIPTION
                </label>
                <textarea
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  placeholder="Case study summary description..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#050608",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "4px",
                    color: "#fff",
                    font: "inherit",
                    fontSize: "0.8rem",
                    resize: "none",
                  }}
                  required
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    marginBottom: "4px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  TECH STACK TAGS (COMMA SEPARATED)
                </label>
                <input
                  value={pStack}
                  onChange={(e) => setPStack(e.target.value)}
                  placeholder="e.g. Next.js, Node.js, WebGL"
                  style={{
                    width: "100%",
                    padding: "8px",
                    background: "#050608",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "4px",
                    color: "#fff",
                    font: "inherit",
                    fontSize: "0.8rem",
                  }}
                />
              </div>

              <Button variant="primary" size="md">
                Register Package (.pkg)
              </Button>

              {pStatus && (
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: pStatus.includes("Error")
                      ? "#ff453a"
                      : "var(--glow-green)",
                    fontFamily: "var(--font-mono)",
                    marginTop: "4px",
                  }}
                >
                  &gt; {pStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
