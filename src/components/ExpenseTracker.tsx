
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { categories } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { ExpenseType } from "@/utils/types";

const ExpenseTracker = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<ExpenseType>("expense");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category || !paymentMethod) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`${type === 'income' ? 'Income' : 'Expense'} of ₹${amount} added successfully!`);
      setIsSubmitting(false);
      // Reset form
      setAmount("");
      setDescription("");
      setCategory("");
      setPaymentMethod("");
    }, 600);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-lg">Track New Transaction</CardTitle>
        <CardDescription>Record your expenses and income</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="type" className="text-sm font-medium">Transaction Type</Label>
              <RadioGroup
                id="type"
                value={type}
                onValueChange={(value) => setType(value as ExpenseType)}
                className="flex mt-2 space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label 
                    htmlFor="expense" 
                    className={cn(
                      "text-sm cursor-pointer", 
                      type === "expense" ? "text-expense-600 font-medium" : ""
                    )}
                  >
                    Expense
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="income" id="income" />
                  <Label 
                    htmlFor="income" 
                    className={cn(
                      "text-sm cursor-pointer", 
                      type === "income" ? "text-income-600 font-medium" : ""
                    )}
                  >
                    Income
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm font-medium">Amount (₹)</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="500"
                  className="pl-7"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Input
                id="description"
                placeholder="Food delivery"
                className="mt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter(cat => 
                      (type === "expense" && cat.id !== "9" && cat.id !== "10") || 
                      (type === "income" && (cat.id === "9" || cat.id === "10"))
                    )
                    .map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center">
                          <span className="mr-2">{cat.icon}</span>
                          <span>{cat.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="paymentMethod" className="text-sm font-medium">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                  <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className={cn(
              "w-full transition-all", 
              type === "income" ? "bg-income-600 hover:bg-income-700" : "bg-primary hover:bg-primary/90"
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : `Add ${type === 'income' ? 'Income' : 'Expense'}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
