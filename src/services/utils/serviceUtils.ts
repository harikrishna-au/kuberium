
import { supabase } from "@/integrations/supabase/client";

export const getUserId = async (): Promise<string | null> => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      throw error;
    }
    
    return data?.user?.id || null;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      throw error;
    }
    
    return data?.user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const formatCurrency = (amount: number, currency = "INR"): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
};
