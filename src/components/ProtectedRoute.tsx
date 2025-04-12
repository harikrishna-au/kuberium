
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import Layout from "@/components/Layout";
import ExpertLayout from "@/components/ExpertLayout";

interface ProtectedRouteProps {
  children: React.ReactNode;
  expertOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, expertOnly = false }) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Redirect to auth if not logged in
      if (!user) {
        navigate("/auth");
        return;
      }
      
      // Handle role-based redirects
      if (expertOnly && userRole !== 'expert') {
        navigate("/");
        return;
      }
      
      // If normal user tries to access expert routes
      if (!expertOnly && userRole === 'expert' && window.location.pathname.indexOf('/expert') !== 0) {
        navigate("/expert/feed");
        return;
      }
    }
  }, [user, userRole, loading, navigate, expertOnly]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) return null;
  
  // Render with appropriate layout based on user role
  if (userRole === 'expert') {
    return <ExpertLayout>{children}</ExpertLayout>;
  }
  
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
