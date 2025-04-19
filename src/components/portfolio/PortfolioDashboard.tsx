import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, LineChart, BarChart, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Area, Line, Bar, Pie, Cell, CartesianGrid } from "recharts";
import { CalendarIcon, ArrowUpRight, ArrowDownRight, Filter, ChartPie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DataCard } from "@/components/ui/data-card";

// Mock stock performance data
const stockPerformanceData = [
  {
    name: 'Jan',
    RELIANCE: 2400,
    HDFCBANK: 1398,
    TCS: 9800,
    INFY: 3908,
  },
  {
    name: 'Feb',
    RELIANCE: 1398,
    HDFCBANK: 2800,
    TCS: 3908,
    INFY: 4800,
  },
  {
    name: 'Mar',
    RELIANCE: 9800,
    HDFCBANK: 3908,
    TCS: 4800,
    INFY: 3800,
  },
  {
    name: 'Apr',
    RELIANCE: 3908,
    HDFCBANK: 4800,
    TCS: 3800,
    INFY: 4300,
  },
  {
    name: 'May',
    RELIANCE: 4800,
    HDFCBANK: 3800,
    TCS: 4300,
    INFY: 4100,
  },
  {
    name: 'Jun',
    RELIANCE: 3800,
    HDFCBANK: 4300,
    TCS: 4100,
    INFY: 5400,
  },
  {
    name: 'Jul',
    RELIANCE: 4300,
    HDFCBANK: 4100,
    TCS: 5400,
    INFY: 5200,
  },
  {
    name: 'Aug',
    RELIANCE: 4100,
    HDFCBANK: 5400,
    TCS: 5200,
    INFY: 5800,
  },
  {
    name: 'Sep',
    RELIANCE: 5400,
    HDFCBANK: 5200,
    TCS: 5800,
    INFY: 6000,
  },
  {
    name: 'Oct',
    RELIANCE: 5200,
    HDFCBANK: 5800,
    TCS: 6000,
    INFY: 6300,
  },
  {
    name: 'Nov',
    RELIANCE: 5800,
    HDFCBANK: 6000,
    TCS: 6300,
    INFY: 6500,
  },
  {
    name: 'Dec',
    RELIANCE: 6000,
    HDFCBANK: 6300,
    TCS: 6500,
    INFY: 7000,
  },
];

// Mock portfolio allocation data
const portfolioAllocationData = [
  { name: 'Equity', value: 55, color: '#16a34a' },
  { name: 'Debt', value: 25, color: '#3b82f6' },
  { name: 'Gold', value: 10, color: '#eab308' },
  { name: 'Cash', value: 5, color: '#64748b' },
  { name: 'Alternative', value: 5, color: '#8b5cf6' },
];

// Mock holdings data
const holdingsData = [
  { id: 1, name: 'RELIANCE', quantity: 150, buyPrice: 2590.25, currentPrice: 2687.45, change: 3.75, color: '#16a34a' },
  { id: 2, name: 'HDFCBANK', quantity: 220, buyPrice: 1680.50, currentPrice: 1735.30, change: 3.26, color: '#16a34a' },
  { id: 3, name: 'TCS', quantity: 80, buyPrice: 3420.75, currentPrice: 3380.15, change: -1.19, color: '#ef4444' },
  { id: 4, name: 'INFY', quantity: 175, buyPrice: 1590.25, currentPrice: 1675.90, change: 5.39, color: '#16a34a' },
  { id: 5, name: 'HDFC', quantity: 120, buyPrice: 2790.50, currentPrice: 2650.30, change: -5.03, color: '#ef4444' },
  { id: 6, name: 'SBI', quantity: 300, buyPrice: 520.75, currentPrice: 565.15, change: 8.53, color: '#16a34a' },
];

const PortfolioDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState("all");
  const [timeframe, setTimeframe] = useState("1Y");
  
  // Calculate overall portfolio stats
  const totalInvestment = holdingsData.reduce((acc, stock) => acc + (stock.buyPrice * stock.quantity), 0);
  const currentValue = holdingsData.reduce((acc, stock) => acc + (stock.currentPrice * stock.quantity), 0);
  const overallGain = currentValue - totalInvestment;
  const overallReturn = (overallGain / totalInvestment) * 100;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze your investment portfolio performance</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              <SelectItem value="equity">Equity</SelectItem>
              <SelectItem value="debt">Debt</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="alternative">Alternative</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[150px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'dd MMM yyyy') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard
          title="Total Investment"
          value={formatCurrency(totalInvestment)}
          variant="glass"
          className="bg-gradient-to-br from-primary/10 to-primary/5"
        />
        <DataCard
          title="Current Value"
          value={formatCurrency(currentValue)}
          variant="glass"
          className="bg-gradient-to-br from-blue-100/50 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-900/10"
        />
        <DataCard
          title="Overall Gain/Loss"
          value={formatCurrency(overallGain)}
          trend={parseFloat(overallReturn.toFixed(2))}
          trendLabel="overall return"
          variant="glass"
          className={cn(
            "bg-gradient-to-br",
            overallGain > 0
              ? "from-income-100/50 to-income-50/50 dark:from-income-900/20 dark:to-income-900/10"
              : "from-expense-100/50 to-expense-50/50 dark:from-expense-900/20 dark:to-expense-900/10"
          )}
        />
        <DataCard
          title="XIRR"
          value="16.8%"
          trend={3.2}
          trendLabel="vs benchmark"
          variant="glass"
          className="bg-gradient-to-br from-purple-100/50 to-purple-50/50 dark:from-purple-900/20 dark:to-purple-900/10"
        />
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-0">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Stock Performance</CardTitle>
                  <CardDescription>Compare your stock performance over time</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" 
                    className={cn(timeframe === "1M" && "bg-primary text-primary-foreground")}
                    onClick={() => setTimeframe("1M")}>1M</Button>
                  <Button variant="outline" size="sm"
                    className={cn(timeframe === "3M" && "bg-primary text-primary-foreground")}
                    onClick={() => setTimeframe("3M")}>3M</Button>
                  <Button variant="outline" size="sm"
                    className={cn(timeframe === "6M" && "bg-primary text-primary-foreground")}
                    onClick={() => setTimeframe("6M")}>6M</Button>
                  <Button variant="outline" size="sm"
                    className={cn(timeframe === "1Y" && "bg-primary text-primary-foreground")}
                    onClick={() => setTimeframe("1Y")}>1Y</Button>
                  <Button variant="outline" size="sm"
                    className={cn(timeframe === "ALL" && "bg-primary text-primary-foreground")}
                    onClick={() => setTimeframe("ALL")}>ALL</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={stockPerformanceData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${value}`} />
                  <Tooltip formatter={(value) => [`₹${value}`, ""]} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="RELIANCE" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="HDFCBANK" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="TCS" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="INFY" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cumulative Returns</CardTitle>
                <CardDescription>Growth of ₹10,000 invested over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart
                    data={stockPerformanceData}
                    margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `₹${value}`} />
                    <Tooltip formatter={(value) => [`₹${value}`, ""]} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="RELIANCE" 
                      stroke="#16a34a" 
                      fill="#16a34a20" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="HDFCBANK" 
                      stroke="#3b82f6" 
                      fill="#3b82f620" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Performance</CardTitle>
                <CardDescription>Comparison across different sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={[
                      { name: 'IT', value: 12.8 },
                      { name: 'Banking', value: 8.4 },
                      { name: 'Pharma', value: 5.2 },
                      { name: 'FMCG', value: 7.6 },
                      { name: 'Auto', value: 9.2 },
                    ]}
                    margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Bar 
                      dataKey="value" 
                      fill="#16a34a" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Allocation Tab */}
        <TabsContent value="allocation" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution of your investment across asset classes</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full max-w-md">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={portfolioAllocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {portfolioAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Distribution</CardTitle>
                <CardDescription>Breakdown of your equity holdings by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'IT', value: 32, color: '#3b82f6' },
                        { name: 'Banking', value: 28, color: '#16a34a' },
                        { name: 'Oil & Gas', value: 15, color: '#eab308' },
                        { name: 'Pharma', value: 10, color: '#8b5cf6' },
                        { name: 'Auto', value: 8, color: '#f97316' },
                        { name: 'Others', value: 7, color: '#64748b' },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: 'IT', value: 32, color: '#3b82f6' },
                        { name: 'Banking', value: 28, color: '#16a34a' },
                        { name: 'Oil & Gas', value: 15, color: '#eab308' },
                        { name: 'Pharma', value: 10, color: '#8b5cf6' },
                        { name: 'Auto', value: 8, color: '#f97316' },
                        { name: 'Others', value: 7, color: '#64748b' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>Risk assessment of your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Volatility</h3>
                    <span className="text-3xl font-bold text-amber-500">Medium</span>
                    <p className="text-sm text-muted-foreground mt-2">Based on 1-year standard deviation</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Beta</h3>
                    <span className="text-3xl font-bold">0.92</span>
                    <p className="text-sm text-muted-foreground mt-2">Relative to Nifty 50</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Sharpe Ratio</h3>
                    <span className="text-3xl font-bold text-green-600">1.86</span>
                    <p className="text-sm text-muted-foreground mt-2">Risk-adjusted return</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Holdings Tab */}
        <TabsContent value="holdings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Your Holdings</CardTitle>
              <CardDescription>Current stock positions and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-right py-3 px-4">Quantity</th>
                      <th className="text-right py-3 px-4">Avg. Buy Price</th>
                      <th className="text-right py-3 px-4">Current Price</th>
                      <th className="text-right py-3 px-4">Current Value</th>
                      <th className="text-right py-3 px-4">Gain/Loss</th>
                      <th className="text-right py-3 px-4">Change %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdingsData.map((stock) => (
                      <tr key={stock.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{stock.name}</td>
                        <td className="text-right py-3 px-4">{stock.quantity}</td>
                        <td className="text-right py-3 px-4">{formatCurrency(stock.buyPrice)}</td>
                        <td className="text-right py-3 px-4">{formatCurrency(stock.currentPrice)}</td>
                        <td className="text-right py-3 px-4">{formatCurrency(stock.currentPrice * stock.quantity)}</td>
                        <td className="text-right py-3 px-4">
                          {formatCurrency((stock.currentPrice - stock.buyPrice) * stock.quantity)}
                        </td>
                        <td className="text-right py-3 px-4">
                          <span className={cn(
                            "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
                            stock.change > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          )}>
                            {stock.change > 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                            {Math.abs(stock.change)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioDashboard;
