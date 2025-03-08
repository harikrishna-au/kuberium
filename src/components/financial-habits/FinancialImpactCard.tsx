
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FinancialImpactCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Impact</CardTitle>
        <CardDescription>Estimated impact of your habits on financial health</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Savings increase</span>
            <span className="font-medium text-green-500">+₹12,500</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Unnecessary expenses decreased</span>
            <span className="font-medium text-green-500">-₹8,200</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Investment returns improved</span>
            <span className="font-medium text-green-500">+2.3%</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between items-center font-medium">
            <span>Overall financial improvement</span>
            <span className="text-green-500">+₹21,350</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialImpactCard;
