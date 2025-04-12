
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ExpertLayout from "./components/ExpertLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import { AuthProvider } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Investments from "./pages/Investments";
import TaxOptimization from "./pages/TaxOptimization";
import FinancialHabits from "./pages/FinancialHabits";
import Advisors from "./pages/Advisors";

// Expert pages
import ExpertFeed from "./pages/expert/Feed";
import ExpertClients from "./pages/expert/Clients";
import ExpertMessages from "./pages/expert/Messages";
import ExpertProfile from "./pages/expert/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            
            {/* User Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Index />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Layout>
                  <Analytics />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/budgets" element={
              <ProtectedRoute>
                <Layout>
                  <Budgets />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute>
                <Layout>
                  <Goals />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/investments" element={
              <ProtectedRoute>
                <Layout>
                  <Investments />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/tax-optimization" element={
              <ProtectedRoute>
                <Layout>
                  <TaxOptimization />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/financial-habits" element={
              <ProtectedRoute>
                <Layout>
                  <FinancialHabits />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/advisors" element={
              <ProtectedRoute>
                <Layout>
                  <Advisors />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Layout>
                  <Notifications />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Expert Routes */}
            <Route path="/expert/feed" element={
              <ProtectedRoute expertOnly={true}>
                <ExpertLayout>
                  <ExpertFeed />
                </ExpertLayout>
              </ProtectedRoute>
            } />
            <Route path="/expert/clients" element={
              <ProtectedRoute expertOnly={true}>
                <ExpertLayout>
                  <ExpertClients />
                </ExpertLayout>
              </ProtectedRoute>
            } />
            <Route path="/expert/messages" element={
              <ProtectedRoute expertOnly={true}>
                <ExpertLayout>
                  <ExpertMessages />
                </ExpertLayout>
              </ProtectedRoute>
            } />
            <Route path="/expert/profile" element={
              <ProtectedRoute expertOnly={true}>
                <ExpertLayout>
                  <ExpertProfile />
                </ExpertLayout>
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
