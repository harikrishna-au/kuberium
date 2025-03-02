
import { supabase } from "@/integrations/supabase/client";
import { FinancialInsight } from "@/utils/types";
import { toast } from "sonner";
import { getCurrentUser } from "./utils/serviceUtils";
import { generateExpenseSummary } from "./expenseService";

// Financial Insights
export const fetchFinancialInsights = async (): Promise<FinancialInsight[]> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return [];
  }
  
  const { data, error } = await supabase
    .from("financial_insights")
    .select("*")
    .eq("user_id", userData.id)
    .order("date", { ascending: false });
    
  if (error) {
    console.error("Error fetching financial insights:", error);
    toast.error("Failed to load financial insights");
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    type: item.type as "tip" | "warning" | "achievement",
    date: item.date
  }));
};

// Generate financial tips
export const generateFinancialTip = async (): Promise<string> => {
  const tips = [
    "Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.",
    "Review your subscriptions monthly and cancel those you don't use regularly.",
    "Set up automatic transfers to your savings account on payday.",
    "Consider using a budgeting app to track all your expenses automatically.",
    "Always compare prices before making big purchases.",
    "Use cash instead of cards for discretionary spending to be more conscious of your expenses.",
    "Invest early, even small amounts, to benefit from compound interest.",
    "Maintain an emergency fund with 3-6 months of essential expenses.",
    "Prioritize high-interest debt repayment before focusing on investments.",
    "Look for cashback and rewards programs for your regular expenses.",
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

// Generate insights based on spending patterns
export const generateInsights = async (): Promise<FinancialInsight[]> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return [];
  }
  
  try {
    // Get expense summary
    const summary = await generateExpenseSummary();
    
    const insights: FinancialInsight[] = [];
    
    // Check if spending is higher than income
    if (summary.totalExpenses > summary.totalIncome) {
      const overspendingInsight: FinancialInsight = {
        id: "auto-1",
        title: "Spending Alert",
        description: "Your spending exceeds your income this month. Consider reviewing your budget.",
        type: "warning",
        date: new Date().toISOString()
      };
      insights.push(overspendingInsight);
      
      // Save to database
      await supabase.from("financial_insights").insert({
        title: overspendingInsight.title,
        description: overspendingInsight.description,
        type: overspendingInsight.type,
        user_id: userData.id
      });
    }
    
    // Check if savings is improving
    if (summary.netSavings > 0 && summary.netSavings > summary.totalIncome * 0.2) {
      const savingsInsight: FinancialInsight = {
        id: "auto-2",
        title: "Savings Achievement",
        description: "Great job! You've saved more than 20% of your income this month.",
        type: "achievement",
        date: new Date().toISOString()
      };
      insights.push(savingsInsight);
      
      // Save to database
      await supabase.from("financial_insights").insert({
        title: savingsInsight.title,
        description: savingsInsight.description,
        type: savingsInsight.type,
        user_id: userData.id
      });
    }
    
    return insights;
  } catch (error) {
    console.error("Error generating insights:", error);
    return [];
  }
};
