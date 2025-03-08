
import React from "react";
import { Brain, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Location } from "react-router-dom";
import SidebarItems from "@/components/SidebarItems";
import ProfileSection from "@/components/ProfileSection";
import SidebarTip from "@/components/SidebarTip";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
  location: Location;
  handleSignOut: () => Promise<void>;
}

const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  isMobile, 
  location, 
  handleSignOut 
}: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 transform h-full bg-white dark:bg-gray-950 border-r transition-transform duration-300 ease-in-out z-20 pt-16 w-64",
        isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
      )}
    >
      <div className="h-full flex flex-col p-4">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-[4.5rem] md:hidden" 
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
        
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
            <Brain className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold">Kuberium</span>
        </div>
        
        <SidebarItems 
          location={location} 
          closeSidebar={() => isMobile && setSidebarOpen(false)} 
        />
        
        <SidebarTip />
        
        <ProfileSection handleSignOut={handleSignOut} />
      </div>
    </aside>
  );
};

export default Sidebar;
