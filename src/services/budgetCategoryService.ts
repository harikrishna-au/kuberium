
import { supabase } from "@/integrations/supabase/client";
import { BudgetCategory } from "@/utils/types";
import { mapDbBudgetCategoryToType } from "./utils/serviceUtils";

export const getAllBudgetCategories = async (budgetId: string): Promise<BudgetCategory[]> => {
  try {
    const { data, error } = await supabase
      .from("budget_categories")
      .select("*")
      .eq("budget_id", budgetId);

    if (error) {
      throw error;
    }

    return (data || []).map(mapDbBudgetCategoryToType);
  } catch (error) {
    console.error("Error fetching budget categories:", error);
    return [];
  }
};

export const getBudgetCategoryById = async (id: string): Promise<BudgetCategory | null> => {
  try {
    const { data, error } = await supabase
      .from("budget_categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data ? mapDbBudgetCategoryToType(data) : null;
  } catch (error) {
    console.error("Error fetching budget category:", error);
    return null;
  }
};

export const deleteBudgetCategory = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("budget_categories")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error deleting budget category:", error);
    return false;
  }
};

export const createBudgetCategory = async (budgetCategory: BudgetCategory): Promise<BudgetCategory | null> => {
  try {
    // Convert the amount to a number
    const categoryToCreate = {
      budget_id: budgetCategory.budgetId,
      category_id: budgetCategory.categoryId,
      amount: Number(budgetCategory.amount)
    };

    const { data, error } = await supabase
      .from("budget_categories")
      .insert(categoryToCreate)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data ? mapDbBudgetCategoryToType(data) : null;
  } catch (error) {
    console.error("Error creating budget category:", error);
    return null;
  }
};

export const updateBudgetCategory = async (budgetCategory: BudgetCategory): Promise<BudgetCategory | null> => {
  try {
    // Convert amount to a number
    const categoryToUpdate = {
      amount: Number(budgetCategory.amount)
    };

    const { data, error } = await supabase
      .from("budget_categories")
      .update(categoryToUpdate)
      .eq("id", budgetCategory.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data ? mapDbBudgetCategoryToType(data) : null;
  } catch (error) {
    console.error("Error updating budget category:", error);
    return null;
  }
};
