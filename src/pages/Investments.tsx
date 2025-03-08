
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Coins, BarChart3, Plus, Info } from "lucide-react";

const Investments = () => {
  const [currentTab, setCurrentTab] = useState("portfolio");
  
  const portfolioData = [
    { id: 1, name: "HDFC Bank", type: "Stocks", amount: 50000, returns: 12.5, allocation: 25 },
    { id: 2, name: "Reliance Industries", type: "Stocks", amount: 45000, returns: 8.2, allocation: 22.5 },
    { id: 3, name: "Mirae Asset Large Cap Fund", type: "Mutual Fund", amount: 30000, returns: 14.8, allocation: 15 },
    { id: 4, name: "ICICI Prudential Technology Fund", type: "Mutual Fund", amount: 25000, returns: -3.2, allocation: 12.5 },
    { id: 5, name: "SBI Small Cap Fund", type: "Mutual Fund", amount: 20000, returns: 22.5, allocation: 10 },
    { id: 6, name: "Government Bonds", type: "Bonds", amount: 15000, returns: 7.8, allocation: 7.5 },
    { id: 7, name: "Gold ETF", type: "Commodities", amount: 15000, returns: 5.4, allocation: 7.5 },
  ];
  
  const recommendations = [
    { id: 1, name: "Axis Bluechip Fund", type: "Mutual Fund", returns: 15.2, risk: "Moderate", reason: "Consistent performer with lower volatility than market" },
    { id: 2, name: "HDFC Balanced Advantage Fund", type: "Mutual Fund", returns: 12.8, risk: "Low-Moderate", reason: "Dynamic asset allocation strategy helps manage market volatility" },
    { id: 3, name: "Tata Digital India Fund", type: "Mutual Fund", returns: 18.5, risk: "High", reason: "Exposure to growing technology sector with long-term potential" },
  ];

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Investments</h1>
        <p className="text-muted-foreground">Manage your investments and track performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Investments</CardTitle>
            <CardDescription>Current value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹2,00,000</div>
            <div className="flex items-center text-green-500 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span className="text-sm">+₹15,400 (8.3%)</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Returns</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹4,500</div>
            <div className="flex items-center text-green-500 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span className="text-sm">+2.3% vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Risk Score</CardTitle>
            <CardDescription>Moderate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">65/100</div>
            <Progress value={65} className="h-2 mt-2" />
            <div className="flex items-center text-amber-500 mt-1">
              <Info className="h-4 w-4 mr-1" />
              <span className="text-sm">Balanced portfolio</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" onValueChange={setCurrentTab}>
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Current Investments</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Investment
            </Button>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b font-medium p-4 bg-muted/50 text-sm">
              <div className="col-span-5">Investment</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-2 text-right">Returns</div>
              <div className="col-span-2 text-right">Allocation</div>
              <div className="col-span-1"></div>
            </div>
            
            <div className="divide-y">
              {portfolioData.map((investment) => (
                <div key={investment.id} className="grid grid-cols-12 p-4 text-sm items-center">
                  <div className="col-span-5">
                    <div className="font-medium">{investment.name}</div>
                    <div className="text-muted-foreground text-xs">{investment.type}</div>
                  </div>
                  <div className="col-span-2 text-right">₹{investment.amount.toLocaleString()}</div>
                  <div className={`col-span-2 text-right ${investment.returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {investment.returns >= 0 ? '+' : ''}{investment.returns}%
                  </div>
                  <div className="col-span-2 text-right">{investment.allocation}%</div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution of your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">Asset allocation chart will appear here</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Stocks (47.5%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Mutual Funds (37.5%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-sm">Bonds (7.5%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Commodities (7.5%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Allocation Analysis</CardTitle>
                <CardDescription>AI-powered insights for your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-md bg-amber-50 border border-amber-200 text-amber-800">
                  <h3 className="font-medium mb-1">Diversification Recommendation</h3>
                  <p className="text-sm">Your portfolio is slightly overweight in banking stocks. Consider redistributing 5-10% to diversify risk.</p>
                </div>
                
                <div className="p-4 rounded-md bg-blue-50 border border-blue-200 text-blue-800">
                  <h3 className="font-medium mb-1">Risk Assessment</h3>
                  <p className="text-sm">Your current allocation aligns well with your moderate risk profile, but could be optimized for better returns.</p>
                </div>
                
                <div className="p-4 rounded-md bg-green-50 border border-green-200 text-green-800">
                  <h3 className="font-medium mb-1">Growth Opportunity</h3>
                  <p className="text-sm">Based on your goals, increasing allocation to mid-cap funds could improve long-term growth prospects.</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  Generate Rebalancing Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <h2 className="text-xl font-semibold">AI-Powered Investment Recommendations</h2>
          <p className="text-muted-foreground">Personalized recommendations based on your risk profile and financial goals</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((recommendation) => (
              <Card key={recommendation.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{recommendation.name}</CardTitle>
                      <CardDescription>{recommendation.type}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Returns:</span>
                    <span className="font-medium text-green-500">{recommendation.returns}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className="font-medium">{recommendation.risk}</span>
                  </div>
                  <div className="pt-2 text-sm">
                    <span className="block text-muted-foreground mb-1">Why this fits you:</span>
                    <span>{recommendation.reason}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button variant="outline" className="w-full">
            See More Recommendations
          </Button>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <div className="rounded-md border">
            <div className="divide-y">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">Purchased Mirae Asset Large Cap Fund</div>
                  <div className="text-sm text-muted-foreground">Oct 15, 2023</div>
                </div>
                <div className="text-green-500 font-medium">+₹10,000</div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">Sold Infosys Shares</div>
                  <div className="text-sm text-muted-foreground">Sep 28, 2023</div>
                </div>
                <div className="text-red-500 font-medium">-₹15,000</div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">Purchased HDFC Bank Shares</div>
                  <div className="text-sm text-muted-foreground">Sep 10, 2023</div>
                </div>
                <div className="text-green-500 font-medium">+₹25,000</div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">SIP - ICICI Prudential Technology Fund</div>
                  <div className="text-sm text-muted-foreground">Sep 5, 2023</div>
                </div>
                <div className="text-green-500 font-medium">+₹5,000</div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">SIP - SBI Small Cap Fund</div>
                  <div className="text-sm text-muted-foreground">Sep 5, 2023</div>
                </div>
                <div className="text-green-500 font-medium">+₹5,000</div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            View All Transactions
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Investments;
