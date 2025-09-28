"use client";

import { useState, useEffect } from 'react';
import type { Message } from '@/lib/types';

const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

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

    let retries = 0;
    let response: Response | null = null;
    let done = false;

    while (retries <= MAX_RETRIES && !done) {
      try {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages }),
        });
        
        if (response.ok) {
          done = true;
        } else if (response.status === 503 && retries < MAX_RETRIES) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        } else {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || `Request failed with status ${response.status}`);
        }
      } catch (error) {
        if (retries < MAX_RETRIES) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        } else {
            console.error("Chat API error after retries:", error);
            let errorMessage = "An unknown error occurred.";
            
            if (error instanceof Error) {
                errorMessage = error.message;
                
                if (errorMessage.includes('API key') || errorMessage.includes('configuration')) {
                    errorMessage = "Chat service is currently unavailable due to configuration issues. Please try again later.";
                } else if (errorMessage.includes('503') || errorMessage.includes('Service Unavailable')) {
                    errorMessage = "The AI service is temporarily unavailable. Please try again in a few moments.";
                } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
                    errorMessage = "Network error. Please check your connection and try again.";
                }
            }
            
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === assistantMessage.id
                        ? { ...msg, content: `Sorry, ${errorMessage}` }
                        : msg
                )
            );
            setIsLoading(false);
            return;
        }
      }
    }


    if (!response || !response.ok) {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === assistantMessage.id
                    ? { ...msg, content: `Sorry, The AI service is temporarily unavailable. Please try again in a few moments.` }
                    : msg
            )
        );
        setIsLoading(false);
        return;
    }


    try {
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
      let errorMessage = "An unknown error occurred.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessage.id
            ? { ...msg, content: `Sorry, ${errorMessage}` }
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