
import React from "react";
import Dashboard from "@/components/Dashboard";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="animate-fadeIn">
      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-6 flex items-center">
          <img 
            src="/lovable-uploads/f1144fd4-09d9-4f54-a4b8-cf5ca0f8dba3.png" 
            alt="Financial Wealth Logo" 
            className="w-16 h-16 mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold text-primary">Welcome, Demo User</h2>
            <p className="text-muted-foreground">Your financial wellness journey continues</p>
          </div>
        </CardContent>
      </Card>
      <Dashboard />
    </div>
  );
};

export default Index;
