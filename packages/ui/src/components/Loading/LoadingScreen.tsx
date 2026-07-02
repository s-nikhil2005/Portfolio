import * as React from "react";
import styles from "./LoadingScreen.module.css";

export interface LoadingScreenProps {
  onComplete?: () => void;
}

// Procedural Retro Audio Synthesizer using Web Audio API
class RetroSound {
  private ctx: AudioContext | null = null;
  public isMuted = false;

  private init() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      try {
        this.ctx = new AudioContextClass();
      } catch (e) {
        // AudioContext initialization blocked or unsupported
      }
    }
  }

  public playTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.008, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        this.ctx.currentTime + 0.03,
      );

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  public playBeep(freq = 800, duration = 0.08) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        this.ctx.currentTime + duration,
      );

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  public playBootChime() {
    if (this.isMuted) return;
    this.playBeep(880, 0.1);
    setTimeout(() => this.playBeep(1100, 0.15), 100);
  }
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [logs, setLogs] = React.useState<string[]>([]);
  const [stage, setStage] = React.useState<number>(0);
  const [typedCommand, setTypedCommand] = React.useState<string>("");
  const [isFadingOut, setIsFadingOut] = React.useState<boolean>(false);
  const [isMuted, setIsMuted] = React.useState<boolean>(true); // Muted by default to respect browser autoplay policies

  // Progress Bar State
  const [progress, setProgress] = React.useState<number>(0);
  const [loadingText, setLoadingText] = React.useState<string>("");

  const sound = React.useRef<RetroSound | null>(null);

  // Initialize sound class
  React.useEffect(() => {
    sound.current = new RetroSound();
    sound.current.isMuted = isMuted;
  }, [isMuted]);

  // BIOS details
  const biosHeader = [
    "NIKHIL_OS V2.6.7 (C) 2026 NIKHIL CORPS.",
    "CPU: INTEL DUAL-CORE NEURAL PROCESSOR @ 4.20 GHz",
    "MEM: 32768 MB SYSTEM RAM OK",
    "GPU: DIRECT3D CLOUD RASTER ENGINE READY",
    "-----------------------------------------",
  ];

  // Drivers to mount
  const driverLogs = [
    "Mounting filesystem: d:/portfolio...",
    "Initializing core: memory_alloc.sys...",
    "Starting render pipeline: react_dom.dll...",
    "Starting 3D graphics hardware: webgl_r3f.sys...",
    "Initializing CLI terminal shell: bash.exe...",
    "Linking skills matrix db (148 nodes)...",
    "Connecting neural_net_assistant.sys...",
  ];

  const skipBoot = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete?.();
    }, 600);
  };

  React.useEffect(() => {
    if (stage === 0) {
      // Blinking cursor block
      const timer = setTimeout(() => {
        setStage(1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (stage === 1) {
      // Print BIOS header line by line
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < biosHeader.length) {
          setLogs((prev) => [...prev, biosHeader[currentLine]]);
          sound.current?.playTick();
          currentLine++;
        } else {
          clearInterval(interval);
          setStage(2);
        }
      }, 120);
      return () => clearInterval(interval);
    }

    if (stage === 2) {
      // Progressive Loading Bar simulation
      let currentDriver = 0;
      const interval = setInterval(() => {
        if (currentDriver < driverLogs.length) {
          const logMsg = driverLogs[currentDriver];
          setLogs((prev) => [...prev, `[ BUSY ] ${logMsg}`]);
          setLoadingText(logMsg);
          sound.current?.playBeep(700, 0.03);

          // Update progress percentage
          setProgress((prev) => {
            const nextProg = Math.min(
              100,
              Math.floor((currentDriver + 1) * (100 / driverLogs.length)),
            );

            // Replace the last [ BUSY ] log with [  OK  ] once progress catches up
            setLogs((prevLogs) => {
              const updated = [...prevLogs];
              const targetIdx = updated.length - 1;
              if (targetIdx >= 0) {
                updated[targetIdx] = `[  OK  ] ${logMsg}`;
              }
              return updated;
            });

            return nextProg;
          });

          currentDriver++;
        } else {
          clearInterval(interval);
          sound.current?.playBeep(900, 0.1);
          setStage(3);
        }
      }, 350);
      return () => clearInterval(interval);
    }

    if (stage === 3) {
      // Simulate typing command
      const target = "ssh guest@nikhil-os.dev";
      let cursor = 0;
      const interval = setInterval(() => {
        if (cursor < target.length) {
          setTypedCommand((prev) => prev + target[cursor]);
          sound.current?.playTick();
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
        sound.current?.playBootChime();
        setStage(5);
      }, 600);
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

  // Create loading bar graphical representation
  const renderProgressBar = () => {
    const totalBlocks = 20;
    const filledBlocks = Math.floor((progress / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    const bar = `[${"=".repeat(filledBlocks)}${">"}${" ".repeat(Math.max(0, emptyBlocks - 1))}]`;
    return `${bar} ${progress}%`;
  };

  return (
    <div className={`${styles.overlay} ${isFadingOut ? styles.fadeOut : ""}`}>
      {/* Top Panel Actions */}
      <div className={styles.topActions}>
        <button
          className={styles.actionBtn}
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
          {isMuted ? "SOUND OFF" : "SOUND ON"}
        </button>
        <button className={styles.actionBtn} onClick={skipBoot}>
          SKIP BOOT [ESC]
        </button>
      </div>

      <div className={styles.monitor}>
        <div className={styles.scanline} />
        <div className={styles.terminalContainer}>
          {stage > 0 && (
            <div className={styles.logContainer}>
              {logs.map((log, idx) => {
                if (!log) return null;
                const isOk = log.startsWith("[  OK  ]");
                const isAccess = log.includes("ACCESS GRANTED");

                return (
                  <div
                    key={idx}
                    className={`${styles.logLine} ${
                      isOk ? styles.successLog : ""
                    } ${isAccess ? styles.accessGranted : ""}`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          )}

          {/* Loading progress visualization */}
          {stage === 2 && (
            <div className={styles.progressBarWrapper}>
              <div className={styles.loadingLabel}>Loading: {loadingText}</div>
              <div className={styles.loadingBar}>{renderProgressBar()}</div>
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
