import * as React from "react";
import styles from "./ContactHub.module.css";

interface ContactHubProps {
  // Option to pass handlers from parent, or manage locally
  onSubmit?: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => Promise<void>;
}

export const ContactHub = ({ onSubmit }: ContactHubProps) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [charCount, setCharCount] = React.useState(0);

  // Terminal logging states
  const [terminalLines, setTerminalLines] = React.useState<string[]>([
    "connect NIKHIL_OS",
    "Initializing secure connection...",
    "Connection established.",
    "Ready to transmit.",
    "Awaiting user input...",
  ]);

  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = React.useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 1000) {
      setMessage(text);
      setCharCount(text.length);
    }
  };

  const executeSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setStatus("error");
      setStatusMessage("System Alert: All transmission fields are required.");
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    // Start terminal typing sequence simulation
    const steps = [
      { delay: 0, text: "> Preparing encryption handshake..." },
      { delay: 500, text: "> Encrypting payload via AES-256..." },
      {
        delay: 1000,
        text: "> Routing secure packet to nikhilsinghsingh76666@gmail.com...",
      },
      { delay: 1500, text: "> Authenticating transmission keys..." },
      { delay: 2000, text: "> Delivering payload packet..." },
      { delay: 2500, text: "> Transmission Delivered Successfully." },
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, step.text]);
      }, step.delay);
    });

    // Fire actual fetch request
    setTimeout(async () => {
      try {
        const mailContent = `
----------------------------------
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
----------------------------------
        `.trim();

        const res = await fetch("http://localhost:3001/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message: mailContent,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Mail relay failed.");
        }

        setStatus("success");
        setStatusMessage("TRANSMISSION LOGGED SUCCESSFULLY");

        // Reset form
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setCharCount(0);
      } catch (err: any) {
        setStatus("error");
        setStatusMessage("Error: Handshake failure. Relay failed.");
        setTerminalLines((prev) => [
          ...prev,
          `> Error: Relay failure - ${err.message || "Unknown error"}`,
        ]);
      }
    }, 2600);
  };

  // Trigger download resume action
  const handleResumeDownload = () => {
    window.open("/Nikhil_Singh_Resume.pdf", "_blank");
  };

  return (
    <div className={styles.hubContainer}>
      <div className={styles.topLayout}>
        {/* LEFT PANEL - Communication Visualization */}
        <div className={styles.leftPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelChevron}>&lt;</span>
            <span className={styles.panelTitle}>COMMUNICATION_HUB.sys</span>
          </div>

          <div className={styles.linkStatusRow}>
            <span className={styles.statusPulse} />
            <span className={styles.statusLabel}>LINK ESTABLISHED</span>
          </div>

          {/* Dotted Holographic Globe SVG Visualization */}
          <div className={styles.hologramContainer}>
            <svg viewBox="0 0 400 400" className={styles.globeSvg}>
              <defs>
                <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                  <stop
                    offset="0%"
                    stopColor="var(--glow-cyan)"
                    stopOpacity="0.15"
                  />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <filter id="svgGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing Background Aura */}
              <circle cx="200" cy="200" r="160" fill="url(#globeGlow)" />

              {/* Outer Signal Rings */}
              <ellipse
                cx="200"
                cy="200"
                rx="150"
                ry="40"
                className={styles.orbitRing}
              />
              <ellipse
                cx="200"
                cy="200"
                rx="170"
                ry="25"
                className={styles.orbitRingSlow}
              />

              {/* Radar Sweep Line */}
              <line
                x1="200"
                y1="200"
                x2="350"
                y2="200"
                className={styles.radarLine}
              />

              {/* Holographic Globe Sphere Grid */}
              <circle
                cx="200"
                cy="200"
                r="110"
                className={styles.globeBoundary}
              />

              {/* Latitudes & Longitudes */}
              <path
                d="M 90 200 A 110 50 0 0 0 310 200"
                className={styles.gridLine}
              />
              <path
                d="M 90 200 A 110 50 0 0 1 310 200"
                className={styles.gridLine}
              />
              <path
                d="M 200 90 A 50 110 0 0 0 200 310"
                className={styles.gridLine}
              />
              <path
                d="M 200 90 A 50 110 0 0 1 200 310"
                className={styles.gridLine}
              />
              <path
                d="M 120 120 Q 200 170 280 120"
                className={styles.gridLine}
              />
              <path
                d="M 120 280 Q 200 230 280 280"
                className={styles.gridLine}
              />

              {/* Dotted Nodes on Globe intersections */}
              <circle
                cx="200"
                cy="200"
                r="4"
                fill="var(--glow-cyan)"
                filter="url(#svgGlow)"
              />
              <circle cx="150" cy="150" r="3" fill="var(--glow-cyan)" />
              <circle cx="250" cy="150" r="3" fill="var(--glow-cyan)" />
              <circle cx="150" cy="250" r="3" fill="var(--glow-cyan)" />
              <circle cx="250" cy="250" r="3" fill="var(--glow-cyan)" />
              <circle cx="290" cy="190" r="2.5" fill="var(--glow-cyan)" />
              <circle cx="110" cy="210" r="2.5" fill="var(--glow-cyan)" />

              {/* Floating Satellite */}
              <g className={styles.satellite}>
                <line
                  x1="310"
                  y1="90"
                  x2="270"
                  y2="130"
                  stroke="var(--glow-cyan)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <path
                  d="M 310 90 m -8 -8 l 16 16 l -4 4 l -16 -16 z"
                  fill="var(--bg-obsidian)"
                  stroke="var(--glow-cyan)"
                  strokeWidth="1.2"
                />
                {/* Solar panels */}
                <rect
                  x="312"
                  y="70"
                  width="12"
                  height="6"
                  fill="var(--glow-cyan)"
                  opacity="0.8"
                  transform="rotate(45 312 70)"
                />
                <rect
                  x="290"
                  y="92"
                  width="12"
                  height="6"
                  fill="var(--glow-cyan)"
                  opacity="0.8"
                  transform="rotate(45 290 92)"
                />
                <circle cx="304" cy="84" r="2.5" fill="#fff" />
              </g>
            </svg>
            <div className={styles.encryptionBadge}>
              <span className={styles.lockIconSymbol}>🔒</span>
              <span className={styles.badgeText}>
                SECURE CHANNEL AES-256 ENCRYPTION
              </span>
            </div>
          </div>

          {/* Futuristic Info Cards */}
          <div className={styles.infoCardsRow}>
            {/* SYSTEM STATUS Card */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>● SYSTEM STATUS</div>
              <div className={styles.infoCardGrid}>
                <span className={styles.infoLabel}>Server Status</span>
                <span
                  className={styles.infoVal}
                  style={{ color: "var(--glow-green)" }}
                >
                  ONLINE
                </span>
                <span className={styles.infoLabel}>Response Time</span>
                <span className={styles.infoVal}>18ms</span>
                <span className={styles.infoLabel}>Encryption</span>
                <span
                  className={styles.infoVal}
                  style={{ color: "var(--glow-cyan)" }}
                >
                  AES-256
                </span>
                <span className={styles.infoLabel}>API Status</span>
                <span
                  className={styles.infoVal}
                  style={{ color: "var(--glow-green)" }}
                >
                  CONNECTED
                </span>
                <span className={styles.infoLabel}>Uptime</span>
                <span className={styles.infoVal}>99.98%</span>
              </div>
            </div>

            {/* TRANSMISSION INFO Card */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>● TRANSMISSION INFO</div>
              <div className={styles.infoCardGrid}>
                <span className={styles.infoLabel}>Protocol</span>
                <span className={styles.infoVal}>HTTPS</span>
                <span className={styles.infoLabel}>Bandwidth</span>
                <span
                  className={styles.infoVal}
                  style={{ color: "var(--glow-cyan)" }}
                >
                  OPTIMAL
                </span>
                <span className={styles.infoLabel}>Packet Loss</span>
                <span className={styles.infoVal}>0%</span>
                <span className={styles.infoLabel}>Route</span>
                <span
                  className={styles.infoVal}
                  style={{ color: "var(--glow-cyan)" }}
                >
                  SECURE
                </span>
                <span className={styles.infoLabel}>Priority</span>
                <span className={styles.infoVal}>NORMAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Secure Transmission Form */}
        <div className={styles.rightPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelChevron}>&lt;</span>
            <span className={styles.panelTitle}>TRANSMISSION_TERMINAL.sys</span>
            <div className={styles.encryptedBadgeTop}>
              <span className={styles.lockBadgeIcon}>🔒</span>
              <span>ENCRYPTED</span>
            </div>
          </div>

          <form
            onSubmit={executeSubmission}
            className={styles.transmissionForm}
          >
            <div className={styles.formRow}>
              {/* Operator Name Field */}
              <div className={styles.inputGroup} style={{ flex: 1 }}>
                <label className={styles.inputLabel}>
                  <span className={styles.iconSpan}>👤</span> OPERATOR NAME
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={styles.textInput}
                />
                <span className={styles.glowingBorderLine} />
              </div>

              {/* Operator Email Field */}
              <div className={styles.inputGroup} style={{ flex: 1 }}>
                <label className={styles.inputLabel}>
                  <span className={styles.iconSpan}>✉</span> OPERATOR EMAIL
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.textInput}
                />
                <span className={styles.glowingBorderLine} />
              </div>
            </div>

            {/* Subject Field */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span className={styles.iconSpan}>📁</span> TRANSMISSION SUBJECT
              </label>
              <input
                type="text"
                placeholder="Enter transmission subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className={styles.textInput}
              />
              <span className={styles.glowingBorderLine} />
            </div>

            {/* Encrypted Message Area */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <span className={styles.iconSpan}>📝</span> ENCRYPTED MESSAGE
              </label>
              <textarea
                placeholder="Type your secure message here..."
                value={message}
                onChange={handleMessageChange}
                required
                className={styles.textArea}
              />
              <span className={styles.glowingBorderLine} />
              <div className={styles.charCounterRow}>
                <span>{charCount} / 1000 Characters</span>
              </div>
            </div>

            {/* Submit Row with split keylock icon card */}
            <div className={styles.submitRow}>
              <button
                type="submit"
                disabled={status === "sending"}
                className={styles.submitButton}
              >
                <span>&gt;&gt; SEND TRANSMISSION</span>
              </button>
              <div className={styles.lockBox}>
                <span className={styles.lockBoxIcon}>
                  {status === "success" ? "🔓" : "🔒"}
                </span>
              </div>
            </div>

            {statusMessage && (
              <div
                className={`${styles.responseMessage} ${
                  status === "error" ? styles.errorMsg : styles.successMsg
                }`}
              >
                &gt; {statusMessage}
              </div>
            )}

            <span className={styles.formFooterCaption}>
              Your message will be encrypted and securely transmitted.
            </span>
          </form>

          {/* CONTACT SHORTCUTS ROW */}
          <div className={styles.shortcutsSection}>
            <span className={styles.sectionHeading}>CONTACT CHANNELS</span>
            <div className={styles.shortcutsRow}>
              {/* GitHub Shortcut */}
              <a
                href="https://github.com/nikhil-64"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shortcutCard}
              >
                <span className={styles.shortcutIcon}>🐙</span>
                <div className={styles.shortcutInfo}>
                  <span className={styles.shortcutTitle}>GITHUB</span>
                  <span className={styles.shortcutSubtitle}>nikhil-64</span>
                </div>
              </a>

              {/* LinkedIn Shortcut */}
              <a
                href="https://linkedin.com/in/nikhil-64"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shortcutCard}
              >
                <span className={styles.shortcutIcon}>🔗</span>
                <div className={styles.shortcutInfo}>
                  <span className={styles.shortcutTitle}>LINKEDIN</span>
                  <span className={styles.shortcutSubtitle}>nikhil-64</span>
                </div>
              </a>

              {/* Email Shortcut */}
              <a
                href="mailto:nikhilsinghsingh76666@gmail.com"
                className={styles.shortcutCard}
              >
                <span className={styles.shortcutIcon}>✉</span>
                <div className={styles.shortcutInfo}>
                  <span className={styles.shortcutTitle}>EMAIL</span>
                  <span className={styles.shortcutSubtitle}>
                    nikhilsingh...
                  </span>
                </div>
              </a>

              {/* Resume Shortcut */}
              <div
                onClick={handleResumeDownload}
                className={styles.shortcutCard}
                style={{ cursor: "pointer" }}
              >
                <span className={styles.shortcutIcon}>📄</span>
                <div className={styles.shortcutInfo}>
                  <span className={styles.shortcutTitle}>RESUME</span>
                  <span className={styles.shortcutSubtitle}>Download CV</span>
                </div>
              </div>

              {/* Location Shortcut */}
              <div className={styles.shortcutCard}>
                <span className={styles.shortcutIcon}>📍</span>
                <div className={styles.shortcutInfo}>
                  <span className={styles.shortcutTitle}>LOCATION</span>
                  <span className={styles.shortcutSubtitle}>India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
