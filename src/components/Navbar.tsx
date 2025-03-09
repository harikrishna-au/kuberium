
import React from "react";
import { Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const isMobile = useIsMobile();

  return (
    <nav className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {isMobile && (
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/f1144fd4-09d9-4f54-a4b8-cf5ca0f8dba3.png" 
              alt="Kuberium Logo" 
              className="h-8 w-8 rounded-full" 
            />
            <span className="text-lg font-semibold text-primary">Kuberium</span>
          </div>
        )}

        {!isMobile && (
          <div className="flex-1 mx-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Today:</span> {new Date().toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 text-sm hover:bg-muted rounded-md transition-colors">
                  <p className="font-medium">Budget Alert</p>
                  <p className="text-muted-foreground mt-1">
                    You've spent 90% of your food budget this month
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    2 hours ago
                  </p>
                </div>
                <div className="p-4 text-sm hover:bg-muted rounded-md transition-colors">
                  <p className="font-medium">New Financial Insight</p>
                  <p className="text-muted-foreground mt-1">
                    You could save ₹2,500 monthly by reducing non-essential expenses
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Yesterday
                  </p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <span className="hidden md:inline-block font-medium">Hari Krishna</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Subscriptions</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
