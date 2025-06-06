
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Award, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const UsageMetrics = () => {
  const { user } = useAuth();

  const { data: metrics } = useQuery({
    queryKey: ['usage-metrics', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // Get user stats
      const { data: stats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Get this month's activity
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: monthlyRoadmaps } = await supabase
        .from('roadmaps')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString());

      const { count: monthlyReviews } = await supabase
        .from('tool_reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString());

      // Calculate engagement score (0-100)
      const baseScore = Math.min((stats?.total_roadmaps || 0) * 10, 50);
      const reviewScore = Math.min((stats?.total_tools_explored || 0) * 5, 30);
      const completionScore = stats?.total_roadmaps > 0 
        ? Math.min((stats.completed_roadmaps / stats.total_roadmaps) * 20, 20) 
        : 0;
      const engagementScore = Math.round(baseScore + reviewScore + completionScore);

      return {
        ...stats,
        monthlyRoadmaps: monthlyRoadmaps || 0,
        monthlyReviews: monthlyReviews || 0,
        engagementScore
      };
    },
    enabled: !!user,
  });

  const getEngagementLevel = (score: number) => {
    if (score >= 80) return { label: "Experto", color: "bg-green-500", variant: "default" as const };
    if (score >= 60) return { label: "Avanzado", color: "bg-blue-500", variant: "secondary" as const };
    if (score >= 40) return { label: "Intermedio", color: "bg-yellow-500", variant: "outline" as const };
    return { label: "Principiante", color: "bg-gray-500", variant: "outline" as const };
  };

  if (!metrics) return null;

  const engagementLevel = getEngagementLevel(metrics.engagementScore);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Engagement Score */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Nivel de Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{metrics.engagementScore}/100</span>
              <Badge variant={engagementLevel.variant}>{engagementLevel.label}</Badge>
            </div>
            <Progress value={metrics.engagementScore} className="h-2" />
            <p className="text-sm text-gray-600">
              Basado en tu actividad y uso de la plataforma
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Actividad Este Mes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hojas de ruta creadas</span>
              <span className="font-bold">{metrics.monthlyRoadmaps}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Reseñas escritas</span>
              <span className="font-bold">{metrics.monthlyReviews}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total de herramientas</span>
              <span className="font-bold">{metrics.total_tools_explored || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5" />
            Logros y Metas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="font-bold text-lg">{metrics.total_roadmaps || 0}</p>
              <p className="text-xs text-gray-600">Roadmaps Creados</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100">
              <Award className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="font-bold text-lg">{metrics.completed_roadmaps || 0}</p>
              <p className="text-xs text-gray-600">Completados</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="font-bold text-lg">{metrics.total_tools_explored || 0}</p>
              <p className="text-xs text-gray-600">Herramientas</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
              <p className="font-bold text-lg">{metrics.monthlyRoadmaps + metrics.monthlyReviews}</p>
              <p className="text-xs text-gray-600">Este Mes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageMetrics;
