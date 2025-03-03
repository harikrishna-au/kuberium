
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
