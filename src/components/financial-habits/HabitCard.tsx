
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, Star, Trash2 } from "lucide-react";

interface HabitCardProps {
  id: number;
  name: string;
  description: string;
  frequency: string;
  streak: number;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const HabitCard = ({ 
  id, 
  name, 
  description, 
  frequency, 
  streak, 
  onComplete, 
  onDelete 
}: HabitCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onComplete(id)}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{frequency}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 text-amber-500" />
            <span>Streak: {streak}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
