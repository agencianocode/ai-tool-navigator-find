
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Calendar, CreditCard, RotateCcw, Shield, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export const SubscriptionInfo = () => {
  const { user, subscriptionStatus, isAdmin, loading: authLoading } = useAuth();
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    created_at: null,
    updated_at: null,
    stripe_customer_id: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !authLoading) {
      fetchSubscriptionDetails();
    }
  }, [user, authLoading, subscriptionStatus]);

  const fetchSubscriptionDetails = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      console.log('🔍 Fetching subscription details for profile...');
      console.log('🔍 Current auth state:', { isAdmin, subscriptionStatus });

      // Fetch subscription details
      const { data } = await supabase
        .from('subscribers')
        .select('created_at, updated_at, stripe_customer_id')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setSubscriptionDetails(data);
        console.log('📊 Subscription details:', data);
      }
    } catch (error) {
      console.error('❌ Error fetching subscription details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlanName = () => {
    if (isAdmin) return "Administrator";
    if (subscriptionStatus.subscription_tier === 'enterprise') return "Enterprise";
    if (!subscriptionStatus.subscribed) return "Free";
    return subscriptionStatus.subscription_tier === 'basic' ? 'Pro' : 
           subscriptionStatus.subscription_tier === 'premium' ? 'Premium' :
           'Free';
  };

  const getPlanBadgeVariant = () => {
    if (isAdmin || subscriptionStatus.subscription_tier === 'enterprise') return "default";
    if (subscriptionStatus.subscribed) return "secondary";
    return "outline";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isExpiringSoon = () => {
    if (!subscriptionStatus.subscription_end) return false;
    const endDate = new Date(subscriptionStatus.subscription_end);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  const isExpired = () => {
    if (!subscriptionStatus.subscription_end) return false;
    const endDate = new Date(subscriptionStatus.subscription_end);
    const now = new Date();
    return endDate < now;
  };

  if (authLoading || loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Información de Suscripción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Información de Suscripción
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plan Actual */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <Shield className="h-8 w-8 text-purple-600" />
            ) : (
              <Crown className="h-8 w-8 text-purple-600" />
            )}
            <div>
              <h3 className="font-semibold text-lg">Plan {getPlanName()}</h3>
              <p className="text-sm text-gray-600">
                {isAdmin 
                  ? "Acceso administrativo completo" 
                  : subscriptionStatus.subscription_tier === 'enterprise'
                    ? "Plan Enterprise con acceso ilimitado"
                    : subscriptionStatus.subscribed 
                      ? "Suscripción activa" 
                      : "Plan gratuito"
                }
              </p>
            </div>
          </div>
          <Badge variant={getPlanBadgeVariant()} className="text-sm px-3 py-1">
            {isAdmin && <Shield className="h-3 w-3 mr-1" />}
            {getPlanName()}
          </Badge>
        </div>

        {/* Detalles de la Suscripción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Fecha de inicio:</span>
            </div>
            <p className="font-medium">
              {subscriptionDetails.created_at 
                ? formatDate(subscriptionDetails.created_at)
                : 'No disponible'
              }
            </p>
          </div>

          {subscriptionStatus.subscription_end && !isAdmin && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Fecha de vencimiento:</span>
              </div>
              <p className={`font-medium ${isExpired() ? 'text-red-600' : isExpiringSoon() ? 'text-orange-600' : ''}`}>
                {formatDate(subscriptionStatus.subscription_end)}
                {isExpired() && (
                  <span className="ml-2 text-red-600">
                    <AlertCircle className="h-4 w-4 inline" />
                    Expirada
                  </span>
                )}
                {isExpiringSoon() && !isExpired() && (
                  <span className="ml-2 text-orange-600">
                    <AlertCircle className="h-4 w-4 inline" />
                    Próximo a vencer
                  </span>
                )}
              </p>
            </div>
          )}

          {isAdmin && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Acceso:</span>
              </div>
              <p className="font-medium text-green-600">
                Sin límite de tiempo
              </p>
            </div>
          )}
        </div>

        {/* Estado y Límites */}
        <div className="space-y-3">
          <h4 className="font-medium">Límites y Créditos</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-green-50">
              <p className="text-2xl font-bold text-green-600">
                {(isAdmin || subscriptionStatus.subscription_tier === 'enterprise') ? '∞' : 
                 subscriptionStatus.subscription_tier === 'premium' ? '∞' :
                 subscriptionStatus.subscription_tier === 'basic' ? '15' : '3'}
              </p>
              <p className="text-xs text-gray-600">Hojas de Ruta</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <p className="text-2xl font-bold text-blue-600">
                {(isAdmin || subscriptionStatus.subscription_tier === 'enterprise') ? '∞' : 
                 subscriptionStatus.subscription_tier === 'premium' ? '∞' :
                 subscriptionStatus.subscription_tier === 'basic' ? '100' : '20'}
              </p>
              <p className="text-xs text-gray-600">Herramientas</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <p className="text-2xl font-bold text-purple-600">
                {(isAdmin || subscriptionStatus.subscription_tier === 'enterprise') ? '∞' : 
                 subscriptionStatus.subscription_tier === 'premium' ? '∞' :
                 subscriptionStatus.subscription_tier === 'basic' ? '5' : '1'}
              </p>
              <p className="text-xs text-gray-600">Presupuestos</p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          {!isAdmin && (
            <>
              {!subscriptionStatus.subscribed && (
                <Button asChild className="w-full">
                  <Link to="/subscriptions">
                    <Crown className="mr-2 h-4 w-4" />
                    Actualizar a Plan Premium
                  </Link>
                </Button>
              )}

              {subscriptionStatus.subscribed && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button asChild variant="outline">
                    <Link to="/subscriptions">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Gestionar Suscripción
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/subscriptions">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Renovar Plan
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}

          {(isAdmin || subscriptionStatus.subscription_tier === 'enterprise') && (
            <div className="p-3 rounded-lg bg-purple-50 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium text-purple-800">
                {isAdmin ? "Tienes acceso administrativo completo" : "Plan Enterprise Activo"}
              </p>
              <p className="text-xs text-purple-600">
                Sin límites en el uso de la plataforma
              </p>
            </div>
          )}
        </div>

        {/* Customer ID para soporte */}
        {subscriptionDetails.stripe_customer_id && (
          <div className="pt-3 border-t">
            <p className="text-xs text-gray-500">
              ID de Cliente: {subscriptionDetails.stripe_customer_id.substring(0, 20)}...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
