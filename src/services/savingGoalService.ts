import { supabase } from "@/integrations/supabase/client";
import { SavingGoal } from "@/utils/types";
import { getUserId } from "./utils/serviceUtils";

export const getAllSavingGoals = async (): Promise<SavingGoal[]> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("saving_goals")
      .select("*")
      .eq("user_id", userId)
      .order("deadline", { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching saving goals:", error);
    return [];
  }
};

export const getSavingGoalById = async (id: string): Promise<SavingGoal | null> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("saving_goals")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching saving goal:", error);
    return null;
  }
};

export const createSavingGoal = async (goal: SavingGoal): Promise<SavingGoal | null> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Make sure target_amount and current_amount are numbers
    const goalToCreate = {
      user_id: userId,
      name: goal.name,
      target_amount: Number(goal.target_amount),
      current_amount: Number(goal.current_amount || 0),
      deadline: goal.deadline,
    };

    const { data, error } = await supabase
      .from("saving_goals")
      .insert(goalToCreate)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating saving goal:", error);
    return null;
  }
};

export const updateSavingGoal = async (goal: SavingGoal): Promise<SavingGoal | null> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Make sure target_amount and current_amount are numbers
    const goalToUpdate = {
      name: goal.name,
      target_amount: Number(goal.target_amount),
      current_amount: Number(goal.current_amount),
      deadline: goal.deadline,
    };

    const { data, error } = await supabase
      .from("saving_goals")
      .update(goalToUpdate)
      .eq("id", goal.id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error updating saving goal:", error);
    return null;
  }
};

export const deleteSavingGoal = async (id: string): Promise<boolean> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("saving_goals")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error deleting saving goal:", error);
    return false;
  }
};
