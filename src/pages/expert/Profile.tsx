
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpertProfile = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Expert Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage your expert profile and credentials here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertProfile;
