import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ChatBubbleProps = {
  onClick: () => void;
};

export default function ChatBubble({ onClick }: ChatBubbleProps) {
  return (
    <Button
      onClick={onClick}
      className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center animate-fade-in"
      aria-label="Open chat"
    >
      <MessageSquare className="w-8 h-8 text-primary-foreground" />
    </Button>
  );
}
