import * as React from "react";
import styles from "./Dock.module.css";

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: (id: string) => void;
  isOpen?: boolean;
}

export interface DockProps {
  items: DockItem[];
  activeAppId?: string | null;
}

export const Dock = ({ items, activeAppId }: DockProps) => {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  const getScaleClass = (idx: number) => {
    if (hoveredIdx === null) return "";
    if (hoveredIdx === idx) return styles.scale1;
    if (Math.abs(hoveredIdx - idx) === 1) return styles.scale2;
    return "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.dock}>
        {items.map((item, idx) => {
          const isActive = activeAppId === item.id;
          const scaleClass = getScaleClass(idx);

          return (
            <div
              key={item.id}
              className={`${styles.dockItemWrapper} ${scaleClass}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => item.onClick(item.id)}
            >
              {/* Tooltip */}
              <span className={styles.tooltip}>{item.label}</span>

              {/* Icon Container */}
              <button
                className={`${styles.iconButton} ${
                  isActive ? styles.activeButton : ""
                }`}
              >
                {item.icon}
              </button>

              {/* Status Indicator Dot */}
              {item.isOpen && <div className={styles.statusDot} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
