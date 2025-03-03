
// Re-export all service functions for easy importing
import { generateExpenseSummary } from "./expenseService";
import { createBudget, fetchBudgets, updateBudget } from "./budgetService";
import { createSavingGoal, fetchSavingGoals, updateSavingGoal } from "./savingGoalService";
import { getFinancialInsights } from "./insightService";
import { getAIResponse } from "./aiAssistantService";
import { getUserSettings, updateUserSettings, getUserProfile, updateUserProfile } from "./userService";
// Avoid duplicate exports for getCurrentUser
import { formatCurrency } from "./utils/serviceUtils";

export {
  generateExpenseSummary,
  createBudget,
  fetchBudgets,
  updateBudget,
  createSavingGoal,
  fetchSavingGoals,
  updateSavingGoal,
  getFinancialInsights,
  getUserSettings,
  updateUserSettings,
  getUserProfile,
  updateUserProfile,
  formatCurrency,
  getAIResponse
};
