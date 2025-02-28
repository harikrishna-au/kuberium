
import { User, Category, Expense, SavingGoal, FinancialInsight, Budget, ExpenseSummary } from './types';

// Mock user
export const currentUser: User = {
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  avatar: '/placeholder.svg',
};

// Mock categories
export const categories: Category[] = [
  { id: '1', name: 'Housing', icon: '🏠', color: '#16a34a' },
  { id: '2', name: 'Food', icon: '🍲', color: '#ea580c' },
  { id: '3', name: 'Transportation', icon: '🚗', color: '#0284c7' },
  { id: '4', name: 'Entertainment', icon: '🎬', color: '#8b5cf6' },
  { id: '5', name: 'Shopping', icon: '🛍️', color: '#ec4899' },
  { id: '6', name: 'Utilities', icon: '💡', color: '#f59e0b' },
  { id: '7', name: 'Health', icon: '🏥', color: '#ef4444' },
  { id: '8', name: 'Education', icon: '📚', color: '#6366f1' },
  { id: '9', name: 'Salary', icon: '💰', color: '#10b981' },
  { id: '10', name: 'Investments', icon: '📈', color: '#6366f1' },
  { id: '11', name: 'Miscellaneous', icon: '🔄', color: '#64748b' },
];

// Mock expenses
export const expenses: Expense[] = [
  {
    id: '1',
    amount: 20000,
    description: 'Monthly Rent',
    category: '1',
    date: '2023-08-01',
    type: 'expense',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '2',
    amount: 3500,
    description: 'Grocery Shopping',
    category: '2',
    date: '2023-08-03',
    type: 'expense',
    paymentMethod: 'Cash',
  },
  {
    id: '3',
    amount: 2000,
    description: 'Uber Rides',
    category: '3',
    date: '2023-08-05',
    type: 'expense',
    paymentMethod: 'Credit Card',
  },
  {
    id: '4',
    amount: 70000,
    description: 'Monthly Salary',
    category: '9',
    date: '2023-08-01',
    type: 'income',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '5',
    amount: 15000,
    description: 'Freelance Project',
    category: '9',
    date: '2023-08-15',
    type: 'income',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '6',
    amount: 1500,
    description: 'Movie Night',
    category: '4',
    date: '2023-08-07',
    type: 'expense',
    paymentMethod: 'UPI',
  },
  {
    id: '7',
    amount: 3000,
    description: 'New Shirt',
    category: '5',
    date: '2023-08-10',
    type: 'expense',
    paymentMethod: 'Credit Card',
  },
  {
    id: '8',
    amount: 2500,
    description: 'Electricity Bill',
    category: '6',
    date: '2023-08-12',
    type: 'expense',
    paymentMethod: 'UPI',
  },
  {
    id: '9',
    amount: 1200,
    description: 'Medicine',
    category: '7',
    date: '2023-08-14',
    type: 'expense',
    paymentMethod: 'Cash',
  },
  {
    id: '10',
    amount: 5000,
    description: 'Online Course',
    category: '8',
    date: '2023-08-16',
    type: 'expense',
    paymentMethod: 'Credit Card',
  },
];

// Mock saving goals
export const savingGoals: SavingGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 100000,
    currentAmount: 45000,
    deadline: '2023-12-31',
  },
  {
    id: '2',
    name: 'Travel to Goa',
    targetAmount: 30000,
    currentAmount: 12000,
    deadline: '2023-10-31',
  },
  {
    id: '3',
    name: 'New Laptop',
    targetAmount: 80000,
    currentAmount: 25000,
    deadline: '2024-01-15',
  },
];

// Mock financial insights
export const financialInsights: FinancialInsight[] = [
  {
    id: '1',
    title: 'Reduce dining out expenses',
    description: 'You spent ₹5,000 on dining out this month, which is 30% higher than last month. Consider cooking at home more often.',
    type: 'warning',
    date: '2023-08-18',
  },
  {
    id: '2',
    title: 'Emergency fund milestone',
    description: 'Congratulations! You\'ve reached 45% of your emergency fund goal. Keep going!',
    type: 'achievement',
    date: '2023-08-17',
  },
  {
    id: '3',
    title: 'Save on electricity',
    description: 'Your electricity bill has increased by 15% compared to last month. Try using energy-efficient appliances to reduce costs.',
    type: 'tip',
    date: '2023-08-16',
  },
  {
    id: '4',
    title: 'Increase your savings rate',
    description: 'You\'re currently saving 20% of your income. Aim for 25-30% to reach your financial goals faster.',
    type: 'tip',
    date: '2023-08-15',
  },
];

// Mock budget
export const budget: Budget = {
  id: '1',
  month: 8,
  year: 2023,
  totalBudget: 60000,
  categories: [
    { id: '1', categoryId: '1', amount: 20000, spent: 20000 },
    { id: '2', categoryId: '2', amount: 10000, spent: 7500 },
    { id: '3', categoryId: '3', amount: 5000, spent: 3500 },
    { id: '4', categoryId: '4', amount: 3000, spent: 2800 },
    { id: '5', categoryId: '5', amount: 5000, spent: 4200 },
    { id: '6', categoryId: '6', amount: 4000, spent: 3500 },
    { id: '7', categoryId: '7', amount: 3000, spent: 1200 },
    { id: '8', categoryId: '8', amount: 5000, spent: 5000 },
    { id: '9', categoryId: '11', amount: 5000, spent: 2000 },
  ],
};

// Generate expense summary
export const generateExpenseSummary = (): ExpenseSummary => {
  const totalIncome = expenses
    .filter(expense => expense.type === 'income')
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const totalExpenses = expenses
    .filter(expense => expense.type === 'expense')
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const netSavings = totalIncome - totalExpenses;
  
  const categorySpending: {[key: string]: number} = {};
  
  expenses
    .filter(expense => expense.type === 'expense')
    .forEach(expense => {
      if (categorySpending[expense.category]) {
        categorySpending[expense.category] += expense.amount;
      } else {
        categorySpending[expense.category] = expense.amount;
      }
    });
  
  return {
    totalIncome,
    totalExpenses,
    netSavings,
    totalBalance: 120000, // Mocked total balance
    categories: categorySpending,
  };
};

// Mock financial insights
export const getDailyFinancialTip = (): string => {
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
