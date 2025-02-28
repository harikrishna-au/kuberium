
export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export type ExpenseType = 'expense' | 'income';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: ExpenseType;
  paymentMethod: string;
}

export interface BudgetCategory {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
}

export interface Budget {
  id: string;
  month: number;
  year: number;
  totalBudget: number;
  categories: BudgetCategory[];
}

export interface SavingGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'warning' | 'achievement';
  date: string;
}

export interface ExpenseSummary {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  totalBalance: number;
  categories: {
    [key: string]: number;
  };
}
