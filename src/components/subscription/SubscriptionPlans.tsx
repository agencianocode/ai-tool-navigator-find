import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star, RefreshCw, Settings, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  limits: {
    roadmaps: number | string;
    tools_explored: number | string;
    budget_plans: number | string;
  };
}

export const SubscriptionPlans = () => {
  const { user, subscriptionStatus, checkSubscription } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      interval: "siempre",
      description: "Perfecto para probar la plataforma",
      features: [
        "3 roadmaps por mes",
        "20 herramientas exploradas",
        "1 plan de presupuesto",
        "Comparaciones básicas",
        "Soporte por email"
      ],
      limits: {
        roadmaps: 3,
        tools_explored: 20,
        budget_plans: 1
      },
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: "basic",
      name: "Pro",
      price: 9,
      interval: "mes",
      description: "Ideal para emprendedores y freelancers",
      features: [
        "Roadmaps ilimitados",
        "Herramientas ilimitadas",
        "Planes de presupuesto ilimitados",
        "Templates premium",
        "Exportar a PDF",
        "Comparaciones avanzadas",
        "Soporte prioritario"
      ],
      popular: true,
      limits: {
        roadmaps: "Ilimitados",
        tools_explored: "Ilimitadas",
        budget_plans: "Ilimitados"
      },
      icon: <Star className="w-6 h-6" />
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 29,
      interval: "mes",
      description: "Para empresas con necesidades avanzadas",
      features: [
        "Todo lo de Pro",
        "API personalizada",
        "White-label branding",
        "Consultorías 1:1",
        "Integraciones personalizadas",
        "Soporte dedicado 24/7",
        "Onboarding personalizado",
        "Analytics empresariales"
      ],
      limits: {
        roadmaps: "Ilimitados",
        tools_explored: "Ilimitadas",
        budget_plans: "Ilimitados"
      },
      icon: <Crown className="w-6 h-6" />
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para suscribirte",
        variant: "destructive",
      });
      return;
    }

    if (planId === "free") {
      toast({
        title: "Plan Free",
        description: "Ya estás usando el plan gratuito",
      });
      return;
    }

    setIsLoading(planId);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }

    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Error al crear la sesión de pago. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para gestionar tu suscripción",
        variant: "destructive",
      });
      return;
    }

    setIsLoading('manage');

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
        description: "Error al abrir el portal de cliente. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleRefreshSubscription = async () => {
    setIsRefreshing(true);
    try {
      await checkSubscription();
      toast({
        title: "Actualizado",
        description: "Estado de suscripción actualizado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al actualizar el estado de suscripción",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getCurrentPlan = () => {
    if (!subscriptionStatus.subscribed) return 'free';
    return subscriptionStatus.subscription_tier;
  };

  const isCurrentPlan = (planId: string) => {
    const currentPlan = getCurrentPlan();
    return currentPlan === planId;
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Elige tu plan perfecto
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Desbloquea todo el potencial de nuestra plataforma con planes diseñados para cada etapa de tu negocio
        </p>
        
        {user && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="text-sm text-gray-600">
              Estado: {subscriptionStatus.subscribed ? (
                <span className="text-green-600 font-medium">
                  Suscrito ({subscriptionStatus.subscription_tier === 'basic' ? 'Pro' : subscriptionStatus.subscription_tier})
                </span>
              ) : (
                <span className="text-gray-500">Plan Free</span>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshSubscription}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            {subscriptionStatus.subscribed && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleManageSubscription}
                disabled={isLoading === 'manage'}
              >
                <Settings className="mr-2 h-4 w-4" />
                {isLoading === 'manage' ? "Abriendo..." : "Gestionar"}
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const isUserCurrentPlan = isCurrentPlan(plan.id);
          
          return (
            <Card key={plan.id} className={`relative ${
              plan.popular ? 'border-purple-500 border-2 lg:scale-105' : ''
            } ${isUserCurrentPlan ? 'ring-2 ring-green-500' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                  Más Popular
                </Badge>
              )}
              
              {isUserCurrentPlan && (
                <Badge className="absolute -top-3 right-4 bg-green-500">
                  Tu Plan
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-fit">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900">
                  {plan.price === 0 ? 'Gratis' : `$${plan.price}`}
                  {plan.price > 0 && <span className="text-sm font-normal text-gray-500">/{plan.interval}</span>}
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Usage Limits */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-semibold mb-3 text-gray-700">Límites de uso:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Roadmaps:</span>
                      <span className="font-medium">{plan.limits.roadmaps}/mes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Herramientas:</span>
                      <span className="font-medium">{plan.limits.tools_explored}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Presupuestos:</span>
                      <span className="font-medium">{plan.limits.budget_plans}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : ''}`}
                  variant={isUserCurrentPlan ? "outline" : plan.popular ? "default" : "outline"}
                  onClick={() => isUserCurrentPlan ? handleManageSubscription() : handleSubscribe(plan.id)}
                  disabled={isLoading === plan.id || isLoading === 'manage'}
                >
                  {isLoading === plan.id ? "Procesando..." : 
                   isUserCurrentPlan ? "Plan Actual" : 
                   plan.price === 0 ? "Plan Actual" : "Comenzar ahora"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Referral Program Banner */}
      <div className="mt-12 max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Gift className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">
                    ¡Programa de Referidos!
                  </h3>
                  <p className="text-green-700">
                    Gana $5 por cada amigo que se suscriba a un plan de pago
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="border-green-300 text-green-700 hover:bg-green-100"
                onClick={() => window.location.href = '/profile?tab=referrals'}
              >
                Ver mi código
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Todos los planes incluyen una garantía de devolución de 30 días
        </p>
      </div>
    </div>
  );
};
