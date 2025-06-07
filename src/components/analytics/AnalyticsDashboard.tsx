
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Activity, Users, BarChart3 } from "lucide-react";
import { MarketInsights } from "./MarketInsights";
import { ToolTrends } from "./ToolTrends";
import { ROIReports } from "./ROIReports";
import { ProductivityAnalytics } from "./ProductivityAnalytics";

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics e Inteligencia</h1>
          <p className="text-gray-600 mt-2">
            Insights avanzados sobre tendencias de herramientas y análisis de mercado
          </p>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Herramientas Analizadas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +12% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendencia Global</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24.5%</div>
            <p className="text-xs text-muted-foreground">
              Adopción de IA este trimestre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185.6K</div>
            <p className="text-xs text-muted-foreground">
              +8.2% usuarios nuevos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Promedio</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">287%</div>
            <p className="text-xs text-muted-foreground">
              Retorno de inversión promedio
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="market">Mercado</TabsTrigger>
          <TabsTrigger value="roi">ROI Reports</TabsTrigger>
          <TabsTrigger value="productivity">Productividad</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <ToolTrends />
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <MarketInsights />
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <ROIReports />
        </TabsContent>

        <TabsContent value="productivity" className="space-y-6">
          <ProductivityAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
