
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertCircle, Medal, Lightbulb, Coins, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";
import { FinancialInsight } from "@/utils/types";
import { fetchFinancialInsights } from "@/services/insightService";

const InsightsCard = () => {
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [dailyTip, setDailyTip] = useState<string>("Smart investments start with small, consistent deposits. Set up an automated SIP today.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const insightsData = await fetchFinancialInsights();
        setInsights(insightsData.slice(0, 3)); // Show top 3 insights
      } catch (error) {
        console.error("Error loading insights:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "tip":
        return <Lightbulb className="h-4 w-4" />;
      case "achievement":
        return <Medal className="h-4 w-4" />;
      case "warning":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "tip":
        return "bg-blue-50 text-blue-800 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30";
      case "achievement":
        return "bg-green-50 text-green-800 border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/30";
      case "warning":
        return "bg-amber-50 text-amber-800 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-900/30";
      default:
        return "bg-gray-50 text-gray-800 border-gray-100 dark:bg-gray-800/20 dark:text-gray-300 dark:border-gray-800/30";
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Financial Insights
        </CardTitle>
        <CardDescription>Smart recommendations powered by Kuberium AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          // Show skeleton loader when loading
          <div className="space-y-3">
            <div className="h-24 bg-muted animate-pulse rounded-md"></div>
            <div className="h-24 bg-muted animate-pulse rounded-md"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Alert className="bg-primary/10 border-primary/20">
                <FileSpreadsheet className="h-4 w-4 text-primary" />
                <AlertTitle className="text-sm font-medium">Tax Optimization</AlertTitle>
                <AlertDescription className="text-xs">Restructure your salary to save ₹45,000 in taxes annually</AlertDescription>
              </Alert>
              
              <Alert className="bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30">
                <Coins className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-sm font-medium">Investment Opportunity</AlertTitle>
                <AlertDescription className="text-xs">Nifty index funds have shown 12% CAGR over 5 years</AlertDescription>
              </Alert>
              
              <Alert className="bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-900/30">
                <Lightbulb className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-sm font-medium">Daily Tip</AlertTitle>
                <AlertDescription className="text-xs">{dailyTip}</AlertDescription>
              </Alert>
            </div>

            {insights.length > 0 ? (
              insights.map((insight) => (
                <Alert
                  key={insight.id}
                  className={cn("border", getInsightColor(insight.type))}
                >
                  <div className="flex-shrink-0 mr-1">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div>
                    <AlertTitle className="text-sm font-medium flex items-center">
                      {insight.title}
                      <Badge
                        variant="outline"
                        className="ml-2 text-[10px] h-5 capitalize"
                      >
                        {insight.type}
                      </Badge>
                    </AlertTitle>
                    <AlertDescription className="text-xs mt-1">
                      {insight.description}
                    </AlertDescription>
                  </div>
                </Alert>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground text-sm">
                Connect your accounts to get personalized AI-powered insights and investment recommendations.
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsCard;
