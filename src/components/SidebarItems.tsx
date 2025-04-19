
import React from "react";
import { 
  Home, BarChart3, Wallet, Target, BellRing, Settings,
  Brain, Coins, FileSpreadsheet, HandHeart, UsersRound,
  Newspaper, Bot, ChartPie
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
      icon: <Newspaper />,
      label: "Feed",
      to: "/feed",
      active: location.pathname === "/feed"
    },
    {
      icon: <Bot />,
      label: "Kuberium AI",
      to: "/ai",
      active: location.pathname === "/ai"
    },
    {
      icon: <BarChart3 />,
      label: "Analytics",
      to: "/analytics",
      active: location.pathname === "/analytics"
    },
    {
      icon: <ChartPie />,
      label: "Portfolio",
      to: "/portfolio",
      active: location.pathname === "/portfolio"
    },
    {
      icon: <Target />,
      label: "Goals",
      to: "/goals",
      active: location.pathname === "/goals"
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
