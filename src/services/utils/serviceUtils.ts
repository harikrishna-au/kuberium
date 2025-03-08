
import { supabase } from "@/integrations/supabase/client";
import { Budget, BudgetCategory, SavingGoal } from "@/utils/types";

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

export const mapDbBudgetToType = (dbBudget: any): Budget => {
  return {
    id: dbBudget.id,
    month: dbBudget.month,
    year: dbBudget.year,
    totalBudget: dbBudget.total_budget,
    categories: Array.isArray(dbBudget.budget_categories) 
      ? dbBudget.budget_categories.map(mapDbBudgetCategoryToType) 
      : []
  };
};

export const mapDbBudgetCategoryToType = (dbCategory: any): BudgetCategory => {
  return {
    id: dbCategory.id,
    categoryId: dbCategory.category_id,
    amount: dbCategory.amount,
    spent: 0 // Default value as it might not be in the database
  };
};

export const mapDbSavingGoalToType = (dbGoal: any): SavingGoal => {
  return {
    id: dbGoal.id,
    name: dbGoal.name,
    targetAmount: dbGoal.target_amount,
    currentAmount: dbGoal.current_amount,
    deadline: dbGoal.deadline
  };
};
