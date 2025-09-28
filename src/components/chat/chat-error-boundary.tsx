"use client";

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ChatErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Chat Error Boundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-[calc(100vw-2.5rem)] max-w-md h-[70vh] max-h-[600px] bg-card rounded-xl shadow-2xl flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold mb-2">Chat Error</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Something went wrong with the chat system. This might be due to missing API configuration.
          </p>
          <div className="space-y-2">
            <Button
              onClick={() => this.setState({ hasError: false })}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <p className="text-xs text-muted-foreground">
              If this persists, check your Google AI API key configuration
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChatErrorBoundary;