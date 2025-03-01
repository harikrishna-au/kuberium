
import React, { useState } from "react";
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

// Sample data - would be replaced with real data from Supabase in production
const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    targetAmount: 200000,
    currentAmount: 160000,
    deadline: new Date(2024, 11, 31),
    priority: "high",
    icon: "🛡️"
  },
  {
    id: 2,
    name: "New Car",
    targetAmount: 1000000,
    currentAmount: 450000,
    deadline: new Date(2025, 5, 30),
    priority: "medium",
    icon: "🚗"
  },
  {
    id: 3,
    name: "International Trip",
    targetAmount: 300000,
    currentAmount: 120000,
    deadline: new Date(2025, 0, 15),
    priority: "medium",
    icon: "✈️"
  },
  {
    id: 4,
    name: "Home Down Payment",
    targetAmount: 2500000,
    currentAmount: 1000000,
    deadline: new Date(2027, 3, 30),
    priority: "high",
    icon: "🏠"
  }
];

const completedGoals = [
  {
    id: 5,
    name: "Laptop Purchase",
    targetAmount: 90000,
    completedDate: new Date(2023, 8, 15),
    icon: "💻"
  },
  {
    id: 6,
    name: "Anniversary Gift",
    targetAmount: 25000,
    completedDate: new Date(2023, 10, 20),
    icon: "🎁"
  }
];

const Goals = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    deadline: new Date(),
    icon: "🎯"
  });

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
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateGoalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                // Here we would save the goal to Supabase
                console.log("Saving goal:", newGoal);
                setIsCreateGoalOpen(false);
                setNewGoal({
                  name: "",
                  targetAmount: "",
                  deadline: new Date(),
                  icon: "🎯"
                });
              }}>Create Goal</Button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const percentCompleted = (goal.currentAmount / goal.targetAmount) * 100;
              const daysLeft = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <Card key={goal.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="text-2xl">{goal.icon}</span> {goal.name}
                      </CardTitle>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
                        <span>{format(goal.deadline, 'MMM d, yyyy')}</span>
                      </span>
                      <span className={cn(
                        "font-medium",
                        daysLeft < 30 ? "text-red-500" : "text-muted-foreground"
                      )}>
                        {daysLeft} days left
                      </span>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full" variant="outline">
                        Add Funds
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            <Card className="border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <DialogTrigger asChild>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Add New Goal</p>
                </CardContent>
              </DialogTrigger>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedGoals.map((goal) => (
              <Card key={goal.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-2xl">{goal.icon}</span> {goal.name}
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
                    <span>{format(goal.completedDate, 'MMMM d, yyyy')}</span>
                  </div>
                  <Progress value={100} className="h-2" indicatorClassName="bg-green-500" />
                  <div className="flex justify-end text-xs text-green-600 font-medium mt-1">
                    <span>100% Achieved</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Goals;
