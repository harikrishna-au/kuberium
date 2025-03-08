
import React from "react";
import HabitCard from "./HabitCard";

interface Habit {
  id: number;
  name: string;
  description: string;
  frequency: string;
  streak: number;
  status: string;
}

interface HabitListProps {
  habits: Habit[];
  onCompleteHabit: (id: number) => void;
  onDeleteHabit: (id: number) => void;
}

const HabitList = ({ habits, onCompleteHabit, onDeleteHabit }: HabitListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          id={habit.id}
          name={habit.name}
          description={habit.description}
          frequency={habit.frequency}
          streak={habit.streak}
          onComplete={onCompleteHabit}
          onDelete={onDeleteHabit}
        />
      ))}
    </div>
  );
};

export default HabitList;
