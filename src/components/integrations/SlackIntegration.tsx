
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Bot, CheckCircle, AlertCircle, ExternalLink, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SlackIntegration = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [channelName, setChannelName] = useState("");
  const [testMessage, setTestMessage] = useState("🤖 Conexión exitosa con AI Tools Advisor! El bot está listo para enviar notificaciones.");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu URL de webhook de Slack",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Sending message to Slack:", webhookUrl);

    try {
      const payload = {
        text: testMessage,
        channel: channelName || undefined,
        username: "AI Tools Advisor",
        icon_emoji: ":robot_face:",
        attachments: [
          {
            color: "#36a64f",
            fields: [
              {
                title: "Plataforma",
                value: "AI Tools Advisor",
                short: true
              },
              {
                title: "Timestamp",
                value: new Date().toLocaleString('es-ES'),
                short: true
              }
            ]
          }
        ]
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Mensaje Enviado",
          description: "El mensaje de prueba se envió correctamente a Slack.",
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending message to Slack:", error);
      toast({
        title: "Error",
        description: "Error al enviar mensaje a Slack. Verifica la URL del webhook.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const botCommands = [
    { command: "/aitools-search [término]", description: "Buscar herramientas de IA" },
    { command: "/aitools-recommend [categoría]", description: "Obtener recomendaciones por categoría" },
    { command: "/aitools-compare [tool1] vs [tool2]", description: "Comparar dos herramientas" },
    { command: "/aitools-roadmap [proyecto]", description: "Generar hoja de ruta para proyecto" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Integración con Slack
        </CardTitle>
        <p className="text-sm text-gray-600">
          Recibe notificaciones y usa comandos de bot para consultar herramientas desde Slack
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge variant={webhookUrl ? "default" : "secondary"} className="flex items-center gap-1">
            {webhookUrl ? (
              <>
                <CheckCircle className="w-3 h-3" />
                Bot Configurado
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                Bot No Configurado
              </>
            )}
          </Badge>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <Label htmlFor="webhook">URL del Webhook de Slack</Label>
            <Input
              id="webhook"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://hooks.slack.com/services/..."
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Crea un webhook desde tu workspace de Slack
            </p>
          </div>

          <div>
            <Label htmlFor="channel">Canal (Opcional)</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="channel"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="general"
                className="mt-1 pl-10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Deja vacío para usar el canal por defecto del webhook
            </p>
          </div>

          <div>
            <Label htmlFor="message">Mensaje de Prueba</Label>
            <Textarea
              id="message"
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          <Button type="submit" disabled={!webhookUrl || isLoading} className="w-full">
            {isLoading ? (
              "Enviando..."
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Enviar Mensaje de Prueba
              </>
            )}
          </Button>
        </form>

        {/* Bot Commands */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Comandos del Bot (Próximamente)
          </h4>
          <div className="space-y-2">
            {botCommands.map((cmd, index) => (
              <div key={index} className="text-sm">
                <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">
                  {cmd.command}
                </code>
                <span className="ml-2 text-blue-700">{cmd.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Types */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Tipos de Notificaciones</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Nueva evaluación de herramienta completada</li>
            <li>• Hoja de ruta generada exitosamente</li>
            <li>• Nuevas recomendaciones personalizadas</li>
            <li>• Presupuesto calculado y listo</li>
            <li>• Alertas de herramientas con actualizaciones importantes</li>
          </ul>
        </div>

        {/* Setup Instructions */}
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">Cómo configurar:</h4>
          <ol className="text-sm text-yellow-800 space-y-1">
            <li>1. Ve a tu workspace de Slack</li>
            <li>2. Crea una nueva app en api.slack.com</li>
            <li>3. Habilita "Incoming Webhooks"</li>
            <li>4. Crea un webhook para el canal deseado</li>
            <li>5. Copia la URL del webhook aquí</li>
          </ol>
        </div>

        {/* Help Link */}
        <div className="flex justify-center">
          <Button variant="outline" size="sm" asChild>
            <a 
              href="https://api.slack.com/messaging/webhooks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Documentación de Slack Webhooks
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
