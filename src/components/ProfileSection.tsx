
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

interface ProfileSectionProps {
  handleSignOut: () => Promise<void>;
}

const ProfileSection = ({ handleSignOut }: ProfileSectionProps) => {
  const { user } = useAuth();
  
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
  );
};

export default ProfileSection;
