
import { supabase } from "@/integrations/supabase/client";
import { 
  Expense, 
  Budget, 
  BudgetCategory,
  SavingGoal, 
  FinancialInsight, 
  ExpenseSummary, 
  Category 
} from "@/utils/types";
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
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("User authentication error:", userError);
    toast.error("Authentication error. Please log in again.");
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
      user_id: userData.user?.id
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

// Budgets
export const fetchBudgets = async (month: number, year: number): Promise<Budget | null> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("User authentication error:", userError);
    toast.error("Authentication error. Please log in again.");
    return null;
  }
  
  const { data, error } = await supabase
    .from("budgets")
    .select(`
      *,
      budget_categories(*)
    `)
    .eq("month", month)
    .eq("year", year)
    .eq("user_id", userData.user?.id)
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
    .eq("user_id", userData.user?.id)
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
    month: data.month,
    year: data.year,
    totalBudget: parseFloat(data.total_budget),
    categories: budgetCategories
  };
};

export const createBudget = async (budget: Omit<Budget, "id">): Promise<Budget | null> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("User authentication error:", userError);
    toast.error("Authentication error. Please log in again.");
    return null;
  }
  
  // First create the budget
  const { data: budgetData, error: budgetError } = await supabase
    .from("budgets")
    .insert({
      month: budget.month,
      year: budget.year,
      total_budget: budget.totalBudget,
      user_id: userData.user?.id
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
    month: budgetData.month,
    year: budgetData.year,
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

// Saving Goals
export const fetchSavingGoals = async (): Promise<SavingGoal[]> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("User authentication error:", userError);
    toast.error("Authentication error. Please log in again.");
    return [];
  }
  
  const { data, error } = await supabase
    .from("saving_goals")
    .select("*")
    .eq("user_id", userData.user?.id);
    
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
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("User authentication error:", userError);
    toast.error("Authentication error. Please log in again.");
    return null;
  }
  
  const { data, error } = await supabase
    .from("saving_goals")
    .insert({
      name: goal.name,
      target_amount: goal.targetAmount,
      current_amount: goal.currentAmount,
      deadline: goal.deadline,
      user_id: userData.user?.id
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

// Financial Insights
export const fetchFinancialInsights = async (): Promise<FinancialInsight[]> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("User authentication error:", userError);
    toast.error("Authentication error. Please log in again.");
    return [];
  }
  
  const { data, error } = await supabase
    .from("financial_insights")
    .select("*")
    .eq("user_id", userData.user?.id)
    .order("date", { ascending: false });
    
  if (error) {
    console.error("Error fetching financial insights:", error);
    toast.error("Failed to load financial insights");
    return [];
  }
  
  return data.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    type: item.type as "tip" | "warning" | "achievement",
    date: item.date
  }));
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

// Generate financial tips
export const generateFinancialTip = async (): Promise<string> => {
  const tips = [
    "Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.",
    "Review your subscriptions monthly and cancel those you don't use regularly.",
    "Set up automatic transfers to your savings account on payday.",
    "Consider using a budgeting app to track all your expenses automatically.",
    "Always compare prices before making big purchases.",
    "Use cash instead of cards for discretionary spending to be more conscious of your expenses.",
    "Invest early, even small amounts, to benefit from compound interest.",
    "Maintain an emergency fund with 3-6 months of essential expenses.",
    "Prioritize high-interest debt repayment before focusing on investments.",
    "Look for cashback and rewards programs for your regular expenses.",
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

// Generate insights based on spending patterns
export const generateInsights = async (): Promise<FinancialInsight[]> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("User authentication error:", userError);
    return [];
  }
  
  try {
    // Get expense data
    const expenses = await fetchExpenses();
    const summary = await generateExpenseSummary();
    
    const insights: FinancialInsight[] = [];
    
    // Check if spending is higher than income
    if (summary.totalExpenses > summary.totalIncome) {
      const overspendingInsight: FinancialInsight = {
        id: "auto-1",
        title: "Spending Alert",
        description: "Your spending exceeds your income this month. Consider reviewing your budget.",
        type: "warning",
        date: new Date().toISOString()
      };
      insights.push(overspendingInsight);
      
      // Save to database
      await supabase.from("financial_insights").insert({
        title: overspendingInsight.title,
        description: overspendingInsight.description,
        type: overspendingInsight.type,
        user_id: userData.user?.id
      });
    }
    
    // Check if savings is improving
    if (summary.netSavings > 0 && summary.netSavings > summary.totalIncome * 0.2) {
      const savingsInsight: FinancialInsight = {
        id: "auto-2",
        title: "Savings Achievement",
        description: "Great job! You've saved more than 20% of your income this month.",
        type: "achievement",
        date: new Date().toISOString()
      };
      insights.push(savingsInsight);
      
      // Save to database
      await supabase.from("financial_insights").insert({
        title: savingsInsight.title,
        description: savingsInsight.description,
        type: savingsInsight.type,
        user_id: userData.user?.id
      });
    }
    
    return insights;
  } catch (error) {
    console.error("Error generating insights:", error);
    return [];
  }
};
