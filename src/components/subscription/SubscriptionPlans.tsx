
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star } from "lucide-react";
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
}

export const SubscriptionPlans = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const plans: SubscriptionPlan[] = [
    {
      id: "basic",
      name: "Básico",
      price: 9,
      interval: "mes",
      description: "Perfecto para emprendedores individuales",
      features: [
        "Hasta 5 roadmaps por mes",
        "Acceso a herramientas básicas",
        "Soporte por email",
        "Análisis básico de herramientas"
      ],
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: "premium",
      name: "Premium",
      price: 29,
      interval: "mes",
      description: "Ideal para equipos pequeños y medianos",
      features: [
        "Roadmaps ilimitados",
        "Acceso a todas las herramientas",
        "Generador de presupuestos",
        "Integraciones con Make",
        "Soporte prioritario",
        "Analytics avanzados"
      ],
      popular: true,
      icon: <Star className="w-6 h-6" />
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      interval: "mes",
      description: "Para empresas con necesidades avanzadas",
      features: [
        "Todo lo de Premium",
        "API personalizada",
        "Gestión de equipos",
        "Integraciones personalizadas",
        "Soporte dedicado 24/7",
        "Onboarding personalizado"
      ],
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

    setIsLoading(planId);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId }
      });

      if (error) throw error;

      if (data?.url) {
        // Abrir Stripe checkout en una nueva pestaña
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

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Elige tu plan perfecto
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Desbloquea todo el potencial de nuestra plataforma con planes diseñados para cada etapa de tu negocio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-purple-500 border-2' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                Más Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-fit">
                {plan.icon}
              </div>
              <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-gray-900">
                ${plan.price}
                <span className="text-sm font-normal text-gray-500">/{plan.interval}</span>
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </CardHeader>

            <CardContent>
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
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading === plan.id}
              >
                {isLoading === plan.id ? "Procesando..." : "Comenzar ahora"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Todos los planes incluyen una garantía de devolución de 30 días
        </p>
      </div>
    </div>
  );
};
