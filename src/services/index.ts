
// Re-export all service functions for easy importing
import { generateExpenseSummary, fetchExpenses, addExpense, deleteExpense } from "./expenseService";
import { 
  createBudget, 
  updateBudget, 
  getBudgetByMonthYear as fetchBudgets,
  getAllBudgets,
  getBudgetById
} from "./budgetService";
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
  fetchBudgets,
  getAllBudgets,
  getBudgetById,
  
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
