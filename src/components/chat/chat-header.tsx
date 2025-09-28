import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Logo } from "@/components/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";


type ChatHeaderProps = {
  onClose: () => void;
};

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  const agentAvatar = PlaceHolderImages.find(p => p.id === "3");

  return (
    <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between rounded-t-xl">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar>
             {agentAvatar && <AvatarImage src={agentAvatar.imageUrl} alt="Support Agent" data-ai-hint={agentAvatar.imageHint} />}
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-primary" />
        </div>
        <div>
          <p className="font-bold">BizChat Support</p>
          <p className="text-xs text-primary-foreground/80">Typically replies instantly</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-primary/80">
        <X className="w-5 h-5" />
        <span className="sr-only">Close chat</span>
      </Button>
    </div>
  );
}
