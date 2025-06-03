import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Questionnaire from './pages/Questionnaire';
import Results from './pages/Results';
import Roadmap from './pages/Roadmap';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import { QueryClient } from 'react-query';
import { Toaster } from "@/components/ui/toaster"

import ToolDetails from "@/pages/ToolDetails";

function App() {
  return (
    <AuthProvider>
      <QueryClient>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Toaster />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/results" element={<Results />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tool/:toolId" element={<ToolDetails />} />
            </Routes>
          </div>
        </Router>
      </QueryClient>
    </AuthProvider>
  );
}

export default App;
