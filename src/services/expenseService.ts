
import { supabase } from "@/integrations/supabase/client";
import { Expense, ExpenseSummary } from "@/utils/types";
import { toast } from "sonner";
import { getCurrentUser } from "./utils/serviceUtils";
import { fetchCategories } from "./categoryService";

// Expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });
    
  if (error) {
    console.error("Error fetching expenses:", error);
    toast.error("Failed to load expenses");
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    amount: item.amount,
    description: item.description,
    category: item.category_id,
    date: item.date,
    type: item.type as "expense" | "income",
    paymentMethod: item.payment_method
  }));
};

export const addExpense = async (expense: Omit<Expense, "id">): Promise<Expense | null> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return null;
  }
  
  const { data, error } = await supabase
    .from("expenses")
    .insert({
      amount: expense.amount,
      description: expense.description,
      category_id: expense.category,
      date: expense.date,
      type: expense.type,
      payment_method: expense.paymentMethod,
      user_id: userData.id
    })
    .select()
    .single();
    
  if (error) {
    console.error("Error adding expense:", error);
    toast.error("Failed to add expense");
    return null;
  }
  
  toast.success(`${expense.type === 'income' ? 'Income' : 'Expense'} added successfully!`);
  
  return {
    id: data.id,
    amount: data.amount,
    description: data.description,
    category: data.category_id,
    date: data.date,
    type: data.type as "expense" | "income",
    paymentMethod: data.payment_method
  };
};

export const deleteExpense = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id);
    
  if (error) {
    console.error("Error deleting expense:", error);
    toast.error("Failed to delete expense");
    return false;
  }
  
  toast.success("Expense deleted successfully!");
  return true;
};

// Generate summary from actual expense data
export const generateExpenseSummary = async (): Promise<ExpenseSummary> => {
  // Fetch expenses
  const expenses = await fetchExpenses();
  
  const totalIncome = expenses
    .filter(expense => expense.type === 'income')
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  
  const totalExpenses = expenses
    .filter(expense => expense.type === 'expense')
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  
  const netSavings = totalIncome - totalExpenses;
  
  const categorySpending: {[key: string]: number} = {};
  
  expenses
    .filter(expense => expense.type === 'expense')
    .forEach(expense => {
      if (categorySpending[expense.category]) {
        categorySpending[expense.category] += Number(expense.amount);
      } else {
        categorySpending[expense.category] = Number(expense.amount);
      }
    });
  
  return {
    totalIncome,
    totalExpenses,
    netSavings,
    totalBalance: totalIncome - totalExpenses, // Use actual data
    categories: categorySpending,
  };
};
