
import { supabase } from "@/integrations/supabase/client";
import { Budget, BudgetCategory } from "@/utils/types";
import { getUserId, mapDbBudgetToType, mapDbBudgetCategoryToType } from "./utils/serviceUtils";

export const getAllBudgets = async (): Promise<Budget[]> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("budgets")
      .select("*, budget_categories(*)")
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return (data || []).map(mapDbBudgetToType);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return [];
  }
};

export const getBudgetById = async (id: string): Promise<Budget | null> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("budgets")
      .select("*, budget_categories(*)")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data ? mapDbBudgetToType(data) : null;
  } catch (error) {
    console.error("Error fetching budget:", error);
    return null;
  }
};

export const getBudgetByMonthYear = async (month: number, year: number): Promise<Budget | null> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("budgets")
      .select("*, budget_categories(*)")
      .eq("user_id", userId)
      .eq("month", month)
      .eq("year", year)
      .single();

    if (error) {
      throw error;
    }

    return data ? mapDbBudgetToType(data) : null;
  } catch (error) {
    console.error("Error fetching budget:", error);
    return null;
  }
};

export const deleteBudget = async (id: string): Promise<boolean> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("budgets")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error deleting budget:", error);
    return false;
  }
};

export const updateBudget = async (budget: Budget): Promise<Budget | null> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Update budget
    const { data, error } = await supabase
      .from("budgets")
      .update({
        total_budget: budget.totalBudget,
      })
      .eq("id", budget.id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data ? mapDbBudgetToType(data) : null;
  } catch (error) {
    console.error("Error updating budget:", error);
    return null;
  }
};

export const createBudget = async (budget: Omit<Budget, "id">): Promise<Budget | null> => {
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("budgets")
      .insert({
        user_id: userId,
        month: budget.month,
        year: budget.year,
        total_budget: budget.totalBudget,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    const newBudget = data ? mapDbBudgetToType(data) : null;
    
    // If we have categories to add and the budget was created successfully
    if (newBudget && budget.categories && budget.categories.length > 0) {
      await Promise.all(budget.categories.map(category => 
        createBudgetCategory({
          id: '',
          categoryId: category.categoryId,
          amount: category.amount,
          spent: 0,
          budgetId: newBudget.id
        })
      ));
      
      // Fetch the budget again with categories
      return await getBudgetById(newBudget.id);
    }

    return newBudget;
  } catch (error) {
    console.error("Error creating budget:", error);
    return null;
  }
};

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
