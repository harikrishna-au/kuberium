
import { createClient } from '@supabase/supabase-js';
import { Category, Expense, Budget, BudgetCategory, SavingGoal, FinancialInsight, ExpenseSummary } from '@/utils/types';

// Create a single supabase client for interacting with your database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qltmedibztziaduyesqv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsdG1lZGlienR6aWFkdXllc3F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyNTI0OTcsImV4cCI6MjAyNjgyODQ5N30.mUPGpSI7uF6WUiMEEBP-V2VcKY8uHHNZUqZm9FZvOig';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    icon: item.icon,
    color: item.color
  }));
}

export async function addCategory(category: Omit<Category, 'id'>): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();

  if (error) {
    console.error('Error adding category:', error);
    return null;
  }
  
  return data;
}

// Expenses
export async function getExpenses(): Promise<Expense[]> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    amount: item.amount,
    description: item.description,
    category: item.category_id,
    date: item.date,
    type: item.type as 'expense' | 'income',
    paymentMethod: item.payment_method
  }));
}

export async function addExpense(expense: Omit<Expense, 'id'>): Promise<Expense | null> {
  const { data, error } = await supabase
    .from('expenses')
    .insert([{
      amount: expense.amount,
      description: expense.description,
      category_id: expense.category,
      date: expense.date,
      type: expense.type,
      payment_method: expense.paymentMethod
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding expense:', error);
    return null;
  }
  
  return {
    id: data.id,
    amount: data.amount,
    description: data.description,
    category: data.category_id,
    date: data.date,
    type: data.type as 'expense' | 'income',
    paymentMethod: data.payment_method
  };
}

export async function deleteExpense(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .match({ id });

  if (error) {
    console.error('Error deleting expense:', error);
    return false;
  }
  
  return true;
}

// Budgets
export async function getBudgets(): Promise<Budget[]> {
  const { data, error } = await supabase
    .from('budgets')
    .select(`
      *,
      budget_categories(*)
    `)
    .order('year', { ascending: false })
    .order('month', { ascending: false });

  if (error) {
    console.error('Error fetching budgets:', error);
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    month: item.month,
    year: item.year,
    totalBudget: item.total_budget,
    categories: item.budget_categories.map((cat: any) => ({
      id: cat.id,
      categoryId: cat.category_id,
      amount: cat.amount,
      spent: 0 // This will need to be calculated separately
    }))
  }));
}

export async function getCurrentBudget(): Promise<Budget | null> {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
  const currentYear = now.getFullYear();
  
  const { data, error } = await supabase
    .from('budgets')
    .select(`
      *,
      budget_categories(*)
    `)
    .eq('month', currentMonth)
    .eq('year', currentYear)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // No rows returned
      return null;
    }
    console.error('Error fetching current budget:', error);
    return null;
  }
  
  return {
    id: data.id,
    month: data.month,
    year: data.year,
    totalBudget: data.total_budget,
    categories: data.budget_categories.map((cat: any) => ({
      id: cat.id,
      categoryId: cat.category_id,
      amount: cat.amount,
      spent: 0 // This will need to be calculated
    }))
  };
}

export async function createBudget(budget: Omit<Budget, 'id'>): Promise<Budget | null> {
  // First create the budget
  const { data: budgetData, error: budgetError } = await supabase
    .from('budgets')
    .insert([{
      month: budget.month,
      year: budget.year,
      total_budget: budget.totalBudget
    }])
    .select()
    .single();

  if (budgetError) {
    console.error('Error creating budget:', budgetError);
    return null;
  }
  
  // Then add the budget categories
  const budgetCategories = budget.categories.map(cat => ({
    budget_id: budgetData.id,
    category_id: cat.categoryId,
    amount: cat.amount
  }));
  
  const { data: categoriesData, error: categoriesError } = await supabase
    .from('budget_categories')
    .insert(budgetCategories)
    .select();

  if (categoriesError) {
    console.error('Error creating budget categories:', categoriesError);
    // Consider deleting the budget we just created to avoid orphaned data
    return null;
  }
  
  return {
    id: budgetData.id,
    month: budgetData.month,
    year: budgetData.year,
    totalBudget: budgetData.total_budget,
    categories: categoriesData.map((cat: any) => ({
      id: cat.id,
      categoryId: cat.category_id,
      amount: cat.amount,
      spent: 0 // This will need to be calculated
    }))
  };
}

// Saving Goals
export async function getSavingGoals(): Promise<SavingGoal[]> {
  const { data, error } = await supabase
    .from('saving_goals')
    .select('*')
    .order('deadline');

  if (error) {
    console.error('Error fetching saving goals:', error);
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    targetAmount: item.target_amount,
    currentAmount: item.current_amount,
    deadline: item.deadline
  }));
}

export async function addSavingGoal(goal: Omit<SavingGoal, 'id'>): Promise<SavingGoal | null> {
  const { data, error } = await supabase
    .from('saving_goals')
    .insert([{
      name: goal.name,
      target_amount: goal.targetAmount,
      current_amount: goal.currentAmount,
      deadline: goal.deadline
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding saving goal:', error);
    return null;
  }
  
  return {
    id: data.id,
    name: data.name,
    targetAmount: data.target_amount,
    currentAmount: data.current_amount,
    deadline: data.deadline
  };
}

export async function updateSavingGoal(id: string, amount: number): Promise<boolean> {
  const { error } = await supabase
    .from('saving_goals')
    .update({ current_amount: amount })
    .match({ id });

  if (error) {
    console.error('Error updating saving goal:', error);
    return false;
  }
  
  return true;
}

// Financial Insights
export async function getFinancialInsights(): Promise<FinancialInsight[]> {
  const { data, error } = await supabase
    .from('financial_insights')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching financial insights:', error);
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    type: item.type as 'tip' | 'warning' | 'achievement',
    date: item.date
  }));
}

// Analytics functions
export async function getExpenseSummary(
  startDate: string, 
  endDate: string
): Promise<ExpenseSummary> {
  // Get all expenses within the date range
  const { data: expenses, error: expensesError } = await supabase
    .from('expenses')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate);

  if (expensesError) {
    console.error('Error fetching expenses for summary:', expensesError);
    return {
      totalIncome: 0,
      totalExpenses: 0,
      netSavings: 0,
      totalBalance: 0,
      categories: {}
    };
  }

  // Get all categories for mapping
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*');

  if (categoriesError) {
    console.error('Error fetching categories for summary:', categoriesError);
    return {
      totalIncome: 0,
      totalExpenses: 0,
      netSavings: 0,
      totalBalance: 0,
      categories: {}
    };
  }

  // Create category map for easier lookup
  const categoryMap = new Map();
  categories.forEach((cat: any) => {
    categoryMap.set(cat.id, cat.name);
  });

  // Calculate totals
  let totalIncome = 0;
  let totalExpenses = 0;
  const categorySums: {[key: string]: number} = {};

  expenses.forEach((expense: any) => {
    const amount = parseFloat(expense.amount);
    const categoryName = categoryMap.get(expense.category_id) || 'Other';
    
    if (expense.type === 'income') {
      totalIncome += amount;
    } else {
      totalExpenses += amount;
      
      // Add to category sums
      if (!categorySums[categoryName]) {
        categorySums[categoryName] = 0;
      }
      categorySums[categoryName] += amount;
    }
  });

  const netSavings = totalIncome - totalExpenses;
  // You'd typically calculate total balance from a running balance in a real app
  const totalBalance = netSavings; 

  return {
    totalIncome,
    totalExpenses,
    netSavings,
    totalBalance,
    categories: categorySums
  };
}
