
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, Users, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const BudgetGenerator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [estimatedUsers, setEstimatedUsers] = useState(100);
  const [features, setFeatures] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [generatedBudget, setGeneratedBudget] = useState<any>(null);

  const availableFeatures = [
    { id: "auth", label: "Autenticación de usuarios" },
    { id: "payments", label: "Procesamiento de pagos" },
    { id: "ai", label: "Integración con IA" },
    { id: "realtime", label: "Funciones en tiempo real" },
    { id: "notifications", label: "Notificaciones push" },
    { id: "analytics", label: "Analytics avanzados" },
    { id: "api", label: "API REST" },
    { id: "storage", label: "Almacenamiento de archivos" },
  ];

  const availableTools = [
    "OpenAI API",
    "Stripe",
    "Supabase",
    "Vercel",
    "SendGrid",
    "Twilio",
    "Google Analytics",
    "Figma",
    "GitHub",
    "Discord",
    "Slack",
    "Zapier",
    "Make"
  ];

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    if (checked) {
      setFeatures([...features, featureId]);
    } else {
      setFeatures(features.filter(f => f !== featureId));
    }
  };

  const handleToolChange = (tool: string, checked: boolean) => {
    if (checked) {
      setSelectedTools([...selectedTools, tool]);
    } else {
      setSelectedTools(selectedTools.filter(t => t !== tool));
    }
  };

  const generateBudget = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para generar presupuestos",
        variant: "destructive",
      });
      return;
    }

    if (!projectName || !projectType) {
      toast({
        title: "Error",
        description: "Por favor completa el nombre y tipo de proyecto",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-budget', {
        body: {
          projectName,
          projectType,
          estimatedUsers,
          features,
          selectedTools
        }
      });

      if (error) throw error;

      if (data.success) {
        setGeneratedBudget(data.budget);
        toast({
          title: "¡Presupuesto generado!",
          description: `Presupuesto para ${projectName} creado exitosamente`,
        });
      } else {
        throw new Error(data.error || "Error desconocido");
      }

    } catch (error) {
      console.error('Error generating budget:', error);
      toast({
        title: "Error",
        description: "Error al generar el presupuesto. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Generador de Presupuestos
        </h1>
        <p className="text-lg text-gray-600">
          Crea presupuestos detallados para tus proyectos de IA basados en las herramientas que necesitas
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Información del Proyecto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Nombre del Proyecto</Label>
              <Input
                id="projectName"
                placeholder="Mi aplicación web"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectType">Tipo de Proyecto</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-app">Aplicación Web</SelectItem>
                  <SelectItem value="mobile-app">Aplicación Móvil</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="api">API/Backend</SelectItem>
                  <SelectItem value="ai-tool">Herramienta de IA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimatedUsers">Usuarios Estimados</Label>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <Input
                id="estimatedUsers"
                type="number"
                placeholder="100"
                value={estimatedUsers}
                onChange={(e) => setEstimatedUsers(Number(e.target.value))}
                className="max-w-xs"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Funcionalidades Requeridas</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.id}
                    checked={features.includes(feature.id)}
                    onCheckedChange={(checked) => 
                      handleFeatureChange(feature.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={feature.id} className="text-sm">
                    {feature.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Herramientas Específicas</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableTools.map((tool) => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={tool}
                    checked={selectedTools.includes(tool)}
                    onCheckedChange={(checked) => 
                      handleToolChange(tool, checked as boolean)
                    }
                  />
                  <Label htmlFor={tool} className="text-sm">
                    {tool}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={generateBudget} 
            disabled={isGenerating}
            className="w-full"
          >
            <Zap className="mr-2 h-4 w-4" />
            {isGenerating ? "Generando..." : "Generar Presupuesto"}
          </Button>
        </CardContent>
      </Card>

      {generatedBudget && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Presupuesto: {generatedBudget.projectName}
              </span>
              <Badge variant="secondary">
                Total: ${generatedBudget.totalCost}/mes
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Costo Total Mensual</h3>
                  <p className="text-2xl font-bold text-blue-700">
                    ${generatedBudget.monthlyRecurring.toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900">Herramientas Incluidas</h3>
                  <p className="text-2xl font-bold text-green-700">
                    {generatedBudget.budgetItems.length}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Desglose de Costos:</h4>
                {generatedBudget.budgetItems.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <Badge variant="outline" className="mt-1">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">${item.total.toFixed(2)}/mes</span>
                      {item.userCost > 0 && (
                        <p className="text-xs text-gray-500">
                          Incluye ${item.userCost.toFixed(2)} por usuarios
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
