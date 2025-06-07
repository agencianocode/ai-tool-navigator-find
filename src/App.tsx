
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster"

import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Questionnaire from './pages/Questionnaire';
import Results from './pages/Results';
import Roadmap from './pages/Roadmap';
import EnhancedTools from './pages/EnhancedTools';
import ToolDetails from './pages/ToolDetails';
import Favorites from './pages/Favorites';
import BudgetPlanner from './pages/BudgetPlanner';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Guides from './pages/Guides';
import Integrations from './pages/Integrations';
import Subscriptions from './pages/Subscriptions';
import NotFound from './pages/NotFound';
import AuthGuard from './components/AuthGuard';
import Templates from './pages/Templates';

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/dashboard"
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                }
              />
              <Route
                path="/questionnaire"
                element={
                  <AuthGuard>
                    <Questionnaire />
                  </AuthGuard>
                }
              />
              <Route
                path="/results"
                element={
                  <AuthGuard>
                    <Results />
                  </AuthGuard>
                }
              />
              <Route
                path="/roadmap/:id"
                element={
                  <AuthGuard>
                    <Roadmap />
                  </AuthGuard>
                }
              />
              <Route path="/tools" element={<EnhancedTools />} />
              <Route path="/tools/:id" element={<ToolDetails />} />
              <Route
                path="/favorites"
                element={
                  <AuthGuard>
                    <Favorites />
                  </AuthGuard>
                }
              />
              <Route
                path="/budget-planner"
                element={
                  <AuthGuard>
                    <BudgetPlanner />
                  </AuthGuard>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                }
              />
              <Route
                path="/settings"
                element={
                  <AuthGuard>
                    <Settings />
                  </AuthGuard>
                }
              />
              <Route path="/guides" element={<Guides />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
