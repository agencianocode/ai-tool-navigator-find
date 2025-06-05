
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster"

import ToolDetails from "@/pages/ToolDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Toaster />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/results" element={<Results />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/budget-planner" element={<BudgetPlanner />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/tool/:toolId" element={<ToolDetails />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
