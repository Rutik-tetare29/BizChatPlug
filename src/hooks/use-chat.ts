"use client";

import { useState, useEffect } from 'react';
import type { Message } from '@/lib/types';

export const useChat = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
    };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          assistantResponse += decoder.decode(value, { stream: true });
          
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessage.id
                ? { ...msg, content: assistantResponse }
                : msg
            )
          );
        }
        setIsLoading(false);
      };
      processStream();

    } catch (error) {
      console.error("Chat API error:", error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessage.id
            ? { ...msg, content: "Sorry, I'm having trouble connecting. Please try again." }
            : msg
        )
      );
      setIsLoading(false);
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
