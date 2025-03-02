
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/utils/types";
import { toast } from "sonner";

// Categories
export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*");
    
  if (error) {
    console.error("Error fetching categories:", error);
    toast.error("Failed to load categories");
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    icon: item.icon,
    color: item.color
  }));
};
