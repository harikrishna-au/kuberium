
import React from "react";
import { 
  Activity, Users, MessageSquare, User
} from "lucide-react";
import { Location } from "react-router-dom";
import SidebarItem from "@/components/SidebarItem";

interface ExpertSidebarItemsProps {
  location: Location;
  closeSidebar: () => void;
}

const ExpertSidebarItems = ({ location, closeSidebar }: ExpertSidebarItemsProps) => {
  const menuItems = [
    {
      icon: <Activity />,
      label: "Feed",
      to: "/expert/feed",
      active: location.pathname === "/expert/feed"
    },
    {
      icon: <Users />,
      label: "Clients",
      to: "/expert/clients",
      active: location.pathname === "/expert/clients"
    },
    {
      icon: <MessageSquare />,
      label: "Messages",
      to: "/expert/messages",
      active: location.pathname === "/expert/messages"
    },
    {
      icon: <User />,
      label: "Profile",
      to: "/expert/profile",
      active: location.pathname === "/expert/profile"
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

export default ExpertSidebarItems;
