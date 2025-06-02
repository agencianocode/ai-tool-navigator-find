
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Target, Users, Clock } from "lucide-react";

interface UserStats {
  total_roadmaps: number;
  completed_roadmaps: number;
  total_tools_explored: number;
  last_activity: string;
}

interface DashboardStatsProps {
  stats: UserStats | null;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const completionRate = stats?.total_roadmaps 
    ? Math.round((stats.completed_roadmaps / stats.total_roadmaps) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hojas de Ruta</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total_roadmaps || 0}</div>
          <p className="text-xs text-muted-foreground">
            Total generadas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completadas</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.completed_roadmaps || 0}</div>
          <p className="text-xs text-muted-foreground">
            {completionRate}% de tasa de éxito
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Herramientas</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total_tools_explored || 0}</div>
          <p className="text-xs text-muted-foreground">
            Exploradas en total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Última Actividad</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{formatDate(stats?.last_activity || '')}</div>
          <p className="text-xs text-muted-foreground">
            Última sesión
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
