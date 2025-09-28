import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";

type ChatMessageProps = {
  message: Message;
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';
  const agentAvatar = PlaceHolderImages.find(p => p.id === "3");
  const userAvatar = PlaceHolderImages.find(p => p.id === "4");

  return (
    <div className={cn("flex items-end gap-2", { "justify-end": !isAssistant })}>
      {isAssistant && (
        <Avatar className="w-8 h-8">
           {agentAvatar && <AvatarImage src={agentAvatar.imageUrl} alt="Support Agent" data-ai-hint={agentAvatar.imageHint} />}
          <AvatarFallback>
            <Logo className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-xs md:max-w-md rounded-lg p-3 text-sm",
          isAssistant
            ? "bg-muted rounded-bl-none"
            : "bg-primary text-primary-foreground rounded-br-none"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {!isAssistant && (
        <Avatar className="w-8 h-8">
          {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User" data-ai-hint={userAvatar.imageHint} />}
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
