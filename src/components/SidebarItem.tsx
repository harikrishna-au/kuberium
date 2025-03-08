
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarItemProps { 
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  to: string;
  onClick?: () => void;
}

const SidebarItem = ({ 
  icon, 
  label, 
  active = false,
  to,
  onClick
}: SidebarItemProps) => {
  return (
    <Link to={to} onClick={onClick}>
      <button
        className={cn(
          "flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm transition-colors",
          active 
            ? "bg-primary text-white" 
            : "text-foreground hover:bg-secondary"
        )}
      >
        <span className={cn(active ? "text-white" : "text-muted-foreground")}>
          {icon}
        </span>
        <span>{label}</span>
      </button>
    </Link>
  );
};

export default SidebarItem;
