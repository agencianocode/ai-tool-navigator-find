
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Search, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";
import FavoriteButton from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, isLoading } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFavorites = favorites.filter(fav =>
    fav.tool_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-2xl font-bold mb-2">Inicia sesión para ver tus favoritos</h2>
              <p className="text-gray-600 mb-6">
                Guarda tus herramientas favoritas para acceder a ellas fácilmente
              </p>
              <Link to="/auth">
                <Button>Iniciar Sesión</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Button>
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Heart className="h-8 w-8 text-red-500" />
                Mis Herramientas Favoritas
              </h1>
              <p className="text-gray-600">
                Todas las herramientas que has guardado como favoritas
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {favorites.length} {favorites.length === 1 ? 'favorito' : 'favoritos'}
            </Badge>
          </div>
        </div>

        {/* Search */}
        {favorites.length > 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar en mis favoritos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {favorites.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold mb-2">Aún no tienes favoritos</h2>
              <p className="text-gray-600 mb-6">
                Comienza explorando herramientas y marca las que más te gusten como favoritas
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/tools">
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Explorar Herramientas
                  </Button>
                </Link>
                <Link to="/questionnaire">
                  <Button variant="outline">
                    Crear Hoja de Ruta
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : filteredFavorites.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h2 className="text-lg font-semibold mb-2">No se encontraron resultados</h2>
              <p className="text-gray-600">
                No hay favoritos que coincidan con "{searchTerm}"
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((favorite) => (
              <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{favorite.tool_name}</span>
                    <FavoriteButton toolName={favorite.tool_name} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Agregado el {new Date(favorite.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Ver Detalles
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Agregar a Roadmap
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {favorites.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link to="/roadmap" state={{ preselectedTools: favorites.map(f => f.tool_name) }}>
                  <Button>
                    Crear Roadmap con Favoritos
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Explorar Más Herramientas
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Favorites;
