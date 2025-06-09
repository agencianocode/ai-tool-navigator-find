import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useUserActivities } from "@/hooks/useUserActivities";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, BarChart3, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentRoadmaps from "@/components/dashboard/RecentRoadmaps";
import FavoriteTools from "@/components/dashboard/FavoriteTools";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityHistory from "@/components/dashboard/ActivityHistory";
import UsageMetrics from "@/components/dashboard/UsageMetrics";
import PersonalizedRecommendations from "@/components/dashboard/PersonalizedRecommendations";
import { InsightsWidget } from "@/components/dashboard/InsightsWidget";
import { UsageLimits } from "@/components/subscription/UsageLimits";
import { InstallPrompt } from "@/components/PWA/InstallPrompt";
import { SEO } from "@/components/SEO";
import { PageLoader } from "@/components/ui/page-loader";

const Dashboard = () => {
  const { user } = useAuth();
  const { logActivity } = useUserActivities();

  // Consultar estadísticas del usuario
  const { data: userStats } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user stats:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!user,
  });

  // Consultar hojas de ruta recientes
  const { data: recentRoadmaps = [], refetch: refetchRoadmaps } = useQuery({
    queryKey: ['recent-roadmaps', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error('Error fetching roadmaps:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  // Consultar herramientas favoritas
  const { data: favoriteTools = [] } = useQuery({
    queryKey: ['favorite-tools', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_favorite_tools')
        .select('tool_name')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching favorite tools:', error);
        return [];
      }
      
      return data?.map(item => item.tool_name) || [];
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
      
      refetchRoadmaps();
    } catch (error) {
      console.error('Error deleting roadmap:', error);
    }
  };

  const handleToggleFavorite = async (roadmapId: string) => {
    try {
      // Obtener el roadmap actual
      const { data: roadmap } = await supabase
        .from('roadmaps')
        .select('is_favorite, title')
        .eq('id', roadmapId)
        .eq('user_id', user?.id)
        .single();

      if (!roadmap) return;

      // Alternar el estado de favorito
      const { error } = await supabase
        .from('roadmaps')
        .update({ is_favorite: !roadmap.is_favorite })
        .eq('id', roadmapId)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Registrar actividad si se marca como favorito
      if (!roadmap.is_favorite) {
        await logActivity({
          activity_type: 'roadmap_favorited',
          activity_title: `Marcó como favorito: ${roadmap.title}`,
          activity_description: 'Agregó una hoja de ruta a favoritos',
          related_id: roadmapId
        });
      }
      
      refetchRoadmaps();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (!user) {
    return <PageLoader message="Cargando tu dashboard..." />;
  }

  return (
    <>
      <SEO
        title="Dashboard - AI Tool Navigator"
        description="Tu panel de control personalizado para gestionar hojas de ruta, herramientas favoritas y estadísticas de uso."
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
                  Bienvenido a tu panel de control personalizado
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
          {/* Estadísticas */}
          <DashboardStats stats={userStats} />

          {/* Tabs for different views */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Resumen
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Recomendaciones
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                Actividad
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Grid de contenido */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna principal */}
                <div className="lg:col-span-2 space-y-8">
                  <RecentRoadmaps
                    roadmaps={recentRoadmaps}
                    onDelete={handleDeleteRoadmap}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <UsageLimits />
                  <InsightsWidget />
                  <QuickActions />
                  <FavoriteTools favoriteTools={favoriteTools} />
                  
                  {/* Card de bienvenida */}
                  <Card>
                    <CardHeader>
                      <CardTitle>¿Nuevo aquí?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Comienza creando tu primera hoja de ruta personalizada para encontrar las mejores herramientas para tu proyecto.
                      </p>
                      <Button asChild className="w-full">
                        <Link to="/questionnaire">
                          Crear Mi Primera Hoja de Ruta
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recursos útiles */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recursos Útiles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Link
                        to="/guides"
                        className="block text-sm text-purple-600 hover:text-purple-800"
                      >
                        → Guías y Tutoriales
                      </Link>
                      <Link
                        to="/tools"
                        className="block text-sm text-purple-600 hover:text-purple-800"
                      >
                        → Explorar Herramientas
                      </Link>
                      <Link
                        to="/budget-planner"
                        className="block text-sm text-purple-600 hover:text-purple-800"
                      >
                        → Planificador de Presupuesto
                      </Link>
                      <Link
                        to="/analytics"
                        className="block text-sm text-purple-600 hover:text-purple-800"
                      >
                        → Analytics e Insights
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <UsageMetrics />
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <PersonalizedRecommendations />
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <ActivityHistory />
            </TabsContent>
          </Tabs>
        </main>
        
        <InstallPrompt />
      </div>
    </>
  );
};

export default Dashboard;
