
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Brain, Activity, Target } from "lucide-react";
import { RealtimeMetrics } from "./RealtimeMetrics";
import { RecommendationEffectiveness } from "./RecommendationEffectiveness";
import { UserBehaviorInsights } from "./UserBehaviorInsights";
import { MarketInsights } from "./MarketInsights";
import { ToolTrends } from "./ToolTrends";
import { ROIReports } from "./ROIReports";
import { ProductivityAnalytics } from "./ProductivityAnalytics";

export const AdvancedAnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Avanzado</h1>
          <p className="text-gray-600 mt-2">
            Dashboard completo con métricas en tiempo real, análisis de IA y insights de comportamiento
          </p>
        </div>
      </div>

      <Tabs defaultValue="realtime" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Tiempo Real
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            IA & Recomendaciones
          </TabsTrigger>
          <TabsTrigger value="behavior" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Comportamiento
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Tendencias
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Mercado
          </TabsTrigger>
          <TabsTrigger value="roi" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            ROI & Productividad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Métricas en Tiempo Real
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  🔴 LIVE
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RealtimeMetrics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Efectividad de Recomendaciones IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecommendationEffectiveness />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Análisis de Comportamiento de Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UserBehaviorInsights />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <ToolTrends />
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <MarketInsights />
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <ROIReports />
            <ProductivityAnalytics />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
