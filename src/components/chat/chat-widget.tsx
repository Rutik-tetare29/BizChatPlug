"use client";

import { useState } from "react";
import ChatBubble from "./chat-bubble";
import ChatWindow from "./chat-window";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <ChatWindow onClose={() => setIsOpen(false)} />
      ) : (
        <ChatBubble onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
}
