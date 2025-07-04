
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import Roadmap from "./pages/Roadmap";
import ToolDetails from "./pages/ToolDetails";
import Favorites from "./pages/Favorites";
import Analytics from "./pages/Analytics";
import Subscriptions from "./pages/Subscriptions";
import Settings from "./pages/Settings";
import Community from "./pages/Community";
import Integrations from "./pages/Integrations";
import ContentHub from "./pages/ContentHub";
import BudgetPlanner from "./pages/BudgetPlanner";
import Guides from "./pages/Guides";
import Templates from "./pages/Templates";
import EmergingTech from "./pages/EmergingTech";
import EnhancedTools from "./pages/EnhancedTools";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { EnhancedChatbot } from "@/components/ai/EnhancedChatbot";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <div className="min-h-screen bg-background text-foreground">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/tools" element={<Tools />} />
                      <Route path="/enhanced-tools" element={<EnhancedTools />} />
                      <Route path="/tool/:id" element={<ToolDetails />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/questionnaire" element={<Questionnaire />} />
                      <Route path="/results" element={<Results />} />
                      <Route path="/roadmap" element={<Roadmap />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/subscriptions" element={<Subscriptions />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/integrations" element={<Integrations />} />
                      <Route path="/content" element={<ContentHub />} />
                      <Route path="/budget" element={<BudgetPlanner />} />
                      <Route path="/guides" element={<Guides />} />
                       <Route path="/templates" element={<Templates />} />
                       <Route path="/emerging-tech" element={<EmergingTech />} />
                       <Route path="/admin" element={
                         <ProtectedRoute requireAdmin={true}>
                           <Admin />
                         </ProtectedRoute>
                       } />
                       <Route path="*" element={<NotFound />} />
                    </Routes>
                    <EnhancedChatbot />
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
