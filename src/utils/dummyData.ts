
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Categories are already set up via SQL

// Insert dummy expenses
export const insertDummyExpenses = async (userId: string) => {
  try {
    // Get categories first
    const { data: categories } = await supabase.from("categories").select("*");
    
    if (!categories || categories.length === 0) {
      toast.error("No categories found. Please set up categories first.");
      return false;
    }
    
    // Find category IDs
    const housingCategory = categories.find(c => c.name === "Housing")?.id;
    const foodCategory = categories.find(c => c.name === "Food")?.id;
    const transportCategory = categories.find(c => c.name === "Transportation")?.id;
    const entertainmentCategory = categories.find(c => c.name === "Entertainment")?.id;
    const shoppingCategory = categories.find(c => c.name === "Shopping")?.id;
    const utilitiesCategory = categories.find(c => c.name === "Utilities")?.id;
    const healthCategory = categories.find(c => c.name === "Health")?.id;
    const incomeCategory = categories.find(c => c.name === "Income")?.id;
    const salaryCategory = categories.find(c => c.name === "Salary")?.id;
    
    // Current date for reference
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Create expenses for the last 6 months
    const dummyExpenses = [];
    
    // Add salary entries (one per month)
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentYear, currentMonth - i, 1);
      dummyExpenses.push({
        amount: 50000 + Math.floor(Math.random() * 5000),
        description: "Monthly Salary",
        category_id: salaryCategory,
        date: date.toISOString(),
        type: "income",
        payment_method: "bankTransfer",
        user_id: userId
      });
      
      // Occasional extra income
      if (Math.random() > 0.7) {
        const extraDate = new Date(currentYear, currentMonth - i, 15);
        dummyExpenses.push({
          amount: 5000 + Math.floor(Math.random() * 5000),
          description: "Freelance project",
          category_id: incomeCategory,
          date: extraDate.toISOString(),
          type: "income",
          payment_method: "upi",
          user_id: userId
        });
      }
      
      // Add various expenses for each month
      
      // Housing (rent/mortgage)
      const housingDate = new Date(currentYear, currentMonth - i, 5);
      dummyExpenses.push({
        amount: 15000,
        description: "Monthly Rent",
        category_id: housingCategory,
        date: housingDate.toISOString(),
        type: "expense",
        payment_method: "bankTransfer",
        user_id: userId
      });
      
      // Groceries (multiple times per month)
      for (let j = 0; j < 4; j++) {
        const groceryDate = new Date(currentYear, currentMonth - i, 7 * j + 3);
        dummyExpenses.push({
          amount: 1000 + Math.floor(Math.random() * 1000),
          description: "Grocery shopping",
          category_id: foodCategory,
          date: groceryDate.toISOString(),
          type: "expense",
          payment_method: Math.random() > 0.5 ? "credit" : "upi",
          user_id: userId
        });
      }
      
      // Restaurant visits
      for (let j = 0; j < 3; j++) {
        if (Math.random() > 0.3) {
          const restaurantDate = new Date(currentYear, currentMonth - i, Math.floor(Math.random() * 28) + 1);
          dummyExpenses.push({
            amount: 500 + Math.floor(Math.random() * 1500),
            description: "Restaurant dining",
            category_id: foodCategory,
            date: restaurantDate.toISOString(),
            type: "expense",
            payment_method: Math.random() > 0.5 ? "credit" : "upi",
            user_id: userId
          });
        }
      }
      
      // Transportation
      const transportDate = new Date(currentYear, currentMonth - i, 10);
      dummyExpenses.push({
        amount: 3000 + Math.floor(Math.random() * 1000),
        description: "Fuel and transportation",
        category_id: transportCategory,
        date: transportDate.toISOString(),
        type: "expense",
        payment_method: Math.random() > 0.5 ? "credit" : "debit",
        user_id: userId
      });
      
      // Entertainment
      if (Math.random() > 0.3) {
        const entertainmentDate = new Date(currentYear, currentMonth - i, Math.floor(Math.random() * 28) + 1);
        dummyExpenses.push({
          amount: 1500 + Math.floor(Math.random() * 1000),
          description: "Movie and dinner",
          category_id: entertainmentCategory,
          date: entertainmentDate.toISOString(),
          type: "expense",
          payment_method: "credit",
          user_id: userId
        });
      }
      
      // Shopping
      if (Math.random() > 0.4) {
        const shoppingDate = new Date(currentYear, currentMonth - i, Math.floor(Math.random() * 28) + 1);
        dummyExpenses.push({
          amount: 2000 + Math.floor(Math.random() * 3000),
          description: "Clothing purchase",
          category_id: shoppingCategory,
          date: shoppingDate.toISOString(),
          type: "expense",
          payment_method: "credit",
          user_id: userId
        });
      }
      
      // Utilities (monthly)
      const utilitiesDate = new Date(currentYear, currentMonth - i, 15);
      dummyExpenses.push({
        amount: 2500 + Math.floor(Math.random() * 500),
        description: "Electricity and water bill",
        category_id: utilitiesCategory,
        date: utilitiesDate.toISOString(),
        type: "expense",
        payment_method: "upi",
        user_id: userId
      });
      
      // Internet/Phone (monthly)
      const internetDate = new Date(currentYear, currentMonth - i, 18);
      dummyExpenses.push({
        amount: 1200 + Math.floor(Math.random() * 300),
        description: "Internet and phone bill",
        category_id: utilitiesCategory,
        date: internetDate.toISOString(),
        type: "expense",
        payment_method: "credit",
        user_id: userId
      });
      
      // Health (occasional)
      if (Math.random() > 0.7) {
        const healthDate = new Date(currentYear, currentMonth - i, Math.floor(Math.random() * 28) + 1);
        dummyExpenses.push({
          amount: 1500 + Math.floor(Math.random() * 3000),
          description: "Doctor visit and medicine",
          category_id: healthCategory,
          date: healthDate.toISOString(),
          type: "expense",
          payment_method: "upi",
          user_id: userId
        });
      }
    }
    
    // Insert all expenses
    const { error } = await supabase.from("expenses").insert(dummyExpenses);
    
    if (error) {
      console.error("Error inserting dummy expenses:", error);
      toast.error("Failed to add dummy data");
      return false;
    }
    
    toast.success("Dummy expense data created successfully!");
    return true;
  } catch (error) {
    console.error("Error in inserting dummy data:", error);
    toast.error("Failed to add dummy data");
    return false;
  }
};

// Insert dummy budgets
export const insertDummyBudgets = async (userId: string) => {
  try {
    // Get categories first
    const { data: categories } = await supabase.from("categories").select("*");
    
    if (!categories || categories.length === 0) {
      toast.error("No categories found. Please set up categories first.");
      return false;
    }
    
    // Find category IDs
    const housingCategory = categories.find(c => c.name === "Housing")?.id;
    const foodCategory = categories.find(c => c.name === "Food")?.id;
    const transportCategory = categories.find(c => c.name === "Transportation")?.id;
    const entertainmentCategory = categories.find(c => c.name === "Entertainment")?.id;
    const shoppingCategory = categories.find(c => c.name === "Shopping")?.id;
    const utilitiesCategory = categories.find(c => c.name === "Utilities")?.id;
    const healthCategory = categories.find(c => c.name === "Health")?.id;
    
    // Current date for reference
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 1-12 format
    
    // Create a budget for current month
    const { data: budget, error: budgetError } = await supabase
      .from("budgets")
      .insert({
        month: currentMonth,
        year: currentYear,
        total_budget: 35000,
        user_id: userId
      })
      .select()
      .single();
      
    if (budgetError) {
      console.error("Error creating dummy budget:", budgetError);
      toast.error("Failed to create dummy budget");
      return false;
    }
    
    // Create budget categories
    const budgetCategories = [
      {
        category_id: housingCategory,
        amount: 15000,
        budget_id: budget.id
      },
      {
        category_id: foodCategory,
        amount: 8000,
        budget_id: budget.id
      },
      {
        category_id: transportCategory,
        amount: 4000,
        budget_id: budget.id
      },
      {
        category_id: entertainmentCategory,
        amount: 2000,
        budget_id: budget.id
      },
      {
        category_id: shoppingCategory,
        amount: 2000,
        budget_id: budget.id
      },
      {
        category_id: utilitiesCategory,
        amount: 3000,
        budget_id: budget.id
      },
      {
        category_id: healthCategory,
        amount: 1000,
        budget_id: budget.id
      }
    ];
    
    const { error: categoriesError } = await supabase
      .from("budget_categories")
      .insert(budgetCategories);
      
    if (categoriesError) {
      console.error("Error creating dummy budget categories:", categoriesError);
      toast.error("Failed to create dummy budget categories");
      // Try to clean up
      await supabase.from("budgets").delete().eq("id", budget.id);
      return false;
    }
    
    toast.success("Dummy budget data created successfully!");
    return true;
  } catch (error) {
    console.error("Error in inserting dummy budgets:", error);
    toast.error("Failed to add dummy budget data");
    return false;
  }
};

// Insert dummy saving goals
export const insertDummySavingGoals = async (userId: string) => {
  try {
    const currentDate = new Date();
    
    // Create three sample saving goals
    const savingGoals = [
      {
        name: "Emergency Fund",
        target_amount: 100000,
        current_amount: 35000,
        deadline: new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1).toISOString(),
        user_id: userId
      },
      {
        name: "Vacation",
        target_amount: 50000,
        current_amount: 15000,
        deadline: new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, 1).toISOString(),
        user_id: userId
      },
      {
        name: "New Laptop",
        target_amount: 80000,
        current_amount: 20000,
        deadline: new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 1).toISOString(),
        user_id: userId
      }
    ];
    
    const { error } = await supabase
      .from("saving_goals")
      .insert(savingGoals);
      
    if (error) {
      console.error("Error creating dummy saving goals:", error);
      toast.error("Failed to create dummy saving goals");
      return false;
    }
    
    toast.success("Dummy saving goals created successfully!");
    return true;
  } catch (error) {
    console.error("Error in inserting dummy saving goals:", error);
    toast.error("Failed to add dummy saving goals");
    return false;
  }
};

// Insert dummy financial insights
export const insertDummyInsights = async (userId: string) => {
  try {
    // Create sample insights
    const insights = [
      {
        title: "Spending Alert",
        description: "Your food expenses are 20% higher than last month. Consider reviewing your eating out habits.",
        type: "warning",
        user_id: userId
      },
      {
        title: "Savings Achievement",
        description: "Congratulations! You've saved 15% of your income this month, reaching your saving target.",
        type: "achievement",
        user_id: userId
      },
      {
        title: "Budget Tip",
        description: "Try using the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.",
        type: "tip",
        user_id: userId
      }
    ];
    
    const { error } = await supabase
      .from("financial_insights")
      .insert(insights);
      
    if (error) {
      console.error("Error creating dummy insights:", error);
      toast.error("Failed to create dummy insights");
      return false;
    }
    
    toast.success("Dummy financial insights created successfully!");
    return true;
  } catch (error) {
    console.error("Error in inserting dummy insights:", error);
    toast.error("Failed to add dummy insights");
    return false;
  }
};

// Master function to insert all dummy data
export const insertAllDummyData = async () => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      toast.error("Authentication error. Please log in first.");
      return false;
    }
    
    const userId = userData.user.id;
    
    // Insert all types of dummy data
    await insertDummyExpenses(userId);
    await insertDummyBudgets(userId);
    await insertDummySavingGoals(userId);
    await insertDummyInsights(userId);
    
    return true;
  } catch (error) {
    console.error("Error inserting all dummy data:", error);
    toast.error("Failed to insert dummy data");
    return false;
  }
};
