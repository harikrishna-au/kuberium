
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface CreateHabitFormProps {
  newHabit: { name: string; description: string; frequency: string };
  setNewHabit: React.Dispatch<React.SetStateAction<{ name: string; description: string; frequency: string }>>;
  addHabit: () => void;
}

const CreateHabitForm = ({ newHabit, setNewHabit, addHabit }: CreateHabitFormProps) => {
  return (
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
  );
};

export default CreateHabitForm;
