
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
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
import KuberiumAI from "./pages/KuberiumAI";
import Feed from "./pages/Feed";
import Portfolio from "./pages/Portfolio";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/feed" element={<Layout><Feed /></Layout>} />
              <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
              <Route path="/budgets" element={<Layout><Budgets /></Layout>} />
              <Route path="/goals" element={<Layout><Goals /></Layout>} />
              <Route path="/investments" element={<Layout><Investments /></Layout>} />
              <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
              <Route path="/tax-optimization" element={<Layout><TaxOptimization /></Layout>} />
              <Route path="/financial-habits" element={<Layout><FinancialHabits /></Layout>} />
              <Route path="/advisors" element={<Layout><Advisors /></Layout>} />
              <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              <Route path="/ai" element={<Layout><KuberiumAI /></Layout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
