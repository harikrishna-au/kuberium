
import React, { useState } from "react";
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

// Sample data - would be replaced with real data from Supabase in production
const budgetCategories = [
  { id: 1, name: "Housing", icon: "🏠", allocated: 15000, spent: 14500, color: "#16a34a" },
  { id: 2, name: "Food", icon: "🍲", allocated: 8000, spent: 7800, color: "#ea580c" },
  { id: 3, name: "Transportation", icon: "🚗", allocated: 5000, spent: 4200, color: "#0284c7" },
  { id: 4, name: "Entertainment", icon: "🎬", allocated: 3000, spent: 3500, color: "#8b5cf6" },
  { id: 5, name: "Shopping", icon: "🛍️", allocated: 4000, spent: 3800, color: "#ec4899" },
  { id: 6, name: "Utilities", icon: "💡", allocated: 6000, spent: 5800, color: "#f59e0b" },
  { id: 7, name: "Health", icon: "🏥", allocated: 4000, spent: 2000, color: "#ef4444" },
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Budgets = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(monthNames[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({ category: "", amount: "" });
  
  // Calculate total budget and spent
  const totalAllocated = budgetCategories.reduce((total, cat) => total + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((total, cat) => total + cat.spent, 0);
  const percentSpent = (totalSpent / totalAllocated) * 100;

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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Monthly Budget Overview</CardTitle>
              <CardDescription>
                Budget for {selectedMonth} {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter>
              <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Budget
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                    <DialogDescription>
                      Set up a new budget for {selectedMonth} {selectedYear}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={newBudget.category} 
                        onValueChange={(val) => setNewBudget({...newBudget, category: val})}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="housing">Housing</SelectItem>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newBudget.amount}
                        onChange={(e) => setNewBudget({...newBudget, amount: e.target.value})}
                        placeholder="Enter budget amount"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddBudgetOpen(false)}>Cancel</Button>
                    <Button onClick={() => {
                      // Here we would save the budget to Supabase
                      console.log("Saving budget:", newBudget);
                      setIsAddBudgetOpen(false);
                      setNewBudget({ category: "", amount: "" });
                    }}>Save Budget</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetCategories.slice(0, 3).map((category) => {
              const percentUsed = (category.spent / category.allocated) * 100;
              return (
                <Card key={category.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span> {category.name}
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
                      <span>₹{category.spent.toLocaleString()}</span>
                      <span>₹{category.allocated.toLocaleString()}</span>
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

          <Button variant="outline" className="w-full">
            View All Categories <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgetCategories.map((category) => {
              const percentUsed = (category.spent / category.allocated) * 100;
              return (
                <Card key={category.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span> {category.name}
                      </CardTitle>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm mb-1">
                      <span>₹{category.spent.toLocaleString()}</span>
                      <span>₹{category.allocated.toLocaleString()}</span>
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
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input id="category-name" placeholder="Enter category name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-icon">Icon</Label>
                    <Input id="category-icon" placeholder="Enter emoji (e.g. 🍔)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-amount">Budget Amount (₹)</Label>
                    <Input id="category-amount" type="number" placeholder="Enter budget amount" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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
