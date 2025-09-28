"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { mockTopQuestionsData } from "@/lib/mock-data";

export default function TopQuestionsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={mockTopQuestionsData} layout="vertical">
        <XAxis type="number" hide />
        <YAxis 
          dataKey="question" 
          type="category" 
          stroke="hsl(var(--foreground))"
          fontSize={12} 
          tickLine={false}
          axisLine={false}
          width={120}
        />
        <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            contentStyle={{ 
                background: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)'
            }}
        />
        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
