
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Common function to check user authentication
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data.user) {
    console.error("User authentication error:", error);
    toast.error("Authentication error. Please log in again.");
    return null;
  }
  
  return data.user;
};

// Helper to format currency
export const formatCurrency = (amount: number, currency: string = 'INR') => {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency,
    maximumFractionDigits: 0
  }).format(amount);
};
