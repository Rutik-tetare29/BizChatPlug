import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAnalyticsStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function AnalyticsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mockAnalyticsStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className={cn(
                "mr-1",
                stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
              )}>
                {stat.change}
                {stat.changeType === 'increase' ? <TrendingUp className="inline-block h-4 w-4" /> : <TrendingDown className="inline-block h-4 w-4" />}
              </span>
               from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
