
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HabitList from "@/components/financial-habits/HabitList";
import ChallengeList from "@/components/financial-habits/ChallengeList";
import InsightsSection from "@/components/financial-habits/InsightsSection";
import CreateHabitForm from "@/components/financial-habits/CreateHabitForm";

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
          <HabitList 
            habits={habits} 
            onCompleteHabit={completeHabit} 
            onDeleteHabit={deleteHabit} 
          />
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <ChallengeList challenges={challengeProgress} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <InsightsSection />
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <CreateHabitForm 
            newHabit={newHabit} 
            setNewHabit={setNewHabit} 
            addHabit={addHabit} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialHabits;
