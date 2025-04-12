
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpertMessages = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Messages</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have no messages at this time.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertMessages;
