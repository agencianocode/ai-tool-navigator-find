import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bell, BellOff, Settings } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const PushNotificationManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    isSupported, 
    isSubscribed, 
    isLoading, 
    subscribeToPush, 
    unsubscribeFromPush 
  } = usePushNotifications();
  const [testLoading, setTestLoading] = useState(false);

  const sendTestNotification = async () => {
    if (!user) return;
    
    setTestLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          userId: user.id,
          title: '🔔 Notificación de Prueba',
          body: 'Esta es una notificación push de prueba del sistema de alertas de AI Tools Hub',
          url: '/dashboard',
          icon: '/favicon.ico'
        }
      });

      if (error) throw error;

      toast({
        title: "Notificación enviada",
        description: "Se ha enviado una notificación de prueba"
      });
    } catch (error) {
      console.error('Error sending test notification:', error);
      toast({
        title: "Error",
        description: "Error al enviar la notificación de prueba",
        variant: "destructive"
      });
    } finally {
      setTestLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BellOff className="h-5 w-5 text-gray-400" />
            <CardTitle>Notificaciones Push</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Tu navegador no soporta notificaciones push. 
            Intenta usar Chrome, Firefox, Safari o Edge más recientes.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notificaciones Push</CardTitle>
          </div>
          <Badge variant={isSubscribed ? "default" : "secondary"}>
            {isSubscribed ? "Activadas" : "Desactivadas"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-medium">
              Recibir notificaciones push
            </Label>
            <p className="text-sm text-gray-600">
              Recibe alertas importantes directamente en tu navegador
            </p>
          </div>
          <Switch
            checked={isSubscribed}
            onCheckedChange={isSubscribed ? unsubscribeFromPush : subscribeToPush}
            disabled={isLoading}
          />
        </div>

        {isSubscribed && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Notificaciones Activadas
                </span>
              </div>
              <p className="text-sm text-green-700">
                Recibirás notificaciones para:
              </p>
              <ul className="text-sm text-green-700 mt-1 ml-4 list-disc">
                <li>Alertas de métricas importantes</li>
                <li>Nuevas herramientas recomendadas</li>
                <li>Actualizaciones de roadmaps</li>
                <li>Mensajes importantes del sistema</li>
              </ul>
            </div>

            <Button 
              onClick={sendTestNotification}
              disabled={testLoading}
              variant="outline"
              className="w-full"
            >
              <Settings className="h-4 w-4 mr-2" />
              {testLoading ? 'Enviando...' : 'Enviar Notificación de Prueba'}
            </Button>
          </div>
        )}

        {!isSubscribed && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <BellOff className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">
                Notificaciones Desactivadas
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Habilita las notificaciones push para recibir alertas importantes
              directamente en tu navegador, incluso cuando no tengas la página abierta.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};