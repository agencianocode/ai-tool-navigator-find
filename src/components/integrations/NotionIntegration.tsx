
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, FileText, CheckCircle, AlertCircle, ExternalLink, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NotionIntegration = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [databaseId, setDatabaseId] = useState("");
  const [exportFormat, setExportFormat] = useState("roadmap");
  const [isLoading, setIsLoading] = useState(false);

  const exportFormats = [
    { value: "roadmap", label: "Hoja de Ruta", description: "Exportar roadmaps como base de conocimiento" },
    { value: "tools", label: "Catálogo de Herramientas", description: "Exportar herramientas evaluadas" },
    { value: "evaluations", label: "Evaluaciones", description: "Exportar resultados de evaluaciones" },
    { value: "budget", label: "Presupuestos", description: "Exportar cálculos de presupuesto" }
  ];

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey || !databaseId) {
      toast({
        title: "Error",
        description: "Por favor completa la API key y Database ID de Notion",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Exporting to Notion:", { databaseId, exportFormat });

    try {
      // Simular exportación a Notion
      const mockData = generateMockExportData(exportFormat);
      
      // En una implementación real, aquí se haría la llamada a la API de Notion
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Exportación Exitosa",
        description: `Los datos se exportaron correctamente a tu base de datos de Notion.`,
      });
    } catch (error) {
      console.error("Error exporting to Notion:", error);
      toast({
        title: "Error",
        description: "Error al exportar a Notion. Verifica tus credenciales.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockExportData = (format: string) => {
    switch (format) {
      case "roadmap":
        return {
          title: "Hoja de Ruta: Implementación IA para Marketing",
          phases: [
            "Fase 1: Análisis y Planificación",
            "Fase 2: Implementación de Herramientas",
            "Fase 3: Optimización y Escalado"
          ],
          tools: ["ChatGPT", "Canva", "Zapier"],
          timeline: "12 semanas"
        };
      case "tools":
        return {
          tools: [
            { name: "ChatGPT", category: "AI Writing", rating: 4.8 },
            { name: "Canva", category: "Design", rating: 4.6 },
            { name: "Zapier", category: "Automation", rating: 4.5 }
          ]
        };
      default:
        return {};
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Integración con Notion
        </CardTitle>
        <p className="text-sm text-gray-600">
          Exporta roadmaps, evaluaciones y catálogos como bases de conocimiento en Notion
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge variant={apiKey && databaseId ? "default" : "secondary"} className="flex items-center gap-1">
            {apiKey && databaseId ? (
              <>
                <CheckCircle className="w-3 h-3" />
                Configurado
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                No configurado
              </>
            )}
          </Badge>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleExport} className="space-y-4">
          <div>
            <Label htmlFor="apikey">Notion API Key</Label>
            <Input
              id="apikey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="secret_..."
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Crea una integración en notion.so/my-integrations
            </p>
          </div>

          <div>
            <Label htmlFor="database">Database ID</Label>
            <div className="relative">
              <Database className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="database"
                value={databaseId}
                onChange={(e) => setDatabaseId(e.target.value)}
                placeholder="1234567890abcdef..."
                className="mt-1 pl-10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              ID de la base de datos donde exportar (desde la URL de Notion)
            </p>
          </div>

          <div>
            <Label htmlFor="format">Formato de Exportación</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {exportFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    <div>
                      <div className="font-medium">{format.label}</div>
                      <div className="text-xs text-gray-500">{format.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={!apiKey || !databaseId || isLoading} className="w-full">
            {isLoading ? (
              "Exportando..."
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Exportar a Notion
              </>
            )}
          </Button>
        </form>

        {/* Export Examples */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-3">Qué se exporta:</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div><strong>Hojas de Ruta:</strong> Fases, tareas, herramientas y timelines</div>
            <div><strong>Herramientas:</strong> Catálogo completo con ratings y categorías</div>
            <div><strong>Evaluaciones:</strong> Resultados y recomendaciones detalladas</div>
            <div><strong>Presupuestos:</strong> Cálculos de costos y ROI estimado</div>
          </div>
        </div>

        {/* Database Structure */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Estructura Recomendada de la Base de Datos</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <div><strong>Título:</strong> Título (Text)</div>
            <div><strong>Categoría:</strong> Categoría (Select)</div>
            <div><strong>Estado:</strong> Estado (Select: Nuevo, En Progreso, Completado)</div>
            <div><strong>Fecha:</strong> Fecha de creación (Date)</div>
            <div><strong>Tags:</strong> Etiquetas (Multi-select)</div>
            <div><strong>Contenido:</strong> Contenido completo (Rich text)</div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">Configuración paso a paso:</h4>
          <ol className="text-sm text-yellow-800 space-y-1">
            <li>1. Ve a notion.so/my-integrations</li>
            <li>2. Crea una nueva integración interna</li>
            <li>3. Copia la "Internal Integration Token"</li>
            <li>4. Crea una base de datos en Notion</li>
            <li>5. Comparte la base de datos con tu integración</li>
            <li>6. Copia el Database ID desde la URL</li>
          </ol>
        </div>

        {/* Help Links */}
        <div className="flex gap-2 justify-center">
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://developers.notion.com/docs/getting-started" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              API de Notion
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://notion.so/my-integrations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Mis Integraciones
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
