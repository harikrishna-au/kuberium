
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ChallengeCardProps {
  id: number;
  name: string;
  progress: number;
  deadline: string;
}

const ChallengeCard = ({ id, name, progress, deadline }: ChallengeCardProps) => {
  return (
    <Card key={id}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{deadline}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-2 w-full bg-secondary rounded">
            <div
              className={`h-2 rounded ${progress === 100 ? 'bg-green-500' : 'bg-primary'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-right">{progress}%</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
