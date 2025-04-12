
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpertClients = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Client Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <p>When you start working with clients, they will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertClients;
