
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { Globe, DollarSign, Users, TrendingUp, Download, Eye } from "lucide-react";

export const MarketInsights = () => {
  const marketShareData = [
    { name: "AI Writing", value: 32, color: "#8b5cf6" },
    { name: "Image/Video", value: 28, color: "#06b6d4" },
    { name: "Automation", value: 18, color: "#10b981" },
    { name: "Development", value: 12, color: "#f59e0b" },
    { name: "Analytics", value: 10, color: "#ef4444" }
  ];

  const investmentData = [
    { quarter: "Q1 2024", investment: 2.3, deals: 45 },
    { quarter: "Q2 2024", investment: 3.1, deals: 52 },
    { quarter: "Q3 2024", investment: 4.2, deals: 61 },
    { quarter: "Q4 2024", investment: 5.8, deals: 78 }
  ];

  const geographicData = [
    { region: "América del Norte", adoption: 78, growth: 12 },
    { region: "Europa", adoption: 65, growth: 18 },
    { region: "Asia-Pacífico", adoption: 58, growth: 24 },
    { region: "América Latina", adoption: 42, growth: 31 },
    { region: "África/Medio Oriente", adoption: 35, growth: 28 }
  ];

  const emergingTools = [
    { name: "AI Video Generators", category: "Content Creation", mentions: 8453, trend: "+89%" },
    { name: "Voice Cloning", category: "Audio AI", mentions: 6721, trend: "+156%" },
    { name: "Code Completion", category: "Development", mentions: 5892, trend: "+67%" },
    { name: "AI Presentation", category: "Business", mentions: 4238, trend: "+124%" }
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamaño del Mercado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$184.6B</div>
            <p className="text-xs text-muted-foreground">
              +34% crecimiento anual
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevas Startups</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              Este trimestre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adopción Empresarial</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">
              Fortune 500 companies
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Share */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución del Mercado por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <PieChart>
                <Pie
                  data={marketShareData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Investment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Inversión en IA (Billones USD)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <BarChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="investment" fill="#8b5cf6" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Adoption */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Adopción Geográfica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {geographicData.map((region) => (
              <div key={region.region} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{region.region}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{region.adoption}%</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      +{region.growth}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${region.adoption}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emerging Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Herramientas Emergentes</CardTitle>
          <p className="text-sm text-gray-600">Basado en menciones y búsquedas recientes</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergingTools.map((tool) => (
              <div key={tool.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{tool.name}</h4>
                    <p className="text-sm text-gray-600">{tool.category}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {tool.trend}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {tool.mentions.toLocaleString()} menciones
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Download Report */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes de Mercado</CardTitle>
          <p className="text-sm text-gray-600">
            Descarga reportes detallados sobre tendencias y análisis de mercado
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Reporte Q4 2024
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Análisis de Inversión
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Predicciones 2025
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
