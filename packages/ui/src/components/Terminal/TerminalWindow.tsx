import * as React from "react";
import styles from "./TerminalWindow.module.css";

export interface TerminalLog {
  text: string;
  type: "input" | "output" | "error" | "system";
}

export interface TerminalWindowProps {
  logs: TerminalLog[];
  onCommand?: (command: string) => void;
  promptPath?: string;
}

export const TerminalWindow = ({
  logs,
  onCommand,
  promptPath = "~",
}: TerminalWindowProps) => {
  const [inputVal, setInputVal] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-scroll on logs change
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    onCommand?.(cmd);
    setInputVal("");
  };

  const handleConsoleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.terminal} onClick={handleConsoleClick}>
      <div className={styles.outputContainer} ref={containerRef}>
        {/* Welcome Banner */}
        <div className={styles.banner}>
          Welcome to NIKHIL_OS Terminal. Type &apos;help&apos; to view available
          commands.
        </div>

        {/* Logs */}
        {logs.map((log, idx) => (
          <div key={idx} className={`${styles.logLine} ${styles[log.type]}`}>
            {log.type === "input" && (
              <span className={styles.prompt}>
                guest@nikhil-os:{promptPath}${" "}
              </span>
            )}
            {log.text}
          </div>
        ))}

        {/* Command Form Prompt */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <span className={styles.prompt}>guest@nikhil-os:{promptPath}$ </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};
