
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Star, Download, FileText, Headphones, Code, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface FeatureComparison {
  feature: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
  icon: React.ReactNode;
}

export const PremiumFeatures = () => {
  const { subscriptionStatus } = useAuth();

  const features: FeatureComparison[] = [
    {
      feature: "Roadmaps por mes",
      free: "3",
      pro: "Ilimitados",
      enterprise: "Ilimitados",
      icon: <FileText className="w-4 h-4" />
    },
    {
      feature: "Herramientas exploradas",
      free: "20",
      pro: "Ilimitadas",
      enterprise: "Ilimitadas",
      icon: <Zap className="w-4 h-4" />
    },
    {
      feature: "Comparaciones avanzadas",
      free: false,
      pro: true,
      enterprise: true,
      icon: <Star className="w-4 h-4" />
    },
    {
      feature: "Exportar PDF",
      free: false,
      pro: true,
      enterprise: true,
      icon: <Download className="w-4 h-4" />
    },
    {
      feature: "Templates premium",
      free: false,
      pro: true,
      enterprise: true,
      icon: <Crown className="w-4 h-4" />
    },
    {
      feature: "Soporte prioritario",
      free: false,
      pro: true,
      enterprise: true,
      icon: <Headphones className="w-4 h-4" />
    },
    {
      feature: "API Access",
      free: false,
      pro: false,
      enterprise: true,
      icon: <Code className="w-4 h-4" />
    },
    {
      feature: "White-label",
      free: false,
      pro: false,
      enterprise: true,
      icon: <Users className="w-4 h-4" />
    },
    {
      feature: "Consultorías 1:1",
      free: false,
      pro: false,
      enterprise: true,
      icon: <Users className="w-4 h-4" />
    }
  ];

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <span className="text-gray-400">-</span>
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  const getCurrentBadge = (tier: 'free' | 'pro' | 'enterprise') => {
    const currentTier = subscriptionStatus.subscribed ? subscriptionStatus.subscription_tier : 'free';
    
    if (
      (tier === 'free' && !subscriptionStatus.subscribed) ||
      (tier === 'pro' && currentTier === 'basic') ||
      (tier === 'enterprise' && currentTier === 'enterprise')
    ) {
      return <Badge className="ml-2 bg-green-500">Tu Plan</Badge>;
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Compara nuestros planes
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a las necesidades de tu proyecto
        </p>
      </div>

      {/* Feature Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Comparación de características</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Característica</th>
                  <th className="text-center py-3 px-4">
                    <div className="flex items-center justify-center">
                      Free
                      {getCurrentBadge('free')}
                    </div>
                  </th>
                  <th className="text-center py-3 px-4">
                    <div className="flex items-center justify-center">
                      Pro ($9/mes)
                      {getCurrentBadge('pro')}
                    </div>
                  </th>
                  <th className="text-center py-3 px-4">
                    <div className="flex items-center justify-center">
                      Enterprise ($29/mes)
                      {getCurrentBadge('enterprise')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {feature.icon}
                        <span className="font-medium">{feature.feature}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      {renderFeatureValue(feature.free)}
                    </td>
                    <td className="text-center py-4 px-4">
                      {renderFeatureValue(feature.pro)}
                    </td>
                    <td className="text-center py-4 px-4">
                      {renderFeatureValue(feature.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Premium Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Crown className="w-5 h-5" />
              Templates Premium
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">
              Accede a roadmaps exclusivos creados por expertos de la industria
            </p>
            <ul className="space-y-2 text-sm text-blue-600">
              <li>• Roadmaps validados por expertos</li>
              <li>• Casos de éxito reales</li>
              <li>• Actualizaciones constantes</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Download className="w-5 h-5" />
              Exportación PDF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-700 mb-4">
              Exporta tus roadmaps en formato PDF profesional
            </p>
            <ul className="space-y-2 text-sm text-purple-600">
              <li>• Formato profesional</li>
              <li>• Branding personalizado</li>
              <li>• Compartir con equipos</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Star className="w-5 h-5" />
              Comparaciones Avanzadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Análisis detallado entre múltiples herramientas
            </p>
            <ul className="space-y-2 text-sm text-green-600">
              <li>• Comparación lado a lado</li>
              <li>• Métricas detalladas</li>
              <li>• Recomendaciones IA</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      {!subscriptionStatus.subscribed && (
        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Link to="/subscriptions">
              <Crown className="mr-2 h-5 w-5" />
              Actualizar a Premium
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
