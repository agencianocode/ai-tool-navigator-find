
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const InsightsWidget = () => {
  const insights = [
    {
      title: "IA Generativa en Auge",
      description: "Las herramientas de IA generativa han crecido 89% este trimestre",
      trend: "+89%",
      category: "Tendencia",
      type: "positive"
    },
    {
      title: "ROI Promedio: 324%",
      description: "El retorno promedio de inversión en automatización es de 324%",
      trend: "324%",
      category: "ROI",
      type: "positive"
    },
    {
      title: "Nuevas Herramientas",
      description: "47 nuevas herramientas de IA han sido lanzadas esta semana",
      trend: "+47",
      category: "Mercado",
      type: "neutral"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Insights de Mercado
        </CardTitle>
        <p className="text-sm text-gray-600">
          Tendencias y análisis en tiempo real
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
              </div>
              <Badge 
                variant={insight.type === "positive" ? "default" : "secondary"}
                className={insight.type === "positive" ? "bg-green-600" : ""}
              >
                {insight.trend}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-xs">
                {insight.category}
              </Badge>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/analytics" className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Ver más
                </Link>
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button asChild className="w-full">
            <Link to="/analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Ver Dashboard Completo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
