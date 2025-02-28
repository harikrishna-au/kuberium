
import * as React from "react";
import { cn } from "@/lib/utils";

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  isLoading?: boolean;
  className?: string;
  variant?: "default" | "glass" | "neomorphic" | "outline";
}

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({ title, value, icon, trend, trendLabel, isLoading, className, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-card",
      glass: "glass-card",
      neomorphic: "neomorphic",
      outline: "border border-border bg-transparent",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg p-4 shadow-sm transition-all duration-200 card-hover-effect",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
            <div className="h-8 w-1/2 animate-pulse rounded bg-muted"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              {icon && <div className="text-primary">{icon}</div>}
            </div>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold tracking-tight">{value}</p>
            </div>
            {trend !== undefined && (
              <div className="mt-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                    trend > 0
                      ? "bg-income-100 text-income-800 dark:bg-income-900/30 dark:text-income-400"
                      : trend < 0
                      ? "bg-expense-100 text-expense-800 dark:bg-expense-900/30 dark:text-expense-400"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <span className="mr-1 text-xs">
                    {trend > 0 ? "↑" : trend < 0 ? "↓" : "→"}
                  </span>
                  {Math.abs(trend)}% {trendLabel}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

DataCard.displayName = "DataCard";

export { DataCard };
