
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, MessageSquare, BookOpen, Code, Globe, Webhook } from "lucide-react";
import { Link } from "react-router-dom";
import { MakeIntegration } from "@/components/integrations/MakeIntegration";
import { ZapierIntegration } from "@/components/integrations/ZapierIntegration";
import { SlackIntegration } from "@/components/integrations/SlackIntegration";
import { NotionIntegration } from "@/components/integrations/NotionIntegration";
import { PublicAPISection } from "@/components/api/PublicAPISection";
import { ChromeExtensionPromo } from "@/components/extensions/ChromeExtensionPromo";

const Integrations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Integraciones y API</h1>
          <p className="text-gray-600">
            Conecta AI Tools Advisor con tu stack tecnológico y automatiza tus flujos de trabajo
          </p>
        </div>

        {/* API Section */}
        <div className="mb-8">
          <PublicAPISection />
        </div>

        {/* Native Integrations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Automation Platforms */}
          <ZapierIntegration />
          <MakeIntegration />
          
          {/* Communication */}
          <SlackIntegration />
          
          {/* Knowledge Management */}
          <NotionIntegration />
        </div>

        {/* Chrome Extension Section */}
        <div className="mb-8">
          <ChromeExtensionPromo />
        </div>

        {/* Coming Soon Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Discord Integration
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Próximamente</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                Bot de Discord para consultar herramientas y recibir notificaciones
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Code className="w-4 h-4" />
                  Comandos de slash personalizados
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Webhook className="w-4 h-4" />
                  Notificaciones automáticas
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Zap className="w-4 h-4" />
                  Búsqueda y comparación en tiempo real
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Obsidian Plugin
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Próximamente</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                Plugin para exportar roadmaps y evaluaciones a tu vault de Obsidian
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Code className="w-4 h-4" />
                  Sync automático de roadmaps
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Webhook className="w-4 h-4" />
                  Templates personalizables
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Zap className="w-4 h-4" />
                  Linking automático entre notas
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SDKs Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>SDKs Oficiales (En Desarrollo)</CardTitle>
            <p className="text-sm text-gray-600">
              Librerías oficiales para integrar fácilmente con AI Tools Advisor
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">JavaScript SDK</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Para aplicaciones web y Node.js
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  npm install @aitoolsadvisor/sdk
                </code>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Python SDK</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Para scripts y aplicaciones Python
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  pip install aitoolsadvisor
                </code>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Go SDK</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Para aplicaciones backend en Go
                </p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  go get github.com/aitoolsadvisor/go-sdk
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Beneficios del Ecosistema de Integraciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Automatización</h3>
                <p className="text-sm text-gray-600">
                  Automatiza evaluaciones y notificaciones en tu flujo de trabajo
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Ubicuidad</h3>
                <p className="text-sm text-gray-600">
                  Accede a insights de herramientas desde cualquier plataforma
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Flexibilidad</h3>
                <p className="text-sm text-gray-600">
                  API y SDKs para crear integraciones personalizadas
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Conocimiento</h3>
                <p className="text-sm text-gray-600">
                  Centraliza el conocimiento sobre herramientas en tu organización
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
