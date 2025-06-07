
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Star, Download, Eye, Bookmark, GitCompare } from "lucide-react";

export const ChromeExtensionPromo = () => {
  const features = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Analizar en Tiempo Real",
      description: "Analiza cualquier herramienta web directamente desde su página oficial"
    },
    {
      icon: <GitCompare className="w-5 h-5" />,
      title: "Comparar Instantáneamente",
      description: "Compara herramientas lado a lado sin salir de su sitio web"
    },
    {
      icon: <Bookmark className="w-5 h-5" />,
      title: "Guardar para Después",
      description: "Marca herramientas para evaluarlas más tarde en tu dashboard"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Rating y Reviews",
      description: "Ve ratings de la comunidad y deja tus propias reseñas"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Chrome Extension
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Próximamente
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Analiza y compara herramientas de IA directamente desde cualquier sitio web
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview Image Placeholder */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2">AI Tools Advisor Extension</h3>
          <p className="text-gray-600 text-sm">
            Tu asistente de IA para evaluar herramientas en toda la web
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How it Works */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Cómo Funciona</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>Visita cualquier sitio web de herramientas de IA</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>Haz clic en el ícono de la extensión</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>Ve análisis instantáneo, ratings y comparaciones</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
              <div>Guarda herramientas interesantes en tu dashboard</div>
            </div>
          </div>
        </div>

        {/* Example Sites */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Sitios Compatibles</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <div>• ChatGPT (chat.openai.com)</div>
            <div>• Midjourney (midjourney.com)</div>
            <div>• Canva (canva.com)</div>
            <div>• Notion (notion.so)</div>
            <div>• Y miles de herramientas más...</div>
          </div>
        </div>

        {/* Early Access */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="text-center">
            <h4 className="font-semibold text-purple-900 mb-2">¡Acceso Anticipado!</h4>
            <p className="text-sm text-purple-700 mb-4">
              Sé el primero en probar nuestra extensión cuando esté lista
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Notificarme Cuando Esté Lista
            </Button>
          </div>
        </div>

        {/* Technical Details */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Especificaciones Técnicas</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <div><strong>Plataformas:</strong> Chrome, Firefox, Edge</div>
            <div><strong>Permisos:</strong> Solo sitios activos (no acceso a datos personales)</div>
            <div><strong>Privacidad:</strong> Análisis local, sin tracking</div>
            <div><strong>Tamaño:</strong> ~2MB descarga</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
