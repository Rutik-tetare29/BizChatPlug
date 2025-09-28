import AnalyticsCards from "@/components/dashboard/analytics-cards";
import RecentChats from "@/components/dashboard/recent-chats";
import TopQuestionsChart from "@/components/dashboard/top-questions-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
        <p className="text-muted-foreground">
          Here's a look at your chatbot's performance.
        </p>
      </div>

      <AnalyticsCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Top Questions</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <TopQuestionsChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Chats</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentChats />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
