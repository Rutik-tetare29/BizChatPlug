import ChatsTable from "@/components/dashboard/chats-table";

export default function ChatsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Chat History</h2>
                <p className="text-muted-foreground">
                    Review all conversations from your users.
                </p>
            </div>
            <ChatsTable />
        </div>
    );
}
