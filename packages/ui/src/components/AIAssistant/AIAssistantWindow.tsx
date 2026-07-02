import * as React from "react";
import styles from "./AIAssistantWindow.module.css";
import { Button } from "../Button/Button";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export const AIAssistantWindow = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I am Nikhil's AI Assistant. Ask me anything about his skills, projects, work history, or how to download his resume.",
    },
  ]);
  const [inputVal, setInputVal] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;

    // Append user message
    const newMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "http://localhost:3001/api/ai-assistant/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: text }),
        },
      );

      if (!response.body) {
        throw new Error("No response body stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      // Add a placeholder message for assistant response that we will update chunk by chunk
      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantResponse += chunk;

        // Update the last message in-place
        setMessages((prev) => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = {
              role: "assistant",
              text: assistantResponse,
            };
          }
          return updated;
        });
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "System offline. Failed to establish connection with AI Gateway node.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChipClick = (query: string) => {
    handleSubmit(query);
  };

  return (
    <div className={styles.chatWindow}>
      {/* Messages Log Feed */}
      <div className={styles.feed} ref={containerRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.messageBubble} ${
              msg.role === "user" ? styles.userBubble : styles.assistantBubble
            }`}
          >
            <div className={styles.senderLabel}>
              {msg.role === "user" ? "[ GUEST ]" : "[ AI_ASSISTANT ]"}
            </div>
            <div className={styles.messageText}>{msg.text}</div>
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.messageBubble} ${styles.assistantBubble}`}>
            <div className={styles.senderLabel}>[ AI_ASSISTANT ]</div>
            <div className={styles.typingIndicator}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick chips */}
      <div className={styles.chipsContainer}>
        {[
          "Who is Nikhil?",
          "Tell me about Voya",
          "Show React projects",
          "Download resume",
        ].map((chip) => (
          <button
            key={chip}
            className={styles.chip}
            onClick={() => handleChipClick(chip)}
            disabled={isTyping}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Message input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(inputVal);
        }}
        className={styles.inputBar}
      >
        <input
          type="text"
          className={styles.textInput}
          placeholder="Ask a question about Nikhil..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isTyping}
        />
        <Button variant="primary" size="sm" disabled={isTyping}>
          SEND
        </Button>
      </form>
    </div>
  );
};
