
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Webhook, Zap, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MakeIntegration = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastTriggered, setLastTriggered] = useState<Date | null>(null);

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu URL de webhook de Make",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering Make webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          event_type: "manual_trigger",
          data: {
            source: "ai_tools_platform",
            user_action: "manual_webhook_test"
          }
        }),
      });

      // Since we're using no-cors, we won't get a proper response status
      setLastTriggered(new Date());
      toast({
        title: "Solicitud Enviada",
        description: "La solicitud fue enviada a Make. Revisa el historial de tu escenario para confirmar que se activó.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Error al activar el webhook de Make. Verifica la URL e intenta nuevamente.",
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
          <Webhook className="h-5 w-5" />
          Integración con Make
        </CardTitle>
        <p className="text-sm text-gray-600">
          Conecta tu plataforma con Make (anteriormente Integromat) para automatizar flujos de trabajo
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
            <span className="text-xs text-gray-500">
              Último disparo: {lastTriggered.toLocaleString('es-ES')}
            </span>
          )}
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleTrigger} className="space-y-4">
          <div>
            <Label htmlFor="webhook">URL del Webhook de Make</Label>
            <Input
              id="webhook"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://hook.eu1.make.com/..."
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Copia la URL del webhook desde tu escenario de Make
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

        {/* Instructions */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Cómo configurar:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Ve a Make.com y crea un nuevo escenario</li>
            <li>2. Añade un trigger "Webhooks" → "Custom webhook"</li>
            <li>3. Copia la URL del webhook generada</li>
            <li>4. Pégala arriba y haz clic en "Probar Webhook"</li>
            <li>5. Configura el resto de tu automatización en Make</li>
          </ol>
        </div>

        {/* Example Use Cases */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Casos de uso populares:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Notificar por email cuando se completa una evaluación</li>
            <li>• Crear tareas en tu gestor de proyectos favorito</li>
            <li>• Sincronizar datos con tu CRM</li>
            <li>• Enviar alertas a Slack o Discord</li>
            <li>• Actualizar hojas de Google Sheets automáticamente</li>
          </ul>
        </div>

        {/* Help Link */}
        <div className="flex justify-center">
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://www.make.com/en/help/webhooks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Documentación de Make
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
