
import { supabase } from "@/integrations/supabase/client";
import { FinancialInsight } from "@/utils/types";
import { toast } from "sonner";
import { getUserId } from "./utils/serviceUtils";

// Renamed to match the export in index.ts
export const fetchFinancialInsights = async (): Promise<FinancialInsight[]> => {
  const userId = await getUserId();
  
  if (!userId) {
    return [];
  }
  
  const { data, error } = await supabase
    .from("financial_insights")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });
    
  if (error) {
    console.error("Error fetching financial insights:", error);
    toast.error("Failed to load financial insights");
    return [];
  }
  
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    type: item.type as 'tip' | 'warning' | 'achievement',
    date: item.date
  }));
};
