
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Eye, Target } from "lucide-react";

const chartConfig = {
  users: { label: "Usuarios", color: "#8884d8" },
  views: { label: "Vistas", color: "#82ca9d" },
  conversions: { label: "Conversiones", color: "#ffc658" },
  engagement: { label: "Engagement", color: "#ff7300" }
};

const trendData = [
  { month: "Ene", users: 1200, views: 3400, conversions: 240, engagement: 65 },
  { month: "Feb", users: 1400, views: 3800, conversions: 280, engagement: 68 },
  { month: "Mar", users: 1800, views: 4200, conversions: 320, engagement: 72 },
  { month: "Abr", users: 2200, views: 4800, conversions: 380, engagement: 75 },
  { month: "May", users: 2600, views: 5200, conversions: 420, engagement: 78 },
  { month: "Jun", users: 3000, views: 5800, conversions: 480, engagement: 82 }
];

const toolPerformanceData = [
  { name: "ChatGPT", usage: 850, satisfaction: 4.8, roi: 320 },
  { name: "Midjourney", usage: 720, satisfaction: 4.6, roi: 280 },
  { name: "Notion AI", usage: 680, satisfaction: 4.5, roi: 250 },
  { name: "GitHub Copilot", usage: 640, satisfaction: 4.7, roi: 300 },
  { name: "Canva AI", usage: 580, satisfaction: 4.4, roi: 220 }
];

const userBehaviorData = [
  { name: "Exploración", value: 35, color: "#8884d8" },
  { name: "Implementación", value: 30, color: "#82ca9d" },
  { name: "Optimización", value: 20, color: "#ffc658" },
  { name: "Evaluación", value: 15, color: "#ff7300" }
];

export const AdvancedAnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Tendencias Temporales */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Tendencias Temporales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke={chartConfig.users.color} 
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke={chartConfig.views.color} 
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke={chartConfig.conversions.color} 
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Rendimiento de Herramientas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Rendimiento de Herramientas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <BarChart data={toolPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="usage" fill={chartConfig.users.color} radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Análisis de Comportamiento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comportamiento de Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <PieChart>
              <Pie
                data={userBehaviorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {userBehaviorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Área de Engagement */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Engagement y Satisfacción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="engagement" 
                stroke={chartConfig.engagement.color}
                fill={chartConfig.engagement.color}
                fillOpacity={0.6}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
