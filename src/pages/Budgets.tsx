
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchBudgets, createBudget, fetchCategories } from "@/services";
import { Budget, Category } from "@/utils/types";
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";

const Budgets = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  
  // Get categories and current budget
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });
  
  const { data: budget, isLoading, refetch } = useQuery({
    queryKey: ['budget', selectedMonth, selectedYear],
    queryFn: () => fetchBudgets(selectedMonth, selectedYear)
  });
  
  const handleCreateBudget = async () => {
    // Create a budget with default allocations
    const categoriesArray = categories as Category[];
    const newBudget: Omit<Budget, "id"> = {
      month: selectedMonth,
      year: selectedYear,
      totalBudget: 10000, // Default total budget
      categories: categoriesArray.map((category: Category) => ({
        id: '',
        categoryId: category.id,
        amount: 1000, // Default amount per category
        spent: 0
      }))
    };
    
    try {
      const result = await createBudget(newBudget);
      if (result) {
        toast.success("Budget created successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget");
    }
  };
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Budget Planner</h1>
        <div className="flex gap-2">
          <select 
            className="rounded-md border border-gray-300 px-4 py-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select 
            className="rounded-md border border-gray-300 px-4 py-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={currentDate.getFullYear() - 2 + i}>
                {currentDate.getFullYear() - 2 + i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : budget ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
              <CardDescription>
                How your budget is distributed across categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budget.categories.map((category) => {
                  const categoriesArray = categories as Category[];
                  const categoryData = categoriesArray.find(c => c.id === category.categoryId);
                  const percentSpent = (category.spent / category.amount) * 100;
                  
                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: categoryData?.color || '#888' }}></div>
                          <span>{categoryData?.name || 'Unknown'}</span>
                        </div>
                        <div className="text-sm">
                          ${category.spent.toFixed(2)} / ${category.amount.toFixed(2)}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div 
                          className={`h-2.5 rounded-full ${percentSpent > 100 ? 'bg-red-500' : 'bg-primary'}`}
                          style={{ width: `${Math.min(percentSpent, 100)}%` }} 
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Budget Summary</CardTitle>
              <CardDescription>
                Overview of your monthly budget
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Total Budget</span>
                <span className="font-bold">${budget.totalBudget.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Total Spent</span>
                <span className="font-bold">
                  ${budget.categories.reduce((sum, cat) => sum + cat.spent, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Remaining</span>
                <span className="font-bold">
                  ${(budget.totalBudget - budget.categories.reduce((sum, cat) => sum + cat.spent, 0)).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <p className="text-lg text-gray-500">No budget found for this month</p>
          <Button onClick={handleCreateBudget} id="create-budget-button">
            Create Budget
          </Button>
        </div>
      )}
    </div>
  );
};

export default Budgets;
