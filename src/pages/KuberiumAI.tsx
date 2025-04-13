import React from "react";
import DashboardAssistant from "@/components/DashboardAssistant";
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";

const KuberiumAI = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 p-4 md:p-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Kuberium AI Assistant
          </h1>
        </div>

        {/* Main Content - Takes all remaining vertical space */}
        <div className="flex-1 min-h-0">
          <Card className="h-full border-0 rounded-none shadow-none">
            <CardContent className="p-0 h-full">
              <DashboardAssistant />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KuberiumAI;


