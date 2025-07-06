
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
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "@/components/ErrorBoundary";
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
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/questionnaire" element={<Questionnaire />} />
                      <Route path="/roadmap/:id" element={
                        <ProtectedRoute>
                          <Roadmap />
                        </ProtectedRoute>
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
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
