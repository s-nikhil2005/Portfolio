import * as React from "react";
import styles from "./Timeline.module.css";

export interface TimelineItem {
  id: string;
  title: string;
  period: string;
  description: string;
  iconText: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

const TimelineNode = ({ item }: { item: TimelineItem }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        // Trigger within the scrollable MacWindow container
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.node} ${isVisible ? styles.visible : ""}`}
    >
      {/* Node Dot / Icon */}
      <div className={styles.iconWrapper}>
        <div className={styles.icon}>{item.iconText}</div>
      </div>

      {/* Node Card Content */}
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.period}>{item.period}</span>
          <h4 className={styles.title}>{item.title}</h4>
        </div>
        <p className={styles.desc}>{item.description}</p>
      </div>
    </div>
  );
};

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className={styles.timeline}>
      {/* Vertical glowing track line */}
      <div className={styles.track} />

      <div className={styles.nodesContainer}>
        {items.map((item) => (
          <TimelineNode key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
