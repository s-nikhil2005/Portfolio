import * as React from "react";
import styles from "./MacWindow.module.css";

export interface MacWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onClose: (id: string) => void;
  onMinimize?: (id: string) => void;
  onFocus?: (id: string) => void;
  zIndex?: number;
  children: React.ReactNode;
}

export const MacWindow = ({
  id,
  title,
  isOpen,
  isMinimized = false,
  defaultPosition = { x: 80, y: 80 },
  defaultSize = { width: 640, height: 440 },
  onClose,
  onMinimize,
  onFocus,
  zIndex = 10,
  children,
}: MacWindowProps) => {
  const [position, setPosition] = React.useState(defaultPosition);
  const [size, setSize] = React.useState(defaultSize);
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);

  const windowRef = React.useRef<HTMLDivElement>(null);
  const dragStart = React.useRef({ x: 0, y: 0 });
  const positionStart = React.useRef({ x: 0, y: 0 });
  const sizeStart = React.useRef({ width: 0, height: 0 });

  if (!isOpen || isMinimized) return null;

  // Drag logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    // Don't drag if clicking buttons
    if ((e.target as HTMLElement).closest(`.${styles.control}`)) return;

    setIsDragging(true);
    onFocus?.(id);
    dragStart.current = { x: e.clientX, y: e.clientY };
    positionStart.current = { ...position };

    e.preventDefault();
  };

  // Resize logic
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    onFocus?.(id);
    dragStart.current = { x: e.clientX, y: e.clientY };
    sizeStart.current = { ...size };

    e.preventDefault();
    e.stopPropagation();
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setPosition({
          x: Math.max(0, positionStart.current.x + dx),
          y: Math.max(0, positionStart.current.y + dy),
        });
      } else if (isResizing) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setSize({
          width: Math.max(300, sizeStart.current.width + dx),
          height: Math.max(200, sizeStart.current.height + dy),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    onFocus?.(id);
  };

  const windowStyle: React.CSSProperties = isMaximized
    ? {
        position: "absolute",
        top: "40px", // space for desktop top bar
        left: 0,
        width: "100vw",
        height: "calc(100vh - 100px)", // space for top bar and bottom dock
        zIndex,
      }
    : {
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={`${styles.window} ${isMaximized ? styles.maximized : ""} ${
        isDragging ? styles.dragging : ""
      }`}
      style={windowStyle}
      onClick={() => onFocus?.(id)}
    >
      {/* Title bar / Drag Handle */}
      <div className={styles.titleBar} onMouseDown={handleMouseDown}>
        <div className={styles.controls}>
          <button
            className={`${styles.control} ${styles.close}`}
            onClick={() => onClose(id)}
            title="Close"
          />
          <button
            className={`${styles.control} ${styles.minimize}`}
            onClick={() => onMinimize?.(id)}
            title="Minimize"
          />
          <button
            className={`${styles.control} ${styles.maximize}`}
            onClick={toggleMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          />
        </div>
        <div className={styles.title}>{title}</div>
      </div>

      {/* Window Content */}
      <div className={styles.content}>{children}</div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className={styles.resizeHandle}
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
};
