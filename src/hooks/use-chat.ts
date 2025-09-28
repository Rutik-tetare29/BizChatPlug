
"use client";

import { useState, useEffect } from 'react';
import type { Message } from '@/lib/types';

const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

export const useChat = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setIsLoading(true);
      // Simulate initial message fetch or generation
      setTimeout(() => {
        setMessages([
          {
            id: 'init',
            role: 'assistant',
            content: "Hello! I'm the BizChat assistant. How can I help you today?",
          },
        ]);
        setIsLoading(false);
      }, 500);
    }
  }, [messages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, options?: { options?: { body: string }}) => {
    e.preventDefault();
    const messageContent = options ? JSON.parse(options.options?.body || '{}').messages.pop().content : input;
    if (!messageContent.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const assistantMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '' }]);

    let attempt = 0;
    while (attempt <= MAX_RETRIES) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          // If it's a server/service issue and we can retry, throw to trigger retry logic
          if (response.status >= 500 && attempt < MAX_RETRIES) {
             throw new Error(errorData.error || `Request failed with status ${response.status}`);
          }
          // If it's a client error or final retry, show the error and stop.
          const finalErrorMessage = errorData.error || `An unexpected error occurred.`;
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: `Sorry, ${finalErrorMessage}` }
                : msg
            )
          );
          setIsLoading(false);
          return;
        }

        // Success case
        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantResponse = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantResponse += decoder.decode(value, { stream: true });
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: assistantResponse }
                : msg
            )
          );
        }
        
        setIsLoading(false);
        return; // Exit the loop on success

      } catch (error: any) {
        attempt++;
        if (attempt > MAX_RETRIES) {
          const finalMessage = error.message.includes('Service Unavailable') 
              ? error.message 
              : "I'm having trouble connecting. Please try again in a moment.";

          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: `Sorry, ${finalMessage}` }
                : msg
            )
          );
          setIsLoading(false);
          break; // Exit loop after final attempt
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
};
