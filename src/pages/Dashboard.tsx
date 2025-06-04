import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Heart, 
  Plus, 
  Settings, 
  Star, 
  Target,
  TrendingUp,
  Users,
  Zap,
  Download,
  Edit3,
  Trash2,
  Copy
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Import components with error boundaries
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentRoadmaps from "@/components/dashboard/RecentRoadmaps";
import FavoriteTools from "@/components/dashboard/FavoriteTools";
import QuickActions from "@/components/dashboard/QuickActions";

interface UserStats {
  total_roadmaps: number;
  completed_roadmaps: number;
  total_tools_explored: number;
  last_activity: string;
}

interface Roadmap {
  id: string;
  title: string;
  custom_name: string | null;
  description: string | null;
  project_type: string | null;
  status: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentRoadmaps, setRecentRoadmaps] = useState<Roadmap[]>([]);
  const [favoriteTools, setFavoriteTools] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      loadDashboardData();
    } else if (!authLoading && !user) {
      setIsLoading(false);
    }
  }, [user, authLoading]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Loading dashboard data for user:', user?.id);

      // Load user stats with error handling
      try {
        const { data: stats, error: statsError } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', user?.id)
          .single();

        if (statsError && statsError.code !== 'PGRST116') {
          console.error('Error loading stats:', statsError);
        } else {
          setUserStats(stats);
        }
      } catch (error) {
        console.error('Stats loading failed:', error);
      }

      // Load recent roadmaps with error handling
      try {
        const { data: roadmaps, error: roadmapsError } = await supabase
          .from('roadmaps')
          .select('*')
          .eq('user_id', user?.id)
          .order('updated_at', { ascending: false })
          .limit(5);

        if (roadmapsError) {
          console.error('Error loading roadmaps:', roadmapsError);
        } else {
          setRecentRoadmaps(roadmaps || []);
        }
      } catch (error) {
        console.error('Roadmaps loading failed:', error);
      }

      // Load favorite tools with error handling
      try {
        const { data: tools, error: toolsError } = await supabase
          .from('user_favorite_tools')
          .select('tool_name')
          .eq('user_id', user?.id);

        if (toolsError) {
          console.error('Error loading favorite tools:', toolsError);
        } else {
          setFavoriteTools(tools?.map(t => t.tool_name) || []);
        }
      } catch (error) {
        console.error('Favorite tools loading failed:', error);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Error al cargar los datos del dashboard');
      toast({
        title: "Error",
        description: "Error al cargar los datos del dashboard",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoadmap = async (roadmapId: string) => {
    try {
      const { error } = await supabase
        .from('roadmaps')
        .delete()
        .eq('id', roadmapId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setRecentRoadmaps(prev => prev.filter(r => r.id !== roadmapId));
      toast({
        title: "Éxito",
        description: "Hoja de ruta eliminada correctamente",
      });
    } catch (error) {
      console.error('Error deleting roadmap:', error);
      toast({
        title: "Error",
        description: "Error al eliminar la hoja de ruta",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async (roadmapId: string) => {
    try {
      const roadmap = recentRoadmaps.find(r => r.id === roadmapId);
      if (!roadmap) return;

      const { error } = await supabase
        .from('roadmaps')
        .update({ is_favorite: !roadmap.is_favorite })
        .eq('id', roadmapId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setRecentRoadmaps(prev => 
        prev.map(r => 
          r.id === roadmapId 
            ? { ...r, is_favorite: !r.is_favorite }
            : r
        )
      );

      toast({
        title: "Éxito",
        description: roadmap.is_favorite ? "Removido de favoritos" : "Agregado a favoritos",
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Error al actualizar favoritos",
        variant: "destructive",
      });
    }
  };

  // Show loading state while checking authentication
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error al cargar el dashboard</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={loadDashboardData}>Reintentar</Button>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bienvenido a AI Tools Evaluator
          </h1>
          <p className="text-gray-600 mb-8">
            Inicia sesión para acceder a tu dashboard personalizado
          </p>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ¡Hola de nuevo! 👋
              </h1>
              <p className="text-gray-600">
                Aquí está el resumen de tu actividad con herramientas IA
              </p>
            </div>
            <Link to="/questionnaire">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Evaluación
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards with error boundary */}
        <DashboardStats stats={userStats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Roadmaps with error boundary */}
          <div className="lg:col-span-2">
            <RecentRoadmaps 
              roadmaps={recentRoadmaps}
              onDelete={handleDeleteRoadmap}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions with error boundary */}
            <QuickActions />

            {/* Favorite Tools with error boundary */}
            <FavoriteTools favoriteTools={favoriteTools} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Activity Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hojas de ruta este mes</span>
                  <Badge variant="secondary">{userStats?.total_roadmaps || 0}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Herramientas exploradas</span>
                  <Badge variant="secondary">{userStats?.total_tools_explored || 0}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Proyectos completados</span>
                  <Badge variant="secondary">{userStats?.completed_roadmaps || 0}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">💡 Prueba diferentes motores IA</p>
                  <p className="text-xs text-blue-700">Compara resultados entre Claude AI y OpenAI GPT-4</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">🎯 Explora nuevas categorías</p>
                  <p className="text-xs text-green-700">Descubre herramientas de Audio IA y Análisis de Datos</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">📊 Exporta tus hojas de ruta</p>
                  <p className="text-xs text-purple-700">Descarga en PDF para compartir con tu equipo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
