
import React from "react";
import { 
  Home, BarChart3, Wallet, Target, BellRing, Settings,
  Brain, Coins, FileSpreadsheet, HandHeart, UsersRound
} from "lucide-react";
import { Location } from "react-router-dom";
import SidebarItem from "@/components/SidebarItem";

interface SidebarItemsProps {
  location: Location;
  closeSidebar: () => void;
}

const SidebarItems = ({ location, closeSidebar }: SidebarItemsProps) => {
  const menuItems = [
    {
      icon: <Home />,
      label: "Dashboard",
      to: "/",
      active: location.pathname === "/"
    },
    {
      icon: <Coins />,
      label: "Investments",
      to: "/investments",
      active: location.pathname === "/investments"
    },
    {
      icon: <BarChart3 />,
      label: "Analytics",
      to: "/analytics",
      active: location.pathname === "/analytics"
    },
    {
      icon: <Wallet />,
      label: "Budgets",
      to: "/budgets",
      active: location.pathname === "/budgets"
    },
    {
      icon: <Target />,
      label: "Goals",
      to: "/goals",
      active: location.pathname === "/goals"
    },
    {
      icon: <FileSpreadsheet />,
      label: "Tax Optimization",
      to: "/tax-optimization",
      active: location.pathname === "/tax-optimization"
    },
    {
      icon: <HandHeart />,
      label: "Financial Habits",
      to: "/financial-habits",
      active: location.pathname === "/financial-habits"
    },
    {
      icon: <UsersRound />,
      label: "Human Advisors",
      to: "/advisors",
      active: location.pathname === "/advisors"
    },
    {
      icon: <BellRing />,
      label: "Notifications",
      to: "/notifications",
      active: location.pathname === "/notifications"
    },
    {
      icon: <Settings />,
      label: "Settings",
      to: "/settings",
      active: location.pathname === "/settings"
    }
  ];

  return (
    <div className="space-y-1">
      {menuItems.map((item) => (
        <SidebarItem 
          key={item.label}
          icon={item.icon} 
          label={item.label} 
          to={item.to} 
          active={item.active} 
          onClick={closeSidebar}
        />
      ))}
    </div>
  );
};

export default SidebarItems;
