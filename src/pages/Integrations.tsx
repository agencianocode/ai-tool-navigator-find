
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Webhook, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { MakeIntegration } from "@/components/integrations/MakeIntegration";

const Integrations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Integraciones</h1>
          <p className="text-gray-600">
            Conecta tu plataforma con herramientas externas para automatizar tus flujos de trabajo
          </p>
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Make Integration */}
          <MakeIntegration />

          {/* Coming Soon Cards */}
          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Stripe Subscriptions
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Próximamente</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                Sistema de suscripciones premium con múltiples planes
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4" />
                  Gestión automática de suscripciones
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4" />
                  Portal de cliente integrado
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4" />
                  Múltiples métodos de pago
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Generador de Presupuestos
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Próximamente</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                Generación automática de presupuestos basada en herramientas seleccionadas
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4" />
                  Cálculo automático de costos
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4" />
                  Templates personalizables
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4" />
                  Exportación a PDF
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                API Avanzada
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Próximamente</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                API REST completa para integraciones personalizadas
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4" />
                  Endpoints RESTful
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4" />
                  Autenticación OAuth
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Settings className="w-4 h-4" />
                  Documentación Swagger
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Beneficios de las Integraciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Automatización</h3>
                <p className="text-sm text-gray-600">
                  Automatiza tareas repetitivas y ahorra tiempo valioso
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Sincronización</h3>
                <p className="text-sm text-gray-600">
                  Mantén tus datos sincronizados entre diferentes plataformas
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Webhook className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Flexibilidad</h3>
                <p className="text-sm text-gray-600">
                  Adapta la plataforma a tu flujo de trabajo específico
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;
