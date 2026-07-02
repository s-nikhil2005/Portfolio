import * as React from "react";
import styles from "./LoadingScreen.module.css";

export interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [logs, setLogs] = React.useState<string[]>([]);
  const [stage, setStage] = React.useState<number>(0);
  const [typedCommand, setTypedCommand] = React.useState<string>("");
  const [isFadingOut, setIsFadingOut] = React.useState<boolean>(false);

  // BIOS details
  const biosHeader = [
    "NIKHIL_OS V2.6.7 (C) 2026 NIKHIL CORPS.",
    "CPU: INTEL DUAL-CORE NEURAL CORE @ 4.20 GHz",
    "MEM: 32768 MB SYSTEM RAM OK",
    "GPU: DIRECT3D CLOUD RASTER ENGINE READY",
    "-----------------------------------------",
  ];

  // Drivers to mount
  const driverLogs = [
    "[ OK ] Mounting filesystem: d:/portfolio",
    "[ OK ] Initializing core: memory_alloc.sys",
    "[ OK ] Starting engine: react_render_pipeline.dll",
    "[ OK ] Starting driver: WebGL_r3f_device.sys",
    "[ OK ] Starting interface: terminal_command_shell.sh",
    "[ OK ] Loaded skills matrix database (148 entries)",
    "[ OK ] Connecting to neural_net_assistant.sys...",
  ];

  const skipBoot = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete?.();
    }, 600);
  };

  React.useEffect(() => {
    if (stage === 0) {
      // Blinking cursor on black
      const timer = setTimeout(() => setStage(1), 1000);
      return () => clearTimeout(timer);
    }

    if (stage === 1) {
      // Print BIOS header line by line
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < biosHeader.length) {
          setLogs((prev) => [...prev, biosHeader[currentLine]]);
          currentLine++;
        } else {
          clearInterval(interval);
          setStage(2);
        }
      }, 150);
      return () => clearInterval(interval);
    }

    if (stage === 2) {
      // Mount drivers line by line
      let currentDriver = 0;
      const interval = setInterval(() => {
        if (currentDriver < driverLogs.length) {
          setLogs((prev) => [...prev, driverLogs[currentDriver]]);
          currentDriver++;
        } else {
          clearInterval(interval);
          setStage(3);
        }
      }, 200);
      return () => clearInterval(interval);
    }

    if (stage === 3) {
      // Simulate typing command
      const target = "ssh guest@nikhil-os.dev";
      let cursor = 0;
      const interval = setInterval(() => {
        if (cursor < target.length) {
          setTypedCommand((prev) => prev + target[cursor]);
          cursor++;
        } else {
          clearInterval(interval);
          setStage(4);
        }
      }, 60);
      return () => clearInterval(interval);
    }

    if (stage === 4) {
      // Trigger Access Granted
      const timer = setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          "AUTHENTICATING...",
          "CONNECTION SECURE.",
          "ACCESS GRANTED.",
          "INITIALIZING GUI WORKSPACE...",
        ]);
        setStage(5);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (stage === 5) {
      // Fade out and complete
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        const completeTimer = setTimeout(() => {
          onComplete?.();
        }, 800);
        return () => clearTimeout(completeTimer);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className={`${styles.overlay} ${isFadingOut ? styles.fadeOut : ""}`}>
      <button className={styles.skipButton} onClick={skipBoot}>
        SKIP BOOT [ESC]
      </button>
      <div className={styles.monitor}>
        <div className={styles.scanline} />
        <div className={styles.terminalContainer}>
          {stage > 0 && (
            <div className={styles.logContainer}>
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${styles.logLine} ${
                    log.startsWith("[ OK ]") ? styles.successLog : ""
                  } ${
                    log.includes("ACCESS GRANTED") ? styles.accessGranted : ""
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          )}

          {stage >= 3 && (
            <div className={styles.inputPrompt}>
              <span className={styles.user}>guest@nikhil-os:~$</span>{" "}
              <span className={styles.commandText}>{typedCommand}</span>
              {stage === 3 && <span className={styles.cursor}>_</span>}
            </div>
          )}

          {stage === 0 && <span className={styles.cursorBlock}>█</span>}
        </div>
      </div>
    </div>
  );
};
