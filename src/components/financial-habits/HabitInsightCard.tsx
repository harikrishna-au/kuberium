
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HabitInsightCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Habit Performance</CardTitle>
        <CardDescription>Your habit consistency over the past 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60 flex items-center justify-center border-2 border-dashed rounded-md">
          <p className="text-muted-foreground">Habit consistency chart will appear here</p>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span>Overall consistency score</span>
            <span className="font-medium">85%</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Most consistent habit</span>
            <span className="font-medium">Save 10% of income</span>
          </div>
          <div className="flex justify-between">
            <span>Habit needing attention</span>
            <span className="font-medium">Review investment portfolio</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitInsightCard;
