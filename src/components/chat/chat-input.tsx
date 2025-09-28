import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type ChatInputProps = {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ChatInput({ input, handleInputChange, handleSubmit }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="relative">
        <Textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="pr-12 resize-none"
          rows={1}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
          disabled={!input.trim()}
        >
          <Send className="w-4 h-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
}
