
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, FilePlus, Receipt, Calculator, ArrowUpRight, Download } from "lucide-react";

const TaxOptimization = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  const deductionCategories = [
    { id: 1, name: "80C Investments", max: 150000, current: 110000, percentage: 73 },
    { id: 2, name: "Health Insurance (80D)", max: 50000, current: 25000, percentage: 50 },
    { id: 3, name: "Home Loan Interest (24B)", max: 200000, current: 180000, percentage: 90 },
    { id: 4, name: "NPS (80CCD)", max: 50000, current: 0, percentage: 0 },
    { id: 5, name: "Education Loan Interest (80E)", max: "No Limit", current: 0, percentage: 0 },
  ];

  const taxSavingSuggestions = [
    { 
      id: 1, 
      name: "Increase PPF contribution", 
      saving: 12000,
      description: "Increase your PPF contribution by ₹40,000 to maximize 80C benefit" 
    },
    { 
      id: 2, 
      name: "Health insurance for parents", 
      saving: 7500,
      description: "Additional deduction of ₹25,000 available under 80D for parents' health insurance" 
    },
    { 
      id: 3, 
      name: "Contribute to NPS", 
      saving: 15000,
      description: "Additional ₹50,000 deduction available under 80CCD(1B)" 
    },
  ];

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Tax Optimization</h1>
        <p className="text-muted-foreground">Smart strategies to minimize your tax burden</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Potential Tax Savings</CardTitle>
            <CardDescription>This financial year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹34,500</div>
            <div className="flex items-center text-green-500 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span className="text-sm">Implement suggestions to save</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tax Deductions Utilized</CardTitle>
            <CardDescription>Out of available deductions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">65%</div>
            <Progress value={65} className="h-2 mt-2" />
            <div className="flex items-center text-amber-500 mt-1">
              <span className="text-sm">Room for optimization</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Tax Regime</CardTitle>
            <CardDescription>For salary income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Old Regime</div>
            <div className="flex items-center text-green-500 mt-1">
              <Check className="h-4 w-4 mr-1" />
              <span className="text-sm">Optimal for your income</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setCurrentTab}>
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="regimes">Tax Regimes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Summary</CardTitle>
              <CardDescription>Financial Year 2023-24</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross Total Income</span>
                  <span className="font-medium">₹15,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Deductions</span>
                  <span className="font-medium">₹3,15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxable Income</span>
                  <span className="font-medium">₹11,85,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax Liability</span>
                  <span className="font-medium">₹1,64,320</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TDS Already Deducted</span>
                  <span className="font-medium">₹1,45,000</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between font-medium">
                  <span>Remaining Tax to Pay</span>
                  <span>₹19,320</span>
                </div>
              </div>
              
              <Button className="w-full">
                Generate Detailed Tax Report
              </Button>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Optimization Score</CardTitle>
                <CardDescription>How optimized is your tax planning</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center mb-4">
                  <div className="absolute inset-0 rounded-full border-8 border-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 70%)' }}></div>
                  <span className="text-3xl font-bold">70%</span>
                </div>
                <div className="text-center space-y-1">
                  <p className="font-medium">Good</p>
                  <p className="text-sm text-muted-foreground">Implement suggested strategies to reach 100%</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Opportunities</CardTitle>
                <CardDescription>Top ways to save on taxes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {taxSavingSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-center justify-between p-3 rounded-md border">
                    <div>
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-sm text-green-600">Save ₹{suggestion.saving.toLocaleString()}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-4">
          <h2 className="text-xl font-semibold">Tax Deduction Categories</h2>
          <p className="text-muted-foreground">Track your progress towards maximum available deductions</p>
          
          <div className="space-y-4">
            {deductionCategories.map((category) => (
              <Card key={category.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Maximum deduction: {typeof category.max === 'string' ? category.max : `₹${category.max.toLocaleString()}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{category.current.toLocaleString()}</div>
                      <p className="text-sm text-muted-foreground">Current</p>
                    </div>
                  </div>
                  
                  <Progress value={category.percentage} className="h-2" />
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-muted-foreground">{category.percentage}% utilized</span>
                    {category.percentage < 100 && typeof category.max === 'number' && (
                      <span className="text-sm text-muted-foreground">
                        ₹{(category.max - category.current).toLocaleString()} remaining
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button variant="outline" className="w-full">
            <FilePlus className="h-4 w-4 mr-2" />
            Add New Deduction
          </Button>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <h2 className="text-xl font-semibold">Personalized Tax Saving Suggestions</h2>
          <p className="text-muted-foreground">AI-driven recommendations to minimize your tax liability</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {taxSavingSuggestions.map((suggestion) => (
              <Card key={suggestion.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{suggestion.name}</CardTitle>
                  <CardDescription className="text-green-600">Save up to ₹{suggestion.saving.toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{suggestion.description}</p>
                  <Button variant="outline" className="w-full">
                    Implement This Strategy
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>ESOP Tax Optimization</CardTitle>
              <CardDescription>Minimize tax on your Employee Stock Options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Your vested ESOPs can be exercised with a strategic approach to minimize tax implications. Based on your profile, we recommend the following schedule:</p>
              
              <div className="space-y-3">
                <div className="p-3 rounded-md border">
                  <div className="font-medium">Exercise 30% in January 2024</div>
                  <div className="text-sm text-muted-foreground">Benefits from lower income tax bracket positioning</div>
                </div>
                
                <div className="p-3 rounded-md border">
                  <div className="font-medium">Exercise 30% in March 2024</div>
                  <div className="text-sm text-muted-foreground">Enables maximum deduction utilization before year-end</div>
                </div>
                
                <div className="p-3 rounded-md border">
                  <div className="font-medium">Exercise remaining 40% in April 2024</div>
                  <div className="text-sm text-muted-foreground">Shifts tax liability to next financial year</div>
                </div>
              </div>
              
              <Button className="w-full">
                Generate Detailed ESOP Strategy
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regimes" className="space-y-4">
          <h2 className="text-xl font-semibold">Tax Regime Comparison</h2>
          <p className="text-muted-foreground">Compare tax liability under old vs new tax regime</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-primary">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Old Tax Regime</CardTitle>
                  <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    Recommended for you
                  </div>
                </div>
                <CardDescription>With deductions & exemptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gross Total Income</span>
                    <span className="font-medium">₹15,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Deductions</span>
                    <span className="font-medium">₹3,15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxable Income</span>
                    <span className="font-medium">₹11,85,000</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Tax Liability</span>
                    <span>₹1,64,320</span>
                  </div>
                </div>
                
                <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-1">Benefits</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Can claim all available deductions</li>
                    <li>• Better for those with large home loans</li>
                    <li>• Advantageous with significant investments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>New Tax Regime</CardTitle>
                <CardDescription>Lower rates, no deductions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gross Total Income</span>
                    <span className="font-medium">₹15,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Deductions</span>
                    <span className="font-medium">₹0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxable Income</span>
                    <span className="font-medium">₹15,00,000</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Tax Liability</span>
                    <span>₹1,95,000</span>
                  </div>
                </div>
                
                <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-1">Benefits</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Simplified tax calculation</li>
                    <li>• Lower tax rates</li>
                    <li>• No need to maintain investment proofs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Savings with Old Regime</CardTitle>
              <CardDescription>Difference in tax liability between regimes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">₹30,680</div>
                  <p className="text-sm text-muted-foreground">Estimated annual savings</p>
                </div>
                <Button>
                  <Calculator className="h-4 w-4 mr-2" />
                  Recalculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <h2 className="text-xl font-semibold">Tax Documents</h2>
          <p className="text-muted-foreground">Store and manage important tax documents</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Form 16</CardTitle>
                <CardDescription>FY 2023-24</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">Your salary certificate with TDS details provided by employer</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Form 26AS</CardTitle>
                <CardDescription>Tax Credit Statement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">Annual tax statement showing tax deducted/collected at source</p>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Interest Certificates</CardTitle>
                <CardDescription>FY 2023-24</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">Home loan and fixed deposit interest certificates</p>
                <Button variant="outline" className="w-full">
                  <FilePlus className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax Planning Timeline</CardTitle>
              <CardDescription>Important dates for the financial year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between p-3 rounded-md border">
                <div>
                  <div className="font-medium">Submit Investment Proofs</div>
                  <div className="text-sm text-muted-foreground">For salary TDS calculation</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-amber-600">Jan 15, 2024</div>
                  <div className="text-sm text-muted-foreground">30 days left</div>
                </div>
              </div>
              
              <div className="flex justify-between p-3 rounded-md border">
                <div>
                  <div className="font-medium">Advance Tax - 4th Installment</div>
                  <div className="text-sm text-muted-foreground">Last quarter payment</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-amber-600">Mar 15, 2024</div>
                  <div className="text-sm text-muted-foreground">89 days left</div>
                </div>
              </div>
              
              <div className="flex justify-between p-3 rounded-md border">
                <div>
                  <div className="font-medium">Complete Tax Saving Investments</div>
                  <div className="text-sm text-muted-foreground">For current financial year</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-amber-600">Mar 31, 2024</div>
                  <div className="text-sm text-muted-foreground">105 days left</div>
                </div>
              </div>
              
              <div className="flex justify-between p-3 rounded-md border">
                <div>
                  <div className="font-medium">File Income Tax Return</div>
                  <div className="text-sm text-muted-foreground">To avoid late filing fees</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Jul 31, 2024</div>
                  <div className="text-sm text-muted-foreground">227 days left</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxOptimization;
