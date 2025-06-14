
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Users, Eye, Target, Zap, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const RealtimeMetrics = () => {
  // Métricas en tiempo real de eventos de analytics
  const { data: realtimeMetrics, isLoading } = useQuery({
    queryKey: ['realtime-metrics'],
    queryFn: async () => {
      const now = new Date();
      const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      // Obtener eventos de las últimas 24 horas
      const { data: events } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', last24h.toISOString());

      if (!events) return null;

      // Calcular métricas
      const totalEvents = events.length;
      const uniqueUsers = new Set(events.filter(e => e.user_id).map(e => e.user_id)).size;
      const toolViews = events.filter(e => e.event_name === 'tool_viewed').length;
      const questionnaireCompletions = events.filter(e => e.event_name === 'questionnaire_completed').length;
      const roadmapGenerations = events.filter(e => e.event_name === 'roadmap_generated').length;

      // Calcular tasa de conversión
      const conversionRate = questionnaireCompletions > 0 
        ? Math.round((roadmapGenerations / questionnaireCompletions) * 100)
        : 0;

      return {
        totalEvents,
        uniqueUsers,
        toolViews,
        questionnaireCompletions,
        roadmapGenerations,
        conversionRate
      };
    },
    refetchInterval: 30000, // Actualizar cada 30 segundos
  });

  // Obtener trending tools
  const { data: trendingTools } = useQuery({
    queryKey: ['trending-tools'],
    queryFn: async () => {
      const last7days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      
      const { data } = await supabase
        .from('analytics_events')
        .select('event_data')
        .eq('event_name', 'tool_viewed')
        .gte('created_at', last7days.toISOString());

      if (!data) return [];

      // Contar vistas por herramienta - con type casting seguro
      const toolCounts = data.reduce((acc: Record<string, number>, event) => {
        try {
          const eventData = event.event_data as any;
          const toolName = eventData?.tool_name || eventData?.toolName;
          if (toolName && typeof toolName === 'string') {
            acc[toolName] = (acc[toolName] || 0) + 1;
          }
        } catch (error) {
          console.log('Error parsing event data:', error);
        }
        return acc;
      }, {});

      return Object.entries(toolCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([name, views]) => ({ name, views }));
    },
    refetchInterval: 60000, // Actualizar cada minuto
  });

  if (isLoading || !realtimeMetrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Totales</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.totalEvents}</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">Activos hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vistas de Herramientas</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.toolViews}</div>
            <p className="text-xs text-muted-foreground">Exploraciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cuestionarios</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.questionnaireCompletions}</div>
            <p className="text-xs text-muted-foreground">Completados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roadmaps</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.roadmapGenerations}</div>
            <p className="text-xs text-muted-foreground">Generados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversión</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Tasa</p>
          </CardContent>
        </Card>
      </div>

      {/* Herramientas trending */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Herramientas Trending
            <Badge variant="secondary">Última semana</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {trendingTools && trendingTools.length > 0 ? (
            <div className="space-y-3">
              {trendingTools.map((tool, index) => (
                <div key={tool.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium">{tool.name}</span>
                  </div>
                  <Badge variant="outline">{tool.views} vistas</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No hay datos suficientes para mostrar trending tools
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
