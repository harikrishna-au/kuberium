
// Re-export all service functions for easy importing
import { generateExpenseSummary, fetchExpenses, addExpense, deleteExpense } from "./expenseService";
import { 
  createBudget, 
  updateBudget, 
  getBudgetByMonthYear,
  getAllBudgets,
  getBudgetById,
  deleteBudget
} from "./budgetService";
import {
  getAllBudgetCategories,
  getBudgetCategoryById,
  createBudgetCategory,
  updateBudgetCategory,
  deleteBudgetCategory
} from "./budgetCategoryService";
import { 
  createSavingGoal, 
  updateSavingGoal, 
  deleteSavingGoal, 
  getAllSavingGoals 
} from "./savingGoalService";
import { fetchFinancialInsights } from "./insightService";
import { getAIResponse } from "./aiAssistantService";
import { getUserSettings, updateUserSettings, getUserProfile, updateUserProfile } from "./userService";
import { getUserId, formatCurrency } from "./utils/serviceUtils";
import { fetchCategories } from "./categoryService";

export {
  // Expense related exports
  generateExpenseSummary,
  fetchExpenses,
  addExpense,
  deleteExpense,
  
  // Budget related exports
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetByMonthYear as fetchBudgets,
  getAllBudgets,
  getBudgetById,
  
  // Budget category related exports
  getAllBudgetCategories,
  getBudgetCategoryById,
  createBudgetCategory,
  updateBudgetCategory,
  deleteBudgetCategory,
  
  // Saving goals related exports
  createSavingGoal,
  getAllSavingGoals as fetchSavingGoals,
  updateSavingGoal,
  deleteSavingGoal,
  
  // Categories export
  fetchCategories,
  
  // Insight related exports
  fetchFinancialInsights,
  
  // User related exports
  getUserSettings,
  updateUserSettings,
  getUserProfile,
  updateUserProfile,
  
  // Utility exports
  formatCurrency,
  getUserId as getCurrentUser,
  
  // AI assistant export
  getAIResponse
};
