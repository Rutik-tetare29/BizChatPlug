import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import SuggestedQuestions from "./suggested-questions";
import { useChat } from "@/hooks/use-chat";
import { Skeleton } from "@/components/ui/skeleton";

type ChatWindowProps = {
  onClose: () => void;
};

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  const handleQuestionSelect = (question: string) => {
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>;
    // The hook now handles extracting the message content
    handleSubmit(fakeEvent, {
      options: {
        body: JSON.stringify({ messages: [{ id: Date.now().toString(), role: 'user', content: question }]})
      }
    });
  };

  return (
    <div className="w-[calc(100vw-2.5rem)] max-w-md h-[70vh] max-h-[600px] bg-card rounded-xl shadow-2xl flex flex-col animate-slide-in-up origin-bottom-right">
      <ChatHeader onClose={onClose} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <ChatMessages messages={messages} />
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
           <div className="flex items-end gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-3/5 h-10 rounded-lg" />
           </div>
        )}
        {messages.length <= 1 && !isLoading && (
          <SuggestedQuestions onQuestionSelect={handleQuestionSelect} />
        )}
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
