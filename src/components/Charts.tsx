
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from "recharts";
import { categories, expenses, budget, generateExpenseSummary } from "@/utils/mockData";

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

// Generate expense category data for charts
const getCategoryData = () => {
  const summary = generateExpenseSummary();
  return Object.entries(summary.categories).map(([categoryId, amount]) => {
    const category = categories.find(c => c.id === categoryId);
    return {
      name: category?.name || "Other",
      value: amount,
      color: category?.color || "#64748b"
    };
  }).sort((a, b) => b.value - a.value);
};

// Generate monthly expense data
const getMonthlyData = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  // Mock data for previous months
  return months.map((month, index) => {
    const multiplier = index < 7 ? 0.8 + (index * 0.05) : 1;
    return {
      name: month,
      income: Math.round((index === 7 ? 85000 : 65000 * multiplier) / 1000) * 1000,
      expenses: Math.round((index === 7 ? 38700 : 45000 * multiplier) / 1000) * 1000,
      savings: Math.round((index === 7 ? (85000 - 38700) : (65000 - 45000) * multiplier) / 1000) * 1000
    };
  });
};

// Get budget vs actual data
const getBudgetVsActualData = () => {
  return budget.categories.map(budgetItem => {
    const category = categories.find(c => c.id === budgetItem.categoryId);
    return {
      name: category?.name || "Other",
      budget: budgetItem.amount,
      actual: budgetItem.spent,
      color: category?.color || "#64748b"
    };
  });
};

// Expense Breakdown Chart
export const ExpenseBreakdownChart = () => {
  const data = getCategoryData();
  const COLORS = data.map(item => item.color);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
      </text>
    );
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Expense Breakdown</CardTitle>
        <CardDescription>Where your money goes</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px' }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Income vs Expenses Chart
export const IncomeVsExpensesChart = () => {
  const data = getMonthlyData();

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Income vs Expenses</CardTitle>
        <CardDescription>Monthly comparison</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="bar">
          <div className="flex justify-end mb-4">
            <TabsList className="grid w-full max-w-[200px] grid-cols-2">
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="bar" className="mt-0">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `₹${value/1000}k`} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar 
                    dataKey="income" 
                    name="Income" 
                    fill="#16a34a" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="expenses" 
                    name="Expenses" 
                    fill="#ef4444" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="area" className="mt-0">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `₹${value/1000}k`} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    name="Income" 
                    fill="#16a34a" 
                    fillOpacity={0.3}
                    stroke="#16a34a" 
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    name="Expenses" 
                    fill="#ef4444" 
                    fillOpacity={0.3}
                    stroke="#ef4444" 
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Budget vs Actual Chart
export const BudgetVsActualChart = () => {
  const data = getBudgetVsActualData().slice(0, 6); // Show only top 6 categories
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Budget vs Actual</CardTitle>
        <CardDescription>Current month's spending</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                width={80}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar 
                dataKey="budget" 
                name="Budget" 
                fill="#94a3b8" 
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              />
              <Bar 
                dataKey="actual" 
                name="Actual" 
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.actual > entry.budget ? '#ef4444' : '#16a34a'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Savings Trend Chart
export const SavingsTrendChart = () => {
  const data = getMonthlyData();
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Savings Trend</CardTitle>
        <CardDescription>Monthly savings analysis</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis 
                tickFormatter={(value) => `₹${value/1000}k`} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                name="Savings" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const ChartGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 animate-fadeIn">
      <ExpenseBreakdownChart />
      <IncomeVsExpensesChart />
      <BudgetVsActualChart />
      <SavingsTrendChart />
    </div>
  );
};
