
import React from "react";
import { DataCard } from "@/components/ui/data-card";
import ExpenseTracker from "@/components/ExpenseTracker";
import ExpenseList from "@/components/ExpenseList";
import InsightsCard from "@/components/InsightsCard";
import { ChartGrid } from "@/components/Charts";
import { generateExpenseSummary } from "@/utils/mockData";
import { ArrowDownIcon, ArrowUpIcon, IndianRupee, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const summary = generateExpenseSummary();
  
  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard
          title="Current Balance"
          value={formatCurrency(summary.totalBalance)}
          variant="glass"
          icon={<Wallet className="h-4 w-4" />}
          className="bg-gradient-to-br from-primary/10 to-primary/5"
        />
        <DataCard
          title="Total Income"
          value={formatCurrency(summary.totalIncome)}
          variant="glass"
          trend={12}
          trendLabel="vs last month"
          icon={<ArrowUpIcon className="h-4 w-4" />}
          className="bg-gradient-to-br from-income-100/50 to-income-50/50 dark:from-income-900/20 dark:to-income-900/10"
        />
        <DataCard
          title="Total Expenses"
          value={formatCurrency(summary.totalExpenses)}
          variant="glass"
          trend={-5}
          trendLabel="vs last month"
          icon={<ArrowDownIcon className="h-4 w-4" />}
          className="bg-gradient-to-br from-expense-100/50 to-expense-50/50 dark:from-expense-900/20 dark:to-expense-900/10"
        />
        <DataCard
          title="Net Savings"
          value={formatCurrency(summary.netSavings)}
          variant="glass"
          trend={18}
          trendLabel="vs last month"
          icon={<IndianRupee className="h-4 w-4" />}
          className="bg-gradient-to-br from-saving-100/50 to-saving-50/50 dark:from-saving-900/20 dark:to-saving-900/10"
        />
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
    </div>
  );
};

export default Dashboard;
