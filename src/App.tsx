import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import Results from './pages/Results';
import Roadmap from './pages/Roadmap';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Integrations from './pages/Integrations';
import Subscriptions from './pages/Subscriptions';
import BudgetPlanner from './pages/BudgetPlanner';
import Auth from './pages/Auth';
import Tools from './pages/Tools';
import Guides from './pages/Guides';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ToolDetails from "./pages/ToolDetails";
import Favorites from "./pages/Favorites";
import AuthGuard from './components/AuthGuard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Toaster />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/results" element={<Results />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tool/:toolId" element={<ToolDetails />} />
              <Route path="/guides" element={<Guides />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } />
              <Route path="/favorites" element={
                <AuthGuard>
                  <Favorites />
                </AuthGuard>
              } />
              <Route path="/roadmap" element={
                <AuthGuard>
                  <Roadmap />
                </AuthGuard>
              } />
              <Route path="/profile" element={
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              } />
              <Route path="/integrations" element={
                <AuthGuard>
                  <Integrations />
                </AuthGuard>
              } />
              <Route path="/subscriptions" element={
                <AuthGuard>
                  <Subscriptions />
                </AuthGuard>
              } />
              <Route path="/budget-planner" element={
                <AuthGuard>
                  <BudgetPlanner />
                </AuthGuard>
              } />
              <Route path="/settings" element={
                <AuthGuard>
                  <Settings />
                </AuthGuard>
              } />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
