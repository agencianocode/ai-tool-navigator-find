
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuario intentó acceder a una ruta inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">404</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Página No Encontrada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <p className="text-sm text-gray-500">
              Ruta intentada: <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="outline" asChild className="flex-1">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Ir al Inicio
                </Link>
              </Button>
              <Button asChild className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                <Link to="/tools">
                  <Search className="mr-2 h-4 w-4" />
                  Explorar Herramientas
                </Link>
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-gray-900 mb-2">Enlaces Útiles:</h3>
              <div className="space-y-1 text-sm">
                <Link to="/questionnaire" className="block text-purple-600 hover:text-purple-800">
                  → Comenzar Evaluación
                </Link>
                <Link to="/guides" className="block text-purple-600 hover:text-purple-800">
                  → Centro de Ayuda
                </Link>
                <Link to="/auth" className="block text-purple-600 hover:text-purple-800">
                  → Iniciar Sesión
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
