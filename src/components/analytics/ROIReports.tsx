
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { DollarSign, Clock, TrendingUp, Target, Calculator, Download } from "lucide-react";

export const ROIReports = () => {
  const roiData = [
    { tool: "ChatGPT", investment: 240, savings: 1680, roi: 600, category: "AI Writing" },
    { tool: "Zapier", investment: 360, savings: 2160, roi: 500, category: "Automation" },
    { tool: "Figma", investment: 180, savings: 900, roi: 400, category: "Design" },
    { tool: "Notion", investment: 120, savings: 480, roi: 300, category: "Productivity" },
    { tool: "Slack", investment: 200, savings: 600, roi: 200, category: "Communication" }
  ];

  const timelineData = [
    { month: "Mes 1", cumulative_savings: 450, investment: 1100 },
    { month: "Mes 2", cumulative_savings: 980, investment: 1100 },
    { month: "Mes 3", cumulative_savings: 1580, investment: 1100 },
    { month: "Mes 4", cumulative_savings: 2250, investment: 1100 },
    { month: "Mes 5", cumulative_savings: 3020, investment: 1100 },
    { month: "Mes 6", cumulative_savings: 3890, investment: 1100 }
  ];

  const timeSavingsData = [
    { category: "Escritura de Contenido", hours_saved: 45, cost_per_hour: 50 },
    { category: "Automatización", hours_saved: 32, cost_per_hour: 40 },
    { category: "Análisis de Datos", hours_saved: 28, cost_per_hour: 60 },
    { category: "Diseño Gráfico", hours_saved: 22, cost_per_hour: 45 },
    { category: "Gestión de Proyectos", hours_saved: 18, cost_per_hour: 35 }
  ];

  const calculateROI = (savings: number, investment: number) => {
    return ((savings - investment) / investment * 100).toFixed(0);
  };

  return (
    <div className="space-y-6">
      {/* ROI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">324%</div>
            <p className="text-xs text-muted-foreground">
              Promedio 6 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inversión Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,100</div>
            <p className="text-xs text-muted-foreground">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ahorros</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,890</div>
            <p className="text-xs text-muted-foreground">
              Ahorros acumulados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Ahorrado</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145h</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI by Tool */}
        <Card>
          <CardHeader>
            <CardTitle>ROI por Herramienta</CardTitle>
            <p className="text-sm text-gray-600">Retorno de inversión en los últimos 6 meses</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-80">
              <BarChart data={roiData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="tool" type="category" width={80} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [`${value}%`, 'ROI']}
                />
                <Bar dataKey="roi" fill="#10b981" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* ROI Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Evolución del ROI</CardTitle>
            <p className="text-sm text-gray-600">Ahorros vs Inversión acumulada</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-80">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="cumulative_savings" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="Ahorros Acumulados"
                />
                <Line 
                  type="monotone" 
                  dataKey="investment" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  name="Inversión"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed ROI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Análisis Detallado por Herramienta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roiData.map((tool) => (
              <div key={tool.tool} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{tool.tool}</h4>
                    <Badge variant="outline">{tool.category}</Badge>
                  </div>
                  <Badge 
                    variant={tool.roi > 300 ? "default" : "secondary"}
                    className={tool.roi > 300 ? "bg-green-600" : ""}
                  >
                    {tool.roi}% ROI
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Inversión</p>
                    <p className="font-bold">${tool.investment}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Ahorros</p>
                    <p className="font-bold text-green-600">${tool.savings}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Ganancia Neta</p>
                    <p className="font-bold">${tool.savings - tool.investment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Savings Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Análisis de Tiempo Ahorrado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeSavingsData.map((item) => {
              const totalSavings = item.hours_saved * item.cost_per_hour;
              return (
                <div key={item.category} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.category}</h4>
                    <p className="text-sm text-gray-600">
                      {item.hours_saved}h ahorradas • ${item.cost_per_hour}/hora
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${totalSavings}</p>
                    <p className="text-sm text-gray-600">valor ahorrado</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculadora de ROI
          </CardTitle>
          <p className="text-sm text-gray-600">
            Calcula el ROI potencial de nuevas herramientas
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Costo mensual de la herramienta</label>
                <input 
                  type="number" 
                  placeholder="100" 
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Horas ahorradas por mes</label>
                <input 
                  type="number" 
                  placeholder="20" 
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Costo por hora del empleado</label>
                <input 
                  type="number" 
                  placeholder="50" 
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-4">Proyección Anual</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Inversión:</span>
                  <span className="font-bold">$1,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Ahorros:</span>
                  <span className="font-bold text-green-600">$12,000</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span>ROI:</span>
                  <span className="font-bold text-green-600">900%</span>
                </div>
              </div>
              <Button className="w-full mt-4">
                Calcular ROI
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Exportar Reportes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Reporte ROI PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Análisis Excel
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Resumen Ejecutivo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
