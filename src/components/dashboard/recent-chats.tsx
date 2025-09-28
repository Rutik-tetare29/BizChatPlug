import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockChatSessions } from "@/lib/mock-data";

export default function RecentChats() {
  return (
    <div className="space-y-6">
      {mockChatSessions.map((session) => (
        <div key={session.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={session.user.avatar} alt="Avatar" />
            <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <p className="text-sm text-muted-foreground truncate max-w-xs">{session.latestMessage}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-medium text-sm">{session.timestamp}</p>
            {session.unreadCount > 0 && 
              <div className="mt-1 w-5 h-5 text-xs flex items-center justify-center rounded-full bg-primary text-primary-foreground ml-auto">
                {session.unreadCount}
              </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
}
