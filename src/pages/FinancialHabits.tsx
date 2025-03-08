
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Clock, Plus, Star, Target, Trash2 } from "lucide-react";

const FinancialHabits = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Check expenses weekly", description: "Review all expenses to identify patterns", frequency: "Weekly", streak: 5, status: "active" },
    { id: 2, name: "Save 10% of income", description: "Automatically transfer 10% of income to savings", frequency: "Monthly", streak: 3, status: "active" },
    { id: 3, name: "Review investment portfolio", description: "Check portfolio performance and rebalance if needed", frequency: "Monthly", streak: 2, status: "active" },
  ]);

  const [challengeProgress, setChallengeProgress] = useState([
    { id: 1, name: "No-spend weekend", progress: 60, deadline: "2 days left" },
    { id: 2, name: "Reduce food expenses by 15%", progress: 40, deadline: "10 days left" },
    { id: 3, name: "Set up automatic bill payments", progress: 100, deadline: "Completed" },
  ]);

  const [newHabit, setNewHabit] = useState({ name: "", description: "", frequency: "Daily" });

  const addHabit = () => {
    if (newHabit.name.trim() === "") return;
    
    const habit = {
      id: habits.length + 1,
      name: newHabit.name,
      description: newHabit.description,
      frequency: newHabit.frequency,
      streak: 0,
      status: "active"
    };
    
    setHabits([...habits, habit]);
    setNewHabit({ name: "", description: "", frequency: "Daily" });
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const completeHabit = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        return { ...habit, streak: habit.streak + 1 };
      }
      return habit;
    }));
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Financial Habits</h1>
        <p className="text-muted-foreground">Build healthy financial habits and track your progress over time</p>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="active">Active Habits</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="insights">Habit Insights</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <Card key={habit.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{habit.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => completeHabit(habit.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteHabit(habit.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{habit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{habit.frequency}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span>Streak: {habit.streak}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challengeProgress.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{challenge.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{challenge.deadline}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-secondary rounded">
                      <div
                        className={`h-2 rounded ${challenge.progress === 100 ? 'bg-green-500' : 'bg-primary'}`}
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                    <div className="text-sm text-right">{challenge.progress}%</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Habit Performance</CardTitle>
              <CardDescription>Your habit consistency over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Habit consistency chart will appear here</p>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span>Overall consistency score</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Most consistent habit</span>
                  <span className="font-medium">Save 10% of income</span>
                </div>
                <div className="flex justify-between">
                  <span>Habit needing attention</span>
                  <span className="font-medium">Review investment portfolio</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Impact</CardTitle>
              <CardDescription>Estimated impact of your habits on financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Savings increase</span>
                  <span className="font-medium text-green-500">+₹12,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Unnecessary expenses decreased</span>
                  <span className="font-medium text-green-500">-₹8,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Investment returns improved</span>
                  <span className="font-medium text-green-500">+2.3%</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center font-medium">
                  <span>Overall financial improvement</span>
                  <span className="text-green-500">+₹21,350</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Financial Habit</CardTitle>
              <CardDescription>Define a new habit to improve your financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="habit-name">Habit Name</Label>
                  <Input
                    id="habit-name"
                    placeholder="e.g., Review expenses weekly"
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="habit-description">Description</Label>
                  <Input
                    id="habit-description"
                    placeholder="Describe your habit in detail"
                    value={newHabit.description}
                    onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="habit-frequency">Frequency</Label>
                  <select
                    id="habit-frequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newHabit.frequency}
                    onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                
                <Button onClick={addHabit} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Habit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialHabits;
