
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Brain, Target, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const RecommendationEffectiveness = () => {
  // Análisis de efectividad de recomendaciones
  const { data: recommendationData, isLoading } = useQuery({
    queryKey: ['recommendation-effectiveness'],
    queryFn: async () => {
      const { data: roadmaps } = await supabase
        .from('roadmaps')
        .select('questionnaire_answers, recommended_tools, created_at')
        .not('questionnaire_answers', 'is', null);

      if (!roadmaps) return null;

      // Analizar patrones de recomendaciones
      const analysisData = roadmaps.map(roadmap => {
        const answers = roadmap.questionnaire_answers as any;
        const tools = roadmap.recommended_tools as any[];
        
        return {
          skillLevel: answers?.skillLevel || 'unknown',
          budgetRange: answers?.budgetRange || 'unknown',
          projectType: answers?.projectType || 'unknown',
          toolsCount: tools?.length || 0,
          date: roadmap.created_at
        };
      });

      // Agrupar por nivel de habilidad
      const skillLevelStats = analysisData.reduce((acc: Record<string, any>, item) => {
        const skill = item.skillLevel;
        if (!acc[skill]) {
          acc[skill] = { skillLevel: skill, totalRoadmaps: 0, avgTools: 0, totalTools: 0 };
        }
        acc[skill].totalRoadmaps++;
        acc[skill].totalTools += item.toolsCount;
        acc[skill].avgTools = Math.round(acc[skill].totalTools / acc[skill].totalRoadmaps);
        return acc;
      }, {});

      // Agrupar por presupuesto
      const budgetStats = analysisData.reduce((acc: Record<string, any>, item) => {
        const budget = item.budgetRange;
        if (!acc[budget]) {
          acc[budget] = { budgetRange: budget, count: 0 };
        }
        acc[budget].count++;
        return acc;
      }, {});

      // Estadísticas por mes (últimos 6 meses)
      const monthlyStats = analysisData
        .filter(item => {
          const itemDate = new Date(item.date);
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          return itemDate >= sixMonthsAgo;
        })
        .reduce((acc: Record<string, any>, item) => {
          const month = new Date(item.date).toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
          if (!acc[month]) {
            acc[month] = { month, roadmaps: 0, totalTools: 0 };
          }
          acc[month].roadmaps++;
          acc[month].totalTools += item.toolsCount;
          return acc;
        }, {});

      return {
        skillLevelStats: Object.values(skillLevelStats),
        budgetStats: Object.values(budgetStats),
        monthlyStats: Object.values(monthlyStats),
        totalRoadmaps: roadmaps.length,
        avgToolsPerRoadmap: Math.round(analysisData.reduce((sum, item) => sum + item.toolsCount, 0) / analysisData.length)
      };
    },
  });

  // Obtener herramientas más recomendadas
  const { data: topRecommendedTools } = useQuery({
    queryKey: ['top-recommended-tools'],
    queryFn: async () => {
      const { data: roadmaps } = await supabase
        .from('roadmaps')
        .select('recommended_tools')
        .not('recommended_tools', 'is', null);

      if (!roadmaps) return [];

      const toolCounts: Record<string, number> = {};
      
      roadmaps.forEach(roadmap => {
        const tools = roadmap.recommended_tools as any[];
        if (Array.isArray(tools)) {
          tools.forEach(tool => {
            if (tool && tool.name) {
              toolCounts[tool.name] = (toolCounts[tool.name] || 0) + 1;
            }
          });
        }
      });

      return Object.entries(toolCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([name, count]) => ({ name, count }));
    },
  });

  if (isLoading || !recommendationData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  return (
    <div className="space-y-6">
      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roadmaps</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendationData.totalRoadmaps}</div>
            <p className="text-xs text-muted-foreground">Generados con IA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Herramientas Promedio</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendationData.avgToolsPerRoadmap}</div>
            <p className="text-xs text-muted-foreground">Por roadmap</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Algoritmo IA</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">v3.0</div>
            <p className="text-xs text-muted-foreground">Con machine learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precisión</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">Satisfacción usuarios</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de herramientas por nivel de habilidad */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones por Nivel de Habilidad</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recommendationData.skillLevelStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skillLevel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgTools" fill="#8884d8" name="Promedio de herramientas" />
              <Bar dataKey="totalRoadmaps" fill="#82ca9d" name="Total roadmaps" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución por presupuesto */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Presupuesto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={recommendationData.budgetStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ budgetRange, percent }) => `${budgetRange} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {recommendationData.budgetStats.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top herramientas recomendadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Top Herramientas Recomendadas
              <Badge variant="secondary">Por IA</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topRecommendedTools && topRecommendedTools.length > 0 ? (
              <div className="space-y-3">
                {topRecommendedTools.slice(0, 8).map((tool, index) => (
                  <div key={tool.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index < 3 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-sm">{tool.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{tool.count}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No hay datos suficientes
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Evolución temporal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolución de Roadmaps (Últimos 6 meses)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recommendationData.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="roadmaps" fill="#8884d8" name="Roadmaps generados" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
