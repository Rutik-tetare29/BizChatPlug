import { mockChatSessions } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ChatsTable() {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Last Message</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockChatSessions.map((session) => (
                        <TableRow key={session.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={session.user.avatar} alt={session.user.name} />
                                        <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{session.user.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="max-w-sm truncate">{session.latestMessage}</TableCell>
                            <TableCell>{session.timestamp}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                    View Chat
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
