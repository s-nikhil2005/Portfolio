import * as React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "terminal";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      glow = false,
      children,
      ...props
    },
    ref,
  ) => {
    const classNames = [
      styles.btn,
      styles[variant],
      styles[size],
      glow ? styles.glow : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classNames} {...props}>
        {variant === "terminal" && (
          <span className={styles.prompt}>&gt;&nbsp;</span>
        )}
        <span className={styles.content}>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
