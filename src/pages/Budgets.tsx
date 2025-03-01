
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertCircle, ArrowRight, Calendar, DollarSign, Edit2, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { fetchBudgets, createBudget, fetchCategories } from "@/services/financeService";
import { Budget, BudgetCategory, Category } from "@/utils/types";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Budgets = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(monthNames[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({ categoryId: "", amount: "" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgetData, setBudgetData] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [newBudgetTotal, setNewBudgetTotal] = useState("");
  const [categoryBudgets, setCategoryBudgets] = useState<{ [key: string]: string }>({});
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get month index from name
        const monthIndex = monthNames.indexOf(selectedMonth);
        const yearNum = parseInt(selectedYear);
        
        // Fetch budget data for selected month/year
        const budget = await fetchBudgets(monthIndex + 1, yearNum);
        
        // Fetch categories
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        
        if (budget) {
          setBudgetData(budget);
          setBudgetCategories(budget.categories);
        } else {
          setBudgetData(null);
          setBudgetCategories([]);
        }
      } catch (error) {
        console.error("Error fetching budget data:", error);
        toast.error("Failed to load budget data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedMonth, selectedYear]);

  const handleCreateBudget = async () => {
    try {
      if (!newBudgetTotal) {
        toast.error("Please enter a total budget amount");
        return;
      }
      
      // Get month index from name
      const monthIndex = monthNames.indexOf(selectedMonth);
      const yearNum = parseInt(selectedYear);
      
      // Create budget categories from the form data
      const budgetCategoriesData: Omit<BudgetCategory, "id" | "spent">[] = Object.entries(categoryBudgets)
        .filter(([_, amount]) => amount !== "")
        .map(([categoryId, amount]) => ({
          categoryId,
          amount: parseFloat(amount)
        }));
      
      if (budgetCategoriesData.length === 0) {
        toast.error("Please add at least one category budget");
        return;
      }
      
      // Create the budget
      const newBudget: Omit<Budget, "id"> = {
        month: monthIndex + 1,
        year: yearNum,
        totalBudget: parseFloat(newBudgetTotal),
        categories: budgetCategoriesData as BudgetCategory[]
      };
      
      const createdBudget = await createBudget(newBudget);
      
      if (createdBudget) {
        toast.success("Budget created successfully!");
        setBudgetData(createdBudget);
        setBudgetCategories(createdBudget.categories);
        setIsAddBudgetOpen(false);
        // Reset form
        setNewBudgetTotal("");
        setCategoryBudgets({});
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Failed to create budget");
    }
  };

  // Calculate total budget and spent
  const totalAllocated = budgetData?.totalBudget || 0;
  const totalSpent = budgetCategories.reduce((total, cat) => total + (cat.spent || 0), 0);
  const percentSpent = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Budget Management</h1>
          <p className="text-muted-foreground">Create and track your monthly budgets</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((month) => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {[2023, 2024, 2025].map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {loading ? (
            <Skeleton className="w-full h-64" />
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Monthly Budget Overview</CardTitle>
                <CardDescription>
                  Budget for {selectedMonth} {selectedYear}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {budgetData ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Budget</span>
                      <span className="font-semibold">₹{totalAllocated.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Spent So Far</span>
                      <span className="font-semibold">₹{totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Remaining</span>
                      <span
                        className={cn(
                          "font-semibold",
                          (totalAllocated - totalSpent) < 0 ? "text-red-500" : "text-green-500"
                        )}
                      >
                        ₹{(totalAllocated - totalSpent).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span>Budget used</span>
                        <span>{Math.round(percentSpent)}%</span>
                      </div>
                      <Progress
                        value={percentSpent}
                        className={cn(
                          "h-2",
                          percentSpent > 90 ? "bg-red-100" : "bg-gray-100",
                        )}
                        indicatorClassName={cn(
                          percentSpent > 90 ? "bg-red-500" : 
                          percentSpent > 75 ? "bg-amber-500" : "bg-green-500"
                        )}
                      />
                    </div>
                    
                    {percentSpent > 90 && (
                      <div className="flex items-center gap-2 p-2 bg-red-50 text-red-700 rounded-md text-sm mt-2">
                        <AlertCircle size={16} />
                        <span>You've used over 90% of your monthly budget!</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">No budget set for {selectedMonth} {selectedYear}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" /> 
                      {budgetData ? "Edit Budget" : "Create New Budget"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {budgetData ? "Edit Budget" : "Create New Budget"}
                      </DialogTitle>
                      <DialogDescription>
                        Set up a budget for {selectedMonth} {selectedYear}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="total-budget">Total Budget Amount (₹)</Label>
                        <Input
                          id="total-budget"
                          type="number"
                          value={newBudgetTotal}
                          onChange={(e) => setNewBudgetTotal(e.target.value)}
                          placeholder="Enter total budget amount"
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <h4 className="font-medium text-sm">Category Budgets</h4>
                        <p className="text-muted-foreground text-xs mb-2">
                          Allocate your budget across different categories
                        </p>
                        
                        {categories
                          .filter(cat => cat.name !== "Income" && cat.name !== "Salary")
                          .map((category) => (
                            <div key={category.id} className="grid grid-cols-12 gap-2 items-center mb-2">
                              <div className="col-span-6 flex items-center">
                                <span className="mr-2">{category.icon}</span>
                                <span>{category.name}</span>
                              </div>
                              <div className="col-span-6">
                                <Input
                                  type="number"
                                  placeholder="Amount"
                                  value={categoryBudgets[category.id] || ""}
                                  onChange={(e) => setCategoryBudgets({
                                    ...categoryBudgets,
                                    [category.id]: e.target.value
                                  })}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddBudgetOpen(false)}>Cancel</Button>
                      <Button onClick={handleCreateBudget}>
                        {budgetData ? "Update Budget" : "Create Budget"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          )}

          {!loading && budgetData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgetCategories.slice(0, 3).map((budgetCategory) => {
                  const category = categories.find(c => c.id === budgetCategory.categoryId);
                  const percentUsed = (budgetCategory.spent / budgetCategory.amount) * 100;
                  
                  return (
                    <Card key={budgetCategory.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base flex items-center gap-2">
                            <span className="text-xl">{category?.icon || '📊'}</span> {category?.name || 'Category'}
                          </CardTitle>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm mb-1">
                          <span>₹{budgetCategory.spent.toLocaleString()}</span>
                          <span>₹{budgetCategory.amount.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={percentUsed} 
                          className="h-2"
                          indicatorClassName={cn(
                            percentUsed > 100 ? "bg-red-500" : 
                            percentUsed > 75 ? "bg-amber-500" : "bg-green-500"
                          )}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Spent</span>
                          <span>{Math.round(percentUsed)}% of budget</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {budgetCategories.length > 3 && (
                <Button variant="outline" className="w-full" onClick={() => document.querySelector('[data-value="categories"]')?.click()}>
                  View All Categories <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-6 mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="h-44" />
              <Skeleton className="h-44" />
              <Skeleton className="h-44" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {budgetData ? (
                <>
                  {budgetCategories.map((budgetCategory) => {
                    const category = categories.find(c => c.id === budgetCategory.categoryId);
                    const percentUsed = (budgetCategory.spent / budgetCategory.amount) * 100;
                    
                    return (
                      <Card key={budgetCategory.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base flex items-center gap-2">
                              <span className="text-xl">{category?.icon || '📊'}</span> {category?.name || 'Category'}
                            </CardTitle>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Budget Category</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this budget category? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between text-sm mb-1">
                            <span>₹{budgetCategory.spent.toLocaleString()}</span>
                            <span>₹{budgetCategory.amount.toLocaleString()}</span>
                          </div>
                          <Progress 
                            value={percentUsed} 
                            className="h-2"
                            indicatorClassName={cn(
                              percentUsed > 100 ? "bg-red-500" : 
                              percentUsed > 75 ? "bg-amber-500" : "bg-green-500"
                            )}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Spent</span>
                            <span>{Math.round(percentUsed)}% of budget</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <CardContent className="flex flex-col items-center justify-center py-8">
                          <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Add New Category</p>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Budget Category</DialogTitle>
                        <DialogDescription>
                          Create a new budget category with a spending limit
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="category-select">Category</Label>
                          <Select>
                            <SelectTrigger id="category-select">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories
                                .filter(cat => cat.name !== "Income" && cat.name !== "Salary" && 
                                  !budgetCategories.some(bc => bc.categoryId === cat.id))
                                .map(category => (
                                  <SelectItem key={category.id} value={category.id}>
                                    <div className="flex items-center">
                                      <span className="mr-2">{category.icon}</span>
                                      <span>{category.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category-amount">Budget Amount (₹)</Label>
                          <Input id="category-amount" type="number" placeholder="Enter budget amount" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Category</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <div className="col-span-full p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No Budget Set</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You haven't created a budget for {selectedMonth} {selectedYear} yet.
                    </p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setIsAddBudgetOpen(true)}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Create Budget
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget History</CardTitle>
              <CardDescription>View your budgets from previous months</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-10">
              <div className="text-center space-y-4">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium">Budget History Coming Soon</h3>
                  <p className="text-sm text-muted-foreground">This feature will be available in the next update.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Budgets;
