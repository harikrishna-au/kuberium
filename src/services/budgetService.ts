
import { supabase } from "@/integrations/supabase/client";
import { Budget, BudgetCategory } from "@/utils/types";
import { toast } from "sonner";
import { getCurrentUser } from "./utils/serviceUtils";

// Budgets
export const fetchBudgets = async (month: number, year: number): Promise<Budget | null> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return null;
  }
  
  const { data, error } = await supabase
    .from("budgets")
    .select(`
      *,
      budget_categories(*)
    `)
    .eq("month", month.toString())
    .eq("year", year.toString())
    .eq("user_id", userData.id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching budget:", error);
    toast.error("Failed to load budget");
    return null;
  }
  
  if (!data) {
    return null;
  }
  
  // Calculate spent amount for each category
  const { data: expenses, error: expenseError } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userData.id)
    .eq("type", "expense")
    .gte("date", new Date(year, month - 1, 1).toISOString())
    .lt("date", new Date(year, month, 1).toISOString());
    
  if (expenseError) {
    console.error("Error fetching expenses for budget:", expenseError);
  }
  
  const budgetCategories: BudgetCategory[] = data.budget_categories.map((item: any) => {
    // Calculate spent amount for this category
    const categoryExpenses = expenses?.filter(exp => exp.category_id === item.category_id) || [];
    const spent = categoryExpenses.reduce((sum: number, exp: any) => sum + parseFloat(exp.amount), 0);
    
    return {
      id: item.id,
      categoryId: item.category_id,
      amount: parseFloat(item.amount),
      spent: spent,
    };
  });
  
  return {
    id: data.id,
    month: parseInt(data.month),
    year: parseInt(data.year),
    totalBudget: parseFloat(data.total_budget),
    categories: budgetCategories
  };
};

export const createBudget = async (budget: Omit<Budget, "id">): Promise<Budget | null> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return null;
  }
  
  // First create the budget
  const { data: budgetData, error: budgetError } = await supabase
    .from("budgets")
    .insert({
      month: budget.month.toString(),
      year: budget.year.toString(),
      total_budget: budget.totalBudget,
      user_id: userData.id
    })
    .select()
    .single();
    
  if (budgetError) {
    console.error("Error creating budget:", budgetError);
    toast.error("Failed to create budget");
    return null;
  }
  
  // Then create budget categories
  const budgetCategoriesData = budget.categories.map(category => ({
    category_id: category.categoryId,
    amount: category.amount,
    budget_id: budgetData.id
  }));
  
  const { data: categoriesData, error: categoriesError } = await supabase
    .from("budget_categories")
    .insert(budgetCategoriesData)
    .select();
    
  if (categoriesError) {
    console.error("Error creating budget categories:", categoriesError);
    toast.error("Failed to create budget categories");
    // Try to clean up the budget
    await supabase.from("budgets").delete().eq("id", budgetData.id);
    return null;
  }
  
  toast.success("Budget created successfully!");
  
  // Calculate spent amount for each category (initially 0 for new budget)
  const budgetCategories: BudgetCategory[] = categoriesData.map((item: any) => ({
    id: item.id,
    categoryId: item.category_id,
    amount: parseFloat(item.amount),
    spent: 0
  }));
  
  return {
    id: budgetData.id,
    month: parseInt(budgetData.month),
    year: parseInt(budgetData.year),
    totalBudget: parseFloat(budgetData.total_budget),
    categories: budgetCategories
  };
};

export const updateBudget = async (budgetId: string, budgetCategory: { categoryId: string, amount: number }): Promise<boolean> => {
  const { error } = await supabase
    .from("budget_categories")
    .update({ amount: budgetCategory.amount })
    .eq("budget_id", budgetId)
    .eq("category_id", budgetCategory.categoryId);
    
  if (error) {
    console.error("Error updating budget category:", error);
    toast.error("Failed to update budget");
    return false;
  }
  
  toast.success("Budget updated successfully!");
  return true;
};
