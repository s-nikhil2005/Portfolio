import * as React from "react";
import styles from "./CommandPalette.module.css";

export interface CommandItem {
  id: string;
  label: string;
  category: string;
  shortcut?: string;
  action: () => void;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandItem[];
}

export const CommandPalette = ({
  isOpen,
  onClose,
  commands,
}: CommandPaletteProps) => {
  const [search, setSearch] = React.useState("");
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIdx(0);
      // Wait for animation frame before focusing
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Filtering commands
  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase()),
  );

  // Keyboard navigation inside the list
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIdx]) {
          filteredCommands[selectedIdx].action();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIdx, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Search Input header */}
        <div className={styles.header}>
          <svg
            className={styles.searchIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIdx(0);
            }}
          />
          <button className={styles.escKey} onClick={onClose}>
            ESC
          </button>
        </div>

        {/* List of results */}
        <div className={styles.resultsList}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <div
                  key={cmd.id}
                  className={`${styles.resultItem} ${
                    isSelected ? styles.selected : ""
                  }`}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                >
                  <div className={styles.itemLeft}>
                    <span className={styles.category}>{cmd.category}</span>
                    <span className={styles.label}>{cmd.label}</span>
                  </div>
                  {cmd.shortcut && (
                    <span className={styles.shortcut}>{cmd.shortcut}</span>
                  )}
                </div>
              );
            })
          ) : (
            <div className={styles.noResults}>No commands found.</div>
          )}
        </div>

        {/* Footer info */}
        <div className={styles.footer}>
          <span>↑↓ to navigate</span>
          <span>⏎ to select</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
};
