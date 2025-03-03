
// Re-export all service functions for easy importing
import { generateExpenseSummary, fetchExpenses, addExpense, deleteExpense } from "./expenseService";
import { createBudget, fetchBudgets, updateBudget } from "./budgetService";
import { createSavingGoal, fetchSavingGoals, updateSavingGoal, deleteSavingGoal } from "./savingGoalService";
import { fetchFinancialInsights } from "./insightService";
import { getAIResponse } from "./aiAssistantService";
import { getUserSettings, updateUserSettings, getUserProfile, updateUserProfile } from "./userService";
import { getCurrentUser, formatCurrency } from "./utils/serviceUtils";
import { fetchCategories } from "./categoryService";

export {
  // Expense related exports
  generateExpenseSummary,
  fetchExpenses,
  addExpense,
  deleteExpense,
  
  // Budget related exports
  createBudget,
  fetchBudgets,
  updateBudget,
  
  // Saving goals related exports
  createSavingGoal,
  fetchSavingGoals,
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
  getCurrentUser,
  
  // AI assistant export
  getAIResponse
};
