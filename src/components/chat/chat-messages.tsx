import type { Message } from "@/lib/types";
import { useEffect, useRef } from "react";
import ChatMessage from "./chat-message";

type ChatMessagesProps = {
  messages: Message[];
};

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollableContainerRef} className="flex-1 space-y-4 overflow-y-auto pr-2">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
