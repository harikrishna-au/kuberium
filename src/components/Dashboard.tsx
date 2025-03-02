
import React, { useState, useEffect } from "react";
import { DataCard } from "@/components/ui/data-card";
import ExpenseTracker from "@/components/ExpenseTracker";
import ExpenseList from "@/components/ExpenseList";
import InsightsCard from "@/components/InsightsCard";
import { ChartGrid } from "@/components/Charts";
import { ArrowDownIcon, ArrowUpIcon, IndianRupee, Wallet, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateExpenseSummary, fetchUserSettings } from "@/services";
import { ExpenseSummary, UserSettings } from "@/utils/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { insertAllDummyData } from "@/utils/dummyData";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [summary, setSummary] = useState<ExpenseSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDummyDataLoading, setIsDummyDataLoading] = useState(false);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };
    
    checkAuth();
  }, []);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load user settings to get currency preferences
        const settings = await fetchUserSettings();
        setUserSettings(settings);
        
        // Load summary data
        const data = await generateExpenseSummary();
        setSummary(data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
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
      currency: userSettings?.currency || 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAddDummyData = async () => {
    setIsDummyDataLoading(true);
    try {
      await insertAllDummyData();
      toast.success("Successfully added dummy data! Please refresh the page to see it.");
      // Refresh the data
      const data = await generateExpenseSummary();
      setSummary(data);
    } catch (error) {
      console.error("Error adding dummy data:", error);
      toast.error("Failed to add dummy data");
    } finally {
      setIsDummyDataLoading(false);
    }
  };
  
  return (
    <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Financial Dashboard</h1>
        
        {isAuthenticated && (
          <Button 
            variant="outline" 
            onClick={handleAddDummyData}
            disabled={isDummyDataLoading}
            className="flex items-center gap-2"
          >
            <Database className="h-4 w-4" />
            {isDummyDataLoading ? "Adding Dummy Data..." : "Add Dummy Data"}
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          // Skeleton loaders for loading state
          <>
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </>
        ) : (
          <>
            <DataCard
              title="Current Balance"
              value={formatCurrency(summary?.totalBalance || 0)}
              variant="glass"
              icon={<Wallet className="h-4 w-4" />}
              className="bg-gradient-to-br from-primary/10 to-primary/5"
            />
            <DataCard
              title="Total Income"
              value={formatCurrency(summary?.totalIncome || 0)}
              variant="glass"
              trend={12}
              trendLabel="vs last month"
              icon={<ArrowUpIcon className="h-4 w-4" />}
              className="bg-gradient-to-br from-income-100/50 to-income-50/50 dark:from-income-900/20 dark:to-income-900/10"
            />
            <DataCard
              title="Total Expenses"
              value={formatCurrency(summary?.totalExpenses || 0)}
              variant="glass"
              trend={-5}
              trendLabel="vs last month"
              icon={<ArrowDownIcon className="h-4 w-4" />}
              className="bg-gradient-to-br from-expense-100/50 to-expense-50/50 dark:from-expense-900/20 dark:to-expense-900/10"
            />
            <DataCard
              title="Net Savings"
              value={formatCurrency(summary?.netSavings || 0)}
              variant="glass"
              trend={18}
              trendLabel="vs last month"
              icon={<IndianRupee className="h-4 w-4" />}
              className="bg-gradient-to-br from-saving-100/50 to-saving-50/50 dark:from-saving-900/20 dark:to-saving-900/10"
            />
          </>
        )}
      </div>
      
      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="charts">Charts & Reports</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-4 mt-0">
          <ChartGrid />
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4 mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ExpenseList />
            </div>
            <div>
              <div className="space-y-6">
                <ExpenseTracker />
                <InsightsCard />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
