
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ExternalLink, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { expandedAiTools } from "@/data/expandedAiTools";

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(expandedAiTools.map(tool => tool.category))];

  const filteredTools = expandedAiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explorar Herramientas IA
          </h1>
          <p className="text-gray-600">
            Descubre y evalúa las mejores herramientas de inteligencia artificial
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar herramientas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory(null)}
              className={!selectedCategory ? "bg-purple-100" : ""}
            >
              <Filter className="mr-2 h-4 w-4" />
              Todas las categorías
            </Button>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                className={selectedCategory === category ? "bg-purple-100" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {tool.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {tool.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {tool.features?.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {tool.features && tool.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tool.features.length - 3} más
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link to={`/tool/${tool.id}`} className="flex-1">
                    <Button className="w-full" size="sm">
                      Ver Detalles
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No se encontraron herramientas que coincidan con tu búsqueda
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory(null);
            }}>
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
