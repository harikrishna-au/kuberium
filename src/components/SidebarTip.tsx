
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { processAAJsonData } from "@/services/aaService";

const SidebarTip = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConnectAA = async () => {
    setIsProcessing(true);
    try {
      const success = await processAAJsonData(jsonInput);
      
      if (success) {
        setIsDialogOpen(false);
        setJsonInput("");
        // Optionally refresh the page to show new data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error connecting AA:", error);
      toast.error("Failed to connect account");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <h3 className="font-medium text-sm">Pro Tip 💡</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Connect your bank account for automated insights and smart wealth optimization
        </p>
        <Button 
          size="sm" 
          variant="outline" 
          className="mt-3 w-full"
          onClick={() => setIsDialogOpen(true)}
        >
          Connect AA
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect Account Aggregator</DialogTitle>
            <DialogDescription>
              Please paste your AA JSON data below to connect your bank account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              placeholder="Paste your AA JSON here..."
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setJsonInput("");
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConnectAA}
              disabled={!jsonInput.trim() || isProcessing}
            >
              {isProcessing ? "Connecting..." : "Connect Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SidebarTip;
