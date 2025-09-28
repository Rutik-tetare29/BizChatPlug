import LeadsTable from "@/components/dashboard/leads-table";

export default function LeadsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Captured Leads</h2>
                <p className="text-muted-foreground">
                    Here are all the leads captured by your chatbot.
                </p>
            </div>
            <LeadsTable />
        </div>
    );
}
