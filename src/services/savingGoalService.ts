
import { supabase } from "@/integrations/supabase/client";
import { SavingGoal } from "@/utils/types";
import { toast } from "sonner";
import { getCurrentUser } from "./utils/serviceUtils";

// Saving Goals
export const fetchSavingGoals = async (): Promise<SavingGoal[]> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return [];
  }
  
  const { data, error } = await supabase
    .from("saving_goals")
    .select("*")
    .eq("user_id", userData.id);
    
  if (error) {
    console.error("Error fetching saving goals:", error);
    toast.error("Failed to load saving goals");
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    targetAmount: parseFloat(item.target_amount),
    currentAmount: parseFloat(item.current_amount),
    deadline: item.deadline
  }));
};

export const createSavingGoal = async (goal: Omit<SavingGoal, "id">): Promise<SavingGoal | null> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return null;
  }
  
  const { data, error } = await supabase
    .from("saving_goals")
    .insert({
      name: goal.name,
      target_amount: goal.targetAmount,
      current_amount: goal.currentAmount,
      deadline: goal.deadline,
      user_id: userData.id
    })
    .select()
    .single();
    
  if (error) {
    console.error("Error creating saving goal:", error);
    toast.error("Failed to create saving goal");
    return null;
  }
  
  toast.success("Saving goal created successfully!");
  
  return {
    id: data.id,
    name: data.name,
    targetAmount: parseFloat(data.target_amount),
    currentAmount: parseFloat(data.current_amount),
    deadline: data.deadline
  };
};

export const updateSavingGoal = async (id: string, amount: number): Promise<boolean> => {
  const { error } = await supabase
    .from("saving_goals")
    .update({ current_amount: amount })
    .eq("id", id);
    
  if (error) {
    console.error("Error updating saving goal:", error);
    toast.error("Failed to update saving goal");
    return false;
  }
  
  toast.success("Saving goal updated successfully!");
  return true;
};

export const deleteSavingGoal = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from("saving_goals")
    .delete()
    .eq("id", id);
    
  if (error) {
    console.error("Error deleting saving goal:", error);
    toast.error("Failed to delete saving goal");
    return false;
  }
  
  toast.success("Saving goal deleted successfully!");
  return true;
};
