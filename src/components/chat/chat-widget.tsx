"use client";

import { useState } from "react";
import ChatBubble from "./chat-bubble";
import ChatWindow from "./chat-window";
import ChatErrorBoundary from "./chat-error-boundary";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <ChatErrorBoundary>
          <ChatWindow onClose={() => setIsOpen(false)} />
        </ChatErrorBoundary>
      ) : (
        <ChatBubble onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
}
