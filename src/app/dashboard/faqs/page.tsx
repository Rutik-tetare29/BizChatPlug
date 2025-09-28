import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import FaqsTable from "@/components/dashboard/faqs-table";

export default function FaqsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Manage FAQs</h2>
                    <p className="text-muted-foreground">
                        View, add, and edit your frequently asked questions.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add FAQ
                </Button>
            </div>
            <FaqsTable />
        </div>
    );
}
