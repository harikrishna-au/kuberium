
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface ProfileSectionProps {
  handleSignOut: () => Promise<void>;
}

const ProfileSection = ({ handleSignOut }: ProfileSectionProps) => {
  return (
    <div className="mt-auto">
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <img 
              src="/lovable-uploads/f1144fd4-09d9-4f54-a4b8-cf5ca0f8dba3.png" 
              alt="Profile" 
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Demo User</p>
            <p className="text-xs text-muted-foreground">demo@example.com</p>
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
