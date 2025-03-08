
import React from "react";
import HabitInsightCard from "./HabitInsightCard";
import FinancialImpactCard from "./FinancialImpactCard";

const InsightsSection = () => {
  return (
    <div className="space-y-4">
      <HabitInsightCard />
      <FinancialImpactCard />
    </div>
  );
};

export default InsightsSection;
