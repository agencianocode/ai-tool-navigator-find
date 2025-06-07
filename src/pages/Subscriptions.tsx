
import { useState } from "react";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { PremiumFeatures } from "@/components/subscription/PremiumFeatures";
import { UsageLimits } from "@/components/subscription/UsageLimits";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Store, Users, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Subscriptions = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("plans");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to={user ? "/dashboard" : "/"}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al {user ? "Dashboard" : "Inicio"}
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Planes
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Comparar
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Marketplace
            </TabsTrigger>
          </TabsList>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-8">
            <SubscriptionPlans />
            
            {user && (
              <div className="max-w-md mx-auto">
                <UsageLimits showUpgrade={false} />
              </div>
            )}
          </TabsContent>

          {/* Features Comparison Tab */}
          <TabsContent value="features">
            <PremiumFeatures />
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Marketplace de Templates
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Accede a roadmaps premium creados por expertos de la industria
              </p>
            </div>

            {/* Marketplace Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Crown className="w-5 h-5" />
                    Templates Premium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-700 mb-4">
                    Roadmaps validados por expertos con casos de éxito reales
                  </p>
                  <ul className="space-y-2 text-sm text-purple-600">
                    <li>• +50 templates especializados</li>
                    <li>• Actualizaciones constantes</li>
                    <li>• Casos de éxito documentados</li>
                    <li>• Soporte del autor</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Users className="w-5 h-5" />
                    Por Industria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 mb-4">
                    Roadmaps específicos para diferentes sectores
                  </p>
                  <ul className="space-y-2 text-sm text-blue-600">
                    <li>• E-commerce</li>
                    <li>• SaaS y Startups</li>
                    <li>• Fintech</li>
                    <li>• HealthTech</li>
                    <li>• EdTech</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Store className="w-5 h-5" />
                    Acceso Inmediato
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 mb-4">
                    Descarga y personaliza templates al instante
                  </p>
                  <ul className="space-y-2 text-sm text-green-600">
                    <li>• Descarga instantánea</li>
                    <li>• Formatos editables</li>
                    <li>• Licencia comercial</li>
                    <li>• Actualizaciones incluidas</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Marketplace CTA */}
            <div className="text-center">
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Explora el Marketplace
                  </h3>
                  <p className="mb-6 opacity-90">
                    Descubre templates premium que acelerarán tu proyecto
                  </p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    <Link to="/templates">
                      Ver Templates Premium
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h3>
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">¿Puedo cambiar de plan en cualquier momento?</h4>
                <p className="text-gray-600">
                  Sí, puedes actualizar o degradar tu plan cuando quieras. Los cambios se aplican 
                  inmediatamente y se prorratea el costo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">¿Qué incluye la garantía de devolución?</h4>
                <p className="text-gray-600">
                  Ofrecemos una garantía completa de 30 días. Si no estás satisfecho, 
                  reembolsamos el 100% de tu dinero sin preguntas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">¿Los templates se actualizan?</h4>
                <p className="text-gray-600">
                  Sí, nuestros templates premium se actualizan regularmente con nuevas 
                  herramientas y mejores prácticas del mercado.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
