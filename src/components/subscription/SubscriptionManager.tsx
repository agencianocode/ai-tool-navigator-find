
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ExternalLink, RefreshCw, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const SubscriptionManager = () => {
  const { user, subscriptionStatus, checkSubscription, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManageSubscription = async () => {
    if (!user) return;

    // Admin guard
    if (isAdmin) {
      console.log('🚫 [ADMIN] handleManageSubscription blocked for admin');
      toast({
        title: "Usuario Administrador",
        description: "Los administradores tienen acceso enterprise automático.",
        variant: "default",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "No se pudo abrir el portal de gestión. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    try {
      // Force refresh of user role from database
      await checkSubscription();
      
      // If still not admin, force role refresh
      if (!isAdmin) {
        console.log('🔄 [AUTH] Forcing role refresh from database...');
        const { data: roleData } = await supabase
          .rpc('get_user_role', { _user_id: user?.id });
        
        if (roleData === 'admin') {
          toast({
            title: "Rol actualizado",
            description: "Se detectó rol de administrador. Recarga la página.",
            variant: "default",
          });
        }
      }
      
      toast({
        title: "Estado actualizado",
        description: "El estado ha sido verificado en la base de datos.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const isExpired = () => {
    if (!subscriptionStatus.subscription_end || isAdmin) return false;
    return new Date(subscriptionStatus.subscription_end) < new Date();
  };

  const isExpiringSoon = () => {
    if (!subscriptionStatus.subscription_end || isAdmin) return false;
    const endDate = new Date(subscriptionStatus.subscription_end);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestión de Suscripción
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshStatus}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Verificar Estado
            </Button>
            {isAdmin && (
              <Badge variant="default" className="bg-green-600">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Estado actual:</span>
          <Badge variant={subscriptionStatus.subscribed ? "default" : "secondary"}>
            {subscriptionStatus.subscribed ? "Activa" : "Inactiva"}
          </Badge>
        </div>

        {subscriptionStatus.subscription_tier && (
          <div className="flex items-center justify-between">
            <span>Plan:</span>
            <Badge variant="outline" className={isAdmin ? "border-green-500 text-green-700" : ""}>
              {subscriptionStatus.subscription_tier}
              {isAdmin && <Shield className="h-3 w-3 ml-1" />}
            </Badge>
          </div>
        )}

        {subscriptionStatus.subscription_end && !isAdmin && (
          <div className="flex items-center justify-between">
            <span>Vence:</span>
            <div className="text-right">
              <div className={`${isExpired() ? 'text-red-600' : isExpiringSoon() ? 'text-orange-600' : ''}`}>
                {new Date(subscriptionStatus.subscription_end).toLocaleDateString()}
              </div>
              {(isExpired() || isExpiringSoon()) && (
                <div className="flex items-center text-sm text-orange-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {isExpired() ? 'Expirada' : 'Próxima a vencer'}
                </div>
              )}
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-800">
              <Shield className="h-4 w-4" />
              <span className="font-medium">Acceso Enterprise Ilimitado</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Como administrador, tienes acceso completo a todas las funciones sin restricciones.
            </p>
          </div>
        )}

        {subscriptionStatus.subscribed && !isAdmin && (
          <Button
            onClick={handleManageSubscription}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {isLoading ? "Abriendo..." : "Gestionar Suscripción"}
          </Button>
        )}

        {!isAdmin && (
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Cambiar método de pago</p>
            <p>• Actualizar o cancelar plan</p>
            <p>• Descargar facturas</p>
            <p>• Ver historial de pagos</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
