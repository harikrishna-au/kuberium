
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { financialInsights, getDailyFinancialTip } from "@/utils/mockData";
import { AlertCircle, CheckCircle2, LightbulbIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InsightsCard = () => {
  const dailyTip = getDailyFinancialTip();
  
  // Sort insights by date (newest first)
  const sortedInsights = [...financialInsights].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Financial Insights</CardTitle>
        <CardDescription>AI-powered tips and recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="insights" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="tip">Daily Tip</TabsTrigger>
          </TabsList>
          
          <TabsContent value="insights" className="space-y-4 pt-2">
            {sortedInsights.map((insight) => (
              <div 
                key={insight.id}
                className={cn(
                  "p-4 rounded-lg border transition-all animate-slideUp",
                  insight.type === 'warning' ? "bg-expense-50 border-expense-200 dark:bg-expense-950/20 dark:border-expense-900/30" :
                  insight.type === 'achievement' ? "bg-income-50 border-income-200 dark:bg-income-950/20 dark:border-income-900/30" :
                  "bg-secondary border-muted"
                )}
              >
                <div className="flex">
                  <div className="mr-3 mt-0.5">
                    {insight.type === 'warning' ? (
                      <AlertCircle className="h-5 w-5 text-expense-500" />
                    ) : insight.type === 'achievement' ? (
                      <CheckCircle2 className="h-5 w-5 text-income-500" />
                    ) : (
                      <LightbulbIcon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h4 className={cn(
                      "text-sm font-medium mb-1",
                      insight.type === 'warning' ? "text-expense-800 dark:text-expense-400" :
                      insight.type === 'achievement' ? "text-income-800 dark:text-income-400" :
                      "text-foreground"
                    )}>
                      {insight.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(insight.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="tip" className="pt-2">
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 dark:bg-primary/10">
              <div className="flex">
                <div className="mr-3 mt-0.5">
                  <LightbulbIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Daily Financial Tip</h4>
                  <p className="text-sm text-muted-foreground">{dailyTip}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-4 rounded-lg border bg-muted">
              <h4 className="text-sm font-medium mb-2">Want personalized advice?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI can analyze your spending patterns and provide custom recommendations.
              </p>
              <button className="text-sm text-primary hover:text-primary/80 font-medium">
                Get Personalized Advice →
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InsightsCard;
