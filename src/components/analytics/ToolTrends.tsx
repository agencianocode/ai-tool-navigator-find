
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, Zap, Brain, Image, Code } from "lucide-react";

export const ToolTrends = () => {
  const trendingData = [
    { month: "Ene", ai_writing: 85, ai_image: 92, automation: 78, development: 65 },
    { month: "Feb", ai_writing: 88, ai_image: 95, automation: 82, development: 70 },
    { month: "Mar", ai_writing: 92, ai_image: 98, automation: 85, development: 75 },
    { month: "Abr", ai_writing: 96, ai_image: 102, automation: 88, development: 78 },
    { month: "May", ai_writing: 100, ai_image: 105, automation: 92, development: 82 },
    { month: "Jun", ai_writing: 105, ai_image: 108, automation: 95, development: 85 }
  ];

  const topTools = [
    { name: "ChatGPT", category: "AI Writing", adoption: 89, change: 12, icon: <Brain className="w-4 h-4" /> },
    { name: "Midjourney", category: "AI Image", adoption: 76, change: 24, icon: <Image className="w-4 h-4" /> },
    { name: "Zapier", category: "Automation", adoption: 65, change: 8, icon: <Zap className="w-4 h-4" /> },
    { name: "GitHub Copilot", category: "Development", adoption: 58, change: 15, icon: <Code className="w-4 h-4" /> },
    { name: "Notion AI", category: "Productivity", adoption: 45, change: -3, icon: <Brain className="w-4 h-4" /> }
  ];

  const predictions = [
    { category: "AI Video Generation", current: 23, predicted: 67, growth: "+191%" },
    { category: "Voice AI", current: 34, predicted: 78, growth: "+129%" },
    { category: "AI Code Review", current: 41, predicted: 85, growth: "+107%" },
    { category: "AI Analytics", current: 29, predicted: 59, growth: "+103%" }
  ];

  const chartConfig = {
    ai_writing: { label: "AI Writing", color: "#8b5cf6" },
    ai_image: { label: "AI Image", color: "#06b6d4" },
    automation: { label: "Automation", color: "#10b981" },
    development: { label: "Development", color: "#f59e0b" }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Adoption Trends Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Tendencias de Adopción por Categoría
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={trendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="ai_writing" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="ai_image" 
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="automation" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="development" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Trending Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Herramientas Más Populares</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topTools.map((tool, index) => (
            <div key={tool.name} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {tool.icon}
                </div>
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-gray-600">{tool.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{tool.adoption}%</span>
                <Badge variant={tool.change > 0 ? "default" : "destructive"} className="flex items-center gap-1">
                  {tool.change > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(tool.change)}%
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Future Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Predicciones de Adopción</CardTitle>
          <p className="text-sm text-gray-600">Proyección para los próximos 12 meses</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictions.map((prediction) => (
            <div key={prediction.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{prediction.category}</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {prediction.growth}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${prediction.current}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Actual: {prediction.current}%</span>
                <span>Predicción: {prediction.predicted}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
