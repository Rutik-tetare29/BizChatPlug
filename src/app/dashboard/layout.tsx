import DashboardNav from "@/components/dashboard/dashboard-nav";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PanelLeft } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex">
      <aside className="hidden lg:block w-64 border-r bg-card">
        <DashboardNav />
      </aside>
      <div className="flex flex-col w-full">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <DashboardNav isMobile />
            </SheetContent>
          </Sheet>
          <div className="flex-1">
             <h1 className="font-semibold text-lg">Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
