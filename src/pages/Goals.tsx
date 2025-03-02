
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Check, Edit2, PlusCircle, Target, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fetchSavingGoals, createSavingGoal, updateSavingGoal, deleteSavingGoal } from "@/services";
import { SavingGoal } from "@/utils/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Goals = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    deadline: new Date(),
    icon: "🎯"
  });
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [completedGoals, setCompletedGoals] = useState<SavingGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        setLoading(true);
        const goalsData = await fetchSavingGoals();
        
        // Separate active and completed goals
        const active = goalsData.filter(goal => goal.currentAmount < goal.targetAmount);
        const completed = goalsData.filter(goal => goal.currentAmount >= goal.targetAmount);
        
        setGoals(active);
        setCompletedGoals(completed);
      } catch (error) {
        console.error("Error loading goals:", error);
        toast.error("Failed to load saving goals");
      } finally {
        setLoading(false);
      }
    };
    
    loadGoals();
  }, []);

  const handleCreateGoal = async () => {
    try {
      if (!newGoal.name || !newGoal.targetAmount) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      const goal = {
        name: newGoal.name,
        targetAmount: Number(newGoal.targetAmount),
        currentAmount: 0,
        deadline: newGoal.deadline.toISOString()
      };
      
      const createdGoal = await createSavingGoal(goal);
      
      if (createdGoal) {
        setGoals([...goals, createdGoal]);
        setIsCreateGoalOpen(false);
        setNewGoal({
          name: "",
          targetAmount: "",
          deadline: new Date(),
          icon: "🎯"
        });
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("Failed to create saving goal");
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      const success = await deleteSavingGoal(id);
      if (success) {
        setGoals(goals.filter(goal => goal.id !== id));
        setCompletedGoals(completedGoals.filter(goal => goal.id !== id));
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast.error("Failed to delete saving goal");
    }
  };

  const handleAddFunds = async (goal: SavingGoal, amount: number) => {
    try {
      const newAmount = goal.currentAmount + amount;
      const success = await updateSavingGoal(goal.id, newAmount);
      
      if (success) {
        // Check if goal is now completed
        if (newAmount >= goal.targetAmount) {
          // Move to completed goals
          setCompletedGoals([...completedGoals, {...goal, currentAmount: newAmount}]);
          setGoals(goals.filter(g => g.id !== goal.id));
        } else {
          // Update current goals
          setGoals(goals.map(g => g.id === goal.id ? {...g, currentAmount: newAmount} : g));
        }
      }
    } catch (error) {
      console.error("Error adding funds:", error);
      toast.error("Failed to update saving goal");
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financial Goals</h1>
          <p className="text-muted-foreground">Set and track your savings goals</p>
        </div>

        <Dialog open={isCreateGoalOpen} onOpenChange={setIsCreateGoalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new financial goal to help you save for the future
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name" 
                  value={newGoal.name} 
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})} 
                  placeholder="e.g. Emergency Fund"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-icon">Icon</Label>
                <Input 
                  id="goal-icon" 
                  value={newGoal.icon} 
                  onChange={(e) => setNewGoal({...newGoal, icon: e.target.value})} 
                  placeholder="Enter emoji (e.g. 🎯)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-amount">Target Amount (₹)</Label>
                <Input
                  id="target-amount"
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                  placeholder="Enter target amount"
                />
              </div>
              <div className="space-y-2">
                <Label>Target Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        if (newDate) {
                          setNewGoal({...newGoal, deadline: newDate});
                        }
                      }}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateGoalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => {
                const percentCompleted = (goal.currentAmount / goal.targetAmount) * 100;
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card key={goal.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base flex items-center gap-2">
                          <span className="text-2xl">🎯</span> {goal.name}
                        </CardTitle>
                        <div className="flex gap-1">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Goal</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this savings goal? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() => handleDeleteGoal(goal.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <CardDescription>
                        Target: ₹{goal.targetAmount.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>₹{goal.currentAmount.toLocaleString()}</span>
                          <span>₹{goal.targetAmount.toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={percentCompleted} 
                          className="h-2"
                          indicatorClassName={cn(
                            percentCompleted < 25 ? "bg-red-500" : 
                            percentCompleted < 75 ? "bg-amber-500" : "bg-green-500"
                          )}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Saved so far</span>
                          <span>{Math.round(percentCompleted)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{format(new Date(goal.deadline), 'MMM d, yyyy')}</span>
                        </span>
                        <span className={cn(
                          "font-medium",
                          daysLeft < 30 ? "text-red-500" : "text-muted-foreground"
                        )}>
                          {daysLeft} days left
                        </span>
                      </div>
                      
                      <div className="pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full" variant="outline">
                              Add Funds
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Add Funds to Goal</DialogTitle>
                              <DialogDescription>
                                Enter the amount you want to add to your {goal.name} savings.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="space-y-2">
                                <Label htmlFor="fund-amount">Amount (₹)</Label>
                                <Input
                                  id="fund-amount"
                                  type="number"
                                  placeholder="Enter amount"
                                  min="1"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={() => {
                                  const amountInput = document.getElementById("fund-amount") as HTMLInputElement;
                                  const amount = Number(amountInput.value);
                                  if (amount > 0) {
                                    handleAddFunds(goal, amount);
                                  } else {
                                    toast.error("Please enter a valid amount");
                                  }
                                }}
                              >
                                Add Funds
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              <Card className="border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Button 
                    variant="ghost" 
                    className="w-full h-full flex flex-col items-center justify-center" 
                    onClick={() => setIsCreateGoalOpen(true)}
                  >
                    <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Add New Goal</p>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedGoals.length > 0 ? (
                completedGoals.map((goal) => (
                  <Card key={goal.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base flex items-center gap-2">
                          <span className="text-2xl">🎯</span> {goal.name}
                        </CardTitle>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <Check className="h-4 w-4" />
                        </span>
                      </div>
                      <CardDescription>
                        ₹{goal.targetAmount.toLocaleString()} saved
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Completed on</span>
                        <span>{format(new Date(), 'MMMM d, yyyy')}</span>
                      </div>
                      <Progress value={100} className="h-2" indicatorClassName="bg-green-500" />
                      <div className="flex justify-end text-xs text-green-600 font-medium mt-1">
                        <span>100% Achieved</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full p-8 text-center">
                  <Target className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                  <h3 className="mt-4 text-lg font-semibold">No completed goals yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Keep saving! Your completed goals will appear here.
                  </p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Goals;
