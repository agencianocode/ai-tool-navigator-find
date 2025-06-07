
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, CheckCircle, AlertCircle, ExternalLink, Settings, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ZapierIntegration = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastTriggered, setLastTriggered] = useState<Date | null>(null);
  const [selectedTrigger, setSelectedTrigger] = useState("");

  const triggerTypes = [
    { id: "tool_evaluation", name: "Evaluación de Herramienta Completada", description: "Se dispara cuando se completa una evaluación" },
    { id: "roadmap_created", name: "Hoja de Ruta Creada", description: "Se dispara cuando se genera una nueva hoja de ruta" },
    { id: "tool_recommended", name: "Nueva Recomendación", description: "Se dispara cuando se genera una recomendación personalizada" },
    { id: "budget_calculated", name: "Presupuesto Calculado", description: "Se dispara cuando se calcula un presupuesto" }
  ];

  const handleTrigger = async (e: React.FormEvent, triggerType?: string) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu URL de webhook de Zapier",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl, "Type:", triggerType);

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        triggered_from: window.location.origin,
        event_type: triggerType || selectedTrigger || "manual_trigger",
        data: {
          source: "ai_tools_platform",
          user_action: triggerType || "manual_webhook_test",
          // Datos de ejemplo según el tipo de trigger
          ...(triggerType === "tool_evaluation" && {
            tool_name: "Ejemplo Tool",
            evaluation_score: 4.5,
            categories: ["AI", "Productivity"],
            recommendations: ["Recommended for teams", "Good ROI"]
          }),
          ...(triggerType === "roadmap_created" && {
            roadmap_title: "Implementación IA para Marketing",
            phases_count: 4,
            estimated_duration: "12 weeks",
            tools_included: ["ChatGPT", "Canva", "Zapier"]
          })
        }
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      setLastTriggered(new Date());
      toast({
        title: "Solicitud Enviada",
        description: "La solicitud fue enviada a Zapier. Revisa el historial de tu Zap para confirmar que se activó.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Error al activar el webhook de Zapier. Verifica la URL e intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Integración con Zapier
        </CardTitle>
        <p className="text-sm text-gray-600">
          Automatiza flujos de trabajo conectando nuestra plataforma con más de 5,000 aplicaciones
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge variant={webhookUrl ? "default" : "secondary"} className="flex items-center gap-1">
            {webhookUrl ? (
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
          {lastTriggered && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Último disparo: {lastTriggered.toLocaleString('es-ES')}
            </span>
          )}
        </div>

        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Configuración</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
            <TabsTrigger value="examples">Ejemplos</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4">
            <form onSubmit={handleTrigger} className="space-y-4">
              <div>
                <Label htmlFor="webhook">URL del Webhook de Zapier</Label>
                <Input
                  id="webhook"
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Copia la URL del webhook desde tu Zap en Zapier
                </p>
              </div>

              <Button type="submit" disabled={!webhookUrl || isLoading} className="w-full">
                {isLoading ? (
                  "Enviando..."
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Probar Webhook
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="triggers" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">Tipos de Triggers Disponibles</h4>
              {triggerTypes.map((trigger) => (
                <div key={trigger.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-sm">{trigger.name}</h5>
                      <p className="text-xs text-gray-600">{trigger.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!webhookUrl || isLoading}
                      onClick={(e) => handleTrigger(e, trigger.id)}
                    >
                      Probar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-3">Flujos de Trabajo Populares</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <strong>Email + Slack:</strong> Cuando se complete una evaluación → Enviar email al equipo + Notificar en canal de Slack
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <strong>Google Sheets + Trello:</strong> Nueva hoja de ruta → Crear fila en spreadsheet + Crear tarjeta en Trello
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <strong>CRM + Calendar:</strong> Presupuesto calculado → Crear lead en CRM + Programar seguimiento en calendario
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Datos Enviados en Webhooks</h4>
                <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
{`{
  "timestamp": "2024-01-15T10:30:00Z",
  "event_type": "roadmap_created",
  "data": {
    "roadmap_title": "Implementación IA",
    "phases_count": 4,
    "tools_included": ["ChatGPT", "Canva"],
    "estimated_duration": "12 weeks"
  }
}`}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Link */}
        <div className="flex justify-center pt-4 border-t">
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://zapier.com/apps/webhook/integrations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Documentación de Zapier Webhooks
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
