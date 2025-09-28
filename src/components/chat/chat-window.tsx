import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import SuggestedQuestions from "./suggested-questions";
import { useChat } from "@/hooks/use-chat";

type ChatWindowProps = {
  onClose: () => void;
};

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat();

  const handleQuestionSelect = (question: string) => {
    setInput(question);
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>;
    handleSubmit(fakeEvent, {
      options: {
        body: JSON.stringify({ messages: [...messages, { id: Date.now().toString(), role: 'user', content: question }]})
      }
    });
  };

  return (
    <div className="w-[calc(100vw-2.5rem)] max-w-md h-[70vh] max-h-[600px] bg-card rounded-xl shadow-2xl flex flex-col animate-slide-in-up origin-bottom-right">
      <ChatHeader onClose={onClose} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <ChatMessages messages={messages} />
        {messages.length === 0 && (
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
