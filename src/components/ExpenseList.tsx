
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Expense, Category } from "@/utils/types";
import { fetchExpenses, fetchCategories, deleteExpense } from "@/services";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const ExpenseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [expensesData, categoriesData] = await Promise.all([
          fetchExpenses(),
          fetchCategories()
        ]);
        setExpenses(expensesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load transaction data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Filter expenses based on search term and filter
  const filteredExpenses = expenses.filter(expense => {
    // Filter by type
    if (filter !== "all" && expense.type !== filter) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      const category = categories.find(c => c.id === expense.category);
      
      return (
        expense.description.toLowerCase().includes(searchLower) ||
        (category && category.name.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // Sort by date (newest first)
  const sortedExpenses = [...filteredExpenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDeleteExpense = async (id: string) => {
    try {
      const success = await deleteExpense(id);
      if (success) {
        setExpenses(expenses.filter(expense => expense.id !== id));
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete transaction");
    }
  };
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <CardDescription>View and search your transactions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
              <TabsTrigger value="expense" onClick={() => setFilter("expense")}>Expenses</TabsTrigger>
              <TabsTrigger value="income" onClick={() => setFilter("income")}>Income</TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-9 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <ExpenseTable 
              expenses={sortedExpenses} 
              categories={categories} 
              loading={loading} 
              onDelete={handleDeleteExpense} 
            />
          </TabsContent>
          
          <TabsContent value="expense" className="mt-0">
            <ExpenseTable 
              expenses={sortedExpenses} 
              categories={categories} 
              loading={loading} 
              onDelete={handleDeleteExpense} 
            />
          </TabsContent>
          
          <TabsContent value="income" className="mt-0">
            <ExpenseTable 
              expenses={sortedExpenses} 
              categories={categories} 
              loading={loading} 
              onDelete={handleDeleteExpense} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Expense Table Component
interface ExpenseTableProps {
  expenses: Expense[];
  categories: Category[];
  loading: boolean;
  onDelete: (id: string) => void;
}

const ExpenseTable = ({ expenses, categories, loading, onDelete }: ExpenseTableProps) => {
  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  if (loading) {
    return (
      <div className="rounded-md border overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Date</th>
              <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Description</th>
              <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">Category</th>
              <th className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">Amount</th>
              <th className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted-foreground">
                  No transactions found
                </td>
              </tr>
            ) : (
              expenses.map((expense) => {
                const category = categories.find(c => c.id === expense.category);
                const isIncome = expense.type === "income";
                
                return (
                  <tr 
                    key={expense.id} 
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm">
                      {new Date(expense.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {expense.description}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="mr-2">{category?.icon || '📁'}</span>
                        <span className="text-sm">{category?.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end">
                        <span className="mr-1">
                          {isIncome ? (
                            <ChevronUp className="h-4 w-4 text-income-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-expense-500" />
                          )}
                        </span>
                        <span className={cn(
                          "text-sm font-medium",
                          isIncome ? "text-income-600" : "text-expense-600"
                        )}>
                          {formatCurrency(expense.amount)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this transaction? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => onDelete(expense.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
