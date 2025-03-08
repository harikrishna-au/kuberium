
import React from "react";
import { Button } from "@/components/ui/button";

const SidebarTip = () => {
  return (
    <div className="mt-6 p-4 bg-primary/10 rounded-lg">
      <h3 className="font-medium text-sm">Pro Tip 💡</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Connect your bank account for automated insights and smart wealth optimization
      </p>
      <Button size="sm" variant="outline" className="mt-3 w-full">
        Connect Bank
      </Button>
    </div>
  );
};

export default SidebarTip;
