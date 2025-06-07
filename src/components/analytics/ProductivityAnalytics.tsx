
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Clock, Users, Target, TrendingUp, Zap, Brain } from "lucide-react";

export const ProductivityAnalytics = () => {
  const teamProductivity = [
    { week: "Sem 1", before: 75, after: 85, efficiency: 13 },
    { week: "Sem 2", before: 78, after: 88, efficiency: 13 },
    { week: "Sem 3", before: 76, after: 92, efficiency: 21 },
    { week: "Sem 4", before: 80, after: 95, efficiency: 19 }
  ];

  const automationImpact = [
    { process: "Email Marketing", manual_hours: 20, automated_hours: 3, savings: 85 },
    { process: "Reportes", manual_hours: 15, automated_hours: 2, savings: 87 },
    { process: "Data Entry", manual_hours: 25, automated_hours: 5, savings: 80 },
    { process: "Social Media", manual_hours: 12, automated_hours: 2, savings: 83 },
    { process: "Invoicing", manual_hours: 8, automated_hours: 1, savings: 88 }
  ];

  const skillsData = [
    { skill: "AI Tools Usage", score: 85, fullMark: 100 },
    { skill: "Automation", score: 75, fullMark: 100 },
    { skill: "Data Analysis", score: 70, fullMark: 100 },
    { skill: "Content Creation", score: 90, fullMark: 100 },
    { skill: "Project Management", score: 80, fullMark: 100 },
    { skill: "Technical Skills", score: 65, fullMark: 100 }
  ];

  const teamMetrics = [
    { member: "Ana García", role: "Content Manager", tools_adopted: 8, productivity_gain: 45, ai_usage: 92 },
    { member: "Carlos López", role: "Data Analyst", tools_adopted: 6, productivity_gain: 38, ai_usage: 78 },
    { member: "María Rodriguez", role: "Designer", tools_adopted: 7, productivity_gain: 52, ai_usage: 85 },
    { member: "Juan Pérez", role: "Developer", tools_adopted: 9, productivity_gain: 41, ai_usage: 88 },
    { member: "Sofia Chen", role: "Marketing", tools_adopted: 5, productivity_gain: 35, ai_usage: 73 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Productivity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eficiencia del Equipo</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+18%</div>
            <p className="text-xs text-muted-foreground">
              vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Ahorrado</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127h</div>
            <p className="text-xs text-muted-foreground">
              Este mes por equipo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automatizaciones</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Procesos automatizados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adopción IA</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-xs text-muted-foreground">
              Herramientas de IA en uso
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Evolución de la Productividad</CardTitle>
            <p className="text-sm text-gray-600">Antes vs después de implementar herramientas</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-80">
              <LineChart data={teamProductivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="before" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  name="Antes"
                />
                <Line 
                  type="monotone" 
                  dataKey="after" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="Después"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Skills Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Habilidades del Equipo</CardTitle>
            <p className="text-sm text-gray-600">Nivel de competencia promedio</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-80">
              <RadarChart data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Automation Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Impacto de Automatizaciones</CardTitle>
          <p className="text-sm text-gray-600">Comparación de tiempo manual vs automatizado</p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <BarChart data={automationImpact}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="process" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="manual_hours" fill="#ef4444" name="Manual" />
              <Bar dataKey="automated_hours" fill="#10b981" name="Automatizado" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Rendimiento Individual del Equipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMetrics.map((member) => (
              <div key={member.member} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{member.member}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    +{member.productivity_gain}% productividad
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Herramientas Adoptadas</p>
                    <p className="font-bold">{member.tools_adopted}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Uso de IA</p>
                    <p className="font-bold">{member.ai_usage}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Ganancia Productividad</p>
                    <p className="font-bold text-green-600">+{member.productivity_gain}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Oportunidades de Mejora
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Procesos para Automatizar</h4>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Gestión de Inventarios</span>
                    <Badge variant="outline">12h/semana</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Potencial ahorro: $2,400/mes
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Análisis de Competencia</span>
                    <Badge variant="outline">8h/semana</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Potencial ahorro: $1,600/mes
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Herramientas Recomendadas</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Monday.com</span>
                    <Badge variant="outline">Gestión</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Para automatizar seguimiento de proyectos
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tableau</span>
                    <Badge variant="outline">Analytics</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Para reportes automáticos de datos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
