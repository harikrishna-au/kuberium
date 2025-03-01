
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, BarChart3, Wallet, Target, BellRing, Settings, X, BarChartHorizontal, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return "U";
    
    const email = user.email;
    const parts = email.split("@")[0].split(/[._-]/);
    
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    
    return email.substring(0, 2).toUpperCase();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        {/* Sidebar */}
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
                onClick={toggleSidebar}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
            
            <div className="flex items-center gap-2 px-2 mb-6">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                <BarChartHorizontal className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">FinAI</span>
            </div>
            
            <div className="space-y-1">
              <SidebarItem 
                icon={<Home />} 
                label="Dashboard" 
                to="/" 
                active={location.pathname === "/"} 
                onClick={() => isMobile && setSidebarOpen(false)}
              />
              <SidebarItem 
                icon={<BarChart3 />} 
                label="Analytics" 
                to="/analytics" 
                active={location.pathname === "/analytics"} 
                onClick={() => isMobile && setSidebarOpen(false)}
              />
              <SidebarItem 
                icon={<Wallet />} 
                label="Budgets" 
                to="/budgets" 
                active={location.pathname === "/budgets"} 
                onClick={() => isMobile && setSidebarOpen(false)}
              />
              <SidebarItem 
                icon={<Target />} 
                label="Goals" 
                to="/goals" 
                active={location.pathname === "/goals"} 
                onClick={() => isMobile && setSidebarOpen(false)}
              />
              <SidebarItem 
                icon={<BellRing />} 
                label="Notifications" 
                to="/notifications" 
                active={location.pathname === "/notifications"} 
                onClick={() => isMobile && setSidebarOpen(false)}
              />
              <SidebarItem 
                icon={<Settings />} 
                label="Settings" 
                to="/settings" 
                active={location.pathname === "/settings"} 
                onClick={() => isMobile && setSidebarOpen(false)}
              />
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h3 className="font-medium text-sm">Pro Tip 💡</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Connect your bank account for automatic transaction import
              </p>
              <Button size="sm" variant="outline" className="mt-3 w-full">
                Connect Bank
              </Button>
            </div>
            
            <div className="mt-auto">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-medium">{getUserInitials()}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">Free Plan</p>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="ghost" className="flex-1">
                    Profile
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-3.5 w-3.5 mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10"
            onClick={toggleSidebar}
          />
        )}
        
        {/* Main content */}
        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            !isMobile && "md:pl-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ 
  icon, 
  label, 
  active = false,
  to,
  onClick
}: { 
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  to: string;
  onClick?: () => void;
}) => {
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

export default Layout;
