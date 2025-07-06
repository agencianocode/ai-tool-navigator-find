
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Star, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";

const Dashboard = () => {
  const { user } = useAuth();

  // Consultar hojas de ruta recientes
  const { data: recentRoadmaps = [] } = useQuery({
    queryKey: ['recent-roadmaps', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('Error fetching roadmaps:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  // Consultar estadísticas básicas
  const { data: stats } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user stats:', error);
      }
      
      return data || { total_roadmaps: 0, completed_roadmaps: 0, total_tools_explored: 0 };
    },
    enabled: !!user,
  });

  const handleDeleteRoadmap = async (roadmapId: string) => {
    try {
      const { error } = await supabase
        .from('roadmaps')
        .delete()
        .eq('id', roadmapId)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      // Refetch roadmaps
      window.location.reload();
    } catch (error) {
      console.error('Error deleting roadmap:', error);
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <SEO
        title="Dashboard - AI Tool Navigator"
        description="Tu panel de control personalizado para gestionar hojas de ruta y herramientas."
        url="https://ai-tool-navigator.com/dashboard"
      />
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ¡Hola, {user.user_metadata?.full_name || 'Usuario'}! 👋
                </h1>
                <p className="text-gray-600">
                  Gestiona tus hojas de ruta de IA
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button asChild>
                  <Link to="/questionnaire">
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Hoja de Ruta
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Estadísticas simples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Hojas de Ruta</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.total_roadmaps || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completadas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.completed_roadmaps || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Herramientas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats?.total_tools_explored || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hojas de ruta recientes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Mis Hojas de Ruta</CardTitle>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/questionnaire">Crear Nueva</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentRoadmaps.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No tienes hojas de ruta todavía
                      </p>
                      <Button asChild>
                        <Link to="/questionnaire">
                          Crear Mi Primera Hoja de Ruta
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentRoadmaps.map((roadmap) => (
                        <div key={roadmap.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <h3 className="font-semibold">{roadmap.title}</h3>
                            <p className="text-sm text-gray-600">{roadmap.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{roadmap.project_type}</Badge>
                              {roadmap.is_favorite && (
                                <Badge variant="default">
                                  <Star className="w-3 h-3 mr-1" />
                                  Favorito
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/roadmap/${roadmap.id}`}>Ver</Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteRoadmap(roadmap.id)}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar con acciones rápidas */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start">
                    <Link to="/questionnaire">
                      <Plus className="mr-2 h-4 w-4" />
                      Nueva Hoja de Ruta
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/tools">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Explorar Herramientas
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Bienvenida para nuevos usuarios */}
              {recentRoadmaps.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>¡Bienvenido!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Comienza creando tu primera hoja de ruta personalizada para encontrar las mejores herramientas de IA para tu proyecto.
                    </p>
                    <Button asChild className="w-full">
                      <Link to="/questionnaire">
                        Empezar Ahora
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
