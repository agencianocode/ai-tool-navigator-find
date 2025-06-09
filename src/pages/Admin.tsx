
import React from 'react';
import Navigation from '@/components/Navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { SEO } from '@/components/SEO';

const Admin = () => {
  return (
    <>
      <SEO
        title="Panel de Administración - AI Tool Navigator"
        description="Panel de administración para gestionar usuarios, roles y configuraciones del sistema."
        url="https://ai-tool-navigator.com/admin"
      />
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <AdminDashboard />
      </div>
    </>
  );
};

export default Admin;
