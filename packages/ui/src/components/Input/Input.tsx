import * as React from "react";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  terminal?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, terminal = false, ...props }, ref) => {
    const inputClassNames = [
      styles.input,
      terminal ? styles.terminal : "",
      error ? styles.errorBorder : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.container}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputWrapper}>
          {terminal && <span className={styles.prompt}>$&nbsp;</span>}
          <input ref={ref} className={inputClassNames} {...props} />
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
