"use client";

import { useState, useEffect } from 'react';
import type { Message } from '@/lib/types';

export const useChat = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'init',
          role: 'assistant',
          content: "Hello! I'm the BizChat assistant. How can I help you today?",
        },
      ]);
    }
  }, [messages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, options?: { options?: { body: string }}) => {
    e.preventDefault();
    if (!input.trim() && !options) return;

    const userInput = input;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userInput,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      body: options?.options?.body || JSON.stringify({ messages: newMessages }),
    });

    if (!response.body) return;
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantResponse = '';
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
    };
    setMessages(prev => [...prev, assistantMessage]);

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
    };
    processStream();
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
  };
};
